import { Dimensions, StyleSheet } from "react-native";

let {'width':sw,'height':sh } = Dimensions.get('screen')

const styles = StyleSheet.create({
    master: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#242B3E",
        width: '100%',
        height: '100%'
    },

    headerContainer: {
        display: "flex",
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems: 'center',
        padding: sw*15/411.4,
        backgroundColor:'#2E425A',
        height: sw*85/411.4,
        width: '100%',
        borderBottomLeftRadius : sw*30/411.4,
        borderBottomRightRadius : sw*30/411.4,
    },

    appName: {
        color: '#ffffff',
        fontSize: sw*20/411.4
    },

    scrollView: {
        width: '100%',
    },

    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: sw*40/411.4,
        width: '100%',
    },

    iconsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    icon: {
        margin: sw*20/411.4,
    }

})

export default styles