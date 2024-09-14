import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ColorsType } from '@/constants/Colors';

interface NavigationBarProps {
  currentColors: ColorsType['light'] | ColorsType['dark'];
  selectedCategory: string;
  setSelectedCategory: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentColors, selectedCategory, setSelectedCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.navContainer}
      >
        {[
          'Éclairage public',
          'Voirie',
          'Environnement',
          'Espaces verts',
          'Transports et stationnement',
          'Logement et urbanisme',
          'Services municipaux',
          'Sécurité publique',
          'Services sociaux'
        ].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedCategory === tab && { backgroundColor: currentColors.text },
            ]}
            onPress={() => setSelectedCategory(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedCategory === tab
                  ? { color: currentColors.background }
                  : { color: currentColors.text },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NavigationBar;
