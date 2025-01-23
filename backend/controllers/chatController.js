const { sendMessage, getMessages } = require('../services/chatService');

async function sendMessageToChat(req, res) {
  const { senderId, receiverId, message } = req.body;
  try {
    await sendMessage(senderId, receiverId, message);
    res.status(200).json({ success: true, message: 'Mensagem enviada!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao enviar a mensagem.' });
  }
}

async function getUserMessages(req, res) {
  const { userId } = req.params;
  try {
    const messages = await getMessages(userId);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter mensagens.' });
  }
}

module.exports = { sendMessageToChat, getUserMessages };
