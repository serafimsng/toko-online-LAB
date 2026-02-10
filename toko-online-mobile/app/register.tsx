import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../api'; // Naik 1 tingkat ke root

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await api.post('/register', { username, password });
      Alert.alert("Berhasil", "Akun berhasil dibuat, silakan login.");
      router.push('/login');
    } catch (error) {
      Alert.alert("Gagal", "Username sudah digunakan atau server error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun Baru</Text>
      <TextInput 
        placeholder="Buat Username" 
        style={styles.input} 
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Buat Password" 
        style={styles.input} 
        secureTextEntry 
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>DAFTAR SEKARANG</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Sudah punya akun? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 25, backgroundColor: '#f8f9fa' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#1e3a8a' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 12, marginBottom: 15 },
  btn: { backgroundColor: '#1e3a8a', padding: 18, borderRadius: 12, alignItems: 'center' },
  linkText: { marginTop: 20, textAlign: 'center', color: '#666' }
});
