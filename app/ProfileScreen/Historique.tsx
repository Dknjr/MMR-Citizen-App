import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';

interface HistoriqueItem {
    id: string;
    title: string;
    description: string;
    time: string;
  }
  
  const data: HistoriqueItem[] = [
    { id: '1', title: 'Signalement', description: 'OptionSignalement', time: '15h17' },
    { id: '2', title: 'Demande', description: 'ObjetDemande', time: '15h17' },
    { id: '3', title: 'Signalement', description: 'OptionSignalement', time: '15h17' },
    { id: '4', title: 'Signalement', description: 'OptionSignalement', time: '15h17' },
  ];
  
  export default function Historique() {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;

    const renderItem = ({ item }: { item: HistoriqueItem }) => (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}:</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
    );

     // Fonction pour actualiser l'historique
  const handleRefresh = () => {
    Alert.alert('Historique actualisé!');
    // Logique pour actualiser les données peut être ajoutée ici
  };

  // Fonction pour supprimer l'historique
  const handleClear = () => {
    Alert.alert('Historique supprimé!');
    // Logique pour effacer l'historique peut être ajoutée ici
  };
  
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: 'Historiques',
          }}
        />
      {/* Section des boutons pour actualiser et supprimer */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity onPress={handleRefresh} style={styles.iconButton}>
          <Ionicons name="refresh-outline" size={28} color="#000" />
          <Text style={styles.iconText}>Actualiser</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClear} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={28} color="#FF0000" />
          <Text style={[styles.iconText, { color: '#FF0000' }]}>Supprimer</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.dateText}>Date</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 20,
    },
    actionButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      marginTop: 10,
    },
    iconButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconText: {
      marginLeft: 5,
      fontSize: 16,
      color: '#000',
    },
    dateText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    card: {
      width: '95%',
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 5, // Ombrage sous les box (pour Android)
      shadowColor: '#000', // Ombrage pour iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      alignSelf: 'center',
    },
    cardContent: {
      flexDirection: 'column',
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cardDescription: {
      fontSize: 14,
      color: '#777777',
      marginTop: 5,
    },
    cardTime: {
      fontSize: 14,
      color: '#777777',
    },
  });