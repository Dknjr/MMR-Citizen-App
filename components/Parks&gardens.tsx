import React, {useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type ReportType = '' | 'Pruning of trees or hedges' | 'Watering of parks and public gardens' | 'Maintenance of green spaces';

export default function Parks () {
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
                    style={[styles.radioButtonText, { color: currentColors.text }]}>Pruning of trees or hedges
                    </Text>
                    <RadioButton.Android value="Pruning of trees or hedges" 
                    color={currentColors.tint}
                    uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                    <Text
                    style={[styles.radioButtonText, { color: currentColors.text }]}>Watering of parks and{'\n'}public gardens
                    </Text>
                    <RadioButton.Android value="Watering of parks and public gardens" 
                    color={currentColors.tint}
                    uncheckedColor={currentColors.text}/>
                </View>
                <View style={[styles.radioButtonContainer, {backgroundColor : currentColors.base}]}>
                    <Text
                    style={[styles.radioButtonText, { color: currentColors.text }]}>Maintenance of green spaces
                    </Text>
                    <RadioButton.Android value="Maintenance of green spaces" 
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