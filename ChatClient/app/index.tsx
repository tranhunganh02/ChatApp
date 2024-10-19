import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function OnboardingPage() {
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
        {/* <StatusBar style="light" /> */}
      <Text>OnboardingPage</Text>
      <Link href="/auth/login" asChild>
        <Button title="Open login Page" />
      </Link>
      <Link href="/auth/signup" asChild>
        <Button title="Open register" />
      </Link>
    </View>
  )
}