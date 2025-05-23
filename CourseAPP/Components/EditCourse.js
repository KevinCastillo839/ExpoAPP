import React, { useState, useEffect } from 'react';
import { TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import config from './ConfigIp';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditCourse = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId } = route.params;  // Recibir el courseId desde navigation params

  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');

  // Obtener los datos actuales del curso
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(${config.apiUrl}/courses/${courseId});
        const course = response.data;
        setNewCourseName(course.courseName || '');
        setNewCourseDescription(course.description || '');
      } catch (error) {
        console.error('Error al cargar el curso:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const editCourse = async () => {
    if (!newCourseName || !newCourseDescription) {
      Alert.alert('Error', 'Por favor, ingrese el nombre y la descripción del curso.');
      return;
    }

    const updatedCourse = {
      courseName: newCourseName,
      description: newCourseDescription
    };

    try {
      await axios.put(${config.apiUrl}/courses/${courseId}, updatedCourse);
      console.log('Curso actualizado exitosamente');
      navigation.goBack();  // Volver atrás después de editar
    } catch (error) {
      console.error('Error al actualizar el curso:', error);
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
        title="Actualizar Curso"
        onPress={editCourse}
      />
    </>
  );
};

export default EditCourse;