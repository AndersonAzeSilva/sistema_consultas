import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import api from '../services/api';

export default function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const { data: usuariosData } = await api.get('/admin/usuarios');
      const { data: profissionaisData } = await api.get('/admin/profissionais');
      setUsuarios(usuariosData);
      setProfissionais(profissionaisData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    }
  };

  const excluirUsuario = async (id) => {
    try {
      await api.delete(`/admin/usuarios/${id}`);
      Alert.alert('Sucesso', 'Usuário excluído.');
      carregarDados();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o usuário.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Administrativo</Text>
      <Text style={styles.subtitle}>Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.email}</Text>
            <Button title="Excluir" onPress={() => excluirUsuario(item.id)} />
          </View>
        )}
      />
      <Text style={styles.subtitle}>Profissionais de Saúde</Text>
      <FlatList
        data={profissionais}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.especialidade}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
