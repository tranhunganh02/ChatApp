// app/auth/login.tsx
import { Link } from 'expo-router';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function Login() {
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
      <Link href="/message" asChild>
        <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', marginVertical: 5 }}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/auth/signup" asChild>
        <TouchableOpacity style={{ padding: 10, backgroundColor: 'green', marginVertical: 5 }}>
          <Text style={{ color: 'white' }}>Sign up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
