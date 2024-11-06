import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useThemeColor } from '@/hooks/useThemeColor';
import ConfirmExitOnBack from "@/components/ConfirmExitOnBack";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textsecondaryColor = useThemeColor({}, 'textsecondary')
  const buttonColor = useThemeColor({}, 'buttonColor');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textsecondaryColor }]}>{t("welcome")}</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{t("new_order")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{t("view_tables")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={[styles.buttonText, { color: textColor }]}>{t("view_cashier")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={() => {
          AsyncStorage.setItem('isConnectedToCompany', 'false');
          AsyncStorage.setItem('isLoggedIn', 'false');
        }}>
        <Text style={[styles.buttonText, { color: textColor }]}>Cerrar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={() => {
          AsyncStorage.setItem('isConnectedToCompany', 'false');
        }}>
        <Text style={[styles.buttonText, { color: textColor }]}>Desconectar empresa</Text>
      </TouchableOpacity>
      <ConfirmExitOnBack/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    maxWidth: 300,
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dashboard;