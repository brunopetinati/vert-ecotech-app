import { ThemeProvider, createTheme } from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import CarbonCreditProjects from './screens/CarbonCreditProjects'
import Register from './screens/Register'
import Main from './screens/Main'
import AddPropertie from './screens/AddPropertie'
import NotificationsScreen from './screens/Notifications'
import ForgotPassword from './screens/ForgotPassword'
import { ToastProvider, ToastContext } from './Context/Toast'
import { useContext, useEffect, useRef, useState } from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

const theme = createTheme({
    lightColors: {
      primary: '#00AE00',
      secondary: '#00AE00',
      background: '#00AE00'
    },
    darkColors: {
      primary: '#00AE00',
    },
    mode: 'light',
})

const ParentStack = createNativeStackNavigator()

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  console.log('expoPushToken')
  console.log(expoPushToken)
  console.log('-------------------------------------------------')

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
  
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [])

  return (
    <RootSiblingParent>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <NavigationContainer>
            <ParentStack.Navigator screenOptions={{ headerShown: false }}>
              <ParentStack.Screen name="Login" component={Login} />
              <ParentStack.Screen options={{headerShown: true, title: "Cadastro"}} name="Register" component={Register} />
              <ParentStack.Screen name="CarbonCreditProjects" component={CarbonCreditProjects} />
              <ParentStack.Screen options={{gestureEnabled: false}} name="Main" component={Main}/>
              <ParentStack.Screen name="AddPropertie" component={AddPropertie}/>
              <ParentStack.Screen options={{headerShown: true, title: "Esqueceu a senha"}} name="ForgotPassword" component={ForgotPassword}/>
              <ParentStack.Screen options={{headerShown: true, title: "Suas notificações"}} name="Notifications" component={NotificationsScreen}/>
            </ParentStack.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </ThemeProvider>
    </RootSiblingParent>
  )
}