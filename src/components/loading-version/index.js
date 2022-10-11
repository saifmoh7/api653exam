import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './style';

export function Loading() {
  return (
    <View style= {{...styles.loadingContainer}}>
        <ActivityIndicator size="large"/>
    </View>
  )
}