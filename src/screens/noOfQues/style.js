import { Dimensions, StyleSheet } from "react-native";

let {'width':sw,'height':sh } = Dimensions.get('screen')

const styles = StyleSheet.create({
    master: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#242B3E",
        width: '100%',
        height: '100%'
    },

    formContainer: {
        height: '60%',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#2E425A",
        borderRadius: sw*20/411.4
    }
})    

export default styles