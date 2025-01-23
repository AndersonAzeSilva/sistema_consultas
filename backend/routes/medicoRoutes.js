const express = require('express');
const db = require('../config/db');
const autenticarToken = require('../middlewares/autenticarToken');

const router = express.Router();

router.get('/', autenticarToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM medicos');
  res.json(rows);
});

router.post('/', autenticarToken, async (req, res) => {
  const { nome, especialidade, email, telefone } = req.body;
  const sql = 'INSERT INTO medicos (nome, especialidade, email, telefone) VALUES (?, ?, ?, ?)';
  const [result] = await db.execute(sql, [nome, especialidade, email, telefone]);
  res.json({ id: result.insertId });
});

module.exports = router;
