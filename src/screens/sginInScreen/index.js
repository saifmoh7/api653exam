import { View, Text, TouchableOpacity, ToastAndroid, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import styles from './style';
import FormInput from '../../components/formInput';
import Icon from '../../components/icons';
import { signIn } from '../../utiles/database';

const SignInScreen = ({navigation}) => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signup, setSignup] = useState(false);

  const checkNoOfQues = async  () => {
    if (userName.trim().length == 0 && signup) {
      ToastAndroid.show('User Name Is Empty', ToastAndroid.SHORT);
    }
    else if (email.trim().length == 0) {
      ToastAndroid.show('Email Is Empty', ToastAndroid.SHORT);
    }
    else if (password.trim().length == 0) {
      ToastAndroid.show('Password Is Empty', ToastAndroid.SHORT);
    }
    else if (confirmPassword.trim().length == 0 && signup) {
      ToastAndroid.show('Confirm Password Name Is Empty', ToastAndroid.SHORT);
    }
    else{
      if (signup) {
        console.log(userName, email, password)
      } else {
        const data = await signIn(email, password)
        if (data.name && data.email){
          let username = data.name
          let emailAddress = data.email
          console.log(username, emailAddress)
          navigation.navigate({name : 'ExamsScreen',params:{username, emailAddress}});
        }
      }
    }
  }


  return (
    <SafeAreaView style = {{...styles.master}}>
        <ScrollView style = {{...styles.scrollView}}>
        
        <View style = {{...styles.formContainer}}>
          {
            signup ? 
              <FormInput
                  labelText="User Name"
                  placeholderText="Enter your User Name"
                  onChangeText={value => setUserName(value)}
                  value={userName}
                  keyboardType= ""
                  maxLength = {25}
              /> : <React.Fragment></React.Fragment>
          }  
          <FormInput
                    labelText="Email Address"
                    placeholderText="Enter your Email"
                    onChangeText={value => setEmail(value)}
                    value={email}
                    keyboardType= "email-address"
                    maxLength = {25}
                />

          <FormInput
                    labelText="Password"
                    placeholderText="Enter your Password"
                    onChangeText={value => setPassword(value)}
                    value={password}
                    keyboardType= ""
                    secureTextEntry={true}
                    maxLength = {25}
                />

          {
            signup ? 
              <FormInput
                  labelText="Confirm Password"
                  placeholderText="Enter your Password"
                  onChangeText={value => setConfirmPassword(value)}
                  value={confirmPassword}
                  keyboardType= ""
                  secureTextEntry={true}
                  maxLength = {25}
              /> : <React.Fragment></React.Fragment>
          }
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
          {
              signup ? 
              <View style = {{...styles.icon}}>
                  <Icon
                  icon = "signin"
                  size = {60}
                  color = "#E78230"
                  onPress={() => {
                      setSignup(false)
                      setUserName("")
                      setEmail("")
                      setPassword("")
                      setConfirmPassword("")
                  }}
                  />
              </View> :
              <View style = {{...styles.icon}}>
                  <Icon
                  icon = "signup"
                  size = {60}
                  color = "#E78230"
                  onPress={() => {
                    setSignup(true)
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                  }}
                  />
              </View>
          }            
        </View>          
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignInScreen