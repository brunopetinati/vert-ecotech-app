import { StyleSheet, ToastAndroid, View } from "react-native"
import { Button, } from "@rneui/themed"
import FileCardList from '../../components/FileCardList'
import { useState } from "react"

export default function ThirdScreen({navigation}) {

    const [certMatricula, setCertMatricula] = useState(null) //aceita .pdf
    const [carSicar, setCarSicar] = useState(null) //aceita .pdf
    const [propertyPolygon, setPropertyPolygon] = useState(null) //aceita .kmz ou .kml
    const [cCIR, setCCIR] = useState(null) //aceita .pdf
    const [regularityCertificate, setRegularityCertificate] = useState(null) //aceita .pdf

    function goToMainScreen() {
        navigation.navigate('Main')
        if(Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                'Projeto salvo com sucesso',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        }
    }
    async function updateProject() {
        goToMainScreen()
    }
    async function saveAndContinueLater() {
        goToMainScreen()
        if(Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                'Projeto salvo com sucesso',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        }
    }

    return(
        <View style={styles.container}>
            {/* Input Fields */}
            <View style={styles.cardContainer}>
                <FileCardList 
                    certMatricula={certMatricula}
                    carSicar={carSicar}
                    propertyPolygon={propertyPolygon}
                    cCIR={cCIR}
                    regularityCertificate={regularityCertificate}
                    setCertMatricula={setCertMatricula} 
                    setCarSicar={setCarSicar} 
                    setPropertyPolygon={setPropertyPolygon} 
                    setCCIR={setCCIR} 
                    setRegularityCertificate={setRegularityCertificate}
                />
            </View>
            {/* Button Area */}
            <View>
                <Button onPress={updateProject} containerStyle={{ marginVertical: 8 }} title='Finalizar' />
                <Button onPress={saveAndContinueLater} type="clear" title='Continuar mais tarde' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    cardContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    }
})