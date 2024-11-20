import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type Props = {};

const AccountConfirmation = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>AccountConfirmation</Text>
            <Text style={styles.text}>A confirmation email has been sent to your email address. Please follow the instructions in the email to verify your account.</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    }

});

export default AccountConfirmation;