// nike-clone-backend/server.js (ATUALIZADO COM ROTA DE PEDIDOS)

console.log("--- DEBUG: server.js INICIADO ---");

import express from 'express';
// import dotenv from 'dotenv'; // Não é mais necessário aqui
import cors from 'cors';

// Importações de Configuração e Rotas
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // 1. IMPORTAR A ROTA DE PEDIDOS

console.log("--- DEBUG: Importações concluídas ---");

// As variáveis de ambiente já foram carregadas pelo start.js!

// Conectar ao Banco de Dados
console.log("--- DEBUG: Chamando connectDB() agora... ---");
connectDB();
console.log("--- DEBUG: PÓS-CHAMADA connectDB() ---");

const app = express();

// Middlewares
app.use(cors()); // Permite requisições do seu Front-End
app.use(express.json()); // Permite que o servidor aceite dados JSON no body

// Rota de Teste
app.get('/', (req, res) => {
    res.send('API está funcionando...');
});

// ROTAS DA APLICAÇÃO
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes);       
app.use('/api/orders', orderRoutes); // 2. USAR A ROTA DE PEDIDOS


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    // O PORT agora é lido corretamente a partir do process.env no start.js
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

console.log("--- DEBUG: server.js CHEGOU AO FIM DO ARQUIVO ---");