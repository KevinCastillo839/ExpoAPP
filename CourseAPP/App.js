import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Courses from './Components/Courses'; // Make sure the path is correct
import AddCourse from './Components/AddCourse';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Set initial route to "Courses" */}
      <Stack.Navigator initialRouteName="Courses">
        <Stack.Screen name="Home">
          {(props) => (
            <View style={styles.container}>
              <Text>Open up App.js to start working on your app!</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('Courses')}>
                <Text>Go to Courses</Text>
              </TouchableOpacity>
              <StatusBar style="auto" />
            </View>
          )}
        </Stack.Screen>

        {/* Routes for the different components */}
        <Stack.Screen name="Courses" component={Courses} options={{ headerShown: false }} />
        <Stack.Screen name="AddCourse" component={AddCourse} options={{ title: 'Agregar Curso' }} 
        />
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
