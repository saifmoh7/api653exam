import 'react-native-gesture-handler';
import React from 'react'
import { I18nManager} from 'react-native';
import AppStackNavigator from './navigators/AppStackNavigator';
import { NavigationContainer } from '@react-navigation/native';


I18nManager.allowRTL(false);

const App = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator/>
    </NavigationContainer> 
  );
}

export default App;