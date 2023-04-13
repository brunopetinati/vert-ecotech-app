import AsyncStorage from '@react-native-async-storage/async-storage'

export async function storeData(key, value) {
    console.log(`${key}: ${value}`)
    const formatedValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, formatedValue)
}

export async function getData(key) {
    const data = await AsyncStorage.getItem(key)
    console.log(data)
    return data
}

export default function deleteData(key) {
    
}