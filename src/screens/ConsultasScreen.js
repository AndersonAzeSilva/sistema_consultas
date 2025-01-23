import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import api from '../services/api';

export default function ConsultasScreen() {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    try {
      const response = await api.get('/consultas');
      setConsultas(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as consultas.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/consultas/${id}`);
      Alert.alert('Sucesso', 'Consulta excluída.');
      fetchConsultas();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a consulta.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Paciente: {item.paciente}</Text>
            <Text>Médico: {item.medico}</Text>
            <Text>Data: {item.data}</Text>
            <Text>Horário: {item.horario}</Text>
            <Button title="Excluir" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
