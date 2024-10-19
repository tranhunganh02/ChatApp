// app/home/user.tsx
import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function User() {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Screen</Text>
      <Button title='Dang xuat' onPress={() => router.dismissAll()}/>
    </View>
  );
}
