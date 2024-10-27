// app/_layout.tsx
import { useRouter, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';



export default function RootLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  // Dù có điều hướng hay không, Stack phải được render
  return <Stack
  screenOptions={{
      // headerStyle: {
      //     backgroundColor: 'black'
      // },
      // headerTintColor: 'white''
      headerBackTitleVisible: true,
  }}
 >
      <Stack.Screen name="index" options={{
            title: 'onboarding',
            headerShown: false , 
      }} />
         <Stack.Screen name="onboarding" options={{
            title: 'onboardingMain',
            headerBackTitleVisible:true,
            headerShown: false , 
      }} />
      <Stack.Screen name="auth/login" options={{
         headerShown: false , 
      }} />
       <Stack.Screen name="auth/signup" options={{
         headerShown: false , 
      }} />
       <Stack.Screen name="(tabs)" options={{
        headerShown: false
      }} />
       <Stack.Screen name="[missing]" options={{
            title: '404'
        }} />
 </Stack>
}
