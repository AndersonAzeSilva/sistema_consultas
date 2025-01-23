const express = require('express');
const { notifyUser } = require('../controllers/notificationController');
const router = express.Router();

router.post('/send', notifyUser);

module.exports = router;
