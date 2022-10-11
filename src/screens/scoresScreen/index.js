import { View, Text, SafeAreaView, FlatList, Image, Alert, BackHandler, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style';
import Icon from '../../components/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const win = require('../../images/win.png')
const fail = require('../../images/fail.png')

const ScoresScreen = ({navigation}) => {

  const [scores, setScores] = useState()
  const [refreshing, setRefreshing] = useState(false);

  let {'width':sw} = Dimensions.get('screen')

  const getScores = async () => {
    setRefreshing(true)
    let scores = await AsyncStorage.getItem('your_Scores')
    if (scores !== null) {
      let scores_Data = JSON.parse(scores)
      setScores(scores_Data)
      setRefreshing(false)
    } else {
      console.log("not found")
      setRefreshing(false)
    }
  }

  const deleteData = async() => {
    Alert.alert("Hold on!", "Are you sure you want delete your scores and Re-register?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: async() => {
        await window.globalLogout()
        navigation.navigate({name : 'UserScreen'});
      } }
    ]);
  }

  useEffect(() => {
    getScores()
    const backAction = () => {
      navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  },[])
  
  return (
    <SafeAreaView style = {{...styles.master}}>
      <View style = {{...styles.headerContainer}}>
        <View>
            <Icon
                icon = "home"
                size = {25}
                color = "#ffffff"
                onPress = {() => {
                  navigation.navigate({name : 'ExamsScreen'});
                }}
            />
        </View>
        <View>
            <Text style = {{...styles.appName}}>
                Your Scores
            </Text>
        </View>
        <View>
            <Icon
                icon = "delete"
                size = {25}
                color = "#ffffff"
                onPress = {() => {
                  deleteData()
                }}
            />
        </View> 
      </View>

      <FlatList
        data = {scores}
        onRefresh = {getScores}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style = {{...styles.scoresContainer}}
        renderItem = {({item: score, index}) => {
         return  <View key={index} style = {{...styles.resultsContainer}}>
                  <View style = {{...styles.imageContainer}}>
                    <Image
                      resizeMode="contain"
                      source={(score.correctAnswer*100/score.totalQuestions) >= 50 ? win : fail }
                      style = {{width : sw*120/411.4, height : sw*80/411.4, marginBottom: sw*10/411.4 ,marginTop: sw*10/411.4}}
                      />
                    <Text style = {{...styles.fontSize}}>
                      {Math.round(score.correctAnswer*100/score.totalQuestions)}% Score
                    </Text>
                    <Text style = {{...styles.fontSize}}>
                      Exam Title: {score.examTitle}
                    </Text>
                  </View>
                  <View style = {{...styles.resultsrow}}>
                    <View style = {{...styles.resultsColumn}}>
                      <Text style = {{...styles.fontSize}}>
                        Total Questions: {index}
                      </Text>
                      <Text style = {{...styles.fontSize}}>
                        Correct Awnser: {score.correctAnswer}
                      </Text>
                      <Text style = {{...styles.fontSize}}>
                        Total Time: {score.totalTime}
                      </Text>
                    </View>
                    <View style = {{...styles.resultsColumn}}>
                      <Text style = {{...styles.fontSize}}>
                        Question Not Attmpeted: {score.notattmpeted}
                      </Text>
                      <Text style = {{...styles.fontSize}}>
                        Incorrect Awnser: {score.incorrectCount}
                      </Text>
                      <Text style = {{...styles.fontSize}}>
                        Spend Time: {score.spendTime}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style = {{...styles.fontSize}}>
                      Exam Date: {score.currntDate}
                    </Text>
                  </View>
                 </View>
        }}
      />
    </SafeAreaView>
  )
}

export default ScoresScreen
