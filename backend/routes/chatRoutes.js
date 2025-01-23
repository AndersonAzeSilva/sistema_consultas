const express = require('express');
const { sendMessageToChat, getUserMessages } = require('../controllers/chatController');
const router = express.Router();

router.post('/send', sendMessageToChat);
router.get('/:userId', getUserMessages);

module.exports = router;
