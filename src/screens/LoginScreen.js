import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token } = response.data;
      Alert.alert('Login bem-sucedido!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro', 'Credenciais inválidas.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />

      <Button
        title="Ainda não tem uma conta? Cadastre-se"
        onPress={() => navigation.navigate('Cadastro')}
      />

      <Button
        title="Esqueceu sua senha?"
        onPress={() => navigation.navigate('RecuperarSenha')}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
});
