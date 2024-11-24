import {
  View, Text, TextInput, StyleSheet, Alert, ScrollView,
  KeyboardAvoidingView,
  Image, TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import Button from '@/src/components/Button';
import { Colors } from '@/src/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';




const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();

  const router = useRouter();

  const handleOnPressSignUp = () => {
    router.push('/sign-up');
  };

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{
        flexGrow: 1,
      }}
      >
        <View style={styles.container}>
          <Stack.Screen options={{ title: 'RJ Bird Building' }} />
          <View style={styles.header}>
            <Image source={require("../../../assets/images/logo-text-icon.png")} style={styles.logo} />
          </View>
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
              source={require("../../../assets/images/login.png")}
            />
          </View>
          <Text style={styles.title}>Welcome Back!</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="jon@gmail.com"
              style={styles.input}
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
            onPress={signInWithEmail}
            disabled={loading}
            text={loading ? 'Signing in...' : 'Sign in'}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleOnPressSignUp}>
              <Text style={styles.textButton}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  logo: {
    width: 250,
    height: 80,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    gap: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
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

export default SignInScreen;