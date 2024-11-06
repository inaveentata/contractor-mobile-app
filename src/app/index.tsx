import { ActivityIndicator } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }else{
    return <Redirect href={'/(user)'} />
  }
};

export default index;