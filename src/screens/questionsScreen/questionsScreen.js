import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../../components/icons';
import { getQuestionsList } from '../../utiles/database';
import styles from './style';
const win = require('../../images/win.png')
const fail = require('../../images/fail.png')

function QuestionsScreen({navigation, route}) {

  const examId = route.params.examId;
  const time = route.params.timer*60
  const noOfQ = route.params.noOfQ

  const intervalRef = useRef(null);

  const [refreshing, setRefreshing] = useState(false)
  const [questions, setQuestions] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [examTime, setExamTime] = useState(0);

  const [state, setstate] = React.useReducer((prevState, data) => { return { ...prevState, ...data } }, {correctCount : 0, incorrectCount : 0, notattmpeted : parseInt(noOfQ), questionsState : {} });

  const getQuestions = async(examId) => {
    setRefreshing(true)
    try {
      const questionsList = await getQuestionsList(examId)

      let tempQuestions = []

      await questionsList.questions.forEach(async question => {

        question.options = shuffleArray([question.option_1, question.option_2, question.option_3, question.option_4])

        tempQuestions.push(question)
      });
      
      let tempQues = shuffleArray([...tempQuestions])
      
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

  function examTimer(examTime){
    let sec = Math.floor( (examTime) % 60 );
    let min = Math.floor( (examTime/60) % 60 );
    let hours = Math.floor( (examTime/(60*60)) % 24 );
    console.log(examTime,hours,min,sec)
    let time = (hours > 9 ? hours : '0' + hours) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
    return time.toString()
  }

  function getDeadlineTime(){
    let dateline = new Date();
    dateline.setSeconds(dateline.getSeconds()+time);
    return dateline;
  }

  function clearTimer(endtime){
    setTimer("00:00:00");
    if (intervalRef.current) clearInterval(intervalRef.current);
    let count = 0
    const id = setInterval(() => {
      startTimer(endtime)
      count = count+1
      setExamTime(count)
    },1000)
    intervalRef.current = id;
  }

  function startTimer(deadline){
    let{total, hours, min, sec} = getTimeRemaining(deadline);
    if (total >= 0 && !submit) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' + (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec)
      );
    } else {
      clearInterval(intervalRef.current);
      setSubmit(true)
      setShowResults(true)
      console.log("timeup")
    }
  }

  function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const sec = Math.floor( (total/1000) % 60 );
    const min = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/1000*60*60) % 24 );
    return {
      total, hours, min, sec
    }
  }

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
    getQuestions(examId)

    clearTimer(getDeadlineTime());

    return() => {if (intervalRef.current) clearInterval(intervalRef.current)};
  },[])

  return (
    <SafeAreaView style = {{...styles.master}}>
      <View style = {{...styles.header}}>
        <View style = {{...styles.title}}>
          <Text style={{fontSize: 18, color: '#ffffff'}}>API 653 Exam</Text>
        </View>
        <View style = {{...styles.headerBar}}>
          <Text>Not Attampeted/Total Ques. is {state.notattmpeted}/{noOfQ}</Text>
          <Text>{timer} sec</Text>
        </View>
      </View>

      <FlatList
        data = {questions.map((question,index)=>({ index,...question}))}
        onRefresh = {getQuestions}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, i) => i}
        style = {{...styles.questionsContainer}}
        renderItem = {({item: question}) => {
          if (question.index < noOfQ) {
            return <View key={question.index} style = {{...styles.questionContainer}}>
                    <View style = {{...styles.question}}>
                      <Text style={{fontSize: 16, color: '#ffffff'}}><Text style = {{color: state.questionsState.hasOwnProperty(question.index.toString()) ? '#28AFEA' : '#ffffff'}}>Q{question.index + 1}</Text> : {question.question}</Text>
                    </View>
                    <View style = {{...styles.optionsContainer}}>
                        {
                          question.options.map((option, optionIndex) => {
                            return(
                            <TouchableOpacity
                            disabled={submit}
                            key={optionIndex}
                            onPress={() => {
                              console.log(intervalRef.current)
                              let {correctCount, incorrectCount, notattmpeted, questionsState} = state
                              
                              if ( !questionsState.hasOwnProperty(String(question.index)) ) {
                                notattmpeted = notattmpeted-1
                              }

                              questionsState[question.index] = ( option === question.correctAnswer )

                              correctCount = Object.values(questionsState).filter(bool=>bool==true).length;
                              incorrectCount = Object.values(questionsState).filter(bool=>bool==false).length;
                              
                              setstate({correctCount, incorrectCount, notattmpeted, questionsState})

                              let tempQuestions = [...questions];
                              tempQuestions[question.index].selectedOption = option;
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
          } else {<React.Fragment></React.Fragment>}
        }}
      />
      <View style = {{...styles.iconContainer}}>
        <Icon
              icon = "c-check"
              size = {60}
              color = "#ffffff"
              onPress = {() => {
                setShowResults(true)
                setSubmit(true)
                clearInterval(intervalRef.current)
              }}
          />
      </View>
      {
        showResults ? 
          <View style = {{...styles.resultsContainer}}>
            <Image
            resizeMode="contain"
            source={(state.correctCount*100/noOfQ) >= 50 ? win : fail}
            style = {{width : "80%", height : "20%"}}
            />
            <Text>
              {state.correctCount*100/noOfQ}% Score
            </Text>
            <Text>
              Total Questions: {noOfQ}
            </Text>
            <Text>
              Question Not Attmpeted: {state.notattmpeted}
            </Text>
            <Text>
              Correct Awnser: {state.correctCount}
            </Text>
            <Text>
              Incorrect Awnser: {state.incorrectCount}
            </Text>
            <Text>
              Total Time: {examTimer(time)}
            </Text>
            <Text>
              Spend Time: {examTimer(examTime)}
            </Text>
          </View> : <React.Fragment></React.Fragment>
      }
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