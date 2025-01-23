const express = require('express');
const db = require('../config/db');
const autenticarToken = require('../middlewares/autenticarToken');

const router = express.Router();

// Listar todas as consultas
router.get('/', autenticarToken, async (req, res) => {
  try {
    const [consultas] = await db.query(
      'SELECT consultas.id, consultas.data, consultas.horario, pacientes.nome AS paciente, medicos.nome AS medico FROM consultas ' +
      'INNER JOIN pacientes ON consultas.paciente_id = pacientes.id ' +
      'INNER JOIN medicos ON consultas.medico_id = medicos.id'
    );
    res.json(consultas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar consultas.', error });
  }
});

// Criar nova consulta
router.post('/', autenticarToken, async (req, res) => {
  const { data, horario, paciente_id, medico_id } = req.body;
  try {
    const sql = 'INSERT INTO consultas (data, horario, paciente_id, medico_id) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(sql, [data, horario, paciente_id, medico_id]);
    res.json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar consulta.', error });
  }
});

// Editar consulta
router.put('/:id', autenticarToken, async (req, res) => {
  const { id } = req.params;
  const { data, horario, paciente_id, medico_id } = req.body;
  try {
    const sql = 'UPDATE consultas SET data = ?, horario = ?, paciente_id = ?, medico_id = ? WHERE id = ?';
    await db.execute(sql, [data, horario, paciente_id, medico_id, id]);
    res.json({ message: 'Consulta atualizada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar consulta.', error });
  }
});

// Excluir consulta
router.delete('/:id', autenticarToken, async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'DELETE FROM consultas WHERE id = ?';
    await db.execute(sql, [id]);
    res.json({ message: 'Consulta excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir consulta.', error });
  }
});

module.exports = router;
