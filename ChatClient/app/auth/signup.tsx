// app/auth/signup.tsx
import { useRouter } from 'expo-router';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function Signup() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Username"
        style={{ borderWidth: 1, width: '80%', marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, width: '80%', marginBottom: 10 }}
      />
      <TouchableOpacity
        style={{ padding: 10, backgroundColor: 'blue' }}
        onPress={() => router.replace('/auth/login')}
      >
        <Text style={{ color: 'white' }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
