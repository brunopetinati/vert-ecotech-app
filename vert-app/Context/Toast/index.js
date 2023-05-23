import { createContext, useState } from 'react'
import { Platform, StyleSheet, ToastAndroid, View } from 'react-native'

export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [isIOS, setOS] = useState(Platform.OS)

  const showToast = (message, duration = 3000) => {
    if (isIOS) {
      setToastMessage(message)
      setToastVisible(true)
  
      setTimeout(() => {
        setToastVisible(false)
      }, duration)
    }      

    if(Platform.OS == 'android') {
      ToastAndroid.showWithGravity(
          message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
      )
    }
  }

  const Toast = ({ message, duration = 3000 }) => (
    <View style={styles.container}>
      <View style={styles.toast}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  )

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: '10%',
      alignSelf: 'center',
      zIndex: 1,
    },
    toast: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 8,
      padding: 10,
    },
    message: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
    },
  })

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toastVisible && <Toast message={toastMessage} />}
    </ToastContext.Provider>
  )
}