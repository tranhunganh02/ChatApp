// app/home/search.tsx
import { useRouter } from 'expo-router';
import { View, Text } from 'react-native';

export default function Search() {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search Screen</Text>
    </View>
  );
}
