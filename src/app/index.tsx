import { ActivityIndicator } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';
import WelcomeScreen from '../components/Welcome';

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <WelcomeScreen />;
  }else{
    return <Redirect href={'/(user)'} />
  }
};

export default index;