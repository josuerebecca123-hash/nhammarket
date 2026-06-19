import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../Config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { estilosGlobais, Cores } from '../Styles/globalStyles';
export default function LoginScreen({ onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthAction = async () => {
    if (!email || !senha) {
      Alert.alert('Aviso', 'Preencha todos os campos para continuar.');
      return;
    }
    setLoading(true);
    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, senha);
      } else {
        await createUserWithEmailAndPassword(auth, email, senha);
      }
    } catch (error) {
      console.log('ERRO:', error.code, error.message);
      let msg = 'Erro ao autenticar. Tente novamente.';
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') msg = 'E-mail ou senha incorretos.';
      if (error.code === 'auth/invalid-email') msg = 'Formato de e-mail inválido.';
      if (error.code === 'auth/weak-password') msg = 'A senha precisa ter pelo menos 6 caracteres.';
      if (error.code === 'auth/email-already-in-use') msg = 'Este e-mail já está cadastrado.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[estilosGlobais.container, { justifyContent: 'center', paddingHorizontal: 10 }]}>
      <Text style={estilosGlobais.screenTitle}>
        {authMode === 'login' ? 'Entrar na conta' : 'Criar nova conta'}
      </Text>

      <TextInput
        style={estilosGlobais.input}
        placeholder="E-mail"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      
      <TextInput
        style={estilosGlobais.input}
        placeholder="Senha"
        placeholderTextColor="#A0A0A0"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity 
        style={[estilosGlobais.botaoPrincipal, { backgroundColor: Cores.primariaClara }]} 
        onPress={handleAuthAction} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={estilosGlobais.textoBotao}>
            {authMode === 'login' ? 'Entrar' : 'Cadastrar'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ marginTop: 20, alignItems: 'center' }} 
        onPress={() => setAuthMode(authMode === 'login' ? 'cadastro' : 'login')} 
        disabled={loading}
      >
        <Text style={{ color: Cores.primariaClara, fontWeight: '600' }}>
          {authMode === 'login' ? 'Não tem uma conta? Cadastre-se aqui.' : 'Já tem uma conta? Faça o login.'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}