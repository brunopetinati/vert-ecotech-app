import { Button, Input } from "@rneui/themed";
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { useState } from "react";
import VertMaskInput from "../../components/VertMaskInput";
import { Masks } from "react-native-mask-input";

export default function SecondScreen({navigation}) {
    const deficetLegal = ["Sim", "Não"]
    const countries = ["Ativa", "Inativa"]
    const [cpnj, setCnpj] = useState('')
    const [sicar, setSicar] = useState('')
    const [cod, setCod] = useState('')
    
    return(
        <>
            <KeyboardAvoidingView style={styles.container}>
                {/* Form fields */}
                <ScrollView contentContainerStyle={{ marginTop: 8 }}>
                    <VertMaskInput 
                        label="CNPJ do proprietário"
                        value={cpnj}
                        maxLength={100}
                        mask={Masks.BRL_CNPJ}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="person-outline" />}
                        setValue={setCnpj}
                    />

                    <VertMaskInput 
                        label="Código da matrícula"
                        value={cod}
                        maxLength={150}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="reader-outline" />}
                        setValue={setCod}
                    />

                    <VertMaskInput 
                        label="Código SICAR"
                        value={sicar}
                        maxLength={150}
                        leftIcon={<Ionicons color='#93bf85' size={20} name="leaf-outline" />}
                        setValue={setSicar}
                    />

                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#93bf85' size={24} name="information-circle-outline" />}
                            defaultButtonText="Status do SICAR"
                            data={deficetLegal}
                            buttonStyle={{width: '100%'}}
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
                    </View>

                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#93bf85' size={24} name="information-circle-outline" />}
                            defaultButtonText="Possui déficit de reserva legal?"
                            data={deficetLegal}
                            buttonStyle={{width: '100%'}}
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
                    </View>

                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#93bf85' size={24} name="information-circle-outline" />}
                            defaultButtonText="Possui dívida federal?"
                            data={deficetLegal}
                            buttonStyle={{width: '100%'}}
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
                    </View>

                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#93bf85' size={24} name="information-circle-outline" />}
                            defaultButtonText="Status da matrícula"
                            data={countries}
                            buttonStyle={{width: '100%'}}
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
                    </View>

                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#93bf85' size={24} name="information-circle-outline" />}
                            defaultButtonText="Georeferenciamento no SIGEF"
                            data={deficetLegal}
                            buttonStyle={{width: '100%'}}
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
                    </View>

                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#93bf85' size={24} name="information-circle-outline" />}
                            defaultButtonText="Situação da reserva legal"
                            data={deficetLegal}
                            buttonStyle={{width: '100%'}}
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
                    </View>

                    <View>
                        <SelectDropdown 
                            dropdownIconPosition="left"
                            statusBarTranslucent
                            renderDropdownIcon={() => <Ionicons color='#93bf85' size={24} name="information-circle-outline" />}
                            defaultButtonText="Possui unidade de consevação?"
                            data={deficetLegal}
                            buttonStyle={{width: '100%'}}
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
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {/* Buttons Area */}
            <View>
                <Button onPress={() => navigation.navigate('Third')} containerStyle={{ marginVertical: 8 }} title='Continuar' />
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
    }
})