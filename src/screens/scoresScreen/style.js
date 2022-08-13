import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    master: {
        backgroundColor : "#242B3E",
        flex : 1,
        alignItems : 'center',
        width: '100%',
        height: '100%'
    },

    headerContainer: {
        display: "flex",
        flexDirection : 'row',
        justifyContent: 'space-between',
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

    scoresContainer: {
        // display: 'flex',
        // flexDirection: 'column',
        width: '100%',
        // backgroundColor: 'green'
    },

    resultsContainer: {
        backgroundColor: '#333f5f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 20,
        marginTop: 10,
        padding: 2,
        width: '100%',
        minHeight: 100
    },

    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 2,
        margin: 0,
        width: '100%',
    },

    resultsrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 2,
        width: '100%',
    },

    resultsColumn: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: 7,
        width: '45%',
    },

})

export default styles