import React from "react";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    user: any;
    login: (user: any, token: string) => void;
    logout: () => void;
    getToken: () => Promise<string | null>;
    getUserId: () => Promise<string | null>;
    getUserDetails: () => Promise<{ username: string | null; email: string | null }>
}

interface User {
    username: string;
    id: number;
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
  //fonction GetToken
  async function getToken(): Promise<string | null> {
    try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            return user.token;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
  }
  async function getUserId(): Promise<string | null> {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('User data:', user);  // Ajoutez un log pour déboguer
        console.log('User stored in AsyncStorage:', user); // Log les données de l'utilisateur stockées
        return user.id ? user.id.toString() : null; // Vérifiez que l'ID est bien présent et renvoyez-le
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'ID utilisateur:', error);
      return null;
    }
  }

  async function getUserDetails(): Promise<{ username: string | null; email: string | null }> {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        return {
          username: user.username || null,
          email: user.email || null,
        };
      }
      return { username: null, email: null };
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error);
      return { username: null, email: null };
    }
  }
  


  //
  function login(user: User, token: string) {
    const userWithToken = { ...user, token };  // Ajoute le token à l'objet utilisateur
    setUser(userWithToken);
    AsyncStorage.setItem('user', JSON.stringify(userWithToken)); // Stocke l'utilisateur avec l'ID
  }
  
  function logout() {
    setUser(null);
    AsyncStorage.removeItem('user');
  }
  const authContextValue: AuthContextType = {
    user,
    login,
    logout,
    getToken,
    getUserId,
    getUserDetails,
  };
  return (
      <AuthContexte.Provider value={{ user, login, logout, getToken, getUserId, getUserDetails }} >
        {children}
      </AuthContexte.Provider>
  );
}
