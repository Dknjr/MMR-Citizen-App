import React, {useState} from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RadioButton } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';


type ReportType = '' | "Problèmes liés aux services d'eau et d'assainissement" | "Demandes de renseignements sur les horaires d'ouverture des services municipaux" | 'Signalement de pannes dans les services municipaux en ligne';

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
                        Problèmes liés aux services{'\n'}d'eau et d'assainissement
                    </Text>
                    <RadioButton.Android
                        value="Problèmes liés aux services d'eau et d'assainissement"
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}
                    />
                </View>
                <View style={[styles.radioButtonContainer, { backgroundColor: currentColors.base }]}>
                    <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>
                        Demandes de renseignements{'\n'}surles horaires d'ouverture{'\n'}des services municipaux
                    </Text>
                    <RadioButton.Android
                        value="Demandes de renseignements sur les horaires d'ouverture des services municipaux"
                        color={currentColors.tint}
                        uncheckedColor={currentColors.text}
                    />
                </View>
                <View style={[styles.radioButtonContainer, { backgroundColor: currentColors.base }]}>
                    <Text
                        style={[styles.radioButtonText, { color: currentColors.text }]}>
                        Signalement de pannes{'\n'}dans lesservices{'\n'}municipaux en ligne
                    </Text>
                    <RadioButton.Android
                        value="Signalement de pannes dans les services municipaux en ligne"
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