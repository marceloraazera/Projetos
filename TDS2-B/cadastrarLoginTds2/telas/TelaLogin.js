import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const fazerLogin = async () => {
    setErro('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(autenticacao, email, senha);
    } catch (e) {
      setErro('Erro ao fazer login. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={estilos.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={estilos.container}
      >
        <View style={estilos.card}>
          <View style={estilos.logoContainer}>
            <Text style={estilos.logoText}>SN</Text>
          </View>

          <Text style={estilos.title}>Bem-vindo de volta</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#9aa4b2"
            style={estilos.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Senha"
            placeholderTextColor="#9aa4b2"
            style={estilos.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity style={estilos.button} onPress={fazerLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={estilos.buttonText}>Entrar</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={estilos.link} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={estilos.linkText}>Criar uma conta</Text>
          </TouchableOpacity>

          {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
        </View>
      </KeyboardAvoidingView>
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
    padding: 22,
    shadowColor: '#9E2A2B',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
  logoContainer: {
    alignSelf: 'center',
    backgroundColor: '#335C67',
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: { color: '#FFF3B0', fontSize: 26, fontWeight: '700' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 16, color: '#1E293B' },
  input: {
    borderWidth: 1,
    borderColor: '#DFC379',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#FFF1C7',
    color: '#1E293B',
  },
  button: { backgroundColor: '#9E2A2B', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  buttonText: { color: '#FFF3B0', fontWeight: '700' },
  link: { marginTop: 12, alignItems: 'center' },
  linkText: { color: '#335C67' },
  erro: { color: '#9E2A2B', marginTop: 10, textAlign: 'center' },
});