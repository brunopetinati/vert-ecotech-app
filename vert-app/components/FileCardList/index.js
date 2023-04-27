import { SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity } from "react-native"
import { Text } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'
import { useState } from "react"
import * as DocumentPicker from 'expo-document-picker'
import { Width } from "../../constants/dimensions"

export default function CardArquivo({ 
  certMatricula,
  carSicar,
  propertyPolygon,
  cCIR,
  regularityCertificate,
  setCertMatricula, 
  setCarSicar, 
  setPropertyPolygon, 
  setCCIR, 
  setRegularityCertificate,
}) {
  async function selectFile(fileType) {
    let file = null
    switch (fileType) {
      case 'certidão de matricula':
        file = await docPicker()
        setCertMatricula(file)
        break
      case 'PDF do CAR(SICAR)':
        file = await docPicker()
        setCarSicar(file)
        break
      case 'polígono da propriedade (Formatos aceitos: *.KMZ ou *.KML)':
        file = await docPicker()
        setPropertyPolygon(file)
        break
      case 'cópia do CCIR':
        file = await docPicker()
        setCCIR(file)
        break
      case 'certidão de regularidade da dívida federal':
        file = await docPicker()
        setRegularityCertificate(file)
        break
      default:
        console.log(file)
        break
    }
  }

  async function docPicker() {
    const response = await DocumentPicker.getDocumentAsync({})
    console.log(response)
    return response
  }

  function emptyItem(item) {
    return (
      <TouchableOpacity
        style={styles.boxCard}
        onPress={() => selectFile(item)}
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

        <Text style={styles.fileDescription}>
          {item.file.name.substr(0, 16) + '...'}
        </Text>
      </View>
    )
  }
  
  const fields = [
    {
      title: 'certidão de matricula',
      file: certMatricula,
      avaiableFileType: ['pdf', 'jpeg', 'png', 'jpg'],
    },
    {
      title: 'PDF do CAR(SICAR)',
      file: carSicar,
      avaiableFileType: ['pdf', 'jpeg', 'png', 'jpg'],
    },
    {
      title: 'polígono da propriedade (Formatos aceitos: *.KMZ ou *.KML)',
      file: propertyPolygon,
      avaiableFileType: ['kmz', 'kml'],
    },
    {
      title: 'cópia do CCIR',
      file: cCIR,
      avaiableFileType: ['pdf', 'jpeg', 'png', 'jpg'],
    },
    {
      title: 'certidão de regularidade da dívida federal',
      file: regularityCertificate,
      avaiableFileType: ['pdf', 'jpeg', 'png', 'jpg'],
    },
  ]
  
  return (
    <SafeAreaView style={{ alignItems: 'center', paddingTop: 32, }}>
      <FlatList
        contentContainerStyle={styles.lista}
        data={fields}
        renderItem={({ item }) =>
          item.file == null 
          ? 
          (emptyItem(item.title)) 
          : 
          (filledItem(item))
        }
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    boxCard: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8, 
        borderStyle: 'dashed', 
        borderWidth: 3, 
        borderColor: "#00AE00",
        width: Width*0.7,
        maxWidth: Width*0.8,
        marginVertical: 16,
        padding: 16,
    },

    boxCardFilled: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,  
        borderWidth: 3, 
        borderColor: "#00AE00",
        width: Width*0.7,
        maxWidth: Width*0.8,
        margin: 16,
        padding: 16, 
        flexDirection: 'row',
    },

    cloudImage: {
        alignItems: 'center',
        innerWidth: '100%',
    },

    docImage: {
        innerWidth: '100%',
        
    },

    fileDescription: {
        marginBottom: 10,  
    },
    lista: {
      alignItems: 'center',
      width: Width*0.8,
      maxWidth: Width*0.8,
    }
})

//<ion-icon name="image-outline"></ion-icon> img icon
//<ion-icon name="cube-outline"></ion-icon> kmz icon
//<ion-icon name="reader-outline"></ion-icon> pdf icon 