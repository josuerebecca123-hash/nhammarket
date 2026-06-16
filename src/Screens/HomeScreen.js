import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdCard from '../components/AddCard';

export default function HomeScreen({ anuncios, usuarioSelecionado, setUsuarioSelecionado }) {
  // Gera dinamicamente a lista de usuários únicos para o filtro [cite: 16]
  const usuariosFiltro = ['Todos', ...new Set(anuncios.map(anuncio => anuncio.usuario))];

  // Filtra as refeições com base na escolha do filtro no topo [cite: 15]
  const anunciosFiltrados = usuarioSelecionado === 'Todos'
    ? anuncios
    : anuncios.filter(anuncio => anuncio.usuario === usuarioSelecionado);

  return (
    <View style={styles.container}>
      {/* 🥞 DESAFIO: FILTRO DE CHEFS NO TOPO */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filtrar por Chef:</Text>
        <FlatList
          data={usuariosFiltro}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterButton, usuarioSelecionado === item && styles.filterButtonActive]}
              onPress={() => setUsuarioSelecionado(item)}
            >
              <Text style={[styles.filterButtonText, usuarioSelecionado === item && styles.filterButtonTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={styles.screenTitle}>Pratos Disponíveis</Text>
      
      {anunciosFiltrados.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="cookie-alert-outline" size={48} color="#ffb294" />
          <Text style={styles.emptyText}>Nenhum anúncio encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={anunciosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AdCard item={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  screenTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#635a49' },
  filterContainer: { marginBottom: 20 },
  filterTitle: { fontSize: 14, fontWeight: 'bold', color: '#635a49', marginBottom: 8 },
  filterButton: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#f8d8a5' },
  filterButtonActive: { backgroundColor: '#ff8482', borderColor: '#ff8482' },
  filterButtonText: { color: '#635a49', fontWeight: '600' },
  filterButtonTextActive: { color: '#FFF' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 },
  emptyText: { fontSize: 16, color: '#635a49', fontWeight: 'bold', marginTop: 10 },
});