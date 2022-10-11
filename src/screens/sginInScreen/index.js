import { View, Text, ToastAndroid, SafeAreaView, BackHandler, Alert } from 'react-native'
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
            )  
          navigation.navigate({name : 'ExamsScreen',params:{userName}});
          setUserName("")
        }
  }

  useEffect(() => {
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
  },[])

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
