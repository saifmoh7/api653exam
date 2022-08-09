import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import Footer from '../../components/footer';
import Icon from '../../components/icons';
import { getExamsList } from '../../utiles/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

function ExamsScreen({navigation, route}) {

  const userName = route.params.username

  const [allExames, setAllExames] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [showDes, setShowDes] = useState([])
  const [examId, setExamId] = useState("")

  const getExams = async() => {
    setRefreshing(true);
    try {
      const examsList = await getExamsList()

      let tempExams = [];
     
      await examsList.exams.forEach(async exam => {
        tempExams.push({...exam});
      });

      if (tempExams) {
        setAllExames([...tempExams]);
        await AsyncStorage.setItem('exams', JSON.stringify([...tempExams]))
        
      } else {
        console.log("not found")
      }
      setRefreshing(false);
    } catch (error) {
      console.log(error)
      try {
        const examData = await AsyncStorage.getItem('exams')
        if (examData !== null) {
          let data = JSON.parse(examData)
          console.log(data);
          setAllExames(data)
        }
      } catch (error) {
        console.log(error)
      }
      setRefreshing(false);
    }
  }

  const SelectedExam = (selectedExamId, noQues) => {
    console.log(selectedExamId, noQues)
    if (selectedExamId && noQues) {
      navigation.navigate({name : 'NoOfQuestions',params:{selectedExamId, noQues, userName}});
    } else {
      
    }
  }

  useEffect(() => {
    getExams()
  },[])

  return (
    <SafeAreaView style = {{...styles.master}}>
      <View style = {{...styles.headerContainer}}>
        <View>
            <Icon
                icon = "menu"
                size = {25}
                color = "#ffffff"
                onPress = {async() => {
                  console.log(userName)
                }}
            />
        </View>
        <View>
            <Text style = {{...styles.appName}}>
                API 653 EXAM APP
            </Text>
        </View>
        {
          userName ? 
            <View>
            <Icon
                icon = "signout"
                size = {25}
                color = "#ffffff"
                onPress = {async() => {
                  await AsyncStorage.removeItem('userData')
                  navigation.navigate({name : 'SignInScreen'});
                }}
            />
            </View> : 
            <View style = {{...styles.icon}}>
                <Icon
                icon = "signin"
                size = {25}
                    color = "#ffffff"
                onPress={() => {
                  navigation.navigate({name : 'SignInScreen'});
                }}
                />
            </View>
        }
      </View>

      <TouchableOpacity
        onPress={() => {
          console.log("scores")
        }}
      >
        <View style = {{...styles.scoreContainer}}>
          <View style = {{...styles.score}}>
            <Text>High Score</Text>
            {
              userName !== null ? userName ? <Text>70%</Text> : <Text>Go to Sign In</Text> : <Text>Go to Sign In</Text>
            }
          </View>
          <View style = {{...styles.line}}></View>
          <View style = {{...styles.score}}>
            <Text>Latest Score</Text>
            {
              userName !== null ? userName ? <Text>70%</Text> : <Text>Go to Sign In</Text> : <Text>Go to Sign In</Text>
            }
          </View>
        </View>
      </TouchableOpacity>

      <FlatList
        data = {allExames}
        onRefresh = {getExams}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style = {{...styles.examsContainer}}
        renderItem = {({item: exam}) => (
          <TouchableOpacity
            onPress={() => {
              SelectedExam(exam._id, exam.noQues)
            }}
            style = {{...styles.tExamContainer}}
          >
            <View style = {{...styles.examContainer}}>
              <Image
                    source = {{uri: exam.examImageUrl}}
                    style = {{width : 60, height : 60, borderRadius : 15, backgroundColor: '#ffffff'}}
              />
              <View style = {{...styles.examDescription}}>
                <Text style = {{fontSize: 16}}>{exam.examTitle}</Text>
                {showDes.includes(exam._id) ? <Text style = {{fontSize: 12}}>{exam.examDes}</Text> : <React.Fragment></React.Fragment>}
              </View>
              <Icon
                    icon = "detail"
                    size = {35}
                    color = "#ffffff"
                    onPress = {() => {
                      if (showDes.includes(exam._id)) {
                        setShowDes(showDes.filter(id => id != exam._id))
                      }else{
                        setShowDes([...showDes,exam._id])
                      }
                    }}
              />
            </View>
          </TouchableOpacity>
        )}
      />

      <Footer/>
    </SafeAreaView>
  )
}

export default ExamsScreen;

















      {/* <ScrollView style = {{...styles.examsContainer}}>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_243353278.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 653 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("scores")
          }}
          style = {{...styles.tExamContainer}}
        >
          <View style = {{...styles.examContainer}}>
            <Image
                  source = {{uri: "https://www.gsctanks.com/wp-content/uploads/2018/11/shutterstock_264967397.jpg"}}
                  style = {{width : 50, height : 50, borderRadius : 15, backgroundColor: '#ffffff'}}
            />
            <Text style = {{fontSize: 15}}>API 650 Exam</Text> 
            <Icon
                  icon = "detail"
                  size = {25}
                  color = "#ffffff"
            />
          </View>
        </TouchableOpacity>
      </ScrollView> */}