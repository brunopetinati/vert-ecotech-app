import { Button } from "@rneui/themed";
import { KeyboardAvoidingView, ScrollView, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Masks } from 'react-native-mask-input';
import { useEffect, useState } from "react";
import { Platform, ToastAndroid } from 'react-native'
import VertMaskInput from "../../components/VertMaskInput";
import api from '../../Api'
import { getData } from '../../Storage'

export default function FirstScreen({navigation}) {
    const [userCredentials, setUserCredentials] = useState({})
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [totalArea, setTotalArea] = useState('')
    const [totalLegalArea, setTotalLegalArea] = useState('')
    const [propertieAddress, setPropertieAddress] = useState('')

    useEffect(() => {
        async function getUserData() {
            const userData = JSON.parse(await getData('userCredentials'))
            setUserCredentials(userData)
        }

        getUserData()
    }, [])
    function goToNextScreen() {
        navigation.navigate('Second')
    }
    function goToMainScreen() {
        navigation.pop()
    }
    async function createProject() {
        api.post('/projects/', {
            address: propertieAddress,
            legal_reserve_area: totalLegalArea,
            owner: userCredentials.id,
            reserve_legal_status: totalLegalArea,
            total_area: totalArea,
        }).then((response) => {

        }).catch((error) => {

        })
    }
    async function saveAndContinueLater() {
        goToMainScreen()
        if(Platform.OS == 'android') {
            ToastAndroid.showWithGravity(
                'Projeto salvo com sucesso',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
        } else {
            
        }
    }
    
    return(
        <>
            <KeyboardAvoidingView style={styles.container}>
                {/* Form fields */}
                <ScrollView contentContainerStyle={styles.container}>
                    <VertMaskInput 
                        label="Nome do proprietário"
                        value={name}
                        maxLength={100}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="person-outline" />}
                        setValue={setName}
                    />
                    <VertMaskInput 
                        label="Whatsapp"
                        keyboardType="numeric"
                        value={whatsapp}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="logo-whatsapp" />}
                        setValue={setWhatsapp}
                        mask={Masks.BRL_PHONE}
                    />
                    <VertMaskInput 
                        label="Email do proprietário"
                        keyboardType="email-address"
                        value={email}
                        maxLength={20}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="mail-outline" />}
                        setValue={setEmail}
                    />
                    <VertMaskInput 
                        label="Área total da propriedade (ha)"
                        keyboardType="numeric"
                        value={totalArea}
                        maxLength={20}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="leaf-outline" />}
                        setValue={setTotalArea}
                    />
                    <VertMaskInput 
                        label="Área total da reserva legal (ha)"
                        keyboardType="numeric"
                        value={totalLegalArea}
                        maxLength={20}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="expand-outline" />}
                        setValue={setTotalLegalArea}
                    />
                    <VertMaskInput 
                        label="Endereço da propriedade"
                        value={propertieAddress}
                        maxLength={120}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="map-outline" />}
                        setValue={setPropertieAddress}
                    />
                    {/* Button Area */}
                    <View>
                        <Button onPress={goToNextScreen} containerStyle={{ marginVertical: 16 }} title='Continuar' />
                        <Button onPress={saveAndContinueLater} type="clear" title='Continuar mais tarde' />
                    </View>
                </ScrollView>   
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: Platform.OS === 'ios' ? 16 : 24,
    },
})