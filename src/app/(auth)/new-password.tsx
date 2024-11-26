import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';

const NewPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (!password) {
      Alert.alert('Please enter a new password.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Password updated successfully.');
      // Navigate back to login
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>
        Set New Password
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter new password"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
        placeholderTextColor="#7e8a8c"
      />
      <Button
        onPress={handleUpdatePassword}
        disabled={loading}
        text={loading ? 'Updating...' : 'Update Password'}
      />
    </View>
  );
};

export default NewPasswordScreen;
