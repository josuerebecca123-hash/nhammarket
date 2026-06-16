import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function AdCard({ item }) {
  const handleComprar = () => {
    Alert.alert('Aviso', 'Tente novamente mais tarde');
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.foodName}>{item.nome}</Text>
        <Text style={styles.foodPrice}>{item.preco}</Text>
      </View>
      
      <Text style={styles.foodMeta}>Por: {item.usuario}</Text>
      <Text style={styles.foodDate}>{item.dataHora}</Text>
      
      <Text style={styles.foodDescription} numberOfLines={3}>
        {item.descricao}
      </Text>
      
      <TouchableOpacity style={styles.buyButton} onPress={handleComprar}>
        <Text style={styles.buyButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF', borderRadius: 8, padding: 15, marginBottom: 15, borderWidth: 1, borderBottomWidth: 3, borderColor: '#E0E0E0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
  foodName: { fontSize: 18, fontWeight: 'bold', color: '#635a49', flex: 1, marginRight: 10 },
  foodPrice: { fontSize: 18, fontWeight: 'bold', color: '#91be95' },
  foodMeta: { fontSize: 13, color: '#ffb294', fontWeight: '600' },
  foodDate: { fontSize: 11, color: '#f8d8a5', marginBottom: 8 },
  foodDescription: { fontSize: 14, color: '#555', lineHeight: 20, marginBottom: 15 },
  buyButton: { backgroundColor: '#ff8482', borderRadius: 6, paddingVertical: 10, alignItems: 'center' },
  buyButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});