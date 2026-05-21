import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const fazerLogin = async () => {
    try {
      await signInWithEmailAndPassword(autenticacao, email, senha);
    } catch (erro) {
      setErro('Erro ao fazer login. Verifique seus dados.');
    }
  };

  return (
    <View style={estilos.background}>
      <View style={estilos.card}>
        <Text style={estilos.header}>Bem-vindo de volta</Text>
        <Text style={estilos.subtitle}>Entre com seu email e senha para acessar.</Text>

        <View style={estilos.field}>
          <Text style={estilos.label}>Email</Text>
          <TextInput
            style={estilos.input}
            placeholder="seu@email.com"
            placeholderTextColor="#7b8bbd"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={estilos.field}>
          <Text style={estilos.label}>Senha</Text>
          <TextInput
            style={estilos.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#7b8bbd"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>
        {erro ? <Text style={estilos.erro}>{erro}</Text> : null}

        <TouchableOpacity style={estilos.button} onPress={fazerLogin}>
          <Text style={estilos.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={estilos.footer}>
          <Text style={estilos.footerText}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={estilos.footerLink}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
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
  field: {
    marginBottom: 18,
  },
  label: {
    color: '#4f6abf',
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f2f6ff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#d9e2ff',
    color: '#0f1b4c',
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
  erro: {
    color: '#d1407a',
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#7a89b6',
    marginRight: 6,
  },
  footerLink: {
    color: '#4f6abf',
    fontWeight: '700',
  },
});