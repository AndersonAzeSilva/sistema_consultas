import React, { useEffect } from 'react';
import { requestUserPermission } from './services/notificationService';

const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <View>
      <Text>Bem-vindo ao Sistema de Agendamento de Consultas!</Text>
      {/* Outras telas do app */}
    </View>
  );
};

export default App;
