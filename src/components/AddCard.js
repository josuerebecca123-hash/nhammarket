import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from '../Config/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { estilosGlobais, Cores } from '../Styles/globalStyles';

export default function AdCard({ item, userEmail }) {
  const [favoritado, setFavoritado] = useState(false);
  const [editando, setEditando] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(item.nome);
  const [novoPreco, setNovoPreco] = useState(item.preco.replace('R$ ', ''));
  const [novaDescricao, setNovaDescricao] = useState(item.descricao);

  const isOwner = userEmail && item.usuario === userEmail;

  const handleComprar = () => {
    Alert.alert('Aviso', 'Tente novamente mais tarde.');
  };

  const handleExcluir = async () => {
    const confirmar = window.confirm('Tem certeza que deseja excluir este anúncio?');
    if (confirmar) {
      try {
        await deleteDoc(doc(db, 'anuncios', item.id));
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível excluir.');
      }
    }
  };

  const handleSalvarEdicao = async () => {
    if (!novoTitulo || !novoPreco || !novaDescricao) {
      Alert.alert('Aviso', 'Preencha todos os campos.');
      return;
    }
    try {
      await updateDoc(doc(db, 'anuncios', item.id), {
        nome: novoTitulo,
        preco: `R$ ${novoPreco}`,
        descricao: novaDescricao,
      });
      setEditando(false);
      Alert.alert('Pronto', 'Anúncio atualizado!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar.');
    }
  };
  if (editando) {
    return (
      <View style={styles.card}>
        <Text style={styles.editTitle}>Editar anúncio</Text>
        
        <TextInput style={styles.input} value={novoTitulo} onChangeText={setNovoTitulo} placeholder="Título" placeholderTextColor="#aaa" />
        <TextInput style={styles.input} value={novoPreco} onChangeText={setNovoPreco} placeholder="Preço" placeholderTextColor="#aaa" keyboardType="numeric" />
        <TextInput style={[styles.input, { height: 80, textAlignVertical: 'top' }]} value={novaDescricao} onChangeText={setNovaDescricao} placeholder="Descrição" placeholderTextColor="#aaa" multiline />
        
        <TouchableOpacity style={styles.buyButton} onPress={handleSalvarEdicao}>
          <Text style={styles.buyButtonText}>Salvar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={estilosGlobais.backButton} onPress={() => setEditando(false)}>
          <Text style={[estilosGlobais.backText, { textAlign: 'center', marginTop: 10, color: '#aaa' }]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.foodName}>{item.nome}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={styles.foodPrice}>{item.preco}</Text>
          <TouchableOpacity onPress={() => setFavoritado(!favoritado)}>
            <MaterialCommunityIcons
              name={favoritado ? 'heart' : 'heart-outline'}
              size={22}
              color={favoritado ? Cores.primariaClara : '#ccc'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.foodMeta}>Por: {item.usuario}</Text>
      <Text style={styles.foodDate}>{item.dataHora}</Text>

      <Text style={styles.foodDescription} numberOfLines={3}>
        {item.descricao}
      </Text>

      <TouchableOpacity style={styles.buyButton} onPress={handleComprar}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>

      {isOwner && (
        <View style={styles.ownerActions}>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditando(true)}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={handleExcluir}>
            <Text style={styles.deleteButtonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: { 
    backgroundColor: Cores.card, 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderBottomWidth: 3, 
    borderColor: '#E0E0E0' 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginBottom: 5 
  },
  foodName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: Cores.textoPrincipal, 
    flex: 1, 
    marginRight: 10 
  },
  foodPrice: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#91be95' 
  },
  foodMeta: { 
    fontSize: 13, 
    color: '#ffb294', 
    fontWeight: '600' 
  },
  foodDate: { 
    fontSize: 11, 
    color: Cores.borda, 
    marginBottom: 8 
  },
  foodDescription: { 
    fontSize: 14, 
    color: '#555', 
    lineHeight: 20, 
    marginBottom: 15 
  },
  buyButton: { 
    backgroundColor: Cores.primariaClara, 
    borderRadius: 6, 
    paddingVertical: 10, 
    alignItems: 'center' 
  },
  buyButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  ownerActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    gap: 10 
  },
  editButton: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: Cores.primariaClara, 
    borderRadius: 6, 
    paddingVertical: 8, 
    alignItems: 'center' 
  },
  editButtonText: { 
    color: Cores.primariaClara, 
    fontWeight: '600' 
  },
  deleteButton: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    paddingVertical: 8, 
    alignItems: 'center' 
  },
  deleteButtonText: { 
    color: '#aaa', 
    fontWeight: '600' 
  },
  editTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: Cores.textoPrincipal, 
    marginBottom: 12, 
    textAlign: 'center' 
  },
  input: { 
    backgroundColor: '#fafafa', 
    borderWidth: 1, 
    borderColor: Cores.borda, 
    borderRadius: 8, 
    padding: 10, 
    fontSize: 15, 
    marginBottom: 10, 
    color: '#333' 
  }
});