import { StyleSheet , Dimensions } from "react-native";

let {'width':sw,'height':sh } = Dimensions.get('screen')

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

    scoresContainer: {
        width: '100%',
    },

    resultsContainer: {
        backgroundColor: '#333f5f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: sw*20/411.4,
        marginTop: sw*10/411.4,
        padding: sw*2/411.4,
        width: '100%',
        minHeight: sw*100/411.4
    },

    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: sw*2/411.4,
        margin: 0,
        width: '100%',
    },

    resultsrow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: sw*2/411.4,
        width: '100%',
    },

    resultsColumn: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: sw*2/411.4,
        width: '45%',
    },

    fontSize: {
        fontSize: sw*14/411.4,
        color: '#ffffff'
    }

})

export default styles