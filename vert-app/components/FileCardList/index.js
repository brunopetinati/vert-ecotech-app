import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView, FlatList } from "react-native"
import { Text } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react"

export default function FileCardList(){

    const [fields, setFields] = useState([
        {
          title: 'certidão de matricula',
          file: null,
          avaiableFileType: ['pdf', 'jpeg', 'png', 'jpg'],
        },
        {
          title: 'PDF do CAR(SICAR)',
          file: null,
          avaiableFileType: ['pdf', 'jpeg', 'png', 'jpg'],
        },
        {
          title: 'polígono da propriedade (Formatos aceitos: *.KMZ ou *.KML)',
          file: null,
          avaiableFileType: ['kmz', 'kml']
        },
        {
          title: 'cópia do CCIR',
          file: null,
          avaiableFileType: ['pdf', 'jpeg', 'png', 'jpg'],
        },
        {
          title: 'certidão de regularidade da dívida federal',
          file: null,
          avaiableFileType: ['pdf', 'jpeg', 'png', 'jpg'],
        },
    ])
    const [certMatricula, setCertMatricula] = useState(null)
    const [carSicar, setcarSicar] = useState(null)
    const [propertyPolygon, setpropertyPolygon] = useState(null)
    const [cCIR, setcCIR] = useState(null)
    const [regularityCertificate, setregularityCertificate] = useState(null)

    function emptyItem(item){
        console.log('opa')
        return(
            <TouchableOpacity style={styles.boxCard}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>

                <View Style={styles.cloudImage}>
                    <Ionicons name="cloud-upload-outline" color ="#93bf85" size={64}></Ionicons>
                </View>

                <Text  style={styles.fileDescription}>Envie um arquivo</Text>
            </TouchableOpacity>
        )
    }

    function filledItem(item){
        return(
            <TouchableOpacity style={styles.boxCardFilled}>
                <View Style={styles.docImage}>
                  <Ionicons name="document-text-outline" color = "#93bf85" size={44}></Ionicons>
                </View>

                <Text  style={styles.fileDescription}>AAAAAAAAAAAAAAAAAAAAAA.png</Text>
          </TouchableOpacity>
        )
    }

    return(
        <FlatList 
            nestedScrollEnabled
            data={fields} 
            renderItem={({item}) => emptyItem(item)}
        />                
    )
}

const styles = StyleSheet.create({
    boxCard: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8, 
        borderStyle: 'dashed', 
        borderWidth: 3, 
        borderColor: "#93bf85",
        width: 128,
        height: 128,
        margin: 16,
        padding: 16,
    },

    boxCardFilled: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,  
        borderWidth: 3, 
        borderColor: "#93bf85",
        width: "80%",
        margin: 16,
        padding: 16, 
    },

    cloudImage: {
        alignItems: 'center',
        innerWidth: '100%'
    },

    docImage: {
        alignItems: 'center',
        innerWidth: '100%'
    },

    fileDescription: {
        marginBottom: 10,  
    },
})