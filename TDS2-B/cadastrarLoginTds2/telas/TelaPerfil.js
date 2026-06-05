import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { autenticacao, bancoDados } from '../config/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const camposIniciais = {
  nome: '',
  sobrenome: '',
  rua: '',
  bairro: '',
  cidade: '',
  estado: '',
  cep: '',
  telefone: '',
};

export default function TelaPerfil() {
  const [perfil, setPerfil] = useState(camposIniciais);
  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const usuario = autenticacao.currentUser;

  useEffect(() => {
    const carregarDados = async () => {
      if (!usuario) {
        setCarregando(false);
        return;
      }

      const storageKey = `@perfil_usuario_${usuario.uid}`;

      try {
        const perfilLocal = await AsyncStorage.getItem(storageKey);

        if (perfilLocal) {
          const dadosLocais = JSON.parse(perfilLocal);

          setPerfil({
            nome: dadosLocais.nome || '',
            sobrenome: dadosLocais.sobrenome || '',
            rua: dadosLocais.rua || '',
            bairro: dadosLocais.bairro || '',
            cidade: dadosLocais.cidade || '',
            estado: dadosLocais.estado || '',
            cep: dadosLocais.cep || '',
            telefone: dadosLocais.telefone || '',
          });

          setEditando(false);
          setCarregando(false);
        }
      } catch (e) {
        console.error('Erro ao carregar dados locais do perfil:', e);
      }

      try {
        const perfilRef = doc(bancoDados, 'users', usuario.uid);
        const perfilSnap = await getDoc(perfilRef);

        if (perfilSnap.exists()) {
          const dados = perfilSnap.data();

          const novosDados = {
            nome: dados.nome || '',
            sobrenome: dados.sobrenome || '',
            rua: dados.rua || '',
            bairro: dados.bairro || '',
            cidade: dados.cidade || '',
            estado: dados.estado || '',
            cep: dados.cep || '',
            telefone: dados.telefone || '',
          };

          setPerfil(novosDados);
          setEditando(false);

          await AsyncStorage.setItem(storageKey, JSON.stringify(novosDados));
        } else {
          const [primeiroNome, ...resto] = (usuario.displayName || '').split(' ');

          const dadosPadrao = {
            nome: primeiroNome || '',
            sobrenome: resto.join(' ') || '',
            rua: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
            telefone: '',
          };

          setPerfil(dadosPadrao);
          setEditando(true);

          await AsyncStorage.setItem(storageKey, JSON.stringify(dadosPadrao));
        }
      } catch (erro) {
        console.error('Erro ao buscar dados do Firestore:', erro);

        const perfilLocal = await AsyncStorage.getItem(storageKey);

        if (!perfilLocal) {
          Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
        }
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [usuario]);

  const salvarPerfil = async () => {
    if (!usuario) {
      return;
    }

    setSalvando(true);

    try {
      const nomeCompleto = `${perfil.nome.trim()} ${perfil.sobrenome.trim()}`.trim();

      if (nomeCompleto) {
        await updateProfile(usuario, {
          displayName: nomeCompleto,
        });
      }

      const perfilRef = doc(bancoDados, 'users', usuario.uid);

      const novosDados = {
        nome: perfil.nome,
        sobrenome: perfil.sobrenome,
        rua: perfil.rua,
        bairro: perfil.bairro,
        cidade: perfil.cidade,
        estado: perfil.estado,
        cep: perfil.cep,
        telefone: perfil.telefone,
        updatedAt: new Date(),
      };

      await setDoc(perfilRef, novosDados, { merge: true });

      const storageKey = `@perfil_usuario_${usuario.uid}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(novosDados));

      setEditando(false);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso.');
    } catch (erro) {
      console.error('Erro ao salvar perfil:', erro);
      Alert.alert('Erro', 'Não foi possível salvar o perfil. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  const atualizarCampo = (campo, valor) => {
    setPerfil((anterior) => ({ ...anterior, [campo]: valor }));
  };

  if (carregando) {
    return (
      <View style={estilos.centralizado}>
        <ActivityIndicator size="large" color="#c24693" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <View style={estilos.card}>
        <Text style={estilos.titulo}>Perfil do Usuário</Text>

        <View style={estilos.field}>
          <Text style={estilos.label}>Nome</Text>
          <TextInput
            style={estilos.input}
            value={perfil.nome}
            onChangeText={(valor) => atualizarCampo('nome', valor)}
            editable={editando}
          />
        </View>

        <View style={estilos.field}>
          <Text style={estilos.label}>Sobrenome</Text>
          <TextInput
            style={estilos.input}
            value={perfil.sobrenome}
            onChangeText={(valor) => atualizarCampo('sobrenome', valor)}
            editable={editando}
          />
        </View>

        <View style={estilos.field}>
          <Text style={estilos.label}>Rua</Text>
          <TextInput
            style={estilos.input}
            value={perfil.rua}
            onChangeText={(valor) => atualizarCampo('rua', valor)}
            editable={editando}
          />
        </View>

        <View style={estilos.field}>
          <Text style={estilos.label}>Bairro</Text>
          <TextInput
            style={estilos.input}
            value={perfil.bairro}
            onChangeText={(valor) => atualizarCampo('bairro', valor)}
            editable={editando}
          />
        </View>

        <View style={estilos.field}>
          <Text style={estilos.label}>Cidade</Text>
          <TextInput
            style={estilos.input}
            value={perfil.cidade}
            onChangeText={(valor) => atualizarCampo('cidade', valor)}
            editable={editando}
          />
        </View>

        <View style={estilos.field}>
          <Text style={estilos.label}>Estado</Text>
          <TextInput
            style={estilos.input}
            value={perfil.estado}
            onChangeText={(valor) => atualizarCampo('estado', valor)}
            editable={editando}
          />
        </View>

        <View style={estilos.field}>
          <Text style={estilos.label}>CEP</Text>
          <TextInput
            style={estilos.input}
            value={perfil.cep}
            onChangeText={(valor) => atualizarCampo('cep', valor)}
            editable={editando}
            keyboardType="numeric"
          />
        </View>

        <View style={estilos.field}>
          <Text style={estilos.label}>Telefone celular</Text>
          <TextInput
            style={estilos.input}
            value={perfil.telefone}
            onChangeText={(valor) => atualizarCampo('telefone', valor)}
            editable={editando}
            keyboardType="phone-pad"
          />
        </View>

      {editando ? (
        <View style={estilos.actions}>
          <TouchableOpacity
            style={[estilos.button, estilos.primaryButton, salvando && estilos.disabledButton]}
            onPress={salvarPerfil}
            activeOpacity={0.85}
            disabled={salvando}
          >
            <Text style={estilos.buttonText}>{salvando ? 'Salvando...' : 'Salvar Perfil'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[estilos.button, estilos.ghostButton]}
            onPress={() => setEditando(false)}
            activeOpacity={0.8}
          >
            <Text style={[estilos.buttonText, estilos.ghostText]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={estilos.actions}>
          <TouchableOpacity
            style={[estilos.button, estilos.primaryButton]}
            onPress={() => setEditando(true)}
            activeOpacity={0.85}
          >
            <Text style={estilos.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff0f8',
    minHeight: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 26,
    shadowColor: '#dc9acc',
    shadowOpacity: 0.24,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
    borderWidth: 1,
    borderColor: '#f7d9f1',
  },
  titulo: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#391a35',
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#7f5777',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f9eff8',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#f0d3e8',
    padding: 16,
    color: '#3b1f3b',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  centralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f8',
  },
  actions: {
    marginTop: 24,
  },
  button: {
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#c24693',
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: '#c24693',
  },
  ghostButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d89ac4',
  },
  disabledButton: {
    opacity: 0.65,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#ffffff',
  },
  ghostText: {
    color: '#9e4d8a',
  },
});