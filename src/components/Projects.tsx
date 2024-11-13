import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Sample data for the projects
export const projects = [
  { id: '1', name: 'Project Alpha', status: 'Ongoing', image: require('@/assets/images/project1.png') },
  { id: '2', name: 'Project Beta', status: 'Completed', image: require('@/assets/images/project2.png') },
  { id: '3', name: 'Project Gamma', status: 'Ongoing', image: require('@/assets/images/project3.png') },
  { id: '4', name: 'Project Delta', status: 'Completed', image: require('@/assets/images/project4.png') },
  { id: '5', name: 'Project Epsilon', status: 'Ongoing', image: require('@/assets/images/project5.png') },
  { id: '11', name: 'Project Alpha', status: 'Ongoing', image: require('@/assets/images/project1.png') },
  { id: '12', name: 'Project Beta', status: 'Completed', image: require('@/assets/images/project2.png') },
  { id: '13', name: 'Project Gamma', status: 'Ongoing', image: require('@/assets/images/project3.png') },
  { id: '14', name: 'Project Delta', status: 'Completed', image: require('@/assets/images/project4.png') },
  { id: '15', name: 'Project Epsilon', status: 'Ongoing', image: require('@/assets/images/project5.png') },
  // Add more projects as needed
];

const Projects = () => {
  const router = useRouter();
  const handleProjectPress = (project: { id: string; name: string; status: string; image: any }) => {
    router.push({
      pathname: '/(user)/(home)/[projectId]',
      params: { projectId: project.id }
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Projects you visited</Text>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {projects.map((project) => (
          <View key={project.id} style={styles.card}>
            <Image source={project.image} style={styles.projectImage} />
            
            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectStatus}>{project.status}</Text>
              
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
        ))}
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
    color: '#00A4F2',
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#00A4F2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Projects;
