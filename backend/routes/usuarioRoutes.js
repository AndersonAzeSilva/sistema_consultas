const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const multer = require('multer');

const router = express.Router();

// Rota para cadastro de usuário
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verificar se o e-mail já existe
        const [existingUser] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'E-mail já cadastrado.' });
        }

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserir o novo usuário no banco de dados
        const sql = 'INSERT INTO usuarios (nome, email, senha, nivel) VALUES (?, ?, ?, ?)';
        await db.execute(sql, [nome, email, hashedPassword, 'usuario']);

        res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar usuário.', error });
    }
});

// Rota para iniciar recuperação de senha
router.post('/recuperar-senha', async (req, res) => {
    const { email } = req.body;

    try {
        // Verificar se o e-mail existe
        const [user] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'E-mail não encontrado.' });
        }

        // Gerar um token para redefinição de senha
        const token = crypto.randomBytes(20).toString('hex');
        const expiracao = new Date(Date.now() + 3600000); // 1 hora

        // Salvar o token no banco
        await db.execute(
            'UPDATE usuarios SET reset_token = ?, reset_token_expiracao = ? WHERE email = ?',
            [token, expiracao, email]
        );

        // Configurar o serviço de e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'seu_email@gmail.com',
                pass: 'sua_senha',
            },
        });

        // Enviar o e-mail com o link
        const mailOptions = {
            from: 'seu_email@gmail.com',
            to: email,
            subject: 'Recuperação de Senha',
            text: `Você solicitou a recuperação de senha. Use o link abaixo para redefinir sua senha:
        http://localhost:3000/redefinir-senha/${token}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar solicitação.', error });
    }
});

// Rota para redefinir senha
router.post('/redefinir-senha', async (req, res) => {
    const { token, novaSenha } = req.body;

    try {
        // Verificar se o token é válido e não expirou
        const [user] = await db.query(
            'SELECT id FROM usuarios WHERE reset_token = ? AND reset_token_expiracao > ?',
            [token, new Date()]
        );

        if (user.length === 0) {
            return res.status(400).json({ message: 'Token inválido ou expirado.' });
        }

        // Criptografar a nova senha
        const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

        // Atualizar a senha no banco e remover o token
        await db.execute(
            'UPDATE usuarios SET senha = ?, reset_token = NULL, reset_token_expiracao = NULL WHERE id = ?',
            [senhaCriptografada, user[0].id]
        );

        res.status(200).json({ message: 'Senha redefinida com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao redefinir senha.', error });
    }
});

// Configuração do multer para upload de fotos de perfil
const upload = multer({ dest: 'uploads/perfis/' });

// Rota para atualizar informações do usuário
router.put('/atualizar', upload.single('fotoPerfil'), async (req, res) => {
    const { idUsuario, nome, email, senhaAtual, novaSenha } = req.body;

    try {
        // Verificar se o usuário existe
        const [user] = await db.query('SELECT * FROM usuarios WHERE id = ?', [idUsuario]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Verificar senha atual (se fornecida)
        if (senhaAtual && novaSenha) {
            const senhaValida = await bcrypt.compare(senhaAtual, user[0].senha);
            if (!senhaValida) {
                return res.status(400).json({ message: 'Senha atual incorreta.' });
            }

            const novaSenhaCriptografada = await bcrypt.hash(novaSenha, 10);
            await db.execute('UPDATE usuarios SET senha = ? WHERE id = ?', [novaSenhaCriptografada, idUsuario]);
        }

        // Atualizar nome, email e foto de perfil
        const fotoPerfil = req.file ? req.file.path : user[0].fotoPerfil;

        await db.execute(
            'UPDATE usuarios SET nome = ?, email = ?, fotoPerfil = ? WHERE id = ?',
            [nome || user[0].nome, email || user[0].email, fotoPerfil, idUsuario]
        );

        res.status(200).json({ message: 'Informações atualizadas com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar informações.', error });
    }
});

module.exports = router;
