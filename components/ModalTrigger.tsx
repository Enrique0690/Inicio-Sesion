import React from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

interface ModalTriggerProps {
  modalMessage: string;
  modalDescription: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalTrigger: React.FC<ModalTriggerProps> = ({
  modalMessage,
  modalDescription,
  onConfirm,
  onCancel,
  visible,
  setVisible,
}) => {
  const closeModal = () => {
    setVisible(false); 
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          
          <Text style={styles.modalTitle}>{modalMessage}</Text>
          <View style={styles.modalDescription}>
            <Text style={styles.descriptionText}>{modalDescription}</Text>
          </View>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    position: "relative",  
    paddingTop: 40,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,  
    padding: 10,  
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    marginBottom: 20,  
    marginHorizontal: 10, 
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    color: "#007bff",
  },
});

export default ModalTrigger;
