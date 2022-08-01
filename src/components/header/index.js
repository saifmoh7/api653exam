import React from 'react'
import { View, Text } from 'react-native'
import Icon from '../icons';
import styles from './style';

function Header() {
  return (
    <View style = {{...styles.headerContainer}}>
        <View>
            <Icon
                icon = "menu"
                size = {25}
                color = "#ffffff"
            />
        </View>
        <View>
            <Text style = {{...styles.appName}}>
                API 653 EXAM APP
            </Text>
        </View>
        <View>
            <Icon
                icon = "login"
                size = {25}
                color = "#ffffff"
            />
        </View>
    </View>
  )
}

export default Header