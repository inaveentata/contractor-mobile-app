import React from 'react';
import { Stack } from 'expo-router';

type Props = {};

const _layout = (props: Props) => {
  return (
    <Stack screenOptions={{ headerShown: false, headerBackVisible: false }} />
  );
};

export default _layout;