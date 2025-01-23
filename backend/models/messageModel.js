const db = require('../config/database');

function sendMessage(senderId, receiverId, message) {
  const query = `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`;
  return db.execute(query, [senderId, receiverId, message]);
}

function getMessages(userId) {
  const query = `SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp DESC`;
  return db.execute(query, [userId, userId]);
}

module.exports = { sendMessage, getMessages };
