import React, {useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type ReportType = '' | 'Issues related to water and sanitation services' | 'Requests for information on the opening hours of municipal services' | 'Reporting outages in online municipal services';

export default function City({ setLevel }: { setLevel: (level: number) => void }) {
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
                    
                <View style={[styles.radioButtonContainer, { backgroundColor: currentColors.base }]}>
                    <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>
                        Issues related to water{'\n'}and sanitation services
                    </Text>
                    <RadioButton.Android
                        value="Issues related to water and sanitation services"
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}
                    />
                </View>
                <View style={[styles.radioButtonContainer, { backgroundColor: currentColors.base }]}>
                    <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>
                        Requests for information{'\n'}on the opening hours{'\n'}of municipal services
                    </Text>
                    <RadioButton.Android
                        value="Requests for information on the opening hours of municipal services"
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}
                    />
                </View>
                <View style={[styles.radioButtonContainer, { backgroundColor: currentColors.base }]}>
                    <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>
                        Reporting outages in{'\n'}online municipal services
                    </Text>
                    <RadioButton.Android
                        value="Reporting outages in online municipal services"
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}
                    />
                </View>
            </RadioButton.Group>
        </View>
    );
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