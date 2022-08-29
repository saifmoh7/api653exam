import { View, Text, ToastAndroid, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style';
import FormInput from '../../components/formInput';
import Icon from '../../components/icons';
import Footer from '../../components/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserScreen = ({navigation}) => {

  const [userName, setUserName] = useState('');

  const checkNoOfQues = async  () => {
    if (userName.trim().length == 0) {
      ToastAndroid.show('User Name Is Empty', ToastAndroid.SHORT);
    }
    else{
          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(userName),
            async e=>{
              let userData = await AsyncStorage.getItem('userData')
              console.log(userData)
            }
            )
          navigation.navigate({name : 'ExamsScreen',params:{userName}});
        }
  }


  return (
    <SafeAreaView style = {{...styles.master}}>
        <View style = {{...styles.headerContainer}}>
            <Text style = {{...styles.appName}}>
                API 653 EXAM APP
            </Text>
        </View>
        <View style = {{...styles.scrollView}}>
        
        <View style = {{...styles.formContainer}}>
          
          <FormInput
              labelText="User Name"
              placeholderText="Enter your User Name"
              onChangeText={value => setUserName(value)}
              value={userName}
              keyboardType= ""
              maxLength = {25}
              signin={true}
          />  
          
        </View>     

        <View style = {{...styles.iconsContainer}}>
          <View style = {{...styles.icon}}>
                      <Icon
                      icon = "c-check"
                      size = {60}
                      color = "#E78230"
                      onPress={() => {
                        checkNoOfQues()
                      }}
                  />
          </View>         
        </View>          
      </View>
      <Footer/>
    </SafeAreaView>
  )
}

export default UserScreen

// const [signup, setSignup] = useState(false);

// const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

// const SignInScreen = ({navigation}) => {

//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [signup, setSignup] = useState(false);

//   const checkNoOfQues = async  () => {
//     if (userName.trim().length == 0 && signup) {
//       ToastAndroid.show('User Name Is Empty', ToastAndroid.SHORT);
//     }
//     else if (email.trim().length == 0) {
//       ToastAndroid.show('Email Is Empty', ToastAndroid.SHORT);
//     }
//     else if (password.trim().length == 0) {
//       ToastAndroid.show('Password Is Empty', ToastAndroid.SHORT);
//     }
//     else if (confirmPassword.trim().length == 0 && signup) {
//       ToastAndroid.show('Confirm Password Name Is Empty', ToastAndroid.SHORT);
//     }
//     else if (signup && confirmPassword !== password) {
//       ToastAndroid.show('Password Is Different', ToastAndroid.SHORT);
//     }
//     else{
//       if (signup) {
//         const data = await signUp(userName, email, password)
//         if (data.name && data.email){
//           // console.log(data.name, data.email)
//           ToastAndroid.show('Sign Up is Success', ToastAndroid.SHORT);
//           setSignup(false)
//         }
//       } else {
//         const data = await signIn(email, password)
//         if (data.name && data.email){
//           let username = data.name
//           let emailAddress = data.email
//           let userData = {username, emailAddress}
//           await AsyncStorage.setItem(
//             'userData',
//             JSON.stringify(userData),
//             async e=>{
//               let userData = await AsyncStorage.getItem('userData')
//               console.log(userData)
//             }
//             )
//           navigation.navigate({name : 'ExamsScreen',params:{username, emailAddress}});
//         }
//       }
//     }
//   }

//   const getUserData = async() => {
//     try {
//       const userData = await AsyncStorage.getItem('userData')
//       if (userData !== null) {
//         let user_Data = JSON.parse(userData)
//         let username = user_Data.username
//         let emailAddress = user_Data.email
//         console.log(user_Data)
//         if (user_Data) {
//           navigation.navigate({name : 'ExamsScreen',params:{username, emailAddress}});
//         }else{
//           console.log('no User Data')
//         }
//       }
//       else{console.log({userData})}
//     } catch (error) {
//       console.log({error})
//     }
//   }

