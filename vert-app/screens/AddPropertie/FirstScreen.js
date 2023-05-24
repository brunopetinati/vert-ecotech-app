import { Button, Text } from "@rneui/themed";
import { KeyboardAvoidingView, ScrollView, View, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Masks } from 'react-native-mask-input';
import { useEffect, useState } from "react";
import { Platform, ToastAndroid } from 'react-native'
import VertMaskInput from "../../components/VertMaskInput";
import api from '../../Api'
import { getData } from '../../Storage'
import Onboarding from 'react-native-onboarding-swiper';
import { useContext } from "react";
import {Width} from '../../constants/dimensions'
import Toast from 'react-native-root-toast';

export default function FirstScreen({route, navigation}) {
    const { project } = route.params
    const [isTutorialVisible, setTutorialVisibility] = useState(true)
    
    // TOAST
    const showToast = useContext(Toast)
    
    // FORM
    const [hasChanges, setChanges] = useState(false)
    const [title, setTitle] = useState('')
    const [userCredentials, setUserCredentials] = useState({})
    const [totalArea, setTotalArea] = useState('')
    const [totalLegalArea, setTotalLegalArea] = useState('')
    const [propertieAddress, setPropertieAddress] = useState('')
    const [cpnj, setCnpj] = useState('')
    const [sicar, setSicar] = useState('')
    const [errorArray, setErrorArray] = useState([
        {title : 'Insira um título relevante para se lembrar do projeto (Ex: Fazenda Santa Cecília).'},
        {totalArea : 'Área total do projeto deve ser '},
        {areaLegalTotal : 'Insira um título relevante para se lembrar do projeto (Ex: Fazenda Santa Cecília).'},
    ])
    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => { 
            e.preventDefault() 
        })
    )
    function removeCharsCpfOrCnpj(str) {
        return str.replace(/[./-]/g, '');
    }
    function maskHectares(text) {
        var hectares = parseFloat(text)
        return ((hectares.toFixed(2)).toString())
    }
    useEffect(() => {
        async function getUserData() {
            const userData = JSON.parse(await getData('userCredentials'))
            setUserCredentials(userData)
        }
        if (project !== undefined) {
            // Coloca nos inputs
            setTutorialVisibility(false)
            setTitle(project.title)
            setTotalArea(project.total_area.toString())
            setTotalLegalArea(project.legal_reserve_area.toString())
            setCnpj(removeCharsCpfOrCnpj(project.cnpj))
            setSicar(removeCharsCpfOrCnpj(project.sicar_code))
            setPropertieAddress(project.address)
            
        }
        getUserData()
    }, [])
    function makeToast(message) {
        // Add a Toast on screen
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM
        })
    }
    function validateFields() {
        let isValid = true

        if (title.length < 5) {
            

            isValid = false    
        }
        if (sicar.length != 50) {
            

            isValid = false    
        }
        if (propertieAddress.length < 10) {
            

            isValid = false
        }
        if (totalArea.length < 4) {
            

            isValid = false
        }

        return isValid
    }

    // API Requests
    async function createProject() {
        let result = false

        await api.post('/projects/', {
            title: title,
            owner: userCredentials.id,
            total_area: totalArea,
            legal_reserve_area: totalLegalArea,
            address: propertieAddress,
            cnpj: cpnj,
            sicar_code: sicar,
        }).then(({data}) => {
            console.log(data)
            result = true
        }).catch((error) => {
            console.log(error)
            result = false
        })

        return result
    }
    async function updateProject(id) {
        let result = false

        await api.put(`/projects/${id}/update/`, {
            title: title,
            owner: project.owner,
            total_area: parseFloat(totalArea),
            legal_reserve_area: parseFloat(totalLegalArea),
            address: propertieAddress,
            cnpj: cpnj,
            sicar_code: sicar,
        }).then((response) => {
            result = true
        }).catch((error) => {
            result = false
        })

        return result
    }

    // Buttons actions
    async function saveAndContinueLater() {
        if (project != undefined) {
            if (!updateProject(project.id)) {
                makeToast('Erro ao salvar projeto, tente novamente mais tarde!')
            } else {
                makeToast('Atualizado')
            }
        } else {
            if(title != '' && totalArea != '' && totalLegalArea != '') {
                if (!createProject()) {
                    makeToast('Erro ao salvar projeto, tente novamente mais tarde!')
                } else {
                    makeToast('Projeto criado com sucesso, continue mais tarde para analisarmos seu projeto')
                }
            } else {
                makeToast('Continue seu projeto com mais calma outra hora')
            }
        }

        navigation.navigate('Home')
    }
    function goToNextScreen() {
        if(project != undefined) {
            if (!updateProject(project.id)) {
                makeToast('Erro ao salvar projeto, tente novamente mais tarde!')
                navigation.navigate('Home')

                return
            } else {
                makeToast('Sincronizando.')
            }
        }
        else {
            if (validateFields()) {
                if (!createProject()) {
                    makeToast('Erro ao salvar projeto, tente novamente mais tarde!')
                    navigation.navigate('Home')

                    return
                } else {
                    makeToast('Informações')
                }
            } else {
                makeToast('Preencha todos os campos completamente')
                return
            }
        }

        navigation.navigate('Second', {projectId: project.id, userCredentials: userCredentials, project: project})
    }

    return(
        <>
            { isTutorialVisible && 
                <>
                <Onboarding 
                    pages={[
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.onboardingImages} source={require('../../assets/test_drone.gif')} />,
                            title: 'Vamos iniciar um projeto! ',
                            subtitle: 'Para iniciar um projeto, é necessário realizar uma análise prévia da documentação referente à área em questão. ',
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.onboardingImages} source={require('../../assets/documents.gif')} />,
                            title: 'Envio de documentos ',
                            subtitle: 'Ao enviar os dados, nosso time fará uma pré-análise para verificar o potencial de geração de créditos de carbono. O envio de mais documentos pode aumentar a precisão da avaliação. ',
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.onboardingImages} source={require('../../assets/documents.gif')} />,
                            title: 'Documentos obrigatórios ',
                            subtitle: <Text style={{fontSize: 16, paddingHorizontal: 16}}>{'É importante citar que nosso time só conseguirá analisar um projeto com no mínimo os seguintes dados:\n\n - CAR(SICAR) \n - Polígono da propriedade (KML/KMZ) \n - Cópia do CCIR  \n - Número do SIGEF \n\nLembrando que quanto mais informções, mais precisa será a análise por parte de nosso time.'}</Text>,
                        },
                        {
                            backgroundColor: '#fff',
                            image: <Image style={styles.onboardingImages} source={require('../../assets/teste_floresta.gif')} />,
                            title: <Text style={{fontSize: 32}}>Vamos começar</Text>,
                            subtitle: '',
                        },
                    ]}
                    onSkip={() => {
                        setTutorialVisibility(false) 
                    }}
                    
                    skipLabel={<Text>Pular</Text>}
                    nextLabel={<Text>Próximo</Text>}
                    onDone={() =>{
                        console.log("Finalizr")
                        setTutorialVisibility(false) 
                    }}
                    DoneButtonComponent={() => <Text style={{ marginRight: Width*0.05, fontSize: 18, fontWeight: 'bold' }}>Iniciar</Text>}
                /> 
                </>
            }
            { !isTutorialVisible && <>
                <KeyboardAvoidingView style={styles.container}>
                    {/* Form fields */}
                    <ScrollView contentContainerStyle={styles.container}>
                    <VertMaskInput 
                            setChanges={setChanges}
                            label="Insira um título para esse projeto"
                            value={title}
                            maxLength={50}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="text-outline" />}
                            setValue={setTitle}
                        />
                        <VertMaskInput 
                            label="CNPJ do proprietário"
                            value={cpnj}
                            maxLength={100}
                            mask={Masks.BRL_CNPJ}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="person-outline" />}
                            setValue={setCnpj}
                        />

                        <VertMaskInput 
                            label="Código SICAR"
                            value={sicar}
                            maxLength={150}
                            //'99-9999999-9999.9999.9999.9999.9999.9999.9999.9999'
                            mask={[/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, 
                                    '-', 
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, 
                                    '-',
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/,/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, 
                                    '.',
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, 
                                    '.',
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/,/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, 
                                    '.',    
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/,
                                    '.',
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/,/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, 
                                    '.',
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, 
                                    '.',
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/,/[a-zA-Z0-9]/, /[a-zA-Z0-9]/, 
                                    '.',
                                    /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/, /[a-zA-Z0-9]/,
                                ]}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="leaf-outline" />}
                            setValue={setSicar}
                        />

                        <VertMaskInput 
                            label="Área total da propriedade (hectares)"
                            keyboardType="decimal-pad"
                            value={totalArea}
                            maxLength={9}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="scan-outline" />}
                            setValue={setTotalArea}
                        />
                        <VertMaskInput 
                            label="Área total da reserva legal (hectares)"
                            keyboardType="decimal-pad"
                            value={totalLegalArea}
                            maxLength={9}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="expand-outline" />}
                            setValue={setTotalLegalArea}
                        />
                        <VertMaskInput 
                            label="Endereço ou geolocalização da propriedade"
                            value={propertieAddress}
                            maxLength={120}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="map-outline" />}
                            setValue={setPropertieAddress}
                        />
                        {/* Button Area */}
                        <View>
                            <Button onPress={goToNextScreen} containerStyle={{ marginVertical: 16 }} title='Próximo' />
                            <Button onPress={saveAndContinueLater} type="outline" title='Continuar mais tarde' />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: Platform.OS === 'ios' ? 16 : 20,
    },
    onboardingImages: {
        width: '75%',
        height: 256
    },
})