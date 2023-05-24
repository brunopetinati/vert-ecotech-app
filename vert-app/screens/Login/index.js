import { StyleSheet, SafeAreaView, View, Platform, PermissionsAndroid, Image } from "react-native"
import { Button, Input, Text } from '@rneui/themed'
import { Width } from "../../constants/dimensions"
import { Ionicons } from '@expo/vector-icons'
import api from '../../Api'
import { useState, useEffect } from 'react'
import { getData, storeData } from '../../Storage'
import * as Permissions from 'expo-permissions';
import LoadingAnimation from "../../components/LoadingAnimation"
import PlantaLoading from '../../assets/leaf_animation.gif'
import VertIcon from '../../assets/logo-vert-fundo-transparente.png'
import * as MediaLibrary from 'expo-media-library'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function Login({navigation}) {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  console.log(permissionResponse)

  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isPasswordVisible, setPasswordVisibility] = useState(true)
  const [passwordEye, setPasswordEye] = useState('eye-off-outline')
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
    console.log("AAAAAAA")
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Permissão para ler documentos',
        message:
          'Pedimos permissão para seus arquivos para poder enviar seus documentos referentes aos projetos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera')
    } else {
      console.log('Camera permission denied')
    }
  }

  async function askPermissions() {
    const permssions = await MediaLibrary.getPermissionsAsync()
    const hasAsked = await MediaLibrary.requestPermissionsAsync()
    console.log(hasAsked)
    console.log(permssions)
    // if(Platform.OS == 'android') {
    //   console.log("TO NUM ANDROID")
    //   askAndroidPermission()
    // }
  }
  useEffect(() => {
    
    askPermissions()

    async function fetchData() {
      const permissions = await requestPermission()
      console.log(permissionResponse)
      const data = JSON.parse(await getData('userCredentials'))
      // if(data != null) {
      //   setEmail(data.email)
      // }
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
        <KeyboardAwareScrollView contentContainerStyle={styles.loginBox}>

          <View style={styles.loginArea}>
            <Image style={styles.vertIcon} source={VertIcon} resizeMode="contain"/>
            <Input 
              autoCapitalize="none"
              value={email} 
              keyboardType="email-address"
              onChangeText={setEmail} 
              errorMessage={emailError} 
              leftIcon={<Ionicons color='#00AE00' size={20} name="person-outline" />} 
              placeholder="email" 
            />
            <Input 
              value={password} 
              autoCapitalize="none"
              onChangeText={setPassword} 
              errorMessage={passwordError} 
              leftIcon={<Ionicons color='#00AE00' size={20} name="key-outline" />} 
              rightIcon={<Ionicons onPress={() => { 
                if (isPasswordVisible) {
                  setPasswordEye('eye-outline')
                  setPasswordVisibility(false)
                } else {
                  setPasswordEye('eye-off-outline')
                  setPasswordVisibility(true)
                }
              }} color='#00AE00' size={20} name={passwordEye} />} 
              secureTextEntry={isPasswordVisible}  placeholder="senha" 
            />

            <Text onPress={() => navigation.navigate('ForgotPassword')} style={{ fontStyle: 'italic' }}>Esqueceu sua senha?</Text>

            <Button containerStyle={{marginVertical: 16}} onPress={handleLogin}>Login</Button>
            <Button type='outline' onPress={() => navigation.navigate('Register')}>Cadastrar</Button>
          </View>

        </KeyboardAwareScrollView>
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
    },
    vertIcon: {
      height: 250, // ajuste a altura de acordo com o tamanho da imagem
      width: '100%', // defina a largura para corresponder à largura do Input
      resizeMode: 'contain' // redimensione a imagem para caber dentro do espaço disponível
    },
})