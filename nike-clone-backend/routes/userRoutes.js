// nike-clone-backend/routes/userRoutes.js (Versão FINAL e Estável)

import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'; 

const router = express.Router();

// Função auxiliar para gerar JWT (JSON Web Token)
const generateToken = (id) => {
    // Leitura garantida da chave carregada pelo start.js
    const jwtSecret = process.env.JWT_SECRET;
    
    // Verificação de segurança
    if (!jwtSecret) {
         throw new Error('JWT_SECRET não foi carregada no ambiente.');
    }

    return jwt.sign({ id }, jwtSecret, { 
        expiresIn: '30d', 
    });
};

// @desc    Registrar um novo usuário
// @route   POST /api/users
// @access  Público
router.post(
    '/',
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            // Caso de erro 1: Usuário já existe
            res.status(400); 
            throw new Error('Usuário já existe.');
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            // Caso de sucesso (Status 201 Created)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
            
        } else {
            // Caso de erro 2: Falha na validação do Mongoose
            res.status(400);
            throw new Error('Dados de usuário inválidos.');
        }
    })
);


// @desc    Autenticar usuário e obter token (NOVA ROTA DE LOGIN)
// @route   POST /api/users/login
// @access  Público
router.post(
    '/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        // 1. Encontra o usuário pelo email
        const user = await User.findOne({ email });

        // 2. Verifica se o usuário existe E se a senha criptografada bate
        if (user && (await user.matchPassword(password))) {
            // Sucesso no login
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401); // 401 Unauthorized
            throw new Error('Email ou senha inválidos.');
        }
    })
);

export default router;