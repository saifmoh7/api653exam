import React, { useState } from 'react'
import { Text, ToastAndroid, View } from 'react-native'
import FormInput from '../../components/formInput';
import Icon from '../../components/icons';
import styles from './style';

function NoOfQues({navigation, route}) {

  const examId = route.params.selectedExamId;
  const noQues = route.params.noQues

  const [timer, setTimer] = useState('');
  const [noOfQ, setNoofq] = useState('');

  const checkNoOfQues = async  () => {
    console.log(noQues)
    if (noOfQ < 2) {
      ToastAndroid.show('Number of Question is to Small', ToastAndroid.SHORT);
    }
    if (noOfQ > noQues) {
      ToastAndroid.show('Number of Question is to Long', ToastAndroid.SHORT);
    }
    if (timer < 1) {
      ToastAndroid.show('Time for Exam is to Small', ToastAndroid.SHORT);
    }
    if (timer > 300) {
      ToastAndroid.show('Time for Exam is to Long', ToastAndroid.SHORT);
    }
    if (noOfQ > 2 && noOfQ <= noQues && timer < 300 && timer >= 1){
      navigation.navigate({name : 'QuestionsScreen',params:{examId, noOfQ, timer}});
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
            />

            <FormInput
                labelText="Timer"
                placeholderText=""
                onChangeText={value => setTimer(value)}
                value={timer}
                keyboardType={"numeric"}
                maxLength = {3}
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