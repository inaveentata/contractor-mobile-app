import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';

type Props = {};

const ScannedProject = (props: Props) => {
    const navigation = useNavigation();
    const { scannedProjectId } = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            </View>
            <Text>ScannedProject: {scannedProjectId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
      },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    backButtonText: {
        color: '#00A4F2',
        fontSize: 16,
    },

});

export default ScannedProject;