import { Dimensions, StyleSheet } from "react-native";

let {'width':sw,'height':sh } = Dimensions.get('screen')

const styles = StyleSheet.create({
    master: {
        backgroundColor : "#242B3E",
        flex : 1,
        alignItems : 'center',
        width: '100%',
        height: '100%'
    },

    master1: {
        flex : 1,
        alignItems : 'center',
        width: '100%',
        height: '100%'
    },

    headerContainer: {
        display: "flex",
        flexDirection : 'row',
        justifyContent: 'center',
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
        fontSize: sw*15/411.4,
    },

    userNameView: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: sw*30/411.4
    },

    userName: {
        color: '#ffffff',
        fontSize: sw*15/411.4,
    },

    scoreContainer : {
        height : sw*80/411.4,
        width : '88%' ,
        marginBottom : sw*30/411.4,
        marginTop : sw*50/411.4,
        backgroundColor:'#E78230',
        display : 'flex',
        flexDirection : 'row',
        justifyContent: 'space-evenly',
        borderRadius : sw*15/411.4,
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
        height: sw*110/411.4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2E425A',
        marginHorizontal: sw*10/411.4,
        marginVertical: sw*10/411.4,
        borderRadius : sw*15/411.4,
        paddingHorizontal: sw*20/411.4
    },

    examDescription: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
    },

    versionContainer: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '60%',
        marginTop: sw*30/411.4
    },

    fontScore: {
        fontSize: sw*16/411.4,
        color: '#ffffff'
    }

})

export default styles