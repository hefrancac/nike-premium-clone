// models/productModel.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Por favor, adicione um nome ao produto"],
        },
        description: {
            type: String,
            required: [true, "Por favor, adicione uma descrição"],
        },
        category: {
            type: String,
            required: [true, "Por favor, adicione uma categoria"],
        },
        price: {
            type: Number,
            required: [true, "Por favor, adicione um preço"],
            default: 0,
        },
        image: {
            type: String,
            required: [true, "Por favor, adicione uma URL de imagem"],
        },
        badge: { // Para os badges "Novo", "Best Seller" do seu plano
            type: String,
            default: '',
        },
    },
    {
        // Cria os campos createdAt e updatedAt automaticamente
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;