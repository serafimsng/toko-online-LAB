import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../api'; // Naik 1 tingkat ke root

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Mengirim data ke backend Render kamu
      const response = await api.post('/login', { username, password });
      Alert.alert("Sukses", "Selamat Datang di Mobbi Store!");
      router.replace('/(tabs)'); 
    } catch (error) {
      Alert.alert("Error", "Username atau Password salah");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Mobbi Store</Text>
      <TextInput 
        placeholder="Username" 
        style={styles.input} 
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Password" 
        style={styles.input} 
        secureTextEntry 
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>MASUK</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.linkText}>Belum punya akun? Daftar di sini</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#1e3a8a', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 12, marginBottom: 15 },
  btn: { backgroundColor: '#1e3a8a', padding: 18, borderRadius: 12, alignItems: 'center' },
  linkText: { marginTop: 20, color: '#1e3a8a', textAlign: 'center' }
});
