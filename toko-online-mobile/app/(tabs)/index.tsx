import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, TouchableOpacity, Alert, StatusBar } from 'react-native';
import api from '../../api';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Gagal ambil data dari Render:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e3a8a" />
        <Text style={{ marginTop: 10 }}>Memuat Mobbi Store...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Mobbi Gadget Store</Text>
        <Text style={styles.subtitle}>Temukan Gadget Impianmu</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item: any) => item._id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* 1. GAMBAR PRODUK */}
            <Image source={{ uri: item.image }} style={styles.image} />
            
            <View style={styles.info}>
              {/* 2. INFORMASI TEKS */}
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
              <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>

              {/* 3. TOMBOL AKSI */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.detailButton} 
                  onPress={() => Alert.alert(item.name, item.description)}
                >
                  <Text style={styles.detailText}>DETAIL</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.buyButton} 
                  onPress={() => Alert.alert("Sukses", "Barang berhasil masuk keranjang!")}
                >
                  <Text style={styles.buyText}>BELI</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* TOMBOL LOGIN DI BAWAH (Hanya muncul jika belum login) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
          <Text style={styles.loginText}>MASUK KE AKUN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { paddingTop: 60, paddingBottom: 20, backgroundColor: '#1e3a8a', alignItems: 'center' },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#cbd5e1', fontSize: 14, marginTop: 5 },
  listContent: { paddingBottom: 120 },
  card: { backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15, borderRadius: 15, elevation: 4, overflow: 'hidden' },
  image: { width: '100%', height: 200, resizeMode: 'cover' },
  info: { padding: 15 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 16, color: '#1e3a8a', fontWeight: 'bold', marginVertical: 5 },
  desc: { fontSize: 13, color: '#666', marginBottom: 15 },
  buttonContainer: { flexDirection: 'row', gap: 10 },
  detailButton: { flex: 1, backgroundColor: '#e2e8f0', padding: 12, borderRadius: 8, alignItems: 'center' },
  detailText: { color: '#1e3a8a', fontWeight: 'bold' },
  buyButton: { flex: 1, backgroundColor: '#1e3a8a', padding: 12, borderRadius: 8, alignItems: 'center' },
  buyText: { color: '#fff', fontWeight: 'bold' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(240, 242, 245, 0.9)' },
  loginButton: { backgroundColor: '#1e3a8a', padding: 15, borderRadius: 12, alignItems: 'center' },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
