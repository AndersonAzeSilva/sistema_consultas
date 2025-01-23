import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Button, Text } from 'react-native';
import { setupNotificationListener } from '../services/notificationService';
import axios from 'axios';

const ChatScreen = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Configuração de notificações
    setupNotificationListener(message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Fetch de mensagens do chat
    axios.get(`/chat/${userId}`)
      .then(response => {
        setMessages(response.data.messages);
      })
      .catch(error => console.error('Erro ao buscar mensagens:', error));
  }, []);

  const sendMessage = () => {
    axios.post('/chat/send', {
      senderId: userId,
      receiverId,
      message
    })
    .then(response => {
      setMessages([...messages, { senderId: userId, receiverId, message }]);
      setMessage('');
    })
    .catch(error => console.error('Erro ao enviar mensagem:', error));
  };

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.message}</Text>}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Digite sua mensagem"
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
