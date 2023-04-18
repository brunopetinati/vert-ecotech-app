import { Button, Dialog, Input, Text } from '@rneui/themed'
import { useState } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { Width } from '../../constants/dimensions'
import api from '../../Api'
import VertMaskInput from '../../components/VertMaskInput'
import { Masks } from 'react-native-mask-input'

export default function Register({navigation}) {

    const [errorModalVisibility, setErrorModalVisibility] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [fieldErrors, setFieldErrors] = useState([])

    function fieldValidator() {
        let hasErrors = false
        setFieldErrors([])
        if(fullName.length < 6) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Digite um nome com 6 ou mais caracteres'])
            hasErrors = true
        }
        if (email.length < 6) {
            console.log(email)
            setFieldErrors(fieldErrors => [...fieldErrors, 'Digite um email com 6 caracteres ou mais'])
            hasErrors = true
        }
        if(password.length < 6) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Digite uma senha com 6 ou mais caracteres'])
            hasErrors = true
        }
        if (whatsapp.length != 15) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Digite um telefone válido'])
            hasErrors = true
        }
        if(city.length < 3) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Digite uma cidade válida'])
            hasErrors = true
        }
        if (state.length != 2) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Digite um estado válido'])
            hasErrors = true
        }
        if(password != confirmPassword) {
            setFieldErrors(fieldErrors => [...fieldErrors, 'Senhas diferentes, por favor reveja'])
            hasErrors = true
        }
        console.log(fieldErrors)
        return hasErrors
    }
    async function tryRegister() {
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
        })
    }
    function handleRegister() {
        if(fieldValidator()) {
            setErrorModalVisibility(true)
            return
        }

        tryRegister()
    }

    return(
        <>
        { errorModalVisibility ?
        <Dialog isVisible={errorModalVisibility} onBackdropPress={() => setErrorModalVisibility(false)}>
            <Dialog.Title titleStyle={styles.modalTitleStyle} title='Atenção!' />
            {fieldErrors.map((item, i) => <Text h1={true} h1Style={styles.modalItemText} key={i}>- {item}</Text>)}
        </Dialog>
        :
        <KeyboardAvoidingView style={styles.loginBox}>
            <ScrollView contentContainerStyle={{ marginTop: 64 }}>
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='person-outline'/>}
                    maxLength={100} 
                    value={fullName} 
                    setValue={setFullName} 
                    label="nome completo"
                />
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='mail-outline'/>}
                    maxLength={60} 
                    value={email} 
                    setValue={setEmail} 
                    label="email" 
                />
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='key-outline'/>}
                    maxLength={30} 
                    value={password} 
                    setValue={setPassword} 
                    label="senha" 
                />
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='key-outline'/>}
                    maxLength={30} 
                    value={confirmPassword} 
                    setValue={setConfirmPassword} 
                    label="confirmar senha" 
                />
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='logo-whatsapp'/>}
                    maxLength={15} 
                    mask={Masks.BRL_PHONE}
                    value={whatsapp} 
                    keyboardType={'numeric'}
                    setValue={setWhatsapp} 
                    label="whatsapp" 
                />
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='location-outline'/>}
                    maxLength={30} 
                    value={city} 
                    setValue={setCity} 
                    label="cidade" 
                />
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='location-outline'/>}
                    maxLength={2} 
                    value={state} 
                    setValue={setState} 
                    label="estado" 
                />
            </ScrollView>

            <Button onPress={handleRegister}>Cadastrar</Button>
        </KeyboardAvoidingView>
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
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    loginArea: {
      padding: 16,
      width: Width*0.8 
    }
})