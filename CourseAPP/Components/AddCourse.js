import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import config from './ConfigIp';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/AddCourseStyles';

const AddCourse = () => {
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const navigation = useNavigation();

  const addCourse = async () => {
    if (!newCourseName || !newCourseDescription) {
      Alert.alert('Error', 'Por favor, ingrese el nombre y la descripción del curso.');
      return;
    }

    const newCourse = {
      courseName: newCourseName,
      description: newCourseDescription
    };

    try {
      await axios.post(`${config.apiUrl}/courses`, newCourse);
      console.log('Curso agregado exitosamente.');
      navigation.goBack(); // 👈 Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al agregar el curso:', error);
    }
  };

   return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del curso"
        value={newCourseName}
        onChangeText={setNewCourseName}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción del curso"
        value={newCourseDescription}
        onChangeText={setNewCourseDescription}
        multiline
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={addCourse}>
        <Text style={styles.buttonText}>Agregar Curso</Text>
      </TouchableOpacity>
    </View>
  );
};


export default AddCourse;
