import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface Step2Props {
    onNext: () => void; onResendCode: () => void; get6DigitCode: (code: any) => void;
}

const Step2 = ({ onNext, onResendCode, get6DigitCode }: Step2Props) => {
  const [code, setCode] = useState(new Array(6).fill(""));

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6 || isNaN(fullCode)) {
      alert("Please enter a valid 6-digit code");
    } else {
      get6DigitCode(fullCode);
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter Verification Code</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
      <Button title="Verify Code" onPress={handleSubmit} />
      <Button title="Resend Code" onPress={onResendCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  codeContainer: { flexDirection: "row", marginVertical: 10 },
  codeInput: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: 40,
    textAlign: "center",
    borderRadius: 5,
  },
});

export default Step2;
