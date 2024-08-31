import React from "react";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    user: any;
    login: (user: any) => void;
    logout: () => void;
}

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

const AuthContexte = createContext<AuthContextType | null>(null);

export function useAuth () : AuthContextType {
    const context = useContext(AuthContexte);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function ProtectAuth ( user : User | null ){
    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
       const segGroup = segments[0] === "(auth)";
       if (!user && !segGroup) {
        router.replace('/(auth)/Loading');
       }
       else if (user && segGroup) {
        router.replace('/(tabs)/accueil');
       }
    }, [user, segments]);
}

export function Provider({ children }: { children: React.ReactNode }) : JSX.Element{
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const CheckToken = async () => { 
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error(error);
      }
    };
    CheckToken();
  }, []);

  ProtectAuth(user);

  function login(user: User) {
    setUser(user);
    AsyncStorage.setItem('user', JSON.stringify(user));
  }
  function logout() {
    setUser(null);
    AsyncStorage.removeItem('user');
  }
  return (
      <AuthContexte.Provider value={{ user, login, logout }}>
          {children}
      </AuthContexte.Provider>
  );
}
