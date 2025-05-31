import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddCourse from '../Components/AddCourse';
import axios from 'axios';
import { goBackMock } from '@react-navigation/native';


// Mocks
jest.mock('axios');

jest.mock('@react-navigation/native', () => {
  const goBackMock = jest.fn(); // Declared inside jest.mock
  // Mock useNavigation hook to return the goBack function
  return {
    useNavigation: () => ({
      goBack: goBackMock,
    }),
    goBackMock, // export the mock function for testing
  };
});


describe('AddCourse', () => {
  beforeEach(() => {
    goBackMock.mockClear();
    axios.post.mockResolvedValue({ data: {} });
  });

  it('should call navigation.goBack after adding a course', async () => {
    const { getByPlaceholderText, getByText } = render(<AddCourse />);

    fireEvent.changeText(getByPlaceholderText('Nombre del curso'), 'Curso de prueba');
    fireEvent.changeText(getByPlaceholderText('Descripción del curso'), 'Descripción de prueba');

    fireEvent.press(getByText('Agregar Curso'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/courses'),
        {
          courseName: 'Curso de prueba',
          description: 'Descripción de prueba',
        }
      );
      expect(goBackMock).toHaveBeenCalled(); 
    });
  });
});
