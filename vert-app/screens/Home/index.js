import { Dialog, FAB } from "@rneui/themed"
import { useState, useEffect } from "react"
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native"
import ListItem from "../../components/ListItem"
import WelcomeHeader from "../../components/WelcomeHeader"
import { Ionicons } from '@expo/vector-icons';
import { Height, Width } from "../../constants/dimensions"

export default function Home() {
    const [ propertiesList, setPropertiesList ] = useState([
        {
            id: 0,
            title: 'Fazenda de marn',
            subtitle: 'R$ 45.000,00'
        },
        {
            id: 1,
            title: 'Fazenda de itatiba',
            subtitle: 'R$ 25.000,00'
        },
        {
            id: 2,
            title: 'Fazenda do pai',
            subtitle: 'R$ 245.000,00'
        },
        {
            id: 3,
            title: 'Fazenda feliz',
            subtitle: 'R$ 2.000.000,00'
        },
        {
            id: 4,
            title: 'Fazenda feia',
            subtitle: 'R$ 10.000,00'
        },
        {
            id: 5,
            title: 'Fazenda de marn',
            subtitle: 'R$ 45.000,00'
        },
        {
            id: 6,
            title: 'Fazenda de itatiba',
            subtitle: 'R$ 25.000,00'
        },
        {
            id: 7,
            title: 'Fazenda do pai',
            subtitle: 'R$ 245.000,00'
        },
        {
            id: 8,
            title: 'Fazenda feliz',
            subtitle: 'R$ 2.000.000,00'
        },
        {
            id: 9,
            title: 'Fazenda feia',
            subtitle: 'R$ 10.000,00'
        },
    ])
    
    useEffect(() => {
        console.log('Usou o efeito')
    }, [])

    function startToAddPropertie() {
        console.log('Adicone uma nova propriedade')
    }
    function renderItem(propertie) {
        return(
            <ListItem>
                <TouchableOpacity onPress={() => console.log(propertie.id)} style={styles.container}>
                    <Text style={styles.title}>{propertie.title}</Text>
                    <Text style={styles.subtitle}>{propertie.subtitle}</Text>
                </TouchableOpacity>
            </ListItem>
        )
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <WelcomeHeader userName='Jorge' />
            <View style={styles.middleScreen}>
                {/* Top area from middle screen */}
                <View style={styles.topArea}>
                    <Text style={styles.title}>My Properties</Text>
                </View>
                {/* Lista de projetos (propriedades) */}
                <View style={styles.propertiesList}>
                    <FlatList 
                        scrollEnabled={true}
                        data={propertiesList}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => renderItem(item)}
                    />
                </View>
                {/* Bottom area to add properties */}
            </View>
            <FAB 
                style={{position: 'absolute', bottom: 16, right: 16}} 
                title="Add propertie" 
                onPress={startToAddPropertie} 
                icon={<Ionicons name="add-outline" color="#fff" size={24}/>}
            >
            </FAB>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    propertiesList: {
        alignItems: 'center',
        height: Height*0.62,
    },
    topArea: {
        width: Width,
        padding: 24,
    },
    middleScreen: {
        height: 'auto',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
    },
    bottomArea: {
        padding: 16,
        alignItems: 'flex-end',
        width: Width,
        justifyContent: 'flex-end',
    },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      subtitle: {
        fontSize: 14,
        color: '#666',
      },
})