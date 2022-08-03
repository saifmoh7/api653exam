import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { getQuestionsList } from '../../utiles/database';
import styles from './style';

function QuestionsScreen({navigation, route}) {

  const examId = route.params.examId;
  const timer = route.params.timer
  const noOfQ = route.params.noOfQ

  const [refreshing, setRefreshing] = useState(false)

  const getQuestions = async(examId) => {
    setRefreshing(true)
    try {
      const questionsList = await getQuestionsList(examId)
      console.log({questionsList})

      let tempQuestions = []

      await questionsList.questions.forEach(async question => {
        tempQuestions.push({question})
      });

      
      console.log({tempQuestions})

      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(examId)
    getQuestions(examId)
    // getQuestionList(examId)
  },[])

  return (
    <SafeAreaView style = {{...styles.master}}>
      <View style = {{...styles.header}}>
        <View style = {{...styles.title}}>
          <Text style={{fontSize: 18, color: '#ffffff'}}>API 653 Exam</Text>
        </View>
        <View style = {{...styles.headerBar}}>
          <Text>Not Attampeted/Total Ques. is 5/8</Text>
          <Text>00:00:00 sec</Text>
        </View>
      </View>

      <ScrollView style = {{...styles.questionsContainer}}>
        <View style = {{...styles.questionContainer}}>
          <View style = {{...styles.question}}>
            <Text style={{fontSize: 16, color: '#ffffff'}}>Q1: The types of tanks covered by API 653 are:</Text>
          </View>
          <View style = {{...styles.optionsContainer}}>
            <View style = {{...styles.optionContainer}}>
              <View style = {{...styles.choice}}>
                <Text style={{fontSize: 32, color: '#ffffff'}}>A</Text>
              </View>
              <View style = {{...styles.option}}>
                <Text style={{fontSize: 14, color: '#000000'}}>All answer.</Text>
              </View>
            </View>
            <View style = {{...styles.optionContainer}}>
              <View style = {{...styles.choice}}>
                <Text style={{fontSize: 32, color: '#ffffff'}}>B</Text>
              </View>
              <View style = {{...styles.option}}>
                <Text style={{fontSize: 14, color: '#000000'}}>non-refrigerated.</Text>
              </View>
            </View>
            <View style = {{...styles.optionContainer}}>
              <View style = {{...styles.choice}}>
                <Text style={{fontSize: 32, color: '#ffffff'}}>C</Text>
              </View>
              <View style = {{...styles.option}}>
                <Text style={{fontSize: 14, color: '#000000'}}>vertical, cylindrical, above ground closed and open topvugiuyi ihgihih ihi hih hiuhiuoh ihi ioh iou i hiohi ilhgil uhli lh il  ilhiluhiulhuihnuinl .</Text>
              </View>
            </View>
            <View style = {{...styles.optionContainer}}>
              <View style = {{...styles.choice}}>
                <Text style={{fontSize: 32, color: '#ffffff'}}>D</Text>
              </View>
              <View style = {{...styles.option}}>
                <Text style={{fontSize: 14, color: '#000000'}}>built to API 650 and 12 C.</Text>
              </View>
            </View>
            <View style = {{...styles.ref}}>
                <Text style={{fontSize: 16}}>General (API 650 1.1.1)</Text>
            </View>
          </View>
          <View style = {{...styles.line}}></View>
        </View>

        <View style = {{...styles.questionContainer}}>
          <View style = {{...styles.question}}>
            <Text style={{fontSize: 16, color: '#ffffff'}}>Q1: The types of tanks covered by API 653 are:</Text>
          </View>
          <View style = {{...styles.optionsContainer}}>
            <View style = {{...styles.optionContainer}}>
              <View style = {{...styles.choice}}>
                <Text style={{fontSize: 32, color: '#ffffff'}}>A</Text>
              </View>
              <View style = {{...styles.option}}>
                <Text style={{fontSize: 14, color: '#000000'}}>All answer.</Text>
              </View>
            </View>
            <View style = {{...styles.optionContainer}}>
              <View style = {{...styles.choice}}>
                <Text style={{fontSize: 32, color: '#ffffff'}}>B</Text>
              </View>
              <View style = {{...styles.option}}>
                <Text style={{fontSize: 14, color: '#000000'}}>non-refrigerated.</Text>
              </View>
            </View>
            <View style = {{...styles.optionContainer}}>
              <View style = {{...styles.choice}}>
                <Text style={{fontSize: 32, color: '#ffffff'}}>C</Text>
              </View>
              <View style = {{...styles.option}}>
                <Text style={{fontSize: 14, color: '#000000'}}>vertical, cylindrical, above ground closed and open topvugiuyi ihgihih ihi hih hiuhiuoh ihi ioh iou i hiohi ilhgil uhli lh il  ilhiluhiulhuihnuinl .</Text>
              </View>
            </View>
            <View style = {{...styles.optionContainer}}>
              <View style = {{...styles.choice}}>
                <Text style={{fontSize: 32, color: '#ffffff'}}>D</Text>
              </View>
              <View style = {{...styles.option}}>
                <Text style={{fontSize: 14, color: '#000000'}}>built to API 650 and 12 C.</Text>
              </View>
            </View>
            <View style = {{...styles.ref}}>
                <Text style={{fontSize: 16}}>General (API 650 1.1.1)</Text>
            </View>
          </View>
          <View style = {{...styles.line}}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default QuestionsScreen