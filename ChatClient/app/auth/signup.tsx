// app/auth/signup.tsx
import { useRouter } from 'expo-router';
import { View, Text, Button, TextInput } from 'react-native';

export default function Signup() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput placeholder="Username" style={{ borderWidth: 1, width: '80%', marginBottom: 10 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, width: '80%', marginBottom: 10 }} />
      <Button title="Sign Up" onPress={() => router.replace('/auth/login')} />
    </View>
  );
}
