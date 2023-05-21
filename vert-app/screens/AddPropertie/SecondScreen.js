import { Button, Text } from "@rneui/themed"
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { useEffect, useState } from "react"
import api from '../../Api'

export default function SecondScreen({route, navigation}) {
    console.clear()
    console.log(project)
    const { userCredentials, projectId, project } = route.params
    // Opções
    const yesOrNOt = ["Sim", "Não"]
    const regOrNot = ["Regularizada", "Não regularizada"]
    const sicStatus = ["Aprovado", "Em análise", "Cancelado", "Suspenso"]
    // Form fields
    const [deficetLegal, setLegalDeficet] = useState(false)
    const [legalReserveStatus, setLegalReserveStatus] = useState(false)
    const [matriculaStatus, setMatriculaStatus] = useState('')
    const [sicarStatus, setSicarStatus] = useState('')
    const [divida, setDivida] = useState(false)
    // conservation_unit ["privada", "pública", "não possui", "ambas"]
    const [hasConservationArea, setConservationArea] = useState(false)
    const [georeferenciamentoSigef, setgeoreferenciamentoSigef] = useState('')

    useEffect(() => navigation.addListener('beforeRemove', (e) => { e.preventDefault() }))
    useEffect(() => {
        if (project != undefined) {
            setDivida(project.has_federal_debt)
            setConservationArea(project.conservation_unit)
            setLegalDeficet(project.legal_reserve_deficit)
            setLegalReserveStatus(project.reserve_legal_status)
            setMatriculaStatus(project.matricula_status)
            setSicarStatus(project.status_car)
            setgeoreferenciamentoSigef(project.georeferencing_status)
        }
    }, [])

    function makeToast(message) {
        if(Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        }
    }
    async function updateProject(id) {
        let result = false
        //Aqui só faz update
        await api.put(`/projects/${id}/update/`, {
            status_car: sicarStatus,
            matricula_status: matriculaStatus,
            georeferencing_status: georeferenciamentoSigef,
            reserve_legal_status: legalReserveStatus,
            legal_reserve_deficit: deficetLegal,
            has_federal_debt: divida,
            owner: userCredentials.id,
        })
        .then((response) => {
            result = true
            makeToast('Informações salvas')
        })
        .catch((error) => {
            // Erros na tela
            makeToast('Tente novamente mais tarde')
        })

        return result
    }
    function goToNextScreen() {
        if(updateProject(projectId)) {
            navigation.navigate('Third', {projectId: projectId, userCredentials: userCredentials, project: project})
            return
        }

        goToMainScreen()
    }
    function goToMainScreen() {
        navigation.navigate('Home')
    }
    async function saveAndContinueLater() {
        updateProject(projectId)
        goToMainScreen()
    }
    function trueOrFalse(booleanValue) {
        if (booleanValue) {
            return "Sim"
        }

        return "Não"
    }

    return(
        <>
            <KeyboardAvoidingView style={styles.container}>
                {/* Form fields */}
                <ScrollView contentContainerStyle={styles.internContainer}>
                    {/* STATUS DO SICAR */}
                    <View>
                        <Text>Status do CAR</Text>
                        <SelectDropdown 
                            defaultValue={sicarStatus}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
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
                        <Text>Possui déficit de reserva legal?</Text>
                        <SelectDropdown 
                            defaultValue={trueOrFalse(deficetLegal)}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                            defaultButtonText="Possui déficit de reserva legal?"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setLegalDeficet(trueOrFalse(selectedItem))
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
                        <Text>Possui dívida federal?</Text>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            defaultValue={trueOrFalse(divida)}
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                            defaultButtonText="Possui dívida federal?"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%'}}
                            onSelect={(selectedItem, index) => {
                                setDivida(trueOrFalse(selectedItem))
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
                        <Text>Status da matrícula do imóvel</Text>
                        <SelectDropdown 
                            defaultValue={matriculaStatus}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
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
                        <Text>Georeferenciamento no SIGEF</Text>
                        <SelectDropdown 
                            defaultValue={georeferenciamentoSigef}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
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
                        <Text>Situação da reserva legal</Text>
                        <SelectDropdown 
                            defaultValue={trueOrFalse(legalReserveStatus)}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
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
                        <Text>Possui unidade de consevação?</Text>
                        <SelectDropdown 
                            defaultValue={trueOrFalse(hasConservationArea)}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
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