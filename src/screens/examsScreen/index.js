import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, Alert, BackHandler, Linking, Dimensions } from 'react-native'
import Footer from '../../components/footer';
import Icon from '../../components/icons';
import { getExamsList, getUpgradeURL, getVersion } from '../../utiles/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

function ExamsScreen({navigation}) {
  
  
  const [allExames, setAllExames] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [online, setOnline] = useState(false)
  const [versionStatus, setVersion] = useState(false)
  const [showDes, setShowDes] = useState([])
  const [highScore, setHighScore] = useState()
  const [latestScore, setLatestScore] = useState()
  const [userName, setUserName] = useState("")

  let {'width':sw} = Dimensions.get('screen')

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
        setOnline(true)
        await AsyncStorage.setItem('exams', JSON.stringify([...tempExams]))
        
      } else {console.log("not found")}
      setRefreshing(false);
    } catch (error) {
      console.log(error)
      try {
        setOnline(false)
        const examData = await AsyncStorage.getItem('exams')
        if (examData !== null) {
          let data = JSON.parse(examData)
          setAllExames(data)
        }
      } catch (error) {
        console.log(error)
      }
      setRefreshing(false);
    }
  }

  const SelectedExam = (selectedExamId, noQues, examTitle) => {
    if (selectedExamId && noQues) {
      navigation.navigate({name : 'NoOfQuestions',params:{selectedExamId, noQues, examTitle}});
    } else {console.log("select exam error")}
  }

  const _retrieveData = async () => {
    try {
      var value = await AsyncStorage.getItem('your_Scores');
      value = value===null ? [] : JSON.parse(value)
      let latestvalue = value[value.length-1]
      if (typeof latestvalue !== 'object') {
        latestvalue = 0;
      }else{
        latestvalue = latestvalue.score
      }
      let highvalue = value.sort(({'score':score1}, {'score':score2}) => score1<score2 ? 1 : (score1>score2 ? -1 : 0))
      if (typeof highvalue[0] !== 'object') {
        highvalue = 0;
      }else{
        highvalue = highvalue[0].score
      }
        setHighScore(highvalue)
        setLatestScore(latestvalue)
    } catch (error) {
      console.log(error.message)
    }
  };

  const checkUserName = async() => {
    const username = await AsyncStorage.getItem('userData')
    let user_Name = JSON.parse(username)
    setUserName(user_Name)
    if (userName !== null) {
      getExams()
      _retrieveData()
    } else {
      navigation.navigate({name : 'UserScreen'});
    }
  }

  const checkVersion = async() => {
    const version = "0.0.1"
    const current_Version = await getVersion()

    if (current_Version !== null) {
      if (current_Version === version) {
        setVersion(false)
      } else {
        setVersion(true)
      }
      await AsyncStorage.setItem('version',JSON.stringify(current_Version),)
    } else {
        const current__Version = await AsyncStorage.getItem('version')
        const current___Version = JSON.parse(current__Version)
        if (current___Version === version) {
          setVersion(false)
        } else {
          setVersion(true)
        }
      }
  }

  const getoupgrade = async() => {
    const url = await getUpgradeURL()
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  useEffect(() => {
    checkUserName()
    checkVersion()
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exitApp?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  },[userName])

  return (
    <SafeAreaView style = {{...styles.master}}>
      <View style = {{...styles.headerContainer}}>
        <View>
            <Text style = {{...styles.appName}}>
                API 653 EXAM APP
            </Text>
        </View>
      </View>

      {
        versionStatus ? 
        <View style= {{...styles.versionContainer}}>
          <Text style = {{fontSize: sw*20/411.4}}>We have new Version</Text>
          <View style= {{...styles.iconContainer}}>
            <Icon
                  icon = "upgrade"
                  size = {sw*50/411.4}
                  color = "#ffffff"
                  onPress = {() => {
                    getoupgrade()
                  }}
            />
            <Icon
                  icon = "home"
                  size = {sw*50/411.4}
                  color = "#ffffff"
                  onPress = {() => {
                    setVersion(false)
                  }}
              />
          </View>
        </View>
        : <View style = {{...styles.master1}}>
          <View style = {{...styles.userNameView}}>
            <Text style = {{...styles.userName}}>
                Welcome {userName}
            </Text>
            <Text style = {{...styles.userName}}>
                {online ? `online` : `offline`}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={() => {
              navigation.navigate({name : 'ScoresScreen'});
            }}
          >
            <View style = {{...styles.scoreContainer}}>
              <View style = {{...styles.score}}>
                <Text style = {{...styles.fontScore}}>High Score</Text>
                <Text style = {{...styles.fontScore}}>{highScore}%</Text>
              </View>
              <View style = {{...styles.line}}></View>
              <View style = {{...styles.score}}>
                <Text style = {{...styles.fontScore}}>Latest Score</Text>
                <Text style = {{...styles.fontScore}}>{latestScore}%</Text>
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
                  SelectedExam(exam._id, exam.noQues, exam.examTitle)
                }}
                style = {{...styles.tExamContainer}}
              >
                <View style = {{...styles.examContainer}}>
                  <Image
                        source = {{uri: exam.examImageUrl}}
                        style = {{width : sw*60/411.4, height : sw*60/411.4, borderRadius : sw*15/411.4, backgroundColor: '#ffffff'}}
                  />
                  <View style = {{...styles.examDescription}}>
                    <Text style = {{fontSize: sw*16/411.4, color: '#ffffff'}}>{exam.examTitle}</Text>
                    {showDes.includes(exam._id) ? <Text style = {{fontSize: sw*10/411.4, color: '#ffffff', marginLeft: sw*4/411.4}}>{exam.examDes}</Text> : <React.Fragment></React.Fragment>}
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
        </View>
      }

      <Footer/>
    </SafeAreaView>
  )
}

export default ExamsScreen;