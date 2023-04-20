import { StyleSheet, SafeAreaView, View, Platform, PermissionsAndroid } from "react-native"
import { Button, Input, Text } from '@rneui/themed'
import { Width } from "../../constants/dimensions"
import { Ionicons } from '@expo/vector-icons'
import api from '../../Api'
import { useState, useContext, useEffect } from 'react'
import { getData, storeData } from '../../Storage'
import LoadingAnimation from "../../components/LoadingAnimation"
import PlantaLoading from '../../assets/leaf_animation.gif'

export default function Login({navigation}) {
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isPasswordVisible, setPasswordVisibility] = useState(true)

  function cleanLoginData() {
    setTimeout(() => {
      setEmailError("")
      setPasswordError("") 
    }, 5000)
  }

  async function tryLogin() {
    console.log(`email -> ${email} / senha -> ${password}`)
    await api.post('/login/', {
      email: email,
      password: password
    }).then((response) => {
      storeData('userCredentials', response.data)
      navigation.navigate('Main')
    }).catch((error) => {
      console.log(error)
      setEmailError("Revise o endereço de email informado")
      setPasswordError("Revise a senha informada")
      setLoading(false)
    })
    cleanLoginData()
  }

  async function askAndroidPermission () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Vert App, permissão de arquivos',
          message:
            'Precisamos das opções de ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      )
      // Checa o que a permissõ
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function askPermissions() {
    if(Platform.OS == 'android') {
      askAndroidPermission()
    }
  }
  useEffect(() => {
    askPermissions()

    async function fetchData() {
      const data = JSON.parse(await getData('userCredentials'))
      if(data != null) {
        setEmail(data.email)
      }
    }

    fetchData()
  }, [])

  function handleLogin() {
    if (email.length > 6 && password.length > 5) {
      setLoading(true)
      tryLogin() 
    } 
    if (email.length <= 6) {
      setEmailError("Email menor que 6 caracteres")
      cleanLoginData()
    }
    if (password.length < 6) {
      setPasswordError("Senha menor que 6 caracteres")
      cleanLoginData()
    }
  }

    return(
      <>
      {!isLoading ?
        <SafeAreaView style={styles.loginBox}>

          <View style={styles.loginArea}>
            <Input 
              value={email} 
              onChangeText={setEmail} 
              errorMessage={emailError} 
              leftIcon={<Ionicons color='#93bf85' size={20} name="person-outline" />} 
              placeholder="email" 
            />
            <Input 
              value={password} 
              onChangeText={setPassword} 
              errorMessage={passwordError} 
              leftIcon={<Ionicons color='#93bf85' size={20} name="key-outline" />} 
              rightIcon={<Ionicons onPress={() => { 
                if (isPasswordVisible) {
                  setPasswordVisibility(false)
                } else {
                  setPasswordVisibility(true)
                }
              }} color='#93bf85' size={20} name="eye-outline" />} 
              secureTextEntry={isPasswordVisible}  placeholder="senha" 
            />

            <Text>Esqueceu sua senha?</Text>

            <Button containerStyle={{marginVertical: 16}} onPress={handleLogin}>Login</Button>
            <Button type='outline' onPress={() => navigation.navigate('Register')}>Cadastrar</Button>
          </View>

        </SafeAreaView>
        : <LoadingAnimation icon={PlantaLoading} text='Entrando...'/>}
        </>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
      marginVertical: 16,
      fontSize: 16,
    },
    loginBox: {
      flex: 1, 
      justifyContent: "center",
      alignItems: "center",
    },
    loginArea: {
      padding: 16,
      width: Width*0.8 
    }
})