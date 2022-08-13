import React, { useState } from 'react'
import { Text, ToastAndroid, View } from 'react-native'
import FormInput from '../../components/formInput';
import Icon from '../../components/icons';
import styles from './style';

function NoOfQues({navigation, route}) {

  const examId = route.params.selectedExamId;
  const noQues = route.params.noQues
  const examTitle = route.params.examTitle
  const userName = route.params.userName

  const [timer, setTimer] = useState('');
  const [noOfQ, setNoofq] = useState('');

  const checkNoOfQues = async  () => {
    if (noOfQ.trim().length == 0) {
      ToastAndroid.show('Number of Question is Empty', ToastAndroid.SHORT);
    }
    else if (noOfQ < 2) {
      ToastAndroid.show('Number of Question is to Small', ToastAndroid.SHORT);
    }
    else if (noOfQ > noQues) {
      ToastAndroid.show('Number of Question is to Long', ToastAndroid.SHORT);
    }
    else if (timer.trim().length == 0) {
      ToastAndroid.show('Time for Exam is Empty', ToastAndroid.SHORT);
    }
    else if (timer < 1) {
      ToastAndroid.show('Time for Exam is to Small', ToastAndroid.SHORT);
    }
    else if (timer > 300) {
      ToastAndroid.show('Time for Exam is to Long', ToastAndroid.SHORT);
    }
    else{
      navigation.navigate({name : 'QuestionsScreen',params:{examId, examTitle, noOfQ, timer, userName}});
      ToastAndroid.show('ok', ToastAndroid.SHORT);
    }
  }

  return (
    <View style = {{...styles.master}}>
        <View style = {{...styles.formContainer}}>
            <FormInput
                labelText="No. of Questions"
                placeholderText=""
                onChangeText={value => setNoofq(value)}
                value={noOfQ}
                keyboardType={"numeric"}
                maxLength = {3}
                signin={false}
            />

            <FormInput
                labelText="Timer"
                placeholderText=""
                onChangeText={value => setTimer(value)}
                value={timer}
                keyboardType={"numeric"}
                maxLength = {3}
                signin={false}
            />

            <View>
                <Icon
                icon = "c-check"
                size = {50}
                color = "#E78230"
                onPress={() => {
                    checkNoOfQues()
                    console.log("go play")
                }}
            />
            </View>
        </View>
    </View>
  )
}

export default NoOfQues