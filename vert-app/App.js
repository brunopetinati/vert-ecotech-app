import { ThemeProvider, createTheme } from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import CarbonCreditProjects from './screens/CarbonCreditProjects'
import Register from './screens/Register'
import Main from './screens/Main'
import AddPropertie from './screens/AddPropertie'
import Notifications from './screens/Notifications'
import ForgotPassword from './screens/ForgotPassword'

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
  
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <ParentStack.Navigator screenOptions={{ headerShown: false }}>
          <ParentStack.Screen name="Login" component={Login} />
          <ParentStack.Screen name="Register" component={Register} />
          <ParentStack.Screen name="CarbonCreditProjects" component={CarbonCreditProjects} />
          <ParentStack.Screen options={{gestureEnabled: false}} name="Main" component={Main}/>
          <ParentStack.Screen name="AddPropertie" component={AddPropertie}/>
          <ParentStack.Screen name="ForgotPassword" component={ForgotPassword}/>
          <ParentStack.Screen name="Notifications" component={Notifications}/>
        </ParentStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}