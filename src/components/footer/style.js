import { Dimensions, StyleSheet } from "react-native";

let {'width':sw,'height':sh } = Dimensions.get('screen')

const styles = StyleSheet.create({
    footerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: sw*60/411.4,
        backgroundColor:'#2E425A',
        borderTopLeftRadius : sw*30/411.4,
        borderTopRightRadius : sw*30/411.4,
        marginTop: sw*30/411.4
    }
})

export default styles