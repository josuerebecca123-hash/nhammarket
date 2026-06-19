import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { db } from '../Config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { estilosGlobais, Cores } from '../Styles/globalStyles';
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
      Alert.alert('Pronto', 'Anúncio publicado com sucesso!');
      onVoltar();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar: ' + error.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={[estilosGlobais.container, { justifyContent: 'center', paddingHorizontal: 10 }]}>
      <Text style={estilosGlobais.screenTitle}>Novo anúncio</Text>
      
      <TextInput
        style={estilosGlobais.input}
        placeholder="Título do produto"
        placeholderTextColor="#A0A0A0"
        value={titulo}
        onChangeText={setTitulo}
        editable={!salvando}
      />
      
      <TextInput
        style={estilosGlobais.input}
        placeholder="Preço (ex: 15,00)"
        placeholderTextColor="#A0A0A0"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        editable={!salvando}
      />
      
      <TextInput
        style={[estilosGlobais.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Descrição do produto"
        placeholderTextColor="#A0A0A0"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
        editable={!salvando}
      />

      <TouchableOpacity 
        style={[estilosGlobais.botaoPrincipal, { backgroundColor: Cores.primariaClara, marginTop: 10 }]} 
        onPress={handleCadastrar} 
        disabled={salvando}
      >
        <Text style={estilosGlobais.textoBotao}>
          {salvando ? 'Salvando...' : 'Publicar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ marginTop: 15, alignItems: 'center' }} 
        onPress={onVoltar} 
        disabled={salvando}
      >
        <Text style={{ color: '#aaa', fontSize: 14 }}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}