import React, {FC, useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type OptionType = '' | "Demandes d'assistance sociale ou de logement d'urgence" | 'Signalement de situations de détresse ou de maltraitance' | "Demandes d'informations sur les services sociaux disponibles";

interface SocialServicesProps {
    setLevel: (level: number) => void;
    setOption: (option: OptionType) => void;
}

const Social:FC<SocialServicesProps> = ({ setLevel, setOption}) => {
    const [selectedOption, setSelectedOption] = useState<OptionType>('');
    
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;

    const handleOptionSelection = (value: string) => {
        console.log("Option sélectionnée : ", value);
        setSelectedOption(value as OptionType);
        setOption(value as OptionType);
        setLevel(1); // Active le niveau 1 de la TimeLine lorsque l'utilisateur fait un choix
    };

    return (
        <View>
            <RadioButton.Group
                onValueChange={handleOptionSelection}
                value={selectedOption}>

                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Demandes d'assistance sociale{'\n'}ou de logement d'urgence
                        </Text>
                        <RadioButton.Android value="Demandes d'assistance sociale ou de logement d'urgence" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Signalement de situations{'\n'}de détresse ou de maltraitance
                        </Text>
                        <RadioButton.Android value="Signalement de situations de détresse ou de maltraitance" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Demandes d'informations sur{'\n'}les services sociaux disponibles
                        </Text>
                        <RadioButton.Android value="Demandes d'informations sur les services sociaux disponibles" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
            </RadioButton.Group>
        </View>
    )    
}
export default Social

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