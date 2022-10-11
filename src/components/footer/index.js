import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import styles from './style';

function Footer() {

  let {'width':sw} = Dimensions.get('screen')

  return (
    <View style= {{...styles.footerContainer}}>
        <Text style = {{fontSize: sw*15/411.4, color: '#ffffff'}}>All Rightes to Hydrogen @2022</Text>
    </View>
  )
}

export default Footer