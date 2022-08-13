import { StyleSheet } from "react-native";

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
        borderBottomLeftRadius : 30,
        borderBottomRightRadius : 30,
        padding: 15
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
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        // flexDirection: 'column',
        // marginTop: 10,
        width: '90%',
    },

    questionContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        marginTop: 5,
        padding: 5,
    },

    question: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 25,
        width: '100%',
    },

    imageQuestion: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        borderWidth: 2,
        borderRadius: 5,
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
        padding: 5,
        marginVertical: 10,
        borderRadius: 30
    },

    choice: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '15%',
        backgroundColor: '#E78230',
        borderRadius: 30
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
        marginVertical: 20,
        borderBottomColor: '#ffffff',
        borderBottomWidth: 2
    },

    iconContainer: {
        backgroundColor: '#007ACC',
        borderRadius: 20,
        padding: 2,
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
        borderRadius: 20,
        marginTop: 10,
        padding: 2,
        width: '100%',
        height: '25%'
    },

    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 2,
        margin: 0,
        width: '100%',
        height: '50%',
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