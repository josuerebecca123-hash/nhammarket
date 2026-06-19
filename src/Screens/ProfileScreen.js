import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginScreen from './LoginScreen';
import { estilosGlobais, Cores } from '../Styles/globalStyles';

export default function ProfileScreen({ isUserLoggedIn, userEmail, onLogin, onLogout, onNavigateToNewAd, onVerMeusAnuncios }) {
  
  if (!isUserLoggedIn) {
    return <LoginScreen onLoginSuccess={onLogin} />;
  }

  return (
    <View style={[estilosGlobais.container, { justifyContent: 'center' }]}>
      <Text style={estilosGlobais.screenTitle}>Meu Perfil</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.emailText}>{userEmail}</Text>
      </View>

      <TouchableOpacity 
        style={[estilosGlobais.botaoPrincipal, { backgroundColor: Cores.primariaClara, marginBottom: 12 }]} 
        onPress={onNavigateToNewAd}
      >
        <Text style={estilosGlobais.textoBotao}>Anunciar novo item</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[estilosGlobais.botaoPrincipal, { backgroundColor: Cores.primariaClara, marginBottom: 12 }]} 
        onPress={onVerMeusAnuncios}
      >
        <Text style={estilosGlobais.textoBotao}>Ver meus anúncios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ paddingVertical: 12, alignItems: 'center', marginTop: 8 }} onPress={onLogout}>
        <Text style={{ color: '#aaa', fontSize: 14, textDecorationLine: 'underline' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { 
    backgroundColor: Cores.card, 
    padding: 16, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: Cores.borda, 
    marginBottom: 24 
  },
  label: { 
    fontSize: 13, 
    color: '#aaa', 
    marginBottom: 4 
  },
  emailText: { 
    fontSize: 15, 
    color: '#333' 
  }
});