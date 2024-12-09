import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from '@/src/components/Button';
import { Colors } from '@/src/constants/Colors';
import { registerUser } from "./actions";


interface Step1Props {
  setUserData: React.Dispatch<React.SetStateAction<{
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }>>;
  onNext: () => void;
}

const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

const Step1 = ({ onNext, setUserData }: Step1Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data:any) => {
    setUserData(data);
    setLoading(true);
    setError(null);
    try{
      const { error, message } = await registerUser({ email: data.email });
      if (error) {
        setError(message);
        console.error("Error registering user:", error);
      }
      if(!error){
        setError(null);
        onNext();
        setLoading(false);
      }
    }catch(error){
      setError((error as Error).message);
      console.error("Error registering user:", error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Details</Text>
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>First Name</Text>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.firstName && <Text style={styles.error}>{errors.firstName.message}</Text>}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Last Name</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.lastName && <Text style={styles.error}>{errors.lastName.message}</Text>}
        </View>
      </View>
      <View>
        <Text style={styles.label}>Mobile Number</Text>
        <Controller
          control={control}
          name="mobileNumber"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.mobileNumber && <Text style={styles.error}>{errors.mobileNumber.message}</Text>}
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      {loading && <Text>Loading...</Text>}
      {
        !loading && <Button style={styles.textButton} text="Next" onPress={handleSubmit(onSubmit)} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20,  borderWidth: 1, borderRadius: 5, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderColor: "rgba(0, 0, 0, 0.1)", gap: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  inputWrapper: { flex: 1 },
  error: { color: "red", fontSize: 12 },
  textButton: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
  },

  label: {
    fontWeight: "500",
    fontSize: 16,
    color: "#193238"
  },
  input: {
    borderWidth: 0,
    padding: 16,
    backgroundColor: '#EBEDED',
    borderRadius: 8,
    color: "#7e8a8c"

  },
});

export default Step1;
