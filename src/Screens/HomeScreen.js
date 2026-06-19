import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdCard from '../components/AddCard';
import { estilosGlobais, Cores } from '../Styles/globalStyles';
export default function HomeScreen({ anuncios, usuarioSelecionado, setUsuarioSelecionado, userEmail }) { 
  const usuariosFiltro = ['Todos', ...new Set(anuncios.map(anuncio => anuncio.usuario))];

  const anunciosFiltrados = usuarioSelecionado === 'Todos'
    ? anuncios
    : anuncios.filter(anuncio => anuncio.usuario === usuarioSelecionado);

  return (
    <View style={estilosGlobais.container}>
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

      <Text style={estilosGlobais.screenTitle}>Pratos Disponíveis</Text>
      
      {anunciosFiltrados.length === 0 ? (
        <View style={estilosGlobais.emptyContainer}>
          <MaterialCommunityIcons name="cookie-alert-outline" size={48} color="#ffb294" />
          <Text style={estilosGlobais.emptyText}>Nenhum anúncio encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={anunciosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AdCard item={item} userEmail={userEmail} />}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
    filterContainer: {
     marginBottom: 20
     },
     filterTitle: { 
    fontSize: 14,
     fontWeight: 'bold', 
     color: Cores.textoPrincipal,
      marginBottom: 8
     },
     filterButton: {
     backgroundColor: '#FFF',
     paddingHorizontal: 16, 
     paddingVertical: 8, 
     borderRadius: 20, 
     marginRight: 10,
      borderWidth: 1,
       borderColor: Cores.borda
       },
      filterButtonActive: { 
    backgroundColor: Cores.primariaClara, 
    borderColor: Cores.primariaClara 
     },
    filterButtonText: { 
    color: Cores.textoPrincipal,
     fontWeight: '600'
     },
     filterButtonTextActive: {
     color: '#FFF'
    },
});