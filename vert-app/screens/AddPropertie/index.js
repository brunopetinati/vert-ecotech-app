import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FirstScreen from './FirstScreen'
import SecondScreen from './SecondScreen'
import ThirdScreen from './ThirdScreen'

const Stack = createNativeStackNavigator()

export default function AddPropertie() {

    const config = {
        animation: 'timing',
        config: {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        }
    }

    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator screenOptions={{ headerShown: false, transitionSpec: { open: config, close: config,} }}>
                <Stack.Screen name="First" component={FirstScreen} />
                <Stack.Screen name="Second" component={SecondScreen} />
                <Stack.Screen name="Third" component={ThirdScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}