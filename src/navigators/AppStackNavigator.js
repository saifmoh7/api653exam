import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExamsScreen from '../screens/examsScreen';
import NoOfQues from '../screens/noOfQues';
import QuestionsScreen from '../screens/questionsScreen/questionsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScoresScreen from '../screens/scoresScreen';
import UserScreen from '../screens/sginInScreen';
import { Loading } from '../components/loading-version';


var Stack = createStackNavigator();

const AppStackNavigator = () => {

  const [username, setUsername] = useState(undefined)

  const checkUserName = async() => {
    var username = await AsyncStorage.getItem('userData')
      if (username !== null) {
        let userName = JSON.parse(username)
        setUsername(userName)
      } else {
        setUsername(false)
      }
  }

  useEffect(() => {
    checkUserName();
  },[username])

  useEffect(() => {
    window.globalLogout = async () => {
        await AsyncStorage.removeItem('your_Scores')
        await AsyncStorage.removeItem('userData')
        checkUserName();
    }
    checkUserName();
  },[])

  if (username === undefined) {
    return <Loading/>
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

export default AppStackNavigator;

// username ? ()=> <ExamsScreen username={username} /> : 
{/* <Stack.Screen name="UserScreen" component={username ? ExamsScreen : UserScreen} options = {{headerShown: false,}} initialParams={{username}} /> */}