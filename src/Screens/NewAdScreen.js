import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { db } from '../Config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function NewAdScreen({ userEmail, onVoltar }) {
  const [titulo, setTitulo] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleCadastrar = async () => {
    if (!titulo || !preco || !descricao) {
      Alert.alert('Aviso', 'Preencha todos os campos.');
      return;
    }
    setSalvando(true);
    try {
      await addDoc(collection(db, 'anuncios'), {
        nome: titulo,
        preco: `R$ ${preco}`,
        usuario: userEmail,
        createdAt: new Date().getTime(),
        dataHora: new Date().toLocaleString('pt-BR'),
        descricao: descricao,
      });
      Alert.alert('Pronto', 'Anuncio publicado com sucesso!');
      onVoltar();
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel salvar: ' + error.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Novo anuncio</Text>
      <TextInput
        style={styles.input}
        placeholder="Titulo do produto"
        placeholderTextColor="#A0A0A0"
        value={titulo}
        onChangeText={setTitulo}
        editable={!salvando}
      />
      <TextInput
        style={styles.input}
        placeholder="Preco (ex: 15,00)"
        placeholderTextColor="#A0A0A0"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        editable={!salvando}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descricao do produto"
        placeholderTextColor="#A0A0A0"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
        editable={!salvando}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastrar} disabled={salvando}>
        <Text style={styles.buttonText}>{salvando ? 'Salvando...' : 'Publicar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={onVoltar} disabled={salvando}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 10 },
  screenTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#635a49', textAlign: 'center' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#f8d8a5', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15, color: '#333' },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: { backgroundColor: '#ff8482', borderRadius: 6, paddingVertical: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  cancelButton: { marginTop: 15, alignItems: 'center' },
  cancelText: { color: '#aaa', fontSize: 14 },
});