import { SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity } from "react-native"
import { Text } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react"
import * as DocumentPicker from 'expo-document-picker'

export default function CardArquivo() {

    const [certMatricula, setCertMatricula] = useState(null) //aceita .pdf
    const [carSicar, setCarSicar] = useState(null) //aceita .pdf
    const [propertyPolygon, setPropertyPolygon] = useState(null) //aceita .kmz ou .kml
    const [cCIR, setCCIR] = useState(null) //aceita .pdf
    const [regularityCertificate, setRegularityCertificate] = useState(null) //aceita .pdf
  
    
    function selectFile(fileType) {
      // Função para selecionar o arquivo
    }

    async function docPicker() {
      const response = await DocumentPicker.getDocumentAsync({})
      console.log(response)
    }

    function cardItem(item) {
      return (
        <TouchableOpacity
          style={styles.boxCard}
          onPress={docPicker}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
  
          <View style={styles.cloudImage}>
            <Ionicons name="cloud-upload-outline" color="#00AE00" size={64} />
          </View>
  
          <Text style={styles.fileDescription}>Envie um arquivo</Text>
        </TouchableOpacity>
      );
    }
  
    function filledItem(item) {
      return (
        <View style={styles.boxCardFilled}>
          <View Style={styles.docImage}>
            <Ionicons name="document-text-outline" color="#00AE00" size={44} />
          </View>
  
          <Text style={styles.fileDescription}>adjaisjdiasjdiasjiasjd.pdf</Text>
        </View>
      );
    }
  
    const fields = [
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
        avaiableFileType: ['kmz', 'kml'],
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
    ];
  
    return (
      <SafeAreaView style={{ alignItems: 'center', padding: 32 }}>
        <FlatList
          data={fields}
          renderItem={({ item }) =>
            certMatricula === null ? (
                cardItem(item)

            ) : (
              filledItem(item)

            )
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    boxCard: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8, 
        borderStyle: 'dashed', 
        borderWidth: 3, 
        borderColor: "#00AE00",
        width: "100%",
        marginVertical: 16,
        padding: 16,
    },

    boxCardFilled: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,  
        borderWidth: 3, 
        borderColor: "#00AE00",
        width: "80%",
        margin: 16,
        padding: 16, 
    },

    cloudImage: {
        alignItems: 'center',
        innerWidth: '100%',
    },

    docImage: {
        alignItems: 'center',
        innerWidth: '100%',
    },

    fileDescription: {
        marginBottom: 10,  
    }
})