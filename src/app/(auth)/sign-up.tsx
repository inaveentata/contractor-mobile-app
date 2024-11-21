import { View, Text, TextInput, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { Colors } from '../../constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '@/src/lib/supabase';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOnPressSignIn = () => {
    router.push('/sign-in');
  };

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
      }}
      >
        <View style={styles.container}>
          <Stack.Screen options={{ title: 'RJ Bird Builders', headerShown: true, headerBackVisible: false }} />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/images/register.png")}
            />
          </View>
          <Text style={styles.title}>Create Account</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="jon@gmail.com"
              style={styles.input}
              keyboardType="email-address"
              placeholderTextColor={"#7e8a8c"}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              style={styles.input}
              secureTextEntry
              placeholderTextColor={"#7e8a8c"}
            />
          </View>
          <Button
            onPress={signUpWithEmail}
            disabled={loading}
            text={loading ? 'Creating account...' : 'Create account'}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Already have an account?</Text>
            <TouchableOpacity onPress={handleOnPressSignIn} >
              <Text style={styles.textButton}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    color: "#193238"
  },
  input: {
    borderWidth: 0,
    padding: 16,
    backgroundColor: '#EBEDED',
    borderRadius: 8,
    color: "#7e8a8c"

  },
  textButton: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
});

export default SignUpScreen;