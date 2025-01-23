import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../services/api';

export default function RecuperarSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleRecuperarSenha = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }

    try {
      await api.post('/usuarios/recuperar-senha', { email });
      Alert.alert('Sucesso', 'Verifique seu e-mail para redefinir a senha.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao enviar solicitação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Recuperar Senha" onPress={handleRecuperarSenha} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 },
});
