import { Button, Input, Text } from '@rneui/themed'
import { useState } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { validateFields } from './validation'
import { Width } from '../../constants/dimensions'
import api from '../../Api'
import VertMaskInput from '../../components/VertMaskInput'
import { Masks } from 'react-native-mask-input'

export default function Register({navigation}) {
    
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

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
            navigation.navigate('Login')
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    function handleRegister() {
        tryRegister()
    }

    return(
        <KeyboardAvoidingView style={styles.loginBox}>
            <ScrollView contentContainerStyle={{ marginTop: 64 }}>
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='person-outline'/>}
                    maxLength={100} 
                    value={fullName} 
                    setValue={setFullName} 
                    label="full name"
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
                    label="password" 
                />
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='key-outline'/>}
                    maxLength={30} 
                    value={confirmPassword} 
                    setValue={setConfirmPassword} 
                    label="Confirmar senha" 
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
                    label="city" 
                />
                <VertMaskInput 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='location-outline'/>}
                    maxLength={2} 
                    value={state} 
                    setValue={setState} 
                    label="state" 
                />
            </ScrollView>

            <Button onPress={handleRegister}>Cadastrar</Button>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
      marginVertical: 16,
      fontSize: 16,
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