//   useEffect(() => {
//     getUserData()
//   },[])


//   return (
//     <SafeAreaView style = {{...styles.master}}>
//         <View style = {{...styles.headerContainer}}>
//             <Text style = {{...styles.appName}}>
//                 API 653 EXAM APP
//             </Text>
//         </View>
//         <ScrollView style = {{...styles.scrollView}}>
        
//         <View style = {{...styles.formContainer}}>
//           {
//             signup ? 
//               <FormInput
//                   labelText="User Name"
//                   placeholderText="Enter your User Name"
//                   onChangeText={value => setUserName(value)}
//                   value={userName}
//                   keyboardType= ""
//                   maxLength = {25}
//                   signin={true}
//               /> : <React.Fragment></React.Fragment>
//           }  
//           <FormInput
//                     labelText="Email Address"
//                     placeholderText="Enter your Email"
//                     onChangeText={value => setEmail(value)}
//                     value={email}
//                     keyboardType= "email-address"
//                     maxLength = {25}
//                     signin={true}
//                 />

//           <FormInput
//                     labelText="Password"
//                     placeholderText="Enter your Password"
//                     onChangeText={value => setPassword(value)}
//                     value={password}
//                     keyboardType= ""
//                     secureTextEntry={true}
//                     maxLength = {25}
//                     signin={true}
//                 />

//           {
//             signup ? 
//               <FormInput
//                   labelText="Confirm Password"
//                   placeholderText="Enter your Password"
//                   onChangeText={value => setConfirmPassword(value)}
//                   value={confirmPassword}
//                   keyboardType= ""
//                   secureTextEntry={true}
//                   maxLength = {25}
//                   signin={true}
//               /> : <React.Fragment></React.Fragment>
//           }
//         </View>     

//         <View style = {{...styles.iconsContainer}}>
//           <View style = {{...styles.icon}}>
//                       <Icon
//                       icon = "c-check"
//                       size = {60}
//                       color = "#E78230"
//                       onPress={() => {
//                         checkNoOfQues()
//                       }}
//                   />
//           </View>
//           <View style = {{...styles.icon}}>
//                   <Icon
//                   icon = "home"
//                   size = {60}
//                   color = "#E78230"
//                   onPress={() => {
//                     setEmail("")
//                     setPassword("")
//                     setConfirmPassword("")
//                     navigation.navigate({name : 'ExamsScreen',params:{username: false}});
//                   }}
//                   />
//           </View>
//           {
//               signup ? 
//               <View style = {{...styles.icon}}>
//                   <Icon
//                   icon = "signin"
//                   size = {60}
//                   color = "#E78230"
//                   onPress={() => {
//                       setSignup(false)
//                       setUserName("")
//                       setEmail("")
//                       setPassword("")
//                       setConfirmPassword("")
//                   }}
//                   />
//               </View> :
//               <View style = {{...styles.icon}}>
//                   <Icon
//                   icon = "signup"
//                   size = {60}
//                   color = "#E78230"
//                   onPress={() => {
//                     setSignup(true)
//                     setEmail("")
//                     setPassword("")
//                     setConfirmPassword("")
//                   }}
//                   />
//               </View>
//           }            
//         </View>          
//       </ScrollView>
//       <Footer/>
//     </SafeAreaView>
//   )
// }



  // const getUserData = async() => {
  //   try {
  //     const userData = await AsyncStorage.getItem('userData')
  //     if (userData !== null) {
  //       let user_Data = JSON.parse(userData)
  //       let username = user_Data.username
  //       let emailAddress = user_Data.email
  //       console.log(user_Data)
  //       if (user_Data) {
  //         navigation.navigate({name : 'ExamsScreen',params:{username, emailAddress}});
  //       }else{
  //         console.log('no User Data')
  //       }
  //     }
  //     else{console.log({userData})}
  //   } catch (error) {
  //     console.log({error})
  //   }
  // }

  // useEffect(() => {
  //   getUserData()
  // },[])


