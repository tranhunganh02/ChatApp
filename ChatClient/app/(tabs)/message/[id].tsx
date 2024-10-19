import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

export default function Page() {
  const { id, username, image } = useLocalSearchParams();


  return (
    <View>

      <Text style={{ fontSize: 30 }}>Post {id} {username}</Text>
      <Image source={{ uri: "" + image }} style={{
        width: 50,
        height: 50,
        borderRadius: 25,
      }} />
    </View>
  )
}