import React, {useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type ReportType = '' | 'Building safety inspections' | 'Violations of building regulations' | 'Requests for construction or renovation permits';

export default function Urban ({ setLevel }: { setLevel: (level: number) => void }) {
    const [selectedReport, setSelectedReport] = useState<ReportType>('');
    
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;

    const handleReportSelection = (value: string) => {
        setSelectedReport(value as ReportType);
        setLevel(1); // Active le niveau 1 de la TimeLine lorsque l'utilisateur fait un choix
    };

    return (
        <View>
            <RadioButton.Group
                onValueChange={handleReportSelection}
                value={selectedReport}>

                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Building safety inspections
                        </Text>
                        <RadioButton.Android value="Building safety inspections"
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text} />
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Violations of building{'\n'}regulationsn
                        </Text>
                        <RadioButton.Android value="Violations of building regulations" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Requests for construction{'\n'}
                                                                                                or renovation permits
                        </Text>
                        <RadioButton.Android value="Requests for construction or renovation permits" 
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