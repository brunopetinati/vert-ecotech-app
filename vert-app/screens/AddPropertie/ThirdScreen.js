import { StyleSheet, ToastAndroid, View } from "react-native"
import { Button, } from "@rneui/themed"
import FileCardList from '../../components/FileCardList'
import { useEffect, useState } from "react"
import api from '../../Api'

export default function ThirdScreen({route, navigation}) {
    const { projectId, project } = route.params
    const [certMatricula, setCertMatricula] = useState(null) //aceita .pdf
    const [carSicar, setCarSicar] = useState(null) //aceita .pdf
    const [propertyPolygon, setPropertyPolygon] = useState(null) //aceita .kmz ou .kml
    const [cCIR, setCCIR] = useState(null) //aceita .pdf
    const [regularityCertificate, setRegularityCertificate] = useState(null) //aceita .pdf

    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => { 
            e.preventDefault() 
        })
    )

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
    
    async function updateProject(id) {
        var formData = new FormData()
        // Inserindo nossos arquivos se não forem nulls para um bagui multipartForm
        if(certMatricula) {
            formData.append('pdf_matricula_certificate', certMatricula)
        }
        if(carSicar) {
            formData.append('pdf_car', carSicar)
        }
        if(propertyPolygon) {
            formData.append('property_polygon', propertyPolygon)
        }
        if (regularityCertificate) {
            formData.append('pdf_federal_debt_certificate', regularityCertificate)
        }
        if (cCIR) {
            formData.append('pdf_ccir', cCIR)
        }

        if(
            certMatricula != null || 
            carSicar != null ||	
            propertyPolygon != null || 
            regularityCertificate != null || 
            cCIR != null
        ) {
            await api.put(`/projects/${id}/update/`, formData)
            .then((data) => {
                goToMainScreen()
            })
            .catch((error) => {
                // Mostra erros
                
            })
        }
    }
    async function saveAndContinueLater() {
        updateProject(projectId)
        if(Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                'Projeto salvo com sucesso',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        }
    }
    function finishProject() {
        updateProject(projectId)
    }

    return(
        <View style={styles.container}>
            {/* Input Fields */}
            <View style={styles.cardContainer}>
                <FileCardList 
                    cseertMatricula={certMatricula}
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
                <Button onPress={finishProject} containerStyle={{ marginVertical: 8 }} title='Finalizar' />
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