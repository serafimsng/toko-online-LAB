import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    // View flex: 1 di sini memastikan bingkai memenuhi seluruh layar HP
    <View style={{ flex: 1, backgroundColor: '#1e3a8a' }}>
      <Tabs screenOptions={{ 
        headerShown: false, 
        tabBarStyle: { 
          height: 60,
          borderTopWidth: 0,
          elevation: 0
        } 
      }}>
        <Tabs.Screen 
          name="index" 
          options={{ title: 'Beranda' }} 
        />
      </Tabs>
    </View>
  );
}
