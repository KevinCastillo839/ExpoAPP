import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import config from './ConfigIp';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/courses`);
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`${config.apiUrl}/courses/${courseId}`);
      setCourses(courses.filter(course => course.id !== courseId));
      console.log(`Curso con ID ${courseId} eliminado.`);
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchCourses();
    } catch (error) {
      console.error('Error al refrescar los cursos:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCourses();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.title}>Cursos Disponibles</Text>

        {loading ? (
          <Text>Cargando cursos...</Text>
        ) : courses.length > 0 ? (
          courses.map((item, index) => (
            <View key={index} style={styles.courseItem}>
              <Text style={styles.courseName}>{item.courseName || 'Nombre no disponible'}</Text>
              <Text style={styles.courseDescription}>{item.description || 'Descripción no disponible'}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => deleteCourse(item.id)}
                  style={[styles.button, { backgroundColor: 'red', marginRight: 10 }]}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditCourse', { courseId: item.id })}
                  style={[styles.button, { backgroundColor: 'blue' }]}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>No hay cursos disponibles.</Text>
        )}
      </ScrollView>

      {/* Botón fijo */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddCourse')}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Agregar Nuevo Curso</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Muy importante para ocupar toda la pantalla
  },
  scrollContainer: {
    padding: 10,
    paddingBottom: 80, // Para que el último curso no quede tapado por el botón
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  courseItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: 14,
    marginVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
 addButton: {
  backgroundColor: 'green',
  padding: 15,
  borderRadius: 5,
  margin: 10,
  position: 'absolute',
  bottom: 35, // Ahora el botón está 30 unidades más arriba
  left: 10,
  right: 10,
},

  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Courses;
