import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CarbonCreditProjects from '../../screens/CarbonCreditProjects'
import Home from '../../screens/Home'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const Tab = createBottomTabNavigator()

export default function BottomTabs() {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#93bf85', tabBarInactiveTintColor: 'grey', tabBarShowLabel: false }}>
      <Tab.Screen options={{
        tabBarIcon: ({ color, size }) => (<Ionicons name='home-outline' color={color} size={size}/>) 
      }} 
      name="Home" 
      component={Home} 
      />
      <Tab.Screen options={{
        tabBarIcon: ({ color, size }) => (<Ionicons name='cash-outline' color={color} size={size}/>) 
      }} 
      name="CarbonCreditProjects" 
      component={CarbonCreditProjects} 
      />
    </Tab.Navigator>
  )
}