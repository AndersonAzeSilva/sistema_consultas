const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware para verificar se o usuário é administrador
const verificarAdmin = async (req, res, next) => {
  const { idUsuario } = req.body; // ou obter do token, se usar JWT

  try {
    const [user] = await db.query('SELECT nivel FROM usuarios WHERE id = ?', [idUsuario]);
    if (user[0].nivel !== 1) {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar nível de usuário.', error });
  }
};

// Rota para listar todos os usuários
router.get('/usuarios', verificarAdmin, async (req, res) => {
  try {
    const [usuarios] = await db.query('SELECT id, nome, email, nivel FROM usuarios');
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários.', error });
  }
});

// Rota para atualizar um usuário
router.put('/usuarios/:id', verificarAdmin, async (req, res) => {
  const { id } = req.params;
  const { nome, email, nivel } = req.body;

  try {
    await db.execute('UPDATE usuarios SET nome = ?, email = ?, nivel = ? WHERE id = ?', [nome, email, nivel, id]);
    res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error });
  }
});

// Rota para excluir um usuário
router.delete('/usuarios/:id', verificarAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir usuário.', error });
  }
});

// Rota para listar profissionais de saúde
router.get('/profissionais', verificarAdmin, async (req, res) => {
  try {
    const [profissionais] = await db.query('SELECT id, nome, especialidade FROM profissionais');
    res.status(200).json(profissionais);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar profissionais.', error });
  }
});
