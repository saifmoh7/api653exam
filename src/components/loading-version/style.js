import { Dimensions, StyleSheet } from "react-native";

let {'width':sw,'height':sh } = Dimensions.get('screen')

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
    },

    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '60%',
        marginTop: sw*30/411.4
    }
})

export default styles