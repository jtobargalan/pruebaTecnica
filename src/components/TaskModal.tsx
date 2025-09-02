import React, { useState } from "react";
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addTask } from "../store/slices/tasksSlice";
import { AppDispatch } from "../store/store";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function TaskModal({ visible, onClose }: TaskModalProps) {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    if (!text.trim()) {
      Alert.alert("Error", "El campo no puede estar vacío");
      return;
    }
    dispatch(addTask(text));
    setText("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Nueva tarea"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  cancelButton: {
    backgroundColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
