import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import Step1 from './sign-up-step-1';
import Step2 from './sign-up-step-2';
import Step3 from './sign-up-step-3';
import { Stack, useRouter } from 'expo-router';




export default function SignUpForm() {
    const [steps, setSteps] = useState(2);
    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
    });


    //methods for step2


    const handleResendCode = () => {
        console.log('Resend code');
    };

    const get6DigitCode = (code) => {
    };

    const handleNext = () => {
        setSteps(prevStep => prevStep + 1);
    };


    //methods for step3
    const handleSubmit = () => {

    };

    const pages = [
        <Step1 key={0} onNext={handleNext} setUserData={setUserData} />,
        <Step2 key={1} onNext={handleNext} onResendCode={handleResendCode} get6DigitCode={get6DigitCode} />,
        <Step3 key={2} onSubmit={handleSubmit} />];


    const currentPage = pages[steps];

    return (
        <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
            }}
            >
                <View style={styles.container}>
                    <Stack.Screen options={{ title: 'RJ Bird Building', headerShown: false, headerBackVisible: true }} />
                    <View style={styles.header}>
                        <Image source={require("../../../../assets/images/logo-text-icon.png")} style={styles.logo} />
                        <Text style={styles.welcomeTitle}>Welcome to RJ Bird Building!</Text>
                    </View>
                    {currentPage}
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    );

}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex: 1,
        paddingBottom: 80,
        flexDirection: 'column',
    },
    logo: {
        width: 250,
        height: 80,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        gap: 6,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});