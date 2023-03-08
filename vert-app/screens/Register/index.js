import { Button, Input, Text } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, KeyboardAvoidingViewBase } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Width } from '../../constants/dimensions';

export default function Register() {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    return(
        <SafeAreaView style={styles.loginBox}>
            <View style={styles.loginArea}>
                <Input 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='person-outline'/>}
                    maxLength={100} 
                    value={fullName} 
                    onChange={(event) => setFullName(event.target.value)} 
                    placeholder="full name"
                />
                <Input 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='mail-outline'/>}
                    maxLength={60} 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} 
                    placeholder="email" 
                />
                <Input 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='key-outline'/>}
                    maxLength={30} 
                    value={password} 
                    onChange={(event) => setPassword(event.target.value)} 
                    placeholder="password" 
                />
                <Input 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='logo-whatsapp'/>}
                    maxLength={10} 
                    value={whatsapp} 
                    onChange={(event) => setWhatsapp(event.target.value)} 
                    placeholder="whatsapp" 
                />
                <Input 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='location-outline'/>}
                    maxLength={30} 
                    value={city} 
                    onChange={(event) => setCity(event.target.value)} 
                    placeholder="city" 
                />
                <Input 
                    leftIcon={<Ionicons size={20} color='#93bf85' name='location-outline'/>}
                    maxLength={2} 
                    value={state} 
                    onChange={(event) => setState(event.target.value)} 
                    placeholder="state" 
                />
                <Button>Cadastrar</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    forgotPassword: {
      marginVertical: 16,
      fontSize: 16,
    },
    loginBox: {
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    loginArea: {
      padding: 16,
      width: Width*0.8 
    }
})