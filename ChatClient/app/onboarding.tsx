// app/onboarding.tsx
import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App!</Text>
      <Button title="Get Started" onPress={() => router.push('/auth/login')} />
    </View>
  );
}
