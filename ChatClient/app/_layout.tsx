// app/_layout.tsx
import { useRouter, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from '@/state/store';
import { CallListener } from '@/components';

function RootLayout() {
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
      {/* Trang không nằm trong bottom tab */}
      <Stack.Screen
        name="call/incoming"
        options={{
          headerShown: false , 
          title: 'Incoming Call',
          presentation: 'modal', // Hiển thị dưới dạng modal
        }}
      />
      <Stack.Screen
        name="call/video"
        options={{
          headerShown: false , 
          title: 'Video Call',
          presentation: 'modal',
        }}
      />
      {/* <Stack.Screen
        name="calls/group"
        options={{
          title: 'Group Call',
          presentation: 'modal',
        }}
      /> */}
      <Stack.Screen
        name="[missing]"
        options={{
          title: '404',
        }}
      />
 </Stack>
}


const App = () => {
  
   return (
     <Provider store={store}>
       <CallListener />
       <RootLayout />
     </Provider>
   );
 };
 
 export default App;
