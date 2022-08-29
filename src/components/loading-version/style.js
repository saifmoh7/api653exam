import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor:'#2E425A',
    },

    versionContainer: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor:'#2E425A',
    },

    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '60%',
        marginTop: 30
    }
})

export default styles