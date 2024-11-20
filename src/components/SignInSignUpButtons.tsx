import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const SignInSignUpButtons = () => {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState('signIn'); // Default: Sign-In button is active

  const handleSignIn = () => {
    setSelectedButton('signIn');
    router.push('/sign-in');
  }
  const handleSignUp = () => {
    setSelectedButton('signUp');
    router.push('/sign-up');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === 'signIn' && styles.activeButton, // Apply active button style
        ]}
        onPress={handleSignIn}
      >
        <Text style={[styles.buttonText, selectedButton === 'signIn' && styles.activeButtonText]}>
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === 'signUp' && styles.activeButton,
        ]}
        onPress={handleSignUp}
      >
        <Text style={[styles.buttonText, selectedButton === 'signUp' && styles.activeButtonText]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#17C6ED',
  },
  activeButton: {
    backgroundColor: '#17C6ED', // Active button background color
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#193238', // Default text color for inactive buttons
    
  },
  activeButtonText: {
    color: 'white', // Active button text color
  },
});

export default SignInSignUpButtons;
