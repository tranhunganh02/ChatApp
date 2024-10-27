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
            title: 'Message'
        }} />
        <Stack.Screen name="[id]" options={{
            headerShown:false
        }} />
    </Stack>
  )
}