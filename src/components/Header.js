import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header({ currentScreen, onProfilePress }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerSpacer} />
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="cupcake" size={26} color="#ff8482" style={{ marginRight: 6 }} />
        <Text style={styles.logoText}>NhamMarket</Text>
      </View>
      <Pressable style={styles.profileButton} onPress={onProfilePress}>
        <SimpleLineIcons name="user" size={24} color={currentScreen === 'profile' ? '#ff8482' : '#635a49'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerSpacer: { width: 34 },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#ff8482' },
  profileButton: { padding: 5 },
});