// screens/ProjectDetailsScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProjectDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Get project data from route params
  const { project } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Project Details</Text>

      <View style={styles.projectCard}>
        <Image source={project.image} style={styles.projectImage} />
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectStatus}>Status: {project.status}</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address</Text>
          <Text style={styles.detailText}>123 Example St, City, State, ZIP</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Owner</Text>
          <Text style={styles.detailText}>John Smith</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Contact</Text>
          <Text style={styles.detailText}>john.smith@example.com</Text>
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