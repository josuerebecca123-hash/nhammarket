import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../Config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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
      if (error.code === 'auth/invalid-email') msg = 'Formato de e-mail invalido.';
      if (error.code === 'auth/weak-password') msg = 'A senha precisa ter pelo menos 6 caracteres.';
      if (error.code === 'auth/email-already-in-use') msg = 'Este e-mail ja esta cadastrado.';
      Alert.alert('Erro', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>
        {authMode === 'login' ? 'Entrar na conta' : 'Criar nova conta'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#A0A0A0"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity style={styles.button} onPress={handleAuthAction} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>{authMode === 'login' ? 'Entrar' : 'Cadastrar'}</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.switchButton} onPress={() => setAuthMode(authMode === 'login' ? 'cadastro' : 'login')} disabled={loading}>
        <Text style={styles.switchText}>
          {authMode === 'login' ? 'Nao tem uma conta? Cadastre-se aqui.' : 'Ja tem uma conta? Faca o login.'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 10 },
  screenTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#635a49', textAlign: 'center' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#f8d8a5', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15, color: '#333' },
  button: { backgroundColor: '#ff8482', borderRadius: 6, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  switchButton: { marginTop: 20, alignItems: 'center' },
  switchText: { color: '#ff8482', fontWeight: '600' },
});