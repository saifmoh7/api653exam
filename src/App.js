import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import AppStackNavigator from './navigators/AppStackNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator/>
    </NavigationContainer> 
  );
}

export default App;