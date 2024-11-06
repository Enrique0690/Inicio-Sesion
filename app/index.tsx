import React, { useState } from 'react'; 
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '@/hooks/useThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const Index: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'buttonColor'); 
  
  const handleLoginClick = async () => {
    setIsLoading(true);
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      const isConnectedToCompany = await AsyncStorage.getItem('isConnectedToCompany');
      if (isLoggedIn === 'true') {
        if (isConnectedToCompany === 'true') {
          router.push('/Dashboard');
        } else {
          router.push('/SelectCompany');
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error al verificar la sesión:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.innerContainer}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVgE0ohRneM2FndSPeHcl9huY1hZFqd_RxsA&s' }}
          style={styles.image}
        />
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: buttonColor }]} 
          onPress={() => handleLoginClick()}
        >
          <Text style={[styles.buttonText, { color: textColor }]}>{t("login")}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: buttonColor }]} 
          onPress={() => console.log('Codigo Unico')}
        >
          <Text style={[styles.buttonText, { color: textColor }]}>{t("uniqueCode")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/CreateAccount')}>
          <Text style={[styles.link, { color: buttonColor }]}>{t("createAccount")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default Index;