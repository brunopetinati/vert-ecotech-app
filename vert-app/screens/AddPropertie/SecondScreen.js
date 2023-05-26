import { Button, Text } from "@rneui/themed"
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import { useEffect, useState } from "react"
import api from '../../Api'
import Toast from "react-native-root-toast"

export default function SecondScreen({route, navigation}) {
    console.clear()
    const { userCredentials, projectId, project } = route.params
    console.log(project)

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

    useEffect(() => navigation.addListener('beforeRemove', (e) => { e.preventDefault() }))
    useEffect(() => {
        if (project != undefined) {
            setDivida(project.has_federal_debt)
            setConservationArea(project.conservation_unit)
            setLegalDeficet(project.legal_reserve_deficit)
            setLegalReserveStatus(project.reserve_legal_status)
            setMatriculaStatus(project.matricula_status)
            setSicarStatus(project.status_car)
        }
    }, [])

    function makeToast(message) {
        // Add a Toast on screen
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM
        })
    }
    async function updateProject(id) {
        let result = false
        //Aqui só faz update
        await api.put(`/projects/${id}/update/`, {
            status_car: sicarStatus,
            conservation_unit: hasConservationArea,
            matricula_status: matriculaStatus,
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
            console.log(error)
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
                    <View style={styles.box}>
                        <Text style={styles.title}>Status do CAR</Text>
                        <SelectDropdown 
                            buttonTextStyle={{textAlign: 'left', fontSize: 16, color: '#666'}}
                            defaultValue={sicarStatus}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                            defaultButtonText="Selecione uma opção"
                            data={sicStatus}
                            buttonStyle={{width: '100%', backgroundColor: '#fff'}}
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
                    <View style={styles.box}>
                        <Text style={styles.title}>Possui déficit de reserva legal?</Text>
                        <SelectDropdown 
                            buttonTextStyle={{textAlign: 'left', fontSize: 16, color: '#666'}}
                            defaultValue={trueOrFalse(deficetLegal)}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                            defaultButtonText="Selecione uma opção"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%',backgroundColor: '#fff'}}
                            onSelect={(selectedItem, index) => {    
                                if (selectedItem == 'Sim') {
                                    setLegalDeficet(true)
                                } else {
                                    setLegalDeficet(false)   
                                }
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
                    <View style={styles.box}>
                        <Text style={styles.title}>Possui dívida federal?</Text>
                        <SelectDropdown 
                            dropdownIconPosition='left'
                            statusBarTranslucent
                            buttonTextStyle={{textAlign: 'left', fontSize: 16, color: '#666'}}
                            defaultValue={trueOrFalse(divida)}
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                            defaultButtonText="Selecione uma opção"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%', backgroundColor: '#fff'}}
                            onSelect={(selectedItem, index) => {
                                if (selectedItem == 'Sim') {
                                    setDivida(true)
                                } else {
                                    setDivida(false)   
                                }
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
                    <View style={styles.box}>
                        <Text style={styles.title}>Status da matrícula do imóvel</Text>
                        <SelectDropdown 
                            buttonTextStyle={{textAlign: 'left', fontSize: 16, color: '#666'}}
                            defaultValue={matriculaStatus}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                            defaultButtonText="Selecione uma opção"
                            data={regOrNot}
                            buttonStyle={{width: '100%', backgroundColor: '#fff'}}
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
                    {/* SITUAÇÃO DA RESERVA LEGAL */}
                    <View style={styles.box}>
                        <Text style={styles.title}>Situação da reserva legal</Text>
                        <SelectDropdown 
                            buttonTextStyle={{textAlign: 'left', fontSize: 16, color: '#666'}}
                            defaultValue={trueOrFalse(legalReserveStatus)}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                            defaultButtonText="Selecione uma opção"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%', backgroundColor: '#fff'}}
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
                    <View style={styles.box}>
                        <Text style={styles.title}>Possui unidade de consevação?</Text>
                        <SelectDropdown 
                            buttonTextStyle={{textAlign: 'left', fontSize: 16, color: '#666'}}
                            defaultValue={trueOrFalse(hasConservationArea)}
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                            defaultButtonText="Selecione uma opção"
                            data={yesOrNOt}
                            buttonStyle={{width: '100%', backgroundColor: '#fff'}}
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
                    <Button onPress={saveAndContinueLater} type="outline" title='Continuar mais tarde' />
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
        backgroundColor: '#fff',
    },
    internContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    box: {
        marginBottom: 8
    }
})