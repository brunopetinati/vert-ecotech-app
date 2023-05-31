import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import CarbonCreditProjects from '../../screens/CarbonCreditProjects'
import Home from '../../screens/Home'
import { Ionicons } from '@expo/vector-icons';
import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator();

export default function BottomTabs() {

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{ headerShown: true, }}>
      <Drawer.Screen options={{
        drawerIcon: ({ color, size }) => (<Ionicons name='home-outline' color={color} size={size}/>) 
      }} 
      name="Home" 
      component={Home} 
      />
    </Drawer.Navigator>
  )
}