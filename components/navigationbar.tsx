// components/NavigationBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ColorsType } from '@/constants/Colors';

interface NavigationBarProps {
  currentColors: ColorsType['light'] | ColorsType['dark'];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ currentColors, selectedTab, setSelectedTab }) => {
  return (
    <View style={[styles.navContainer, { backgroundColor: currentColors.base }]}>
      {['All', 'Politics', 'Sports'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            selectedTab === tab && { backgroundColor: currentColors.text },
          ]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab
                ? { color: currentColors.background }
                : { color: currentColors.text },
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 40,
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
