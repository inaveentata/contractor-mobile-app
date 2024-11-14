import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { router, Stack } from 'expo-router';
import { IconButton } from 'react-native-paper';

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("Emily Smith");
  const [email, setEmail] = useState("emily.smith@example.com");
  const [mobile, setMobile] = useState("+1 234 567 8901");
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };


  const toggleEditMode = () => {
    if (isEditMode) {
      // Save/update logic can be added here
      alert("Profile updated successfully!");
    }
    setIsEditMode(!isEditMode);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Profile',
          headerLeft: () => (
            <TouchableOpacity onPress={() => { /* navigate back */ }}>
              <IconButton icon="arrow-left" size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleEditMode}>
              <Text style={styles.editButtonText}>{isEditMode ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual image source if needed
        style={styles.profileImage}
      />
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, isEditMode ? styles.editableInput : styles.readOnlyInput]}
          value={name}
          onChangeText={setName}
          editable={isEditMode}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, isEditMode ? styles.editableInput : styles.readOnlyInput]}
          value={email}
          onChangeText={setEmail}
          editable={isEditMode}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={[styles.input, isEditMode ? styles.editableInput : styles.readOnlyInput]}
          value={mobile}
          onChangeText={setMobile}
          editable={isEditMode}
        />
      </View>
      <Button
        onPress={() => alert('Signed out!')}
        style={styles.signOutButton}
        text='Sign Out'
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
  },
  editableInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  readOnlyInput: {
    backgroundColor: '#f5f5f5',
  },
  signOutButton: {
    marginTop: 30,
    backgroundColor: '#00aced',
  },
  editButtonText: {
    fontSize: 16,
    color: '#00aced',
    marginRight: 15,
  },
});