import { Button, Dialog, Input, Text } from '@rneui/themed'
import { useState } from 'react'
import { StyleSheet, ScrollView, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { Width } from '../../constants/dimensions'
import api from '../../Api'
import VertMaskInput from '../../components/VertMaskInput'
import { Masks } from 'react-native-mask-input'
import CadastroLoading from '../../assets/cadastro.gif'
import LoadingAnimation from '../../components/LoadingAnimation'
import VertIcon from '../../assets/logo-vert-fundo-transparente.png'
import SelectDropdown from 'react-native-select-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register({navigation}) {
    const [isLoading, setLoading] = useState(false)
    const [errorModalVisibility, setErrorModalVisibility] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [fieldErrors, setFieldErrors] = useState([])

    const estado = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"]

    function fieldValidator() {
        let hasErrors = false
        setFieldErrors([])
        if(fullName.length < 6) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'O campo nome precisa ter pelo menos 6 caracteres. Por favor, tente novamente.'])
            hasErrors = true
        }
        if (email.length < 6) {
            console.log(email)
            setFieldErrors(fieldErrors => [...fieldErrors, 'O endereço de e-mail que você digitou é inválido. Certifique-se de digitar um endereço de e-mail válido com pelo menos 6 caracteres.'])
            hasErrors = true
        }
        if(password.length < 6) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Sua senha precisa ter pelo menos 6 caracteres. Por favor, tente criar uma senha mais longa.'])
            hasErrors = true
        }
        if (whatsapp.length != 15) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'O número de telefone que você digitou não é válido. Por favor, digite um número de telefone válido.'])
            hasErrors = true
        }
        if(city.length < 3) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Certifique-se de digitar o nome de uma cidade válida. Tente novamente, por favor.'])
            hasErrors = true
        }
        if (state.length != 2) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Certifique-se de digitar o nome de um estado válido. Por favor, tente novamente.'])
            hasErrors = true
        }
        if(password != confirmPassword) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'As <negro>senhas</negro> que você digitou não são iguais. Verifique novamente e tente novamente, por favor.'])
            hasErrors = true
        }
        console.log(fieldErrors)
        return hasErrors
    }
    async function tryRegister() {
        setLoading(true)
        await api.post('/signup/', {
            full_name: fullName,
            phone: whatsapp,
            city: city,
            state: state,
            email: email,
            password: password,
            user_type: 'regular',
          }
        ).then((response) => {
            if (response.status === 201) {
                navigation.navigate('Login')                
            } else {
                setFieldErrors(['Email já cadastrado, revise seus dados'])
            }
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }
    function handleRegister() {
        if(fieldValidator()) {
            setErrorModalVisibility(true)
            return
        }
            setErrorModalVisibility(false)
        

        tryRegister()
    }
    console.log(state)

    return(
            
        <>
           {isLoading ? <LoadingAnimation text={'Obrigado\n Sua conta foi criada!'} icon={CadastroLoading}/>
            :
            <>
            { errorModalVisibility &&
            <Dialog isVisible={errorModalVisibility} onBackdropPress={() => setErrorModalVisibility(false)}>
                <Dialog.Title titleStyle={styles.modalTitleStyle} title='Atenção!' />
                {fieldErrors.map((item, i) => <Text h1={true} h1Style={styles.modalItemText} key={i}>• {item}</Text>)}
            </Dialog>
            }
            
            <KeyboardAwareScrollView contentContainerStyle={ styles.loginBox }>
                <Image style={styles.vertIcon} source={VertIcon} resizeMode="contain"/>
                    <VertMaskInput 
                        leftIcon={<Ionicons size={20} color='#00AE00' name='person-outline'/>}
                        maxLength={100} 
                        value={fullName} 
                        setValue={setFullName} 
                        label="Nome completo"
                    />
                    <VertMaskInput 
                        leftIcon={<Ionicons size={20} color='#00AE00' name='mail-outline'/>}
                        maxLength={60} 
                        value={email} 
                        setValue={setEmail} 
                        label="Email" 
                    />
                    <VertMaskInput 
                        leftIcon={<Ionicons size={20} color='#00AE00' name='key-outline'/>}
                        maxLength={30} 
                        value={password} 
                        setValue={setPassword} 
                        label="Senha" 
                    />
                    <VertMaskInput 
                        leftIcon={<Ionicons size={20} color='#00AE00' name='key-outline'/>}
                        maxLength={30} 
                        value={confirmPassword} 
                        setValue={setConfirmPassword} 
                        label="Confirmar senha" 
                    />
                    <VertMaskInput 
                        leftIcon={<Ionicons size={20} color='#00AE00' name='logo-whatsapp'/>}
                        maxLength={15} 
                        mask={Masks.BRL_PHONE}
                        value={whatsapp} 
                        keyboardType={'numeric'}
                        setValue={setWhatsapp} 
                        label="Whatsapp"
                    />
                    <SelectDropdown 
                        dropdownIconPosition="left"
                        statusBarTranslucent
                        renderDropdownIcon={() => <Ionicons color='#00AE00' size={24} name="chevron-down-outline" />}
                        defaultButtonText="Estado"
                        dropdownStyle={{ height: 400 }} 
                        data={estado}
                        buttonStyle={{width: '100%'}}
                        onSelect={(selectedItem, index) => {
                            setState(selectedItem)
                            
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
                    <VertMaskInput 
                        leftIcon={<Ionicons size={20} color='#00AE00' name='location-outline'/>}
                        maxLength={40} 
                        value={city} 
                        setValue={setCity} 
                        label="Cidade (endreço ou geolocalização)"
                    />
                <Button onPress={handleRegister}>Cadastrar</Button>

            </KeyboardAwareScrollView>
            </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
      marginVertical: 16,
      fontSize: 16,
    },
    modalItemText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalTitleStyle: {
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 32,
    },
    loginBox: {
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    loginArea: {
      padding: 16,
      width: Width*0.8 
    },
    vertIcon: {
        height: 74, // ajuste a altura de acordo com o tamanho da imagem
        width: Width*0.8, // defina a largura para corresponder à largura do Input
        resizeMode: 'contain', // redimensione a imagem para caber dentro do espaço disponível
        marginTop: 75,
    },
})