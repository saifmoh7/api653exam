import React from 'react'
import { ActivityIndicator, Alert, Linking, Text, TouchableOpacity, View } from 'react-native'
import { getUpgradeURL } from '../../utiles/database';
import Icon from '../icons';
import styles from './style';

export function Loading() {
  return (
    <View style= {{...styles.loadingContainer}}>
        <ActivityIndicator size="large"/>
    </View>
  )
}

// export function Version() {

//   const getoupgrade = async() => {
//     const url = "https://play.google.com/store/apps/details?id=host.exp.exponent"
//     // const url = await getUpgradeURL()
//     const supported = await Linking.canOpenURL(url);

//     if (supported) {
//       await Linking.openURL(url);
//     } else {
//       Alert.alert(`Don't know how to open this URL: ${url}`);
//     }
//   }

//   return (
//     <View style= {{...styles.versionContainer}}>
//         <Text style = {{fontSize: 20}}>We have new Version</Text>
//         <View style= {{...styles.iconContainer}}>
//           <Icon
//                 icon = "upgrade"
//                 size = {50}
//                 color = "#ffffff"
//                 onPress = {() => {
//                   getoupgrade()
//                 }}
//           />
//           <Icon
//                 icon = "home"
//                 size = {50}
//                 color = "#ffffff"
//                 onPress = {() => {
//                   console.log("Home")
//                   navigation.navigate({name : 'ExamsScreen'});
//                 }}
//             />
//         </View>
//     </View>
//   )
// }
