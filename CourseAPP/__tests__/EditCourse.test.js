import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditCourse from '../Components/EditCourse';
import axios from 'axios';
import { Alert } from 'react-native';


// Mock de axios
jest.mock('axios');

// Se define dentro del jest.mock
let mockGoBack;

// Mock de useNavigation y useRoute de react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: {
      courseId: 1,
    },
  }),
}));

describe('EditCourse', () => {
  beforeEach(() => {
    mockGoBack = jest.fn(); // Reinicializa en cada test
    axios.get.mockResolvedValue({
      data: {
        courseName: 'Curso Inicial',
        description: 'Descripción inicial',
      },
    });
    axios.put.mockResolvedValue({ data: {} });
  });

  it('carga y muestra los datos iniciales del curso', async () => {
    const { getByPlaceholderText } = render(<EditCourse />);

    await waitFor(() => {
      expect(getByPlaceholderText('Nombre del curso').props.value).toBe('Curso Inicial');
      expect(getByPlaceholderText('Descripción del curso').props.value).toBe('Descripción inicial');
    });
  });

  it('actualiza el curso y navega hacia atrás', async () => {
    const { getByPlaceholderText, getByText } = render(<EditCourse />);

    await waitFor(() => {
      expect(getByPlaceholderText('Nombre del curso').props.value).toBe('Curso Inicial');
    });

    fireEvent.changeText(getByPlaceholderText('Nombre del curso'), 'Curso Editado');
    fireEvent.changeText(getByPlaceholderText('Descripción del curso'), 'Descripción editada');
    fireEvent.press(getByText('Actualizar Curso'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining('/courses/1'),
        {
          courseName: 'Curso Editado',
          description: 'Descripción editada',
        }
      );

      expect(mockGoBack).toHaveBeenCalled();
    });
  });

  it('muestra alerta si faltan campos', () => {
     const alertMock = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { getByText } = render(<EditCourse />);

    fireEvent.press(getByText('Actualizar Curso'));

    expect(alertMock).toHaveBeenCalled();

    alertMock.mockRestore();
  });
});
