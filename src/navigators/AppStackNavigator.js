import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExamsScreen from '../screens/examsScreen';
import NoOfQues from '../screens/noOfQues';
import QuestionsScreen from '../screens/questionsScreen/questionsScreen';
import SignInScreen from '../screens/sginInScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import ScoresScreen from '../screens/scoresScreen';
import UserScreen from '../screens/sginInScreen';


var Stack = createStackNavigator();

const AppStackNavigator = () => {
  const [username, setUsername] = useState('')

  useEffect( () => {
    (async()=>{
      var username = await AsyncStorage.getItem('userData')
      if (username !== null) {
        let userName = JSON.parse(username)
        console.log(userName)
        setUsername(userName)
      } else {
        setUsername(false)
      }
    })()
    
  },[])
  if (username==='') {
    return <View><Text>Loading</Text></View>
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="UserScreen" component={username ? ExamsScreen : UserScreen} options = {{headerShown: false,}} />
        <Stack.Screen name="ExamsScreen" component={ExamsScreen} options = {{headerShown: false,}} />
        <Stack.Screen name="NoOfQuestions" component={NoOfQues} options = {{headerShown: false,}} />
        <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} options = {{headerShown: false,}} />
        <Stack.Screen name="ScoresScreen" component={ScoresScreen} options = {{headerShown: false,}} />
      </Stack.Navigator>
    );
  }
}
// username ? ()=> <ExamsScreen username={username} /> : 
{/* <Stack.Screen name="UserScreen" component={username ? ExamsScreen : UserScreen} options = {{headerShown: false,}} initialParams={{username}} /> */}

export default AppStackNavigator;