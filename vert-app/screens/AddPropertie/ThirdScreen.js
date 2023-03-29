import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";

export default function ThirdScreen() {

    async function finishProjectRegister() {
        
    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            {/* Input Fields */}
            <ScrollView  contentContainerStyle={{ marginTop: 64, borderWidth: 1}}>
                
            </ScrollView>

            {/* Button Area */}
            <View>
                <Button onPress={finishProjectRegister} containerStyle={{ marginVertical: 8 }} title='Finalizar' />
                <Button type="clear" title='Continuar mais tarde' />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})