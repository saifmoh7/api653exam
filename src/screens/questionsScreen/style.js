import { Dimensions, StyleSheet } from "react-native";

let {'width':sw,'height':sh } = Dimensions.get('screen')

const styles = StyleSheet.create({
    master: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#242B3E",
        width: '100%',
        height: '100%'
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#2E425A",
        width: '100%',
        height: '12%',
        borderBottomLeftRadius : sw*30/411.4,
        borderBottomRightRadius : sw*30/411.4,
        padding: sw*15/411.4
    },

    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection : 'row',
        width: '100%',
    },

    headerBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection : 'row',
        backgroundColor: "#2E425A",
        width: '100%', 
    },

    questionsContainer: {
        width: '90%',
    },

    questionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        marginTop: sw*5/411.4,
        padding: sw*5/411.4,
    },

    question: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: sw*25/411.4,
        width: '100%',
    },

    imageQuestion: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sw*150/411.4,
        borderWidth: sw*2/411.4,
        borderRadius: sw*2/411.4,
        borderColor: "#CCDDE7"
    },

    optionsContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '90%',
    },

    optionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        padding: sw*5/411.4,
        marginVertical: sw*10/411.4,
        borderRadius: sw*30/411.4
    },

    choice: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '15%',
        backgroundColor: '#E78230',
        borderRadius: sw*30/411.4
    },

    option: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: '5%',
        flexDirection: 'row',
        width: '80%',
    },

    line: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: sw*20/411.4,
        borderBottomColor: '#ffffff',
        borderBottomWidth: sw*2/411.4
    },

    iconContainer: {
        backgroundColor: '#007ACC',
        borderRadius: sw*20/411.4,
        padding: sw*2/411.4,
        position: 'absolute',
        bottom: '3%',
        right:'3%'
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
        height: '25%'
    },

    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: sw*2/411.4,
        margin: 0,
        width: '100%',
        height: '50%',
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
        paddingLeft: sw*7/411.4,
        width: '45%',
    },

    fontSize: {
        fontSize: sw*14/411.4,
        color: '#ffffff'
    }

})    

export default styles