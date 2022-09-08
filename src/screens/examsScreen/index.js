import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, Alert, BackHandler, Linking } from 'react-native'
import Footer from '../../components/footer';
import Icon from '../../components/icons';
import { getExamsList, getUpgradeURL, getVersion } from '../../utiles/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

function ExamsScreen({navigation}) {
  
  
  const [allExames, setAllExames] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [versionStatus, setVersion] = useState(false)
  const [showDes, setShowDes] = useState([])
  const [highScore, setHighScore] = useState()
  const [latestScore, setLatestScore] = useState()
  const [userName, setUserName] = useState("")

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
        
      } else {console.log("not found")}
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
      console.log({current_Version, versionStatus})
    } else {
        console.log("no connection")
        const current__Version = await AsyncStorage.getItem('version')
        const current___Version = JSON.parse(current__Version)
        if (current___Version === version) {
          setVersion(false)
        } else {
          setVersion(true)
        }
        console.log(current__Version, {version})
      }
      console.log(versionStatus)
  }

  const getoupgrade = async() => {
    // const url = "https://play.google.com/store/apps/details?id=host.exp.exponent"
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
          <Text style = {{fontSize: 20}}>We have new Version</Text>
          <View style= {{...styles.iconContainer}}>
            <Icon
                  icon = "upgrade"
                  size = {50}
                  color = "#ffffff"
                  onPress = {() => {
                    getoupgrade()
                  }}
            />
            <Icon
                  icon = "home"
                  size = {50}
                  color = "#ffffff"
                  onPress = {() => {
                    setVersion(false)
                  }}
              />
          </View>
        </View>
        : <View style = {{...styles.master1}}>
          <View>
            <Text style = {{...styles.userName}}>
                Welcome {userName}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={() => {
              console.log(userName)
              navigation.navigate({name : 'ScoresScreen'});
            }}
          >
            <View style = {{...styles.scoreContainer}}>
              <View style = {{...styles.score}}>
                <Text>High Score</Text>
                <Text>{highScore}%</Text>
              </View>
              <View style = {{...styles.line}}></View>
              <View style = {{...styles.score}}>
                <Text>Latest Score</Text>
                <Text>{latestScore}%</Text>
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
        </View>
      }

      <Footer/>
    </SafeAreaView>
  )
}

export default ExamsScreen;



// let {navigation, route, ...attr} = props
  
  // const userName = props?.userName || route?.params?.userName

// function ExamsScreen(props) {
//   let {navigation, route, ...attr} = props
//   console.log(route.params)
//   const userName = props?.username || route?.params?.username 

//   const [allExames, setAllExames] = useState([])
//   const [refreshing, setRefreshing] = useState(false);
//   const [showDes, setShowDes] = useState([])
//   const [highScore, setHighScore] = useState()
//   const [latestScore, setLatestScore] = useState()
//   const [examId, setExamId] = useState("")

//   const getExams = async() => {
//     setRefreshing(true);
//     try {
//       const examsList = await getExamsList()

//       let tempExams = [];
     
//       await examsList.exams.forEach(async exam => {
//         tempExams.push({...exam});
//       });

//       if (tempExams) {
//         setAllExames([...tempExams]);
//         await AsyncStorage.setItem('exams', JSON.stringify([...tempExams]))
        
//       } else {
//         console.log("not found")
//       }
//       setRefreshing(false);
//     } catch (error) {
//       console.log(error)
//       try {
//         const examData = await AsyncStorage.getItem('exams')
//         if (examData !== null) {
//           let data = JSON.parse(examData)
//           console.log(data);
//           setAllExames(data)
//         }
//       } catch (error) {
//         console.log(error)
//       }
//       setRefreshing(false);
//     }
//   }

//   const SelectedExam = (selectedExamId, noQues, examTitle) => {
//     if (selectedExamId && noQues) {
//       navigation.navigate({name : 'NoOfQuestions',params:{selectedExamId, noQues, examTitle, userName}});
//     } else {
      
//     }
//   }

//   const _retrieveData = async () => {
//     try {
//       var value = await AsyncStorage.getItem('your_Scores');
//       console.log(value)
//       value = value===null ? [] : JSON.parse(value)
//       let latestvalue = value[value.length-1]
//       console.log({latestvalue})
//       if (typeof latestvalue !== 'object') {
//         latestvalue = 0;
//       }else{
//         latestvalue = latestvalue.score
//       }
//       let highvalue = value.sort(({'score':score1}, {'score':score2}) => score1<score2 ? 1 : (score1>score2 ? -1 : 0))
//       // console.log({highvalue})
//       if (typeof highvalue[0] !== 'object') {
//         highvalue = 0;
//       }else{
//         // console.log(highvalue[0])
//         highvalue = highvalue[0].score
//       }
//         // setAllScore(value)
//         setHighScore(highvalue)
//         setLatestScore(latestvalue)
//         // console.log(highvalue);
//         // console.log(latestvalue)
//     } catch (error) {
//       console.log(error.message)
//     }
//   };

//   useEffect(() => {
//     getExams()
//     _retrieveData()
//   },[])

//   return (
//     <SafeAreaView style = {{...styles.master}}>
//       <View style = {{...styles.headerContainer}}>
//         <View>
//             <Icon
//                 icon = "menu"
//                 size = {25}
//                 color = "#ffffff"
//                 onPress = { async() => {
//                   // await AsyncStorage.removeItem('your_Scores')
//                   // _retrieveData()
//                   // navigation.navigate({name : 'ScoresScreen'});
//                 }}
//             />
//         </View>
//         <View>
//             <Text style = {{...styles.appName}}>
//                 API 653 EXAM APP
//             </Text>
//         </View>
//         {
//           userName ? 
//             <View>
//             <Icon
//                 icon = "signout"
//                 size = {25}
//                 color = "#ffffff"
//                 onPress = {async() => {
//                   await AsyncStorage.removeItem('userData')
//                   navigation.navigate({name : 'SignInScreen'});
//                   console.log(await AsyncStorage.getItem('userData'))
//                 }}
//             />
//             </View> : 
//             <View style = {{...styles.icon}}>
//                 <Icon
//                 icon = "signin"
//                 size = {25}
//                     color = "#ffffff"
//                 onPress={() => {
//                   navigation.navigate({name : 'SignInScreen'});
//                 }}
//                 />
//             </View>
//         }
//       </View>

//       {
//         userName ? 
//         <View>
//           <Text style = {{...styles.appName}}>
//               Welcome {userName}
//           </Text>
//         </View> : <React.Fragment></React.Fragment>
//       }

//       <TouchableOpacity
//         disabled={!userName}
//         onPress={() => {
//           console.log(userName)
//           navigation.navigate({name : 'ScoresScreen'});
//         }}
//       >
//         <View style = {{...styles.scoreContainer}}>
//           <View style = {{...styles.score}}>
//             <Text>High Score</Text>
//             {
//               userName !== null ? userName ? <Text>{highScore}%</Text> : <Text>Go to Sign In</Text> : <Text>Go to Sign In</Text>
//             }
//           </View>
//           <View style = {{...styles.line}}></View>
//           <View style = {{...styles.score}}>
//             <Text>Latest Score</Text>
//             {
//               userName !== null ? userName ? <Text>{latestScore}%</Text> : <Text>Go to Sign In</Text> : <Text>Go to Sign In</Text>
//             }
//           </View>
//         </View>
//       </TouchableOpacity>

//       <FlatList
//         data = {allExames}
//         onRefresh = {getExams}
//         refreshing={refreshing}
//         showsVerticalScrollIndicator={false}
//         style = {{...styles.examsContainer}}
//         renderItem = {({item: exam}) => (
//           <TouchableOpacity
//             onPress={() => {
//               SelectedExam(exam._id, exam.noQues, exam.examTitle)
//             }}
//             style = {{...styles.tExamContainer}}
//           >
//             <View style = {{...styles.examContainer}}>
//               <Image
//                     source = {{uri: exam.examImageUrl}}
//                     style = {{width : 60, height : 60, borderRadius : 15, backgroundColor: '#ffffff'}}
//               />
//               <View style = {{...styles.examDescription}}>
//                 <Text style = {{fontSize: 16}}>{exam.examTitle}</Text>
//                 {showDes.includes(exam._id) ? <Text style = {{fontSize: 12}}>{exam.examDes}</Text> : <React.Fragment></React.Fragment>}
//               </View>
//               <Icon
//                     icon = "detail"
//                     size = {35}
//                     color = "#ffffff"
//                     onPress = {() => {
//                       if (showDes.includes(exam._id)) {
//                         setShowDes(showDes.filter(id => id != exam._id))
//                       }else{
//                         setShowDes([...showDes,exam._id])
//                       }
//                     }}
//               />
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       <Footer/>
//     </SafeAreaView>
//   )
// }


















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