import React, { useState } from 'react';
import { TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import config from './ConfigIp';
import { useNavigation } from '@react-navigation/native';

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
    <>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 8,
          borderRadius: 5,
        }}
        placeholder="Nombre del curso"
        value={newCourseName}
        onChangeText={setNewCourseName}
      />

      <TextInput
        style={{
          height: 80,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 8,
          borderRadius: 5,
        }}
        placeholder="Descripción del curso"
        value={newCourseDescription}
        onChangeText={setNewCourseDescription}
        multiline
      />

      <Button
        title="Agregar Curso"
        onPress={addCourse}
      />
    </>
  );
};

export default AddCourse;
