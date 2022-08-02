import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExamsScreen from '../screens/examsScreen';
import NoOfQues from '../screens/noOfQues';
import QuestionsScreen from '../screens/questionsScreen/questionsScreen';


const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExamsScreen" component={ExamsScreen} options = {{headerShown: false,}} />
      <Stack.Screen name="NoOfQuestions" component={NoOfQues} options = {{headerShown: false,}} />
      <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} options = {{headerShown: false,}} />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;