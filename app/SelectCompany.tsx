import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Platform, Modal, Button } from "react-native";
import { useTranslation } from "react-i18next";
import { useThemeColor } from '@/hooks/useThemeColor'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import ConfirmExitOnBack from "@/components/ConfirmExitOnBack";
import ModalTrigger from "@/components/ModalTrigger";

interface Company {
  id: string;
  name: string;
  address: string;
  image: string;
}

const companies: Company[] = [
  {
    id: "1",
    name: "Ceviches de la Almagro",
    address: "Av de los Iaschalás 123, y pietro, Quito, Ecuador",
    image: "https://static-cse.canva.com/blob/951773/0750logotiposqueteinspiraran.jpg",
  },
  {
    id: "2",
    name: "Don Pepe",
    address: "Juan Pinto 203 y Calderon, Santo domingo, Ecuador",
    image: "https://starteq.net/wp-content/uploads/2019/11/mcdonalds-png-logo-picture-3-1024x1001.png",
  },
  {
    id: "3",
    name: "Mr empanada",
    address: "Salinas Pliego y Av 8va, Guayaquil, Ecuador",
    image: "https://cdn.worldvectorlogo.com/logos/mucho-mejor-si-es-echo-en-ecuador.svg",
  },
];

const SelectCompany: React.FC = () => {
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const itemBackgroundColor = useThemeColor({}, 'itemBackground'); 
  const textsecondaryColor = useThemeColor({}, 'textsecondary')
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleCompanyPress = (companyName: string) => {
    setSelectedCompany(companyName);
    setModalVisible(true);
  };

  const handleCancel = () => {
    AsyncStorage.setItem('isConnectedToCompany', 'false');
    setSelectedCompany(null); 
    router.push('/Dashboard');
  };

  // Función para manejar la acción de aceptar
  const handleConfirm = () => {
    AsyncStorage.setItem('isConnectedToCompany', 'true');
    router.push('/Dashboard');
  };

  const renderItem = ({ item }: { item: Company }) => (
    <TouchableOpacity onPress={() => handleCompanyPress(item.name)}>
      <View style={[styles.itemContainer]}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="stretch" />
        <View style={[styles.textContainer, { backgroundColor: itemBackgroundColor }]}>
          <Text style={[styles.name, { color: textColor }]}>{item.name}</Text>
          <Text style={[styles.address, { color: textColor }]}>{item.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textsecondaryColor }]}>{t("selectCompany")}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={companies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <ConfirmExitOnBack/>
      <ModalTrigger
          modalMessage={`¿Deseas conectar esta empresa a este dispositivo?`}
          modalDescription={
            <Text>
              {`Siempre que abras la app, ingresaras automáticamente a esta empresa\n`}
              <Text style={{ fontWeight: "bold" }}>{selectedCompany}</Text>
              {`\nHabilitar esta función si el dispositivo está asignado para usarse únicamente en esta empresa.`}
            </Text>
          }
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          visible={modalVisible}
          setVisible={setModalVisible}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    flex: 1,  
    width: '100%',
    ...(Platform.OS === 'web' && { alignItems: 'center' }),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#0f6c33",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default SelectCompany;
