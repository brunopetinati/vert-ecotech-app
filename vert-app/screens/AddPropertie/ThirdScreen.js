import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native"
import { Button, } from "@rneui/themed"
import FileCardList from '../../components/FileCardList';

export default function ThirdScreen() {

    async function finishProjectRegister() {
        
    }

    return(
        <View style={styles.container}>
            {/* Input Fields */}
            <View style={styles.container}>
                <FileCardList />
            </View>
            {/* Button Area */}
            <View>
                <Button onPress={finishProjectRegister} containerStyle={{ marginVertical: 8 }} title='Finalizar' />
                <Button type="clear" title='Continuar mais tarde' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})