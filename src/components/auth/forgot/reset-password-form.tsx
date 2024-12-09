import { View, Text , Image, KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native'
import { Stack } from 'expo-router';
import React, { useState } from 'react'
import ResetEmail from './reset-email';
import VerifyPassword from './verify-password';
import SetPassword from './set-password';

const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [steps, setSteps] = useState(0);

const handleNext = () => {
    setSteps(prevStep => prevStep + 1);
}
    const pages = [
      <ResetEmail onNext={handleNext} setEmail={setEmail} />,
      <VerifyPassword onNext={handleNext} email={email} />,
      <SetPassword email={email} />
    ]

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
                {/* <Text style={styles.welcomeTitle}>Reset</Text> */}
            </View>
            {currentPage}
        </View>
    </ScrollView>
</KeyboardAvoidingView >
  )
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
})

export default ResetPasswordForm