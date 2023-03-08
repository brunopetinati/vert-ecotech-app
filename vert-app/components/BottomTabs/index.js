import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CarbonCreditProjects from '../../screens/CarbonCreditProjects'
import Home from '../../screens/Home'

const Tab = createBottomTabNavigator()

export default function BottomTabs() {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="CarbonCreditProjects" component={CarbonCreditProjects} />
        </Tab.Navigator>
      )
}