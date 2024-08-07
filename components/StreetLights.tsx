import React, {useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type ReportType = '' | 'Defective streetlights' | 'Poorly lit areas needing new streetlights' | 'Issues with excessive or insufficient lighting intensity';

export default function StreetLights () {
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
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Defective streetlights
                        </Text>
                        <RadioButton.Android value="Defective streetlights" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Poorly lit areas{'\n'}needing new streetlights
                        </Text>
                        <RadioButton.Android value="Poorly lit areas needing new streetlights" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Issues with excessive or{'\n'}insufficient lighting intensity
                        </Text>
                        <RadioButton.Android value='Issues with excessive or insufficient lighting intensity' 
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