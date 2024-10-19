import { View, Text, Platform } from 'react-native'
import React, { ReactNode } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { appColors } from '@/constants/appColor'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { HomeScreen, ProfileScreen } from '../screens'
import { Tabs } from 'expo-router'

export default function BottomTabNavigator() {

    return (
        <Tabs 
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              height: Platform.OS === 'android' ? 70 : 90,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
              backgroundColor: appColors.white,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let icon: ReactNode
              color = focused ? appColors.primary : appColors.gray
              size = 26
              switch (route.name) {
                case "screens/home/HomeScreen":
                  icon = <MaterialIcons name="calendar-month" size={30} color={color} />;
                  break;
                case "screens/profile/ProfileScreen":
                  icon = <Ionicons name='person' size={size} color={color} />
                  break;
              }
              return icon
            },
      
          })}
          >
            <Tabs.Screen name="screens/home/HomeScreen" options={{
              title: "message",
              
            }}/>
            <Tabs.Screen name="screens/profile/ProfileScreen" options={{
              title: "profile"
            }}/>
          </Tabs>
    )
}



const Homess = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

