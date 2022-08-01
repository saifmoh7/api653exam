import React from 'react'
import { Text, View } from 'react-native'
import FormInput from '../../components/formInput';
import styles from './style';

function NoOfQues({navigation, route}) {

  const examId = route.params.selectedExamId;

  return (
    <View style = {{...styles.master}}>
        <View style = {{...styles.formContainer}}>
            <FormInput
                labelText="No. of Questions"
                placeholderText=""
                // onChangeText={value => setNoofq(value)}
                // value={noOfQ}
                keyboardType={"numeric"}
                maxLength = {3}
            />
        </View>
    </View>
  )
}

export default NoOfQues