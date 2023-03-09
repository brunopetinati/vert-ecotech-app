import { useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native"
import WelcomeHeader from "../../components/WelcomeHeader"

export default function Home() {

    const [ propertiesList, setPropertiesList ] = useState([
        {
            id: '0'
        },
        {
            id: '1'
        },
        {
            id: '2'
        },
        {
            id: '3'
        },
        {
            id: '4'
        },
    ])
    return(
        <SafeAreaView>
            <WelcomeHeader userName='Jorge' />
            {/* Lista de projetos (propriedades) */}
            <View style={styles.propertiesList}>
                <FlatList 
                    data={propertiesList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Text>{item.id}</Text>}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    propertiesList: {
        alignItems: 'center'
    }
})