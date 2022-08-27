import { View, Text, SafeAreaView, FlatList, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style';
import Icon from '../../components/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const win = require('../../images/win.png')
const fail = require('../../images/fail.png')

const ScoresScreen = ({navigation}) => {

  const [scores, setScores] = useState()
  const [refreshing, setRefreshing] = useState(false);

  const getScores = async () => {
    setRefreshing(true)
    let scores = await AsyncStorage.getItem('your_Scores')
    if (scores !== null) {
      let scores_Data = JSON.parse(scores)
      setScores(scores_Data)
      console.log(scores_Data.length)
      setRefreshing(false)
    } else {
      console.log("not found")
      setRefreshing(false)
    }
  }

  const deleteData = async() => {
    await AsyncStorage.removeItem('your_Scores')
    await AsyncStorage.removeItem('userData')
    navigation.navigate({name : 'UserScreen'});
  }

  useEffect(() => {
    getScores()
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
          console.log(index)
         return  <View key={index} style = {{...styles.resultsContainer}}>
                  <View style = {{...styles.imageContainer}}>
                    <Image
                      resizeMode="contain"
                      source={(score.correctAnswer*100/score.totalQuestions) >= 50 ? win : fail }
                      style = {{width : 120, height : 80, marginBottom: 10}}
                      />
                    <Text>
                      {Math.round(score.correctAnswer*100/score.totalQuestions)}% Score
                    </Text>
                  </View>
                  <View style = {{...styles.resultsrow}}>
                    <View style = {{...styles.resultsColumn}}>
                      <Text>
                        Total Questions: {index}
                      </Text>
                      <Text>
                        Correct Awnser: {score.correctAnswer}
                      </Text>
                      <Text>
                        Total Time: {score.totalTime}
                      </Text>
                    </View>
                    <View style = {{...styles.resultsColumn}}>
                      <Text>
                        Question Not Attmpeted: {score.notattmpeted}
                      </Text>
                      <Text>
                        Incorrect Awnser: {score.incorrectCount}
                      </Text>
                      <Text>
                        Spend Time: {score.spendTime}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text>
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

{/* // <ScrollView>
      //   {
      //     scores.map((score) => {
      //       return <View key={score.index} style = {{...styles.resultsContainer}}>
      //       <View style = {{...styles.imageContainer}}>
      //         <Image
      //         resizeMode="contain"
      //         source={(score.correctAnswer*100/score.totalQuestions) >= 50 ? win : fail}
      //         style = {{width : "60%", height : "80%"}}
      //         />
      //         <Text>
      //           {Math.round(score.correctAnswer*100/score.totalQuestions)}% Score
      //         </Text>
      //       </View>
      //       <View style = {{...styles.resultsrow}}>
      //         <View style = {{...styles.resultsColumn}}>
      //           <Text>
      //             Total Questions: {score.totalQuestions}
      //           </Text>
      //           <Text>
      //             Correct Awnser: {score.correctAnswer}
      //           </Text>
      //           <Text>
      //             Total Time: {score.totalTime}
      //           </Text>
      //         </View>
      //         <View style = {{...styles.resultsColumn}}>
      //           <Text>
      //             Question Not Attmpeted: {score.notattmpeted}
      //           </Text>
      //           <Text>
      //             Incorrect Awnser: {score.incorrectCount}
      //           </Text>
      //           <Text>
      //             Spend Time: {score.spendTime}
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //     })
      //   }
      // </ScrollView> */}