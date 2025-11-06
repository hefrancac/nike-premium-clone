// server.js

console.log("--- DEBUG: server.js INICIADO ---");

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'; // <-- ADICIONE AQUI (1/2)

console.log("--- DEBUG: Importações concluídas ---");

// Carregar variáveis de ambiente do .env
dotenv.config();
console.log("--- DEBUG: dotenv.config() chamado ---");

// Conectar ao Banco de Dados
console.log("--- DEBUG: Chamando connectDB() agora... ---");
connectDB();
console.log("--- DEBUG: PÓS-CHAMADA connectDB() ---");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de Teste
app.get('/', (req, res) => {
    res.send('API está funcionando...');
});

// Use as rotas de produtos
app.use('/api/products', productRoutes); // <-- ADICIONE AQUI (2/2)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

console.log("--- DEBUG: server.js CHEGOU AO FIM DO ARQUIVO ---");