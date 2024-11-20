// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import SignInSignUpButtons from './SignInSignUpButtons';

const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'RJ Bird Builders', headerShown: false }} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>RJ Bird Builders</Text>
                <Text style={styles.subtitle}>Welcome to RJ Bird Builders. Your trusted partner in construction.</Text>
            </View>
            <View style={styles.logoAboutContainer}>
                <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
                <View style={styles.aboutContainer}>
                    <Text style={styles.title2}>About Us</Text>
                    <Text style={styles.subtitle2}>RJ Bird Builders has been providing top-notch construction services for over 10 years. Our team of experienced professionals ...</Text>
                </View>
            </View>
            {/* push the sign-in and sign-up buttons to the bottom */}
            <SignInSignUpButtons />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 50,
    },
    textContainer: {

    },
    logo: {
        width: 256,
        height: 256,
        borderRadius: 50
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
    },
    logoAboutContainer: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    aboutContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle2: {
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center"
    },
});

export default WelcomeScreen;
