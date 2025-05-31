// __tests__/Courses.test.js
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import Courses from '../Components/Courses';

// Mocks
jest.mock('axios');

describe('Courses CRUD tests', () => {
  const mockCourses = [
    { id: 1, courseName: 'Curso 1', description: 'Descripción 1' },
    { id: 2, courseName: 'Curso 2', description: 'Descripción 2' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('should render courses from API', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCourses });

    const { getByText } = render(
      <NavigationContainer>
        <Courses />
      </NavigationContainer>
    );

    expect(getByText('Cargando cursos...')).toBeTruthy();

    
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

 
  await waitFor(() => {
    expect(getByText('Curso 1')).toBeTruthy();
    expect(getByText('Curso 2')).toBeTruthy();
  });

  
  const deleteButtons = getAllByText('Eliminar');
  fireEvent.press(deleteButtons[0]);

  
  await waitFor(() => {
    expect(queryByText('Curso 1')).toBeNull();
    expect(getByText('Curso 2')).toBeTruthy();
  });
});

});
