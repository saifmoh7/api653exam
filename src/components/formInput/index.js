import React from 'react';
import {View, Text, TextInput} from 'react-native';

const FormInput = ({
  labelText = '',
  placeholderText = '',
  onChangeText = null,
  value = null,
  maxLength = null,
  ...more
}) => {
  return (
    <View style={{width: '60%', marginBottom: 20, alignItems : "center"}}>
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
          borderRadius: 30,
          marginTop: 10,
          textAlign: 'center',
        }}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        maxLength = {maxLength}
        {...more}
      />
    </View>
  );
};

export default FormInput;