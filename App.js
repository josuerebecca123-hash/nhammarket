import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator, Text, FlatList, TouchableOpacity } from 'react-native';
import Header from './src/components/Header';
import HomeScreen from './src/Screens/HomeScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import NewAdScreen from './src/Screens/NewAdScreen';
import { auth, db } from './src/Config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import AdCard from './src/components/AddCard';
import { estilosGlobais, Cores } from './src/Styles/globalStyles';
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
      <SafeAreaView style={[estilosGlobais.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Cores.primaria} />
      </SafeAreaView>
    );
  }

  const meusAnuncios = anuncios.filter(a => a.usuario === userEmail);

  return (
    <SafeAreaView style={estilosGlobais.container}>
      <Header
        currentScreen={currentScreen}
        onProfilePress={() => setCurrentScreen(currentScreen === 'home' ? 'profile' : 'home')}
      />
      <View style={estilosGlobais.content}>
        {currentScreen === 'home' && (
          <HomeScreen
            anuncios={anuncios}
            usuarioSelecionado={usuarioSelecionado}
            setUsuarioSelecionado={setUsuarioSelecionado}
            userEmail={userEmail}
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
            <TouchableOpacity onPress={() => setCurrentScreen('profile')} style={estilosGlobais.backButton}>
              <Text style={estilosGlobais.backText}>← Voltar</Text>
            </TouchableOpacity>
            <Text style={estilosGlobais.screenTitle}>Meus anúncios</Text>
            {meusAnuncios.length === 0 ? (
              <Text style={[estilosGlobais.emptyText, { color: Cores.textoSecundario, marginTop: 40 }]}>
                Você ainda não tem anúncios.
              </Text>
            ) : (
              <FlatList
                data={meusAnuncios}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AdCard item={item} userEmail={userEmail} />}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}