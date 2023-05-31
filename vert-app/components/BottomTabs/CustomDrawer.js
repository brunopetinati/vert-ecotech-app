import { View, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import VertBackground from '../../assets/fundo.jpg'
import { Height } from '../../constants/dimensions';

export default function CustomDrawer(props) {
  return (
    <View>
        <ImageBackground style={styles.vertBackground} source={VertBackground}/>
        <DrawerItemList {...props}/>
        <View style={styles.exitArea}>
            <Ionicons style={styles.exitImage} name="exit-outline" color="#00AE00" size={40} />
            <Text style={styles.exitText}>Sair</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    userArea: {

    },
    vertBackground: {
        height: Height*0.4,
        width: '100%',
    },
    exitArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly', 
        width: '80%',
    },
    exitImage: {

    },
    exitText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
})