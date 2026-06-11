import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaHome({ navigation: navigationProp }) {
  const navigation = navigationProp || useNavigation();

  const fazerLogout = () => {
    signOut(autenticacao);
  };

  const nomeUsuario = autenticacao.currentUser?.displayName || 'Usuário';

  const abrirPerfil = () => {
    navigation.navigate('Perfil');
  };

  return (
    <View style={estilos.background}>
      <View style={estilos.card}>
        <Text style={estilos.header}>Bem-vindo, {nomeUsuario}!</Text>
        <Text style={estilos.subtitle}>Você está autenticado.</Text>

        <TouchableOpacity style={estilos.button} onPress={fazerLogout}>
          <Text style={estilos.buttonText}>Sair</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[estilos.button, {marginTop: 10}]} onPress={abrirPerfil}>
            <Text style={estilos.buttonText}>Perfil</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e8f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 28,
    shadowColor: '#aac2ff',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f4db7',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7aad',
    marginBottom: 24,
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#4f6abf',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});