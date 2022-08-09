import React from 'react';
import {View, Text, TextInput} from 'react-native';

const FormInput = ({
  labelText = '',
  placeholderText = '',
  onChangeText = null,
  value = null,
  keyboardType = null,
  maxLength = null,
  secureTextEntry= null,
  signin= null,
  ...more
}) => {
  return (
    <View style={{width: '60%', marginBottom: 20, alignItems : signin ? 'flex-start' : 'center'}}>
      <Text
      style={{color: "white"}}>
      {labelText}
      </Text>

      <TextInput
        style={{
          padding: 10,
          color: "black",
          backgroundColor : "#DFDFDF",
          borderColor: "black",
          borderWidth: 1,
          width: '100%',
          borderRadius: 15,
          marginTop: 10,
          textAlign: signin ? 'left' : 'center',
        }}
        placeholder={placeholderText}
        placeholderTextColor='#848484'
        onChangeText={onChangeText}
        value={value}
        maxLength = {maxLength}
        keyboardType = {keyboardType}
        secureTextEntry = {secureTextEntry}
        {...more}
      />
    </View>
  );
};

export default FormInput;