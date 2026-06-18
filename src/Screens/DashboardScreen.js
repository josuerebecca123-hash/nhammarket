import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdCard from '../components/AddCard';

export default function DashboardScreen({ userEmail, onLogout, onNavigateToNewAd, anuncios }) {
  const [telaAtual, setTelaAtual] = useState('dashboard'); 

  const meusAnuncios = anuncios.filter(anuncio => anuncio.usuario === userEmail);

  if (telaAtual === 'meusAnuncios') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => setTelaAtual('dashboard')}>
          <MaterialCommunityIcons name="arrow-left" size={20} color="#ff8482" />
          <Text style={styles.backButtonText}>Voltar ao Perfil</Text>
        </TouchableOpacity>

        <Text style={styles.screenTitle}>📋 Meus Anúncios</Text>

        {meusAnuncios.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cookie-alert-outline" size={48} color="#ffb294" />
            <Text style={styles.emptyText}>Você ainda não tem anúncios</Text>
          </View>
        ) : (
          <FlatList
            data={meusAnuncios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AdCard item={item} />}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <MaterialCommunityIcons name="account-circle" size={80} color="#ffb294" />
        <Text style={styles.userEmailText}>{userEmail}</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={onNavigateToNewAd}>
        <MaterialCommunityIcons name="food-fork-drink" size={24} color="#ff8482" />
        <Text style={styles.menuButtonText}>Anunciar novo item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => setTelaAtual('meusAnuncios')}>
        <MaterialCommunityIcons name="format-list-bulleted" size={24} color="#ff8482" />
        <Text style={styles.menuButtonText}>Ver meus anúncios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.menuButton, styles.logoutButton]} onPress={onLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="#FFF" />
        <Text style={[styles.menuButtonText, { color: '#FFF' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  avatarContainer: { alignItems: 'center', marginBottom: 30 },
  userEmailText: { fontSize: 16, color: '#635a49', fontWeight: '600', marginTop: 8 },
  menuButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#f8d8a5', padding: 16, borderRadius: 8, marginBottom: 15 },
  menuButtonText: { fontSize: 16, fontWeight: 'bold', color: '#635a49', marginLeft: 12 },
  logoutButton: { backgroundColor: '#635a49', borderColor: '#635a49', marginTop: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backButtonText: { color: '#ff8482', fontWeight: '600', marginLeft: 6, fontSize: 15 },
  screenTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#635a49' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  emptyText: { fontSize: 16, color: '#635a49', fontWeight: 'bold', marginTop: 10 },
});
