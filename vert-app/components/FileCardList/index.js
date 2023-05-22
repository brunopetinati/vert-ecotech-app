import { SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity } from "react-native"
import { Text } from '@rneui/themed'
//import RNFS from 'react-native-fs';
import { Ionicons } from '@expo/vector-icons'
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
      case 'Certidão de matricula':
        file = await docPicker('pdf')
        if(file != false) {
          setCertMatricula(file)
        }
        break
      case 'PDF do CAR(SICAR)':
        file = await docPicker('pdf')
        if(file != false) {
          setCarSicar(file)
        }
        break
      case 'Polígono da propriedade (Formatos aceitos: *.KMZ ou *.KML)':
        file = await docPicker()
        if(file != false) {
          setPropertyPolygon(file)
        }
        break
      case 'Cópia do CCIR':
        file = await docPicker('pdf')
        if(file != false) {
          setCCIR(file)
        }
        break
      case 'Certidão de regularidade da dívida federal':
        file = await docPicker('pdf')
        if(file != false) {
          setRegularityCertificate(file)
        }
        break
      default:
        console.log(file)
        console.log(fileType)
        break
    }
  }

  async function docPicker(docType) {
    // type: "image/*" // all images files
    // type: "audio/*" // all audio files
    // type: "application/*" // for pdf, doc and docx
    // type: "application/msword" // .doc
    // type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
    // type: "vnd.ms-excel" // .xls
    // type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
    // type: "text/csv" // .csv
    // "application/vnd.google-earth.kml+xml"
    // "application/vnd.google-earth.kmz"

    if(docType == "pdf") {
      const response = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // .pdf
        multiple: false,
      })
      //const fileData = await FileSystem.readAsStringAsync(response.uri)
      if(response.type == 'cancel') {
        return false
      }
      console.log('ARQUIVO')
      console.log(response)
      //console.log(fileData)
      console.log('++++++++++++++++++++++++++++')

      return response
    } 
    else {
      console.log("AAAAAAAA")
      const response = await DocumentPicker.getDocumentAsync({
        multiple: false,
      }) //Só não colocar trava que vai
      //const fileData = await FileSystem.readAsStringAsync(response.uri)
      if(response.type == 'cancel') {
        return false
      }
      
      console.log('ARQUIVO')
      console.log(response)
      //console.log(fileData)
      console.log('++++++++++++++++++++++++++++')

      return response
    }
  }

  function emptyItem(item) {
    console.log('VAZIO')
    console.log(item)
    console.log('--------------------------------')
    return (
      <TouchableOpacity
        style={styles.boxCard}
        onPress={() => selectFile(item)}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{item}</Text>

        <View style={styles.cloudImage}>
          <Ionicons name="cloud-upload-outline" color="#00AE00" size={64} />
        </View>

        <Text style={styles.fileDescription}>Envie um arquivo</Text>
      </TouchableOpacity>
    )
  }
  
  function filledItem(item) {
    console.log('PREENCHIDO')
    console.log(item)
    console.log('----------------------------------------------')
    return (
      <View style={styles.boxCardFilled}>
        <View Style={styles.docImage}>
          {item.file.uri.includes('pdf') && <Ionicons name="reader-outline" color="#00AE00" size={44} />}
          {(item.file.uri.includes('zip')) && <Ionicons name="earth-outline" color="#00AE00" size={44} />}
        </View>

        <Text style={styles.fileDescription}>
          { (item.file.name.length > 16) 
            ? item.file.name.substr(0, 16) + '...'
            : item.file.name
          }
        </Text>
      </View>
    )
  }
  
  const fields = [
    {
      title: 'Certidão de matricula',
      file: certMatricula,
    },
    {
      title: 'PDF do CAR(SICAR)',
      file: carSicar,
    },
    {
      title: 'Polígono da propriedade (Formatos aceitos: *.KMZ ou *.KML)',
      file: propertyPolygon,
    },
    {
      title: 'Cópia do CCIR',
      file: cCIR,
    },
    {
      title: 'Certidão de regularidade da dívida federal',
      file: regularityCertificate,
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

// "image-outline" img icon
// "earth-outline" kmz icon
// "reader-outline" pdf icon 