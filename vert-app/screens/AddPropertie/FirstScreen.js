import { Button, Input } from "@rneui/themed";
import { SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function FirstScreen({navigation}) {
    return(
        <SafeAreaView style={styles.container}>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="person-outline" />} placeholder="Nome do proprietário da área"/>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="logo-whatsapp" />} placeholder="Whatsappp do proprietário"/>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="mail-outline" />} placeholder="Email do proprietário"/>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="leaf-outline" />} placeholder="Área total da propriedade (ha)?"/>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="expand-outline" />} placeholder="Área total da reserva legal (ha)?"/>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="map-outline" />} placeholder="Endereço da propriedade?"/>

            <Button onPress={() => navigation.navigate('Second')} containerStyle={{ marginVertical: 16 }} title='Continuar' />
            <Button type="clear" title='Continuar mais tarde' />
        </SafeAreaView>
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