import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

type Props = {};

const _layout = (props: Props) => {
    return (
        <Stack screenOptions={{ headerShown: false }} />
  );
};

export default _layout;