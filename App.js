import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from './src/components/Header';
import HomeScreen from './src/Screens/HomeScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import NewAdScreen from './src/Screens/NewAdScreen';
import { auth, db } from './src/Config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import AdCard from './src/components/AddCard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('Todos');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email || '');
        setIsUserLoggedIn(true);
        setCurrentScreen('profile');
      } else {
        setUserEmail('');
        setIsUserLoggedIn(false);
        setCurrentScreen('profile');
      }
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'anuncios'), orderBy('createdAt', 'desc'));
    const unsubscribeDb = onSnapshot(q, (querySnapshot) => {
      const itensCarregados = [];
      querySnapshot.forEach((doc) => {
        itensCarregados.push({ id: doc.id, ...doc.data() });
      });
      setAnuncios(itensCarregados);
    }, (error) => {
      console.log('Erro:', error.message);
    });
    return () => unsubscribeDb();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#e07b6a" />
      </SafeAreaView>
    );
  }

  const meusAnuncios = anuncios.filter(a => a.usuario === userEmail);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        currentScreen={currentScreen}
        onProfilePress={() => setCurrentScreen(currentScreen === 'home' ? 'profile' : 'home')}
      />
      <View style={styles.content}>
        {currentScreen === 'home' && (
          <HomeScreen
            anuncios={anuncios}
            usuarioSelecionado={usuarioSelecionado}
            setUsuarioSelecionado={setUsuarioSelecionado}
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen
            isUserLoggedIn={isUserLoggedIn}
            userEmail={userEmail}
            anuncios={anuncios}
            onLogin={() => {}}
            onLogout={async () => {
              await signOut(auth);
              setCurrentScreen('profile');
            }}
            onNavigateToNewAd={() => setCurrentScreen('newAd')}
            onVerMeusAnuncios={() => setCurrentScreen('meusAnuncios')}
          />
        )}
        {currentScreen === 'newAd' && (
          <NewAdScreen
            userEmail={userEmail}
            onVoltar={() => setCurrentScreen('profile')}
          />
        )}
        {currentScreen === 'meusAnuncios' && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setCurrentScreen('profile')} style={styles.backButton}>
              <Text style={styles.backText}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>Meus anúncios</Text>
            {meusAnuncios.length === 0 ? (
              <Text style={styles.emptyText}>Você ainda não tem anúncios.</Text>
            ) : (
              <FlatList
                data={meusAnuncios}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AdCard item={item} />}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { flex: 1, padding: 15 },
  backButton: { marginBottom: 12 },
  backText: { color: '#e07b6a', fontSize: 15 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  emptyText: { color: '#888', fontSize: 14, textAlign: 'center', marginTop: 40 },
});