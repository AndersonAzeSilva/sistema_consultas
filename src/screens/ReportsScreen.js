import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../services/api';

export default function ReportsScreen() {
  const [consultas, setConsultas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const consultasData = await api.get('/admin/reports/consultas');
        const usuariosData = await api.get('/admin/reports/usuarios');
        setConsultas(consultasData.data);
        setUsuarios(usuariosData.data);
      } catch (error) {
        console.error('Erro ao carregar relatórios', error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios do Sistema</Text>

      <Text style={styles.sectionTitle}>Consultas Realizadas</Text>
      <FlatList
        data={consultas}
        keyExtractor={(item) => item.dia}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text>{`Dia: ${item.dia} - Total: ${item.totalConsultas}`}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Usuários Registrados</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.dia}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text>{`Dia: ${item.dia} - Total: ${item.totalUsuarios} - Nível: ${item.nivel}`}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  reportItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
