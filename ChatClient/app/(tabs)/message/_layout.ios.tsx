import React, { useEffect } from 'react'
import { Stack,  } from 'expo-router'

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
        <Stack.Screen name="[id]"   options={{
            
       
        
        }} />
    </Stack>
  )
}