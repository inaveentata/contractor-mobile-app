import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { router, Stack, useNavigation } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { useAuth } from '@/src/providers/AuthProvider';

export default function ProfilePage() {
  const {profile} = useAuth();
  const navigation = useNavigation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [mobile, setMobile] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setMobile(profile.mobile_number);
    }
  }, [profile]);
  
  const handleGoBack = () => {
      navigation.goBack();
  }
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  //generate a two letter word from the user's name
  const generateInitials = (name: string) => {
    const words = name.split(' ');
    let initials = '';
    for (let i = 0; i < words.length; i++) {
      initials += words[i].charAt(0);
    }
    return initials;
  };


  const toggleEditMode = async() => {
    if (isEditMode) {
      // Save/update logic can be added here
      const { error } = await supabase.from('profiles').update({
        name,
        email,
        mobile_number: mobile
      }).eq('id', profile?.id);
      alert("Profile updated successfully!");
    }
    setIsEditMode(!isEditMode);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Profile',
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack}>
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
      <View style={styles.initialsContainer}>
        <Text style={styles.initials}>{generateInitials(name ?? '')}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, isEditMode ? styles.editableInput : styles.readOnlyInput]}
          value={name ?? ''}
          onChangeText={setName}
          editable={isEditMode}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, isEditMode ? styles.editableInput : styles.readOnlyInput]}
          value={email ?? ''}
          onChangeText={setEmail}
          editable={isEditMode}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={[styles.input, isEditMode ? styles.editableInput : styles.readOnlyInput]}
          value={mobile ?? ''}
          onChangeText={setMobile}
          editable={isEditMode}
        />
      </View>
      <Button
        onPress={handleSignOut}
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
    color: '#193238',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    color: '##687076',
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
    backgroundColor: '#17C6ED',
  },
  editButtonText: {
    fontSize: 16,
    color: '#17C6ED',
    marginRight: 15,
  },
  initialsContainer: {  
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20, 
    marginTop: 20,
    alignSelf: 'center'
  },
  initials: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});