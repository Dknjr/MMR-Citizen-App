import React, {useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type OptionType = '' | "Taille d'arbres ou de haies" | 'Arrosage des parcs et des jardins publics' | 'Entretien des espaces verts';

export default function Parks ({ setLevel }: { setLevel: (level: number) => void }) {
    const [selectedOption, setSelectedOption] = useState<OptionType>('');
    
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;

    const handleOptionSelection = (value: string) => {
        setSelectedOption(value as OptionType);
        setLevel(1); // Active le niveau 1 de la TimeLine lorsque l'utilisateur fait un choix
    };

    return (
        <View>
            <RadioButton.Group
                onValueChange={handleOptionSelection}
                value={selectedOption}>

                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                    <Text
                    style={[styles.radioButtonText, { color: currentColors.text }]}>Taille d'arbres ou de haies
                    </Text>
                    <RadioButton.Android value="Taille d'arbres ou de haies" 
                    color={currentColors.tint}
                    uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                    <Text
                    style={[styles.radioButtonText, { color: currentColors.text }]}>Arrosage des parcs{'\n'}et des jardins publics
                    </Text>
                    <RadioButton.Android value="Arrosage des parcs et des jardins publics" 
                    color={currentColors.tint}
                    uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                    <Text
                    style={[styles.radioButtonText, { color: currentColors.text }]}>Entretien des espaces verts
                    </Text>
                    <RadioButton.Android value="Entretien des espaces verts" 
                    color={currentColors.tint}
                    uncheckedColor={currentColors.text}/>
                </View>
            </RadioButton.Group>
        </View>
    )    
}

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