import { StyleSheet, ToastAndroid, View } from "react-native"
import { Button, } from "@rneui/themed"
import FileCardList from '../../components/FileCardList'
import { useEffect, useState } from "react"
import api from '../../Api'
import { WebView } from 'react-native-webview';

export default function ThirdScreen({route, navigation}) {
    const { projectId, project } = route.params
    // FORM
    const [certMatricula, setCertMatricula] = useState(null) //aceita .pdf
    const [carSicar, setCarSicar] = useState(null) //aceita .pdf
    const [propertyPolygon, setPropertyPolygon] = useState(null) //aceita .kmz ou .kml
    const [cCIR, setCCIR] = useState(null) //aceita .pdf
    const [regularityCertificate, setRegularityCertificate] = useState(null) //aceita .pdf

    useEffect(() => navigation.addListener('beforeRemove', (e) => { e.preventDefault() }))
    useEffect(() => {
        setCertMatricula(project.pdf_matricula_certificate)
        setCarSicar(project.pdf_car)
        setPropertyPolygon(project.property_polygon)
        setCCIR(project.pdf_ccir)
        setRegularityCertificate(project.pdf_federal_debt_certificate)
    }, [])

    function makeText(message) {
        if(Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        }
    }
    function goToMainScreen() {
        navigation.navigate('Home')
        makeText('Projeto salvo com sucesso')
    }
    async function updateProject(id) {
        var formData = new FormData()
        // Inserindo nossos arquivos se não forem nulls para um bagui multipartForm
        if(certMatricula) {
            formData.append('pdf_matricula_certificate', certMatricula.formData)
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

        if
        (
            certMatricula != null || 
            carSicar != null ||	
            propertyPolygon != null || 
            regularityCertificate != null || 
            cCIR != null
        ) {
            console.log(project.owner)
            console.log(id)
            formData.append('owner', project.owner)
            
            await api.put(`/projects/${id}/update/`, formData)
            .then((data) => {
                goToMainScreen()
            })
            .catch((error) => {
                // Mostra erros
                console.table(error)
                makeText('Tente novamente mais tarde')
            })
        } else {
            console.log('IHUHAIHSIDASHIDS')
        }
    }
    async function saveAndContinueLater() {
        //updateProject(projectId)
        navigation.navigate('Home')
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
                <WebView
                    style={styles.container}
                    source={{ uri: 'https://plataforma.vertecotech.com/open_upload' }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#fff',
    },
    cardContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    }
})