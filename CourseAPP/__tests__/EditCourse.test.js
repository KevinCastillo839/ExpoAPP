import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import EditCourse from '../Components/EditCourse';
import axios from 'axios';

// Mock de axios
jest.mock('axios');

// Mock de useNavigation y useRoute de react-navigation/native
const goBackMock = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: goBackMock,
  }),
  useRoute: () => ({
    params: {
      courseId: 1,
    },
  }),
}));

describe('EditCourse', () => {
  beforeEach(() => {
    goBackMock.mockClear();
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

    // Esperar que los inputs se llenen con los datos del curso
    await waitFor(() => {
      expect(getByPlaceholderText('Nombre del curso').props.value).toBe('Curso Inicial');
      expect(getByPlaceholderText('Descripción del curso').props.value).toBe('Descripción inicial');
    });
  });

  it('actualiza el curso y navega hacia atrás', async () => {
    const { getByPlaceholderText, getByText } = render(<EditCourse />);

    // Esperar que los datos se carguen
    await waitFor(() => {
      expect(getByPlaceholderText('Nombre del curso').props.value).toBe('Curso Inicial');
    });

    // Cambiar valores
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

      expect(goBackMock).toHaveBeenCalled();
    });
  });

  it('muestra alerta si faltan campos', () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

    const { getByText } = render(<EditCourse />);

    fireEvent.press(getByText('Actualizar Curso'));

    // No se llama axios.put ni navigation.goBack porque hay campos vacíos
    expect(alertMock).toHaveBeenCalled();

    alertMock.mockRestore();
  });
});
