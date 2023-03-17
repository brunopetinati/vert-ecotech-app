import { Button, Input } from "@rneui/themed";
import { SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'

export default function SecondScreen({navigation}) {
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    return(
        <SafeAreaView style={styles.container}>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="person-outline" />} placeholder="CNPJ do proprietário"/>
            <SelectDropdown
                dropdownStyle={{ width: '100%', }}
                data={countries}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="logo-whatsapp" />} placeholder="Status da matrícula"/>
            <Input maxLength={50} leftIcon={<Ionicons color='#93bf85' size={20} name="mail-outline" />} placeholder="Código da matricula"/>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="leaf-outline" />} placeholder="Área total da propriedade (ha)?"/>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="expand-outline" />} placeholder="Área total da reserva legal (ha)?"/>
            <Input leftIcon={<Ionicons color='#93bf85' size={20} name="map-outline" />} placeholder="Endereço da propriedade?"/>

            <Button onPress={() => navigation.navigate('Third')} containerStyle={{ marginVertical: 16 }} title='Continuar' />
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