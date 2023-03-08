import { ThemeProvider, createTheme } from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login';
import CarbonCreditProjects from './screens/CarbonCreditProjects';
import Register from './screens/Register';

const theme = createTheme({
  lightColors: {
    primary: '#93bf85',
    secondary: '#93bf85',
    background: '#93bf85'
  },
  darkColors: {
    primary: '#93bf85',
  },
  mode: 'light',
})

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CarbonCreditProjects" component={CarbonCreditProjects} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}