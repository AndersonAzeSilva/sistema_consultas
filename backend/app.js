const express = require('express');
const authRoutes = require('./routes/authRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/medicos', medicoRoutes);
app.use('/consultas', consultaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/notifications', notificationRoutes);
app.use('/chat', chatRoutes);

module.exports = app;
