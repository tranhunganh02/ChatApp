import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <StatusBar style="light" /> */}
      <Text>OnboardingPage</Text>
      <Link href="/auth/login" asChild>
        <Pressable style={{ padding: 10, backgroundColor: 'blue', marginVertical: 5 }}>
          <Text style={{ color: 'white' }}>Open login Page</Text>
        </Pressable>
      </Link>
      <Link href="/auth/signup" asChild>
        <Pressable style={{ padding: 10, backgroundColor: 'green', marginVertical: 5 }}>
          <Text style={{ color: 'white' }}>Open register</Text>
        </Pressable>
      </Link>
    </View>
  );
}
