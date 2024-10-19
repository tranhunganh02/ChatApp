// app/auth/login.tsx
import { Link, useRouter } from 'expo-router';
import { View, Text, Button, TextInput } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput placeholder="Username" style={{ borderWidth: 1, width: '80%', marginBottom: 10 }} />
      <TextInput placeholder="Password" secureTextEntry style={{ borderWidth: 1, width: '80%', marginBottom: 10 }} />
      <Link href="/message" asChild>
        <Button title="Login" />
      </Link>
      <Link href="/auth/signup" asChild>
        <Button title="Sign up" />
      </Link>
    </View>
  );
}
