import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useNavigation } from 'expo-router'

export default function _layout() {

  return (
    <Stack
    screenOptions={{
        headerShown: false,
        
    }}
    >
        <Stack.Screen name="index" options={{
            title: 'setting'
        }} />
        <Stack.Screen name="user" options={{
            headerShown:false
        }} />
    </Stack>
  )
}