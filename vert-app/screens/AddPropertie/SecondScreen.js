import { Button, Input } from "@rneui/themed"
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { useState } from "react"
import api from '../../Api'
import VertMaskInput from "../../components/VertMaskInput"
import { Masks } from "react-native-mask-input"
import { Height } from "../../constants/dimensions"

export default function SecondScreen({route, navigation}) {
    const { projectId } = route.params
    const yesOrNOt = ["Sim", "Não"]
    const regOrNot = ["Regularizada", "Não regularizada"]
    const sicStatus = ["Aprovado", "Em análise", "Cancelado", "Suspenso"]
    // Form fields
    const [deficetLegal, setLegalDeficet] = useState()
    const [legalReserveStatus, setLegalReserveStatus] = useState()
    const [matriculaStatus, setMatriculaStatus] = useState()
    const [sicarStatus, setSicarStatus] = useState()
    const [divida, setDivida] = useState()
    // conservation_unit ["privada", "pública", "não possui", "ambas"]

    const [hasConservationArea, setConservationArea] = useState()
    const [georeferenciamentoSigef, setgeoreferenciamentoSigef] = useState()

    async function sendProjectInfo(id) {
        //Aqui só faz update
        await api.put(`/projects/${id}/update/`, {
            "address": "",
            status_car: sicarStatus,
            matricula_status: matriculaStatus,
            georeferencing_status: georeferenciamentoSigef,
            reserve_legal_status: legalReserveStatus,
            "physical_or_legal_entity": "legal",
            "conservation_unit": "",
            "owner_actions_to_preserve_forest": "",
            legal_reserve_deficit: deficetLegal,
            "has_federal_debt": null,
            "pdf_matricula_certificate": null,
            "pdf_car": null,
            "property_polygon": null,
            "pdf_federal_debt_certificate": null,
            "pdf_ccir": null,
            "owner": 2
        })
        .then((response) => {
            navigation.navigate('Third', {projectId: projectId})
        })
        .catch((error) => {
            // Erros na tela
        })
    }
    function goToNextScreen() {
        sendProjectInfo(projectId)
    }
    function goToMainScreen() {
        navigation.navigate('Main')
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
        <>
            <KeyboardAvoidingView style={styles.container}>
                {/* Form fields */}
                <ScrollView contentContainerStyle={styles.internContainer}>
                    {/* STATUS DO SICAR */}
                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="information-circle-outline" />}
                            defaultButtonText="Status do SICAR"
                            data={sicStatus}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setSicarStatus(selectedItem)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                    {/* DEFICIT LEGAL */}
                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="information-circle-outline" />}
                            defaultButtonText="Possui déficit de reserva legal?"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setLegalDeficet(selectedItem)
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                    {/* TEM DÍVIDA? */}
                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="information-circle-outline" />}
                            defaultButtonText="Possui dívida federal?"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setDivida(selectedItem)
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                    {/* STATUS DA MATRICULA */}
                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="information-circle-outline" />}
                            defaultButtonText="Status da matrícula do imóvel"
                            data={regOrNot}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setMatriculaStatus(selectedItem)
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                    {/* GEOREFERENCIAMENTO NO SIGEF */}
                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="information-circle-outline" />}
                            defaultButtonText="Georeferenciamento no SIGEF"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setgeoreferenciamentoSigef(selectedItem)
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                    {/* SITUAÇÃO DA RESERVA LEGAL */}
                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="information-circle-outline" />}
                            defaultButtonText="Situação da reserva legal"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setLegalReserveStatus(selectedItem)
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                    {/* POSSUI UNIDADE DE CONSERVAÇÃO */}
                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="information-circle-outline" />}
                            defaultButtonText="Possui unidade de consevação?"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setConservationArea(selectedItem)
                                console.log(selectedItem, index)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                </ScrollView>
                {/* Buttons Area */}
                <View>
                    <Button onPress={goToNextScreen} containerStyle={{ marginVertical: 8 }} title='Próximo' />
                    <Button onPress={saveAndContinueLater} type="clear" title='Continuar mais tarde' />
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    internContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 8,
    },
})