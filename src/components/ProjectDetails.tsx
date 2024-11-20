import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ProjectProps } from './Projects';

const ProjectDetails = () => {
  const navigation = useNavigation();
  const { projectId } = useLocalSearchParams();
  const [project, setProject] = useState<ProjectProps | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        if (error) {
          setError(error);
        } else {
          setProject(data);
        }
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchProject();
  }, [projectId]);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!project) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {
        !project ? (
          <Text>Project not found</Text>
        ) :
          <View style={styles.container}>
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: 'Project Details',
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconButton icon="arrow-left" size={24} />
                  </TouchableOpacity>
                ),
                // headerRight: () => (
                //   <TouchableOpacity onPress={() => { /* add navigation for help */ }}>
                //     <IconButton icon="help-circle-outline" size={24} />
                //   </TouchableOpacity>
                // ),
              }}
            />

            <View style={styles.projectCard}>
              <FontAwesome name="building-o" size={60} color="black" style={styles.projectImage} />
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{project.name}</Text>
                {/* <Text style={styles.projectStatus}>Status: {project.status}</Text> */}
              </View>
            </View>

            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailText}>{project?.address}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Owner</Text>
                <Text style={styles.detailText}>{project?.customer_name}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Contact</Text>
                <Text style={styles.detailText}>{project?.site_contact}</Text>
              </View>
            </View>

            <View style={styles.statusSection}>
              <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Current Status</Text>
                <Text style={styles.statusValue}>In Progress</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.backToProjectsButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backToProjectsButtonText}>Back to Projects</Text>
            </TouchableOpacity>
          </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  projectImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
  },
  projectStatus: {
    fontSize: 14,
    color: '#888888',
    marginTop: 5,
  },
  detailsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  detailLabel: {
    fontSize: 14,
    color: '#888888',
  },
  detailText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 14,
    color: '#00A4F2',
  },
  backToProjectsButton: {
    backgroundColor: '#00A4F2',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  backToProjectsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ProjectDetails;
