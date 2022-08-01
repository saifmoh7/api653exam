import React from 'react'
import { Text, View } from 'react-native'
import styles from './style';

function Footer() {
  return (
    <View style= {{...styles.footerContainer}}>
        <Text>All Rightes to Hydrogen @2022</Text>
    </View>
  )
}

export default Footer