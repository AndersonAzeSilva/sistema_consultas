import messaging from '@react-native-firebase/messaging';

// Solicitar permissão de notificações
export async function requestUserPermission() {
  const enabled = await messaging().requestPermission();
  return enabled;
}

// Configuração de notificações recebidas
export function setupNotificationListener(onMessageReceived) {
  messaging().onMessage(async remoteMessage => {
    console.log('Notificação recebida no foreground:', remoteMessage);
    onMessageReceived(remoteMessage); // Passar para a tela que vai exibir a mensagem
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notificação aberta:', remoteMessage.notification);
  });

  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('Notificação inicial aberta:', remoteMessage.notification);
    }
  });
}
