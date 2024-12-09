import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from '@/src/components/Button';
import { Colors } from '@/src/constants/Colors';
import { forgotPassword } from "./actions";


interface ResetEmailProps {
  onNext: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

const schema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

const ResetEmail = ({ onNext, setEmail }: ResetEmailProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data:any) => {
    setEmail(data.email);
    setLoading(true);
    setError(null);
    try{
      const { error, message } = await forgotPassword({ email: data.email });
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
      <View style={styles.inputGroup}>
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
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

export default ResetEmail;
