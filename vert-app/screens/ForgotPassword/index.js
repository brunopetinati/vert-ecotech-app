import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from '@rneui/themed'
import VertIcon from '../../assets/logo-vert-fundo-transparente.png'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Width } from '../../constants/dimensions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('')
    const [sendEmail, setSendEmail] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    function sendResetPasswordEmail() {
        if (email.length >= 6 && email.includes("@")) {
            // API request

            // Show message
            setSendEmail(true)

            return
        }
        setPasswordError('Insira um endereço de email válido')

        setTimeout(() => {
            setPasswordError('')
        }, 3000);



    }


    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.screen}>
            {
            sendEmail 
            ? 
                <SafeAreaView style={styles.screen}>
                    <View style={styles.formBox}>
                        <Image style={styles.vertIcon} source={VertIcon} resizeMode="contain"/>
                        <Text style={{ fontSize: 16, marginTop: 32, marginBottom: 24, }}>Enviamos um email para <Text style={styles.boldText}>{email}, acesse o link e mude sua senha</Text></Text>
                        <Button type='outline' style={{ width: Width*0.75, marginTop: 48, }} onPress={() => navigation.navigate('Login')}>Voltar para tela inicial</Button>
                    </View>
                </SafeAreaView>
            :
            <View style={styles.formBox}>
                <Image style={styles.vertIcon} source={VertIcon} resizeMode="contain"/>
                <Text style={styles.title}>Esqueceu sua senha?</Text>
                <Text style={styles.description}>Insira seu email para redefinir sua senha.</Text>
                <Input 
                    value={email} 
                    onChangeText={setEmail} 
                    errorMessage={passwordError}
                    leftIcon={<Ionicons color='#00AE00' size={20} name="person-outline" />} 
                    placeholder="Insira seu email" 
                />
                <Button style={styles.button} onPress={sendResetPasswordEmail}>Enviar</Button>
                <Button type='outline' style={{ width: Width*0.75, marginTop: 16, }} onPress={() => navigation.navigate('Login')}>Voltar</Button>
            </View>
            }
        </KeyboardAwareScrollView>
    )


    
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center',
    },
    vertIcon: {
        height: 128, // ajuste a altura de acordo com o tamanho da imagem
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
        marginTop: 32,
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    description: {
        fontSize: 16,
        marginTop: 24,
        marginBottom: 24,
    },
    button: {
        width: Width*0.75,
        marginTop: 32,
    },
})