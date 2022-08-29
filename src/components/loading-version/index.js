import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../icons';
import styles from './style';

export function Loading() {
  return (
    <View style= {{...styles.loadingContainer}}>
        <ActivityIndicator size="large"/>
    </View>
  )
}

export function Version({navigation}) {
  return (
    <View style= {{...styles.versionContainer}}>
        <Text style = {{fontSize: 20}}>We have new Version</Text>
        <View style= {{...styles.iconContainer}}>
          <Icon
                icon = "upgrade"
                size = {50}
                color = "#ffffff"
                onPress = {() => {
                  console.log("upgrade Version")
                }}
          />
          <Icon
                icon = "home"
                size = {50}
                color = "#ffffff"
                onPress = {() => {
                  console.log("Home")
                  // navigation.navigate({name : 'ExamsScreen'});
                }}
            />
        </View>
    </View>
  )
}
