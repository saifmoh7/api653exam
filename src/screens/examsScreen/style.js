import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    master: {
        position : 'relative',
        backgroundColor : "#242B3E",
        flex : 1,
        alignItems : 'center',
        width: '100%',
        height: '100%'
    },

    scoreContainer : {
        height : 80,
        width : '88%' ,
        marginBottom : 30,
        marginTop : 50,
        backgroundColor:'#E78230',
        display : 'flex',
        flexDirection : 'row',
        justifyContent: 'space-evenly',
        borderRadius : 15,
        alignItems : 'center'
    },

    score: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    line: {
        height: '75%',
        width: 1,
        backgroundColor:'#ffffff',
    },

    examsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },

    tExamContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    examContainer: {
        width: '90%',
        height: 110,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2E425A',
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius : 15,
        paddingHorizontal: 20
    },

    examDescription: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
    }


})

export default styles