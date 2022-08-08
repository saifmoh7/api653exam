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