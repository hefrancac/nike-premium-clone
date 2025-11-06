// routes/productRoutes.js

import express from 'express';
import Product from '../models/productModel.js';

const router = express.Router();

// @desc    Buscar produtos (COM FILTRO DE CATEGORIA)
// @route   GET /api/products
// @access  Público
router.get('/', async (req, res) => {
    try {
        const category = req.query.category 
            ? { category: req.query.category } 
            : {}; 
        const products = await Product.find({ ...category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


// @desc    BUSCA POR AUTOCOMPLETE (NOVA ROTA)
// @route   GET /api/products/search
// @access  Público
router.get('/search', async (req, res) => {
    try {
        // 1. Pega o termo de busca da URL (ex: ?q=tênis)
        const query = req.query.q;

        if (!query) {
            return res.json([]);
        }

        // 2. Cria uma "Expressão Regular" (regex) para buscar
        // Isso procura por 'query' em qualquer parte do nome
        // 'i' significa "ignorar maiúsculas/minúsculas"
        const searchRegex = new RegExp(query, 'i');

        // 3. Busca no banco de dados
        const products = await Product.find({
            name: { $regex: searchRegex }
        })
        .limit(5); // 4. Limita a 5 resultados (para um autocomplete rápido)

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


// @desc    Buscar um produto por ID (Esta rota deve vir DEPOIS da /search)
// @route   GET /api/products/:id
// @access  Público
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

export default router;