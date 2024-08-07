// components/SearchBar.tsx
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icons from '@expo/vector-icons/Ionicons';
import { ColorsType } from '@/constants/Colors'; // Assurez-vous du bon chemin pour l'importation

interface SearchBarProps {
  currentColors: ColorsType['light'] | ColorsType['dark'];
}

const SearchBar: React.FC<SearchBarProps> = ({ currentColors }) => {
  return (
    <View style={[styles.searchContainer, { backgroundColor: currentColors.base }]}>
      <TextInput
        style={[styles.searchInput, { color: currentColors.text }]}
        placeholder="Rechercher..."
        placeholderTextColor={currentColors.icon}
      />
      <Icons name="search" size={20} color={currentColors.icon} style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        marginTop: 20,
        width: '100%',
    },
    searchIcon: {
        marginLeft: 10,
    },
    searchInput: {
        flex: 1,
        height: 25,
    }
});

export default SearchBar;
