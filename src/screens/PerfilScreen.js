import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  useEffect(() => {
    // Função para carregar os dados do usuário
    const carregarPerfil = async () => {
      try {
        const { data } = await api.get('/usuarios/perfil');
        setNome(data.nome);
        setEmail(data.email);
        setFotoPerfil(data.fotoPerfil);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
      }
    };

    carregarPerfil();
  }, []);

  const handleAtualizarPerfil = async () => {
    try {
      const formData = new FormData();
      formData.append('idUsuario', 1); // Substituir pelo ID dinâmico do usuário
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('senhaAtual', senhaAtual);
      formData.append('novaSenha', novaSenha);
      if (fotoPerfil) {
        formData.append('fotoPerfil', {
          uri: fotoPerfil,
          name: 'perfil.jpg',
          type: 'image/jpeg',
        });
      }

      await api.put('/usuarios/atualizar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao atualizar perfil.');
    }
  };

  const selecionarFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFotoPerfil(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Image source={{ uri: fotoPerfil }} style={styles.image} />
      <Button title="Selecionar Foto" onPress={selecionarFoto} />
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha Atual" secureTextEntry value={senhaAtual} onChangeText={setSenhaAtual} />
      <TextInput style={styles.input} placeholder="Nova Senha" secureTextEntry value={novaSenha} onChangeText={setNovaSenha} />
      <Button title="Salvar Alterações" onPress={handleAtualizarPerfil} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 },
  image: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 15 },
});
