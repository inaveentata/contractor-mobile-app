import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native';
import { useLocalSearchParams, useNavigation, Stack } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { supabase } from '@/src/lib/supabase';


type Props = {};
type ProjectDetailsProps = {
    name: string;
    address: string;
    supervisor: string;
    site_contact: string;
    emergency_contact: string;
};

const ScannedProject = (props: Props) => {
    const navigation = useNavigation();
    const { scannedProjectId } = useLocalSearchParams();
    const [checkedIn, setCheckedIn] = useState(false);
    const [projectData, setProjectData] = useState<ProjectDetailsProps | null>(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            const { data } = await supabase.from('projects').select('*').eq('id', scannedProjectId).single();
            console.log(data);
            setProjectData(data);
        };  
        fetchProjectData();
    }, [scannedProjectId]);



    const handleCheckIn = () => {
        setCheckedIn(true);
        // Log check-in activity in database or perform other actions here
    };

    const handleCheckOut = () => {
        setCheckedIn(false);
        // Log check-out activity in database or perform other actions here
    };
    const documents = [
        { id: '1', name: 'ID Proof' },
        { id: '2', name: 'Project Assignment Letter' },
        { id: '3', name: 'Additional Documents' },
    ];
    const renderDocumentItem = ({ item }: { item: { id: string; name: string; }; }) => (
        <View style={styles.documentItem}>
            <Text style={styles.documentText}>{item.name}</Text>
            <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Current Project Details'
                }}
            />
            <Text style={styles.title}>Welcome to Project {projectData?.name}</Text>


            <Text style={styles.subtitle}>
                This project involves the development of a new building with 3 stories...
            </Text>
            <Text style={styles.sectionHeader}>Project Details</Text>

            <View style={styles.detailsContainer}>
                <View style={styles.detailsRow}>
                    <Text>Project Name :</Text>
                    <Text>{projectData?.name}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text>Address :</Text>
                    <Text>{projectData?.address}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text>Supervisor :</Text>
                    <Text>{projectData?.supervisor}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text>Site contact :</Text>
                    <Text>{projectData?.site_contact}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text>Emergency contact :</Text>
                    <Text>{projectData?.emergency_contact}</Text>
                </View>
            </View>
            <Text style={styles.sectionHeader}>Required Documents</Text>
            <Text style={styles.detailsText}>
                Please ensure you have the following documents ready: ID proof, project assignment letter, and any other relevant documents. These documents are necessary for the check-in process.
            </Text>
            <FlatList
                data={documents}
                renderItem={renderDocumentItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.checkInButton, checkedIn && styles.disabledButton]}
                    onPress={handleCheckIn}
                    disabled={checkedIn}
                >
                    <Text style={styles.buttonText}>Check-in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.checkOutButton, !checkedIn && styles.disabledButton]}
                    onPress={handleCheckOut}
                    disabled={!checkedIn}
                >
                    <Text style={styles.buttonText}>Check-out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        marginVertical: 10,
    },
    detailsContainer: {
        marginVertical: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        width: '100%',
    },
    checkInButton: {
        backgroundColor: '#687076',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
        flex: 1,
    },
    checkOutButton: {
        backgroundColor: '#17C6ED',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
        flex: 1,
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginTop: 20,
    },
    detailsText: {
        fontSize: 14,
        color: '#666666',
        marginVertical: 10,
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        marginVertical: 5,
    },
    documentText: {
        fontSize: 14,
    },
    confirmButton: {
        backgroundColor: '#D3D3D3',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#666666',
        fontWeight: '600',
    },
});

export default ScannedProject;