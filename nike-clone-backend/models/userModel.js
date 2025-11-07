// nike-clone-backend/models/userModel.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Importar o bcrypt

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Garante que não haverá emails duplicados
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: { // Campo para futuros administradores
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// 🚨 Lógica de SEGURANÇA: Criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
    // Se a senha não foi modificada, vá para o próximo middleware
    if (!this.isModified('password')) {
        next();
    }
    
    // Gera um 'salt' (valor aleatório) para aumentar a segurança
    const salt = await bcrypt.genSalt(10);
    // Faz o HASH da senha usando o salt
    this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar senhas (será usado no login futuro)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;