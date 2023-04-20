import { Text } from "@rneui/themed"
import { StyleSheet, View, ActivityIndicator, Image } from "react-native"

export default function LoadingAnimation({text, icon}) {
    return(
        <View style={styles.view}>
            {
            icon 
            ? 
                <Image source={icon} style={styles.image} />
            :
                <ActivityIndicator size={84} />
            }
            <Text style={styles.text}>{text ? text : 'Carregando'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#ffffff',
        flex: 1,
        alignItems: 'center',
        justifyContent:"center",
        textAlign: 'center'
        
    },
    image: {
        width: 128,
        height: 128,
    },
    text: {
        fontWeight: 'bold',
        marginTop: 8,
        fontSize: 24,
        textAlign: 'center'

    },
})