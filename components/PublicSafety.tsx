import React, {FC, useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type OptionType = '' | 'Signalement de graffitis ou de vandalismes' | 'Problèmes de sécurité dans les espaces publics' | 'Demandes de présence policière accrue dans certaines zones';

interface PublicProps {
    setLevel: (level: number) => void;
    setOption: (option: string) => void;
}

const Public:FC<PublicProps> = ({ setLevel, setOption }) => {
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
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Signalement de graffitis ou de vandalismes
                        </Text>
                        <RadioButton.Android value="Signalement de graffitis ou de vandalismes" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Problèmes de sécurité dans{'\n'}les espaces publics
                        </Text>
                        <RadioButton.Android value="Problèmes de sécurité dans les espaces publics" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Demandes de présence{'\n'}policière accrue dans{'\n'}certaines zones
                        </Text>
                        <RadioButton.Android value="Demandes de présence policière accrue dans certaines zones" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                
            </RadioButton.Group>
        </View>
    )    
}
export default Public

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
        borderRadius: 25,
        marginVertical: 5,
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 10,
    },
});