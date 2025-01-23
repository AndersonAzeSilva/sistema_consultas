const { sendNotificationToUser } = require('../services/notificationService');

async function notifyUser(req, res) {
  const { fcmToken, message } = req.body;
  try {
    await sendNotificationToUser(fcmToken, message);
    res.status(200).json({ success: true, message: 'Notificação enviada.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao enviar notificação.' });
  }
}

module.exports = { notifyUser };
