// __tests__/Courses.test.js
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Courses from '../Components/Courses';

// Mock axios para controlar las respuestas
jest.mock('axios');

describe('Courses CRUD tests', () => {
  const mockCourses = [
    { id: 1, courseName: 'Curso 1', description: 'Descripción 1' },
    { id: 2, courseName: 'Curso 2', description: 'Descripción 2' },
  ];

  beforeEach(() => {
    // Limpia mocks antes de cada test
    jest.clearAllMocks();
  });

  test('should render courses from API', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCourses });

    const { getByText } = render(
      <NavigationContainer>
        <Courses />
      </NavigationContainer>
    );

    // Espera que muestre el texto de carga
    expect(getByText('Cargando cursos...')).toBeTruthy();

    // Espera que carguen los cursos
    await waitFor(() => {
      expect(getByText('Curso 1')).toBeTruthy();
      expect(getByText('Descripción 1')).toBeTruthy();
      expect(getByText('Curso 2')).toBeTruthy();
      expect(getByText('Descripción 2')).toBeTruthy();
    });
  });

test('should delete a course', async () => {
  axios.get.mockResolvedValueOnce({ data: mockCourses });
  axios.delete.mockResolvedValueOnce({});

  const { getByText, queryByText, getAllByText } = render(
    <NavigationContainer>
      <Courses />
    </NavigationContainer>
  );

  // Espera que carguen los cursos
  await waitFor(() => {
    expect(getByText('Curso 1')).toBeTruthy();
    expect(getByText('Curso 2')).toBeTruthy();
  });

  // Obtener todos los botones "Eliminar" y presionar el primero
  const deleteButtons = getAllByText('Eliminar');
  fireEvent.press(deleteButtons[0]);

  // Espera que el curso 1 desaparezca
  await waitFor(() => {
    expect(queryByText('Curso 1')).toBeNull();
    expect(getByText('Curso 2')).toBeTruthy();
  });
});

});
