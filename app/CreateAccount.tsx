import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '@/hooks/useThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccount: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'background');
  const textSecondaryColor = useThemeColor({}, 'textsecondary');
  const buttonColor = useThemeColor({}, 'buttonColor');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = async () => {
    if (!username || !password) return setErrorMessage(t('fieldsRequired'));
  
    try {
      await AsyncStorage.setItem('username', username.trim());
      await AsyncStorage.setItem('password', password.trim());
      router.push('/login');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      setErrorMessage('Hubo un error al guardar la cuenta');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: textSecondaryColor }]}>{t('createAccount')}</Text>
        
        <TextInput
          style={styles.input}
          placeholder={t('username')}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder={t('password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={handleCreateAccount}>
          <Text style={styles.buttonText}>{t('signUp')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default CreateAccount;