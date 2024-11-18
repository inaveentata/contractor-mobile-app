import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import Button from '@/src/components/Button';


type Props = {};
type ProjectDetailsProps = {
    name: string;
    address: string;
    supervisor: string;
    site_contact: string;
    emergency_contact: string;
};

const checklistMockdata = [
    { id: '1', name: 'Confirmed completion of daily tasks', checked: false },
    { id: '2', name: 'Submitted all required documents', checked: false },
    { id: '3', name: 'Acknowledge that I have completed ...', checked: false },
];
const CheckoutScreenById = (props: Props) => {
    const router = useRouter();
    const { checkoutId, activityId } = useGlobalSearchParams();
    const [projectData, setProjectData] = useState<ProjectDetailsProps | null>(null);
    const [checklist, setChecklist] = useState(checklistMockdata);

    useEffect(() => {
        const fetchProjectData = async () => {
            const { data } = await supabase.from('projects').select('*').eq('id', checkoutId).single();
            setProjectData(data);
        };
        fetchProjectData();
    }, [checkoutId]);

    const handleConfirmCheckout = async() => {
        const {data, error} = await supabase.from('activity').update({
            check_out_time: new Date().toISOString(),
        }).eq('id', activityId).select();
        if(error){
            console.log(error);
        }
        if(data){
            router.push('/(user)/(home)');
        }
       
    };

    const updateChecklistItem = (id: string, checked: boolean) => {
        const updatedChecklist = checklist.map(item => {
            if (item.id === id) {
                return { ...item, checked };
            }
            return item;
        });
        setChecklist(updatedChecklist);
    };


    const renderChecklistItem = ({ item }: { item: { id: string; name: string; checked: boolean; }; }) => (

        <View style={styles.checkboxItem}>
            <Checkbox
                status={item.checked ? 'checked' : 'unchecked'}
                onPress={() => updateChecklistItem(item.id, !item.checked)}
                color='#17c6ed'
            />
            <Text>
                {item.name}
            </Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: 'Project Check Out',
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
            <Text style={styles.sectionHeader}>Checklist</Text>
            <View style={styles.checkboxContainer}>

                <FlatList
                    data={checklist}
                    renderItem={renderChecklistItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <Button text="Confirm check-out" onPress={handleConfirmCheckout} />
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
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
    },
    sectionHeader: {
        fontSize: 22,
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
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 'auto'
    },

    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    }
});

export default CheckoutScreenById;