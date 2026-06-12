import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaHome({ navigation }) {
  const fazerLogout = () => {
    signOut(autenticacao);
  };

  const nomeUsuario = autenticacao.currentUser?.displayName || 'Usuário';

  return (
    <SafeAreaView style={estilos.safe}>
      <View style={estilos.container}>
        <View style={estilos.card}>
          <View style={estilos.logoContainer}>
            <Text style={estilos.logoText}>SN</Text>
          </View>
          <Text style={estilos.title}>Bem-vindo, {nomeUsuario}!</Text>
          <TouchableOpacity style={estilos.button} onPress={fazerLogout}>
            <Text style={estilos.buttonText}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[estilos.button, {marginTop: 10}]} onPress={()=> navigation.navigate('Perfil')}>
            <Text style={estilos.buttonText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[estilos.button, {marginTop: 10}]} onPress={()=> navigation.navigate('Admin')}>
            <Text style={estilos.buttonText}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF3B0' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFF7D2',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#9E2A2B',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
    alignItems: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
    backgroundColor: '#335C67',
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoText: { color: '#FFF3B0', fontSize: 26, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 18, color: '#1E293B' },
  button: { backgroundColor: '#9E2A2B', padding: 14, borderRadius: 12, alignItems: 'center', width: '100%' },
  buttonText: { color: '#FFF3B0', fontWeight: '700' },
});