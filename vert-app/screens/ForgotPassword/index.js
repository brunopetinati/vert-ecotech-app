import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from '@rneui/themed'
import VertIcon from '../../assets/logo-vert-fundo-transparente.png'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Width } from '../../constants/dimensions'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [sendEmail, setSendEmail] = useState(false)

    function sendResetPasswordEmail() {
        // API request


        // Show message
        setSendEmail(true)
    }


    return (
        <SafeAreaView style={styles.screen}>
            {
            sendEmail 
            ? 
                <SafeAreaView style={styles.screen}>
                    <Text>Enviamos um email para <Text style={styles.boldText}>{email}, acesse o link e mude sua senha</Text></Text>
                </SafeAreaView>
            :
            <View style={styles.formBox}>
                <Image style={styles.vertIcon} source={VertIcon} resizeMode="contain"/>
                <Text style={styles.title}>Esqueceu sua senha?</Text>
                <Text style={styles.description}>Insira seu email para redefinir sua senha</Text>
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
            </View>
            }
        </SafeAreaView>
    )


    
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    vertIcon: {
        height: 200, // ajuste a altura de acordo com o tamanho da imagem
        width: Width*0.75, // defina a largura para corresponder à largura do Input
        resizeMode: 'contain', // redimensione a imagem para caber dentro do espaço disponível
    },
    formBox: {
        marginHorizontal: Width*0.12,
        width: Width*0.75,
    },
    boldText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginTop: 4,
    },
    button: {
        width: Width*0.8,
        marginTop: 32,
    },
})