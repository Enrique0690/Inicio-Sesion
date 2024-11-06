import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Keyboard } from "react-native";
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '@/hooks/useThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const buttonColor = useThemeColor({}, 'buttonColor');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      if (storedUsername && storedPassword &&
        username.trim().toLowerCase() === storedUsername.trim().toLowerCase() &&
        password.trim() === storedPassword.trim()) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        router.push('/SelectCompany');
      } else {
        setErrorMessage("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setErrorMessage("Hubo un error al intentar iniciar sesión.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.loginBox}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVgE0ohRneM2FndSPeHcl9huY1hZFqd_RxsA&s' }}
          style={styles.loginImage}
        />
        <TextInput
          placeholder="USUARIO"
          style={styles.inputField}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="CONTRASEÑA"
          secureTextEntry
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity style={[styles.loginButton, { backgroundColor: buttonColor }]} onPress={handleLogin}>
          <Text style={[styles.buttonText, { color: textColor }]}>{t("login")}</Text>
        </TouchableOpacity>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButtonGoogle}>
            <Text style={[styles.buttonText, { color: textColor }]}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButtonFacebook}>
            <Text style={[styles.buttonText, { color: textColor }]}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>{t("forgotPassword")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  loginBox: {
    width: "100%",
    maxWidth: 350,
    padding: 30,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    elevation: 8,
  },
  loginImage: {
    width: "80%",
    height: 150,
    marginBottom: 20,
    borderRadius: 12,
  },
  inputField: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  socialButtonGoogle: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#db4437",
    borderRadius: 12,
    alignItems: "center",
  },
  socialButtonFacebook: {
    width: "100%",
    padding: 12,
    backgroundColor: "#3b5998",
    borderRadius: 12,
    alignItems: "center",
  },
  forgotPasswordContainer: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#007bff",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
