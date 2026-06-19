import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdCard from '../components/AddCard';
import { estilosGlobais, Cores } from '../Styles/globalStyles';
export default function DashboardScreen({ userEmail, onLogout, onNavigateToNewAd, anuncios }) {
  const [telaAtual, setTelaAtual] = useState('dashboard'); 

  const meusAnuncios = anuncios.filter(anuncio => anuncio.usuario === userEmail);
  if (telaAtual === 'meusAnuncios') {
    return (
      <View style={estilosGlobais.container}>
        <TouchableOpacity style={estilosGlobais.backButton} onPress={() => setTelaAtual('dashboard')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="arrow-left" size={20} color={Cores.primaria} />
            <Text style={[estilosGlobais.backText, { marginLeft: 6 }]}>Voltar ao Perfil</Text>
          </View>
        </TouchableOpacity>

        <Text style={estilosGlobais.screenTitle}>📋 Meus Anúncios</Text>

        {meusAnuncios.length === 0 ? (
          <View style={estilosGlobais.emptyContainer}>
            <MaterialCommunityIcons name="cookie-alert-outline" size={48} color="#ffb294" />
            <Text style={estilosGlobais.emptyText}>Você ainda não tem anúncios</Text>
          </View>
        ) : (
          <FlatList
            data={meusAnuncios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AdCard item={item} userEmail={userEmail} />}
          />
        )}
      </View>
    );
  }
  return (
    <View style={estilosGlobais.container}>
      <View style={styles.avatarContainer}>
        <MaterialCommunityIcons name="account-circle" size={80} color="#ffb294" />
        <Text style={styles.userEmailText}>{userEmail}</Text>
      </View>

      <TouchableOpacity style={styles.menuButton} onPress={onNavigateToNewAd}>
        <MaterialCommunityIcons name="food-fork-drink" size={24} color={Cores.primariaClara} />
        <Text style={styles.menuButtonText}>Anunciar novo item</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={() => setTelaAtual('meusAnuncios')}>
        <MaterialCommunityIcons name="format-list-bulleted" size={24} color={Cores.primariaClara} />
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
  avatarContainer: { 
    alignItems: 'center', 
    marginBottom: 30,
    marginTop: 10 
  },
  userEmailText: { 
    fontSize: 16, 
    color: Cores.textoPrincipal, 
    fontWeight: '600', 
    marginTop: 8 
  },
  menuButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: Cores.card, 
    borderWidth: 1, 
    borderColor: Cores.borda, 
    padding: 16, 
    borderRadius: 8, 
    marginBottom: 15 
  },
  menuButtonText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: Cores.textoPrincipal, 
    marginLeft: 12 
  },
  logoutButton: { 
    backgroundColor: Cores.textoPrincipal, 
    borderColor: Cores.textoPrincipal, 
    marginTop: 20 
  }
});