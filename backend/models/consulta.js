const db = require('../config/db');

const Consulta = {
  async criar(dados) {
    const sql = `INSERT INTO consultas (paciente, medico, data, horario, motivo) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [dados.paciente, dados.medico, dados.data, dados.horario, dados.motivo]);
    return result;
  },
  async listar() {
    const sql = `SELECT * FROM consultas`;
    const [rows] = await db.query(sql);
    return rows;
  },
  async atualizar(id, dados) {
    const sql = `UPDATE consultas SET paciente = ?, medico = ?, data = ?, horario = ?, motivo = ? WHERE id = ?`;
    const [result] = await db.execute(sql, [dados.paciente, dados.medico, dados.data, dados.horario, dados.motivo, id]);
    return result;
  },
  async deletar(id) {
    const sql = `DELETE FROM consultas WHERE id = ?`;
    const [result] = await db.execute(sql, [id]);
    return result;
  },
};

module.exports = Consulta;
