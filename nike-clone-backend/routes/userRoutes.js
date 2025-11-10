// nike-clone-backend/routes/userRoutes.js (FINAL, COM WISHLIST ROBUSTA)

import express from 'express';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'; 
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Função auxiliar para gerar JWT
const generateToken = (id) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
         throw new Error('JWT_SECRET não foi carregada no ambiente.');
    }
    return jwt.sign({ id }, jwtSecret, { 
        expiresIn: '30d', 
    });
};

// --- ROTAS DE AUTENTICAÇÃO ---

// @desc    Registrar um novo usuário
// @route   POST /api/users
// @access  Público
router.post(
    '/',
    asyncHandler(async (req, res) => {
        // ... (O código de Registro continua o mesmo)
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400); 
            throw new Error('Usuário já existe.');
        }
        const user = await User.create({ name, email, password });
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Dados de usuário inválidos.');
        }
    })
);

// @desc    Autenticar usuário (LOGIN)
// @route   POST /api/users/login
// @access  Público
router.post(
    '/login',
    asyncHandler(async (req, res) => {
        // ... (O código de Login continua o mesmo)
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401); 
            throw new Error('Email ou senha inválidos.');
        }
    })
);


// --- ROTAS DA WISHLIST (ATUALIZADAS PARA ROBUSTEZ) ---

// @desc    Adicionar produto à wishlist
// @route   POST /api/users/wishlist
// @access  Privado
router.post(
    '/wishlist',
    protect, 
    asyncHandler(async (req, res) => {
        const { productId } = req.body;
        const user = req.user; 

        if (!productId) {
            res.status(400);
            throw new Error('ID do produto é necessário.');
        }

        // 1. CORREÇÃO: Garante que o array exista
        if (!user.wishlist) {
            user.wishlist = [];
        }

        const alreadyAdded = user.wishlist.find(
            (item) => item.toString() === productId
        );

        if (!alreadyAdded) {
            user.wishlist.push(productId);
            await user.save();
            res.status(201).json({ message: 'Produto adicionado à wishlist' });
        } else {
            res.json({ message: 'Produto já está na wishlist' });
        }
    })
);

// @desc    Remover produto da wishlist
// @route   DELETE /api/users/wishlist/:id
// @access  Privado
router.delete(
    '/wishlist/:id', 
    protect, 
    asyncHandler(async (req, res) => {
        const productId = req.params.id;
        const user = req.user;

        // 2. CORREÇÃO: Só filtra se o array existir
        if (user.wishlist) {
            user.wishlist = user.wishlist.filter(
                (item) => item.toString() !== productId
            );
        }

        await user.save();
        res.json({ message: 'Produto removido da wishlist' });
    })
);

// @desc    Obter a wishlist do usuário
// @route   GET /api/users/wishlist
// @access  Privado
router.get(
    '/wishlist',
    protect, 
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id).populate('wishlist');
        
        // 3. CORREÇÃO: Retorna a lista ou um array vazio
        res.json(user.wishlist || []);
    })
);


export default router;