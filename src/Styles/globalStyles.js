// src/Styles/globalStyles.js
import { StyleSheet } from 'react-native';

export const Cores = {
  primaria: '#e07b6a',       
  primariaClara: '#ff8482',  
  fundo: '#f5f5f5',          
  card: '#FFFFFF',           
  borda: '#f8d8a5',          
  textoPrincipal: '#635a49', 
  textoSecundario: '#888888' 
};

export const estilosGlobais = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Cores.textoPrincipal,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: Cores.primaria,
    fontSize: 15,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Cores.textoPrincipal,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  botaoPrincipal: {
    borderRadius: 8,
    paddingVertical: 14, 
    paddingHorizontal: 20,   
    alignItems: 'center',     
    justifyContent: 'center',
    width: '100%',            
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});