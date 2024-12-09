import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from '@/src/components/Button';
import { resetPassword } from "./actions";
import { useRouter } from 'expo-router';

interface SetPasswordProps {
 email: string;
}
const schema = Yup.object().shape({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const SetPassword = ({ email }: SetPasswordProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const { error, message } = await resetPassword({ email: email, password: data.password });
      if (error) {
        setError(message);
      } else {
        router.push('/sign-in');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Password</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      {loading && <Text >Loading...</Text>}
      {
        !loading && !error &&
        <Button text="Submit" onPress={handleSubmit(onSubmit)} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, borderWidth: 1, borderRadius: 5, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderColor: "rgba(0, 0, 0, 0.1)", gap: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  error: { color: "red", fontSize: 12 },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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

export default SetPassword;
