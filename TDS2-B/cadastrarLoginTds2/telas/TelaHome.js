import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaHome() {
  const fazerLogout = () => {
    signOut(autenticacao);
  };

  return (
    <View style={estilos.background}>
      <View style={estilos.card}>
        <Text style={estilos.title}>Bem-vindo</Text>
        <Text style={estilos.email}>{autenticacao.currentUser?.email}</Text>
        <Text style={estilos.subtitle}>Sua sessão foi iniciada com sucesso.</Text>

        <TouchableOpacity style={estilos.button} onPress={fazerLogout}>
          <Text style={estilos.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#eaf0ff',
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
    shadowColor: '#c9d9ff',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2f4db7',
    marginBottom: 6,
  },
  email: {
    color: '#4f6abf',
    marginBottom: 10,
    fontSize: 16,
  },
  subtitle: {
    color: '#7a89b6',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4f6abf',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});