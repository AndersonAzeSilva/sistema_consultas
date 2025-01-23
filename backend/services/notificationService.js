const admin = require('../config/firebase');

async function sendNotificationToUser(fcmToken, message) {
  const payload = {
    notification: {
      title: message.title,
      body: message.body,
    },
    token: fcmToken
  };

  try {
    await admin.messaging().send(payload);
    console.log('Notificação enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar a notificação:', error);
  }
}

module.exports = { sendNotificationToUser };
