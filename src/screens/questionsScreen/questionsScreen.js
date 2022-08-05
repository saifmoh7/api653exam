import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../../components/icons';
import { getQuestionsList } from '../../utiles/database';
import styles from './style';

function QuestionsScreen({navigation, route}) {

  const examId = route.params.examId;
  const timer = route.params.timer
  const noOfQ = route.params.noOfQ

  const [refreshing, setRefreshing] = useState(false)
  const [questions, setQuestions] = useState([]);
  const [submit, setSubmit] = useState(false);

  const [state, setstate] = React.useReducer((prevState, data) => { return { ...prevState, ...data } }, {correctCount : 0, incorrectCount : 0, notattmpeted : parseInt(noOfQ), questionsState : {} });

  const getQuestions = async(examId) => {
    setRefreshing(true)
    try {
      const questionsList = await getQuestionsList(examId)
      console.log(questionsList)

      let tempQuestions = []

      await questionsList.questions.forEach(async question => {

        question.options = shuffleArray([question.option_1, question.option_2, question.option_3, question.option_4])

        console.log({question})

        tempQuestions.push(question)
      });
      
      let tempQues = shuffleArray([...tempQuestions])
      
      console.log(tempQues)
      setQuestions(tempQues)

      setRefreshing(false)
    } catch (error) {
      console.log(error)
      setRefreshing(false)
    }
  }

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const choiceIcon = (index)=> {
    if(index === 0){
      return("A")
    }
    else if(index === 1){
      return("B")
    }
    else if(index === 2){
      return("C")
    }
    else if(index === 3){
      return("D")
    }
  }

  const getOptionBg = (currentoption, correctOption, selectedOption) => {
    if (submit) {
        if (selectedOption) {
          if (currentoption === selectedOption) {
            if (currentoption === correctOption) {
              return "#21B57A"
            }else{
              return "#FC412F"
            }
          }else{
            if (currentoption === correctOption) {
              return "#21B57A"
            }else{
              return "#CCDDE7"
            }
          }
        }else{
          if (currentoption === correctOption) {
            return "#21B57A"
          }else{
            return "#CCDDE7"
          }
        }
    }else{
      if (selectedOption) {
        if (currentoption === selectedOption) {
          return "#28AFEA"
        } else {
          return "#CCDDE7"
        }
      }else{
        return "#CCDDE7"
      }
    }
  }

  useEffect(() => {
    console.log(examId)
    getQuestions(examId)
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

      <FlatList
        data = {questions.map((question,index)=>({ index,...question}))}
        onRefresh = {getQuestions}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, i) => i}
        style = {{...styles.questionsContainer}}
        renderItem = {({item: question}) => (
            <View key={question.question.index} style = {{...styles.questionContainer}}>
              <View style = {{...styles.question}}>
                <Text style={{fontSize: 16, color: '#ffffff'}}>Q{question.index + 1}: {question.question}</Text>
              </View>
              <View style = {{...styles.optionsContainer}}>
                  {
                    question.options.map((option, optionIndex) => {
                      return(
                      <TouchableOpacity
                      key={optionIndex}
                      onPress={() => {
                        let tempQuestions = [...questions];
                        tempQuestions[question.index].selectedOption = option;
                        console.log(tempQuestions[question.index])
                        setQuestions([...tempQuestions]);
                      }}
                      style = {{...styles.optionContainer, backgroundColor: getOptionBg(option, question.correctAnswer, question.selectedOption)}}
                      >
                        <View style = {{...styles.choice}}>
                          <Text style={{fontSize: 30, color: '#ffffff'}}>{choiceIcon(optionIndex)}</Text>
                        </View>
                        <View style = {{...styles.option}}>
                          <Text style={{fontSize: 14, color: '#000000'}}>{option}</Text>
                        </View>
                      </TouchableOpacity>
                    )})
                  }
                {
                  submit ? 
                    <View style = {{...styles.ref}}>
                      <Text style={{fontSize: 16}}>General (API 650 1.1.1)</Text>
                    </View> : <React.Fragment></React.Fragment>
                }
              </View>
              <View style = {{...styles.line}}></View>
            </View>
        )}
      />
      <View style = {{...styles.iconContainer}}>
        <Icon
              icon = "c-check"
              size = {60}
              color = "#ffffff"
              onPress = {() => {
                setSubmit(true)
              }}
          />
      </View>
    </SafeAreaView>
  )
}

export default QuestionsScreen

{/* <ScrollView style = {{...styles.questionsContainer}}>
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
      </ScrollView> */}