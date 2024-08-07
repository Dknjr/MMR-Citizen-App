import React, {useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type ReportType = '' | 'Sidewalk Repair' | 'Damaged or Missing Road Sign' | 'Potholes on the Road';

export default function PublicRoad () {
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
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Sidewalk Repair
                        </Text>
                        <RadioButton.Android value="Sidewalk Repair" 
                        />
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Damaged or Missing{'\n'}Road Sign
                        </Text>
                        <RadioButton.Android value="Damaged or Missing Road Sign" 
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                        <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>Potholes on the Road
                        </Text>
                        <RadioButton.Android value="Potholes on the Road" 
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