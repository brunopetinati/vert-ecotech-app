import { Button, Input } from "@rneui/themed";
import { KeyboardAvoidingView, ScrollView, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { Masks } from 'react-native-mask-input';
import React, { useState } from "react";
import VertMaskInput from "../../components/VertMaskInput";

export default function FirstScreen({navigation}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [totalArea, setTotalArea] = useState('')
    const [totalLegalArea, setTotalLegalArea] = useState('')
    const [propertieAddress, setPropertieAddress] = useState('')

    return(
        <>
            <KeyboardAvoidingView style={styles.container}>
                {/* Form fields */}
                <ScrollView contentContainerStyle={{ marginTop: 16 }}>
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
                </ScrollView>
            </KeyboardAvoidingView>
            {/* Button Area */}
            <View>
                <Button onPress={() => navigation.navigate('Second')} containerStyle={{ marginVertical: 16 }} title='Continuar' />
                <Button type="clear" title='Continuar mais tarde' />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 32,
    },
})