import React, {FC, useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type OptionType = '' | 'Problèmes de stationnement illégal' | "Demandes d'installation de nouveaux parcs de stationnement" | "Réparation ou entretien des transports en commun";

interface TrafficProps{
    setLevel: (level: number) => void;
    setOption: (option: OptionType) => void;
}

const Traffic:FC<TrafficProps> = ({ setLevel, setOption }) => {
    const [selectedOption, setSelectedOption] = useState<OptionType>('');
    
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;

    const handleOptionSelection = (value: string) => {
        console.log("Option sélectionnée : ", value);
        setSelectedOption(value as OptionType);
        setOption(value as OptionType)
        setLevel(1); // Active le niveau 1 de la TimeLine lorsque l'utilisateur fait un choix
    };  

    return (
        <View>
            <RadioButton.Group
                onValueChange={handleOptionSelection}
                value={selectedOption}>

                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Problèmes de stationnement{'\n'}illégal
                        </Text>
                        <RadioButton.Android value="Problèmes de stationnement illégal" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Demandes d'installation{'\n'}de nouveaux parcs de{'\n'}stationnement
                        </Text>
                        <RadioButton.Android value="Demandes d'installation de nouveaux parcs de stationnement" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Réparation ou entretien{'\n'}des transports en commun
                        </Text>
                        <RadioButton.Android value="Réparation ou entretien des transports en commun" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
            </RadioButton.Group>
        </View>
    )    
}

export default Traffic

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
      },
    scrollstyle: {
        height: 230,
    },
    radioButtonContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 10,
    },
});