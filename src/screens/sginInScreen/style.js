import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    master: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#242B3E",
        width: '100%',
        height: '100%'
    },

    headerContainer: {
        display: "flex",
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems: 'center',
        padding: 15,
        backgroundColor:'#2E425A',
        height: 85,
        width: '100%',
        borderBottomLeftRadius : 30,
        borderBottomRightRadius : 30,
    },

    appName: {
        color: '#ffffff',
        fontSize: 20
    },

    scrollView: {
        // backgroundColor: "#000000",
        width: '100%',
    },

    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        width: '100%',
    },

    iconsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    icon: {
        margin: 20,
    }

})

export default styles