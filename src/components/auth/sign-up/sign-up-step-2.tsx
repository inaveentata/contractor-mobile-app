import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Colors } from "@/src/constants/Colors";

interface Step2Props {
  onNext: () => void; onResendCode: () => void; get6DigitCode: (code: any) => void;
}

const Step2 = ({ onNext, onResendCode, get6DigitCode }: Step2Props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <View style={styles.codeContainer}>
        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.oTPInputContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.btn,
            styles.verifyBtn
          ]}
          onPress={get6DigitCode}
        >
          <Text style={[styles.verifyBtnText]}>
            Verify
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.btn,
            styles.resendBtn
          ]}
          onPress={onResendCode}
        >
          <Text style={[styles.resendBtnText]}>
            Resend
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center", borderWidth: 1, borderRadius: 5, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderColor: "rgba(0, 0, 0, 0.1)" },
  codeContainer: { flexDirection: "row", marginVertical: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  codeInput: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: 40,
    textAlign: "center",
    borderRadius: 5,
  },
  oTPInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pinCodeContainer: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: 60,
    height: 60,
    textAlign: "center",
    borderRadius: 5,
  },
  pinCodeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  focusStick: {
    backgroundColor: Colors.light.tint,
    height: '100%',
  },
  activePinCodeContainer: {
    backgroundColor: "transparent",
    borderColor: Colors.light.tint,
  },

  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.tint,
   
  },
  verifyBtn: {
    backgroundColor: Colors.light.tint,
  },
  verifyBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  resendBtn: {
    backgroundColor: "transparent",
    borderColor: Colors.light.tint,
    borderWidth: 1,

  },
  resendBtnText: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: 'bold',
  }



});

export default Step2;
