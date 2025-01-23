import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ConsultasScreen from '../screens/ConsultasScreen';
import CadastroScreen from '../screens/CadastroScreen';
import RecuperarSenhaScreen from '../screens/RecuperarSenhaScreen';
import RedefinirSenhaScreen from '../screens/RedefinirSenhaScreen';
import PerfilScreen from '../screens/PerfilScreen';
import AdminPanel from '../screens/AdminPanel';
import ReportsScreen from '../screens/ReportsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Consultas" component={ConsultasScreen} />;
      <Stack.Screen name="Cadastro" component={CadastroScreen} />;
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />;
      <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaScreen} initialParams={{ token: '' }} />;
      <Stack.Screen name="Perfil" component={PerfilScreen} />;
      <Stack.Screen name="AdminPanel" component={AdminPanel} />;
      <Stack.Screen name="ReportsScreen" component={ReportsScreen} />;
    </Stack.Navigator>
  );
}
