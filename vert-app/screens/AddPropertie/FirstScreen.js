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

export default function FirstScreen({route, navigation}) {
    const { project } = route.params
    console.clear()
    console.log(project)
    const [isTutorialVisible, setTutorialVisibility] = useState(true)
    const states = [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
    ]
    // FORM
    const [title, setTitle] = useState('')
    const [userCredentials, setUserCredentials] = useState({})
    const [totalArea, setTotalArea] = useState('')
    const [totalLegalArea, setTotalLegalArea] = useState('')
    const [propertieAddress, setPropertieAddress] = useState('')
    const [cpnj, setCnpj] = useState('')
    const [sicar, setSicar] = useState('')

    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => { 
            e.preventDefault() 
        })
    )
    function removeCharsCpfOrCnpj(str) {
        return str.replace(/[./-]/g, '');
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
    
    function validateFields() {
        console.log(sicar.length)
        if (title.length < 5) {
            
        }
        if (sicar.length != 50) {
            
        }
        if (propertieAddress < 10) {

        }
        if (totalArea.length < 4) {
            
        }

        return true
    }
    function goToNextScreen() {
        if(project !== undefined) {
            console.log("ESSE PROJETO JÁ EXISTE, TÁ PREENCHIDO")
            updateProject(project.id)
        } else {
            if (validateFields()) {
                createProject()
            }
        }
    }
    function goToMainScreen() {
        navigation.navigate('Home')
    }
    async function createProject() {
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
            navigation.navigate('Second', {projectId: data.id, userCredentials: userCredentials, project: project})
        }).catch((error) => {
            console.log(error)
            //Falar que precisa preencher certo
        })
    }
    async function updateProject(id) {
        await api.put(`/projects/${id}/update/`, {
            title: title,
            owner: project.owner,
            total_area: parseFloat(totalArea),
            legal_reserve_area: parseFloat(totalLegalArea),
            address: propertieAddress,
            cnpj: cpnj,
            sicar_code: sicar,
        }).then((response) => {
            console.log("PROXIMAA")
            navigation.navigate('Second', {projectId: project.id, userCredentials: userCredentials, project: project})
            ToastAndroid.showWithGravity('Informações atualizadas', ToastAndroid.LONG, ToastAndroid.CENTER,)
        }).catch((error) => {
            console.log(error)
            console.log("DEU ERRO")
            navigation.navigate('Home')
            if(Platform.OS == 'android') {
                ToastAndroid.showWithGravity('Erro ao salvar projeto, tente novamente mais tarde', ToastAndroid.LONG, ToastAndroid.CENTER,)
            }
        })
    }
    async function saveAndContinueLater() {
        if(title != '' && totalArea != '' && totalLegalArea != '') {
            createProject()
            goToMainScreen()
    
            if(Platform.OS == 'android') {
                ToastAndroid.showWithGravity('Projeto salvo com sucesso', ToastAndroid.SHORT, ToastAndroid.CENTER,)
            }
        } else {
            navigation.navigate('Home')
            if(Platform.OS == 'android') {
                ToastAndroid.showWithGravity('Continue seu projeto com mais calma outra hora', ToastAndroid.SHORT, ToastAndroid.CENTER,)
            }
        }
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
                /> 
                </>
            }

            { !isTutorialVisible && <>
                <KeyboardAvoidingView style={styles.container}>
                    {/* Form fields */}
                    <ScrollView contentContainerStyle={styles.container}>
                    <VertMaskInput 
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
                            label="Área total da propriedade (ha)"
                            keyboardType="numeric"
                            value={totalArea}
                            maxLength={20}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="leaf-outline" />}
                            setValue={setTotalArea}
                        />
                        <VertMaskInput 
                            label="Área total da reserva legal (ha)"
                            keyboardType="numeric"
                            value={totalLegalArea}
                            maxLength={20}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="expand-outline" />}
                            setValue={setTotalLegalArea}
                        />
                        <VertMaskInput 
                            label="Endereço da propriedade"
                            value={propertieAddress}
                            maxLength={120}
                            leftIcon={<Ionicons color='#00AE00' size={20} name="map-outline" />}
                            setValue={setPropertieAddress}
                        />
                        {/* Button Area */}
                        <View>
                            <Button onPress={goToNextScreen} containerStyle={{ marginVertical: 16 }} title='Próximo' />
                            <Button onPress={saveAndContinueLater} type="clear" title='Continuar mais tarde' />
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