import React, {useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type ReportType = '' | 'Reporting graffiti or vandalism' | 'Safety issues in public spaces' | 'Requests for increased police presence in certain areas';

export default function Public () {
    const [selectedReport, setSelectedReport] = useState<ReportType>('');

    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const currentColors = isDarkMode ? Colors.dark : Colors.light;


    return (
        <View>
            <RadioButton.Group
                onValueChange={(value: string) => setSelectedReport(value as ReportType)}
                value={selectedReport}>

                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Reporting graffiti or vandalism
                        </Text>
                        <RadioButton.Android value="Reporting graffiti or vandalism" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Safety issues in public spaces
                        </Text>
                        <RadioButton.Android value="Safety issues in public spaces" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Requests for increased{'\n'}police presence in certain{'\n'}areas
                        </Text>
                        <RadioButton.Android value="Requests for increased police presence in certain areas" 
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
        borderRadius: 25,
        marginVertical: 5,
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 10,
    },
});