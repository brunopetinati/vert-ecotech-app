import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from '@rneui/themed'
import VertIcon from '../../assets/logo-vert-fundo-transparente.png'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [sendEmail, setSendEmail] = useState(false)

    function sendResetPasswordEmail() {
        // API request


        // Show message
        setSendEmail(true)
    }

    if(!sendEmail) {
        console.log('AMDSMKSAM')
        return (
            <SafeAreaView style={styles.screen}>
                <Image style={styles.vertIcon} source={VertIcon} resizeMode="contain"/>

                <Input 
                  value={email} 
                  onChangeText={setEmail} 
                  errorMessage={() => { 
                      if(email.length < 6) { 
                          return false 
                      }
      
                      return true
                  }}
                  leftIcon={<Ionicons color='#00AE00' size={20} name="person-outline" />} 
                  placeholder="Insira seu email" 
                />
                <Button style={styles.button} onPress={sendResetPasswordEmail}>Enviar email</Button>
            </SafeAreaView>
        )
    } else {
        return(
            <SafeAreaView style={styles.screen}>
                <Text>Enviamos um email para <Text style={styles.boldText}>{email}, acesse o link e mude sua senha</Text></Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    vertIcon: {
        height: 250, // ajuste a altura de acordo com o tamanho da imagem
        width: '100%', // defina a largura para corresponder à largura do Input
        resizeMode: 'contain', // redimensione a imagem para caber dentro do espaço disponível
    },
    boldText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    button: {
        marginTop: 32,
    },
})