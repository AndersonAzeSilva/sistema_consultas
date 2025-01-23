const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware para verificar se o usuário é administrador
const verificarAdmin = require('./adminRoutes').verificarAdmin;

// Rota para gerar relatório de consultas realizadas
router.get('/consultas', verificarAdmin, async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        COUNT(*) AS totalConsultas,
        DATE(dataConsulta) AS dia
      FROM consultas
      GROUP BY DATE(dataConsulta)
      ORDER BY dia DESC
    `);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório de consultas.', error });
  }
});

// Rota para gerar relatório de usuários registrados
router.get('/usuarios', verificarAdmin, async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        COUNT(*) AS totalUsuarios,
        nivel,
        DATE(registeredAt) AS dia
      FROM usuarios
      GROUP BY DATE(registeredAt), nivel
      ORDER BY dia DESC
    `);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório de usuários.', error });
  }
});

module.exports = router;
