import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useQuery } from '@tanstack/react-query';


export type ProjectProps = {
  address: string;
  created_at: string;
  customer_contact: string;
  customer_email: string;
  customer_name: string;
  emergency_contact: string;
  id: string;
  is_archive: boolean;
  name: string;
  qr_code_url: string;
  site_contact: string;
  supervisor: string;
};

const Projects = () => {
  const router = useRouter();
  const { profile } = useAuth();
  // const [projects, setProjects] = useState<ProjectProps[] | null>(null);

  const { data: projectsData, refetch } = useQuery({
    queryKey: ['projects', profile?.id, router],
    queryFn: async () => {
      if (profile?.id === null) return;
      const { data, error } = await supabase
        .from('activity')
        .select('projects!inner(*)').eq('profile_id', profile.id);

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      const uniqueProjects = Array.from(
        new Map(data.map((activity: any) => [activity.projects.id, activity.projects])).values()
      );
      //@ts-ignore
      return uniqueProjects;
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchProjects = async () => {
  //       if (profile?.id === null) return;
  //       const { data, error } = await supabase
  //         .from('activity')
  //         .select('projects!inner(*)').eq('profile_id', profile.id);

  //       if (error) {
  //         console.error('Error fetching projects:', error);
  //         return;
  //       }

  //       const uniqueProjects = Array.from(
  //         new Map(data.map((activity: any) => [activity.projects.id, activity.projects])).values()
  //       );
  //       //@ts-ignore
  //       setProjects(uniqueProjects);
  //     };

  //     fetchProjects();
  //   }, [profile?.id])
  // );

  const handleProjectPress = (project: ProjectProps) => {
    router.replace({
      pathname: '/(user)/(home)/[projectId]',
      params: { projectId: project.id }
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Projects you visited</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {projectsData && projectsData?.length > 0 ? projectsData?.map((project) => (
          <View key={project.id} style={styles.card}>
            <FontAwesome name="building-o" size={60} color="black" style={styles.projectImage} />

            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>{project?.name}</Text>
              <Text style={styles.projectStatus}>{project?.address}</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.markButton}>
                  <Text style={styles.markButtonText}>Mark as...</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.detailsButton} onPress={() => handleProjectPress(project)}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )) :
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No projects found, Start visiting projects</Text>
          </View>
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
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
    width: '100%',
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
  },
  projectStatus: {
    fontSize: 14,
    color: '#888888',
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  markButton: {
    marginRight: 10,
  },
  markButtonText: {
    color: '#17C6ED',
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#17C6ED',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
  },
});

export default Projects;
