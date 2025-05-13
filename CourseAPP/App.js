import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Courses from './Components/Courses';  // Asegúrate de que la ruta sea correcta
 // Asegúrate de que la ruta sea correcta

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => (
            <View style={styles.container}>
              <Text>Open up App.js to start working on your app!</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('Courses')}>
                <Text>Ir a Cursos</Text>
              </TouchableOpacity>
              <StatusBar style="auto" />
            </View>
          )}
        </Stack.Screen>

        {/* Rutas para los diferentes componentes */}
        <Stack.Screen name="Courses" component={Courses} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
