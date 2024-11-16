import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native';
import { useLocalSearchParams, useNavigation, Stack, useRouter } from 'expo-router';
import { Checkbox, IconButton } from 'react-native-paper';
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
    const router = useRouter();
    const [isLocationCorrect, setIsLocationCorrect] = useState(false);
    const { scannedProjectId } = useLocalSearchParams();
    const [checkedIn, setCheckedIn] = useState(false);
    const [projectData, setProjectData] = useState<ProjectDetailsProps | null>(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            const { data } = await supabase.from('projects').select('*').eq('id', scannedProjectId).single();
            setProjectData(data);
        };
        fetchProjectData();
    }, [scannedProjectId]);



    const handleCheckIn = () => {
        setCheckedIn(true);
        router.push({
            pathname: '/(user)/(scan)/checkout',
            params: { checkoutId: scannedProjectId as string }
        });

    };

    const handleCheckOut = () => {
        setCheckedIn(false);
        router.push({
            pathname: '/(user)/(scan)/checkout',
            params: { checkoutId: scannedProjectId as string }
        });

    };
    const documents = [
        { id: '1', name: 'Sefety Briefing Checklist' },
        { id: '2', name: 'Site accessibility plan' },
        { id: '3', name: 'Emergency exit plan' },
    ];
    const renderDocumentItem = ({ item }: { item: { id: string; name: string; }; }) => (

        <View style={styles.documentItem}>
            <Text style={styles.documentText}>{item.name}</Text>
            {/* <Button title="View" onPress={() => handleViewDocument(item.id)} /> also change the status of the document or button */}
            <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>View</Text>
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
                    <Text style={styles.detailsLabel}>Project Name :</Text>
                    <Text style={styles.detailsValue}>{projectData?.name}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Address :</Text>
                    <Text style={styles.detailsValue}>{projectData?.address}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Supervisor :</Text>
                    <Text style={styles.detailsValue}>{projectData?.supervisor}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Site contact :</Text>
                    <Text style={styles.detailsValue}>{projectData?.site_contact}</Text>
                </View>
                <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Emergency contact :</Text>
                    <Text style={styles.detailsValue}>{projectData?.emergency_contact}</Text>
                </View>
            </View>
            <Text style={styles.sectionHeader}>Documents to go through</Text>
            <Text style={styles.detailsText}>
                Please ensure you have gone through the following documents prior to check-in. These documents are necessary for the check-in process.
            </Text>
            <FlatList
                data={documents}
                renderItem={renderDocumentItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={isLocationCorrect ? 'checked' : 'unchecked'}
                    onPress={() => setIsLocationCorrect(!isLocationCorrect)}
                    color='#17c6ed'
                />
                <Text>
                    Are you in the correct project location ?
                </Text>
            </View>
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
        fontSize: 18,
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
    detailsLabel: {
        fontWeight: '600',
        color: '#333333',
        fontSize: 16,
    },
    detailsValue: {
        color: '#666666',
        fontSize: 16,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
});

export default ScannedProject;