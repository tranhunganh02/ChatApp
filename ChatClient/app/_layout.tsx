// app/_layout.tsx
import { useRouter, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from '@/state/store';

function RootLayout() {
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


const App = () => {
   return (
     <Provider store={store}>
       <RootLayout />
     </Provider>
   );
 };
 
 export default App;
 