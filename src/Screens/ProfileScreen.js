import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginScreen from './LoginScreen';

export default function ProfileScreen({ isUserLoggedIn, userEmail, onLogin, onLogout, onNavigateToNewAd, onVerMeusAnuncios }) {
  
  if (!isUserLoggedIn) {
    return <LoginScreen onLoginSuccess={onLogin} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.emailText}>{userEmail}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onNavigateToNewAd}>
        <Text style={styles.buttonText}>Anunciar novo item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onVerMeusAnuncios}>
        <Text style={styles.buttonText}>Ver meus anuncios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#635a49', marginBottom: 24, textAlign: 'center' },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#f8d8a5', marginBottom: 24 },
  label: { fontSize: 13, color: '#aaa', marginBottom: 4 },
  emailText: { fontSize: 15, color: '#333' },
  button: { backgroundColor: '#ff8482', paddingVertical: 13, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  logoutButton: { paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  logoutText: { color: '#aaa', fontSize: 14, textDecorationLine: 'underline' },
});