// nike-clone-backend/models/productModel.js (ATUALIZADO COM GALERIA)

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
        image: { // A imagem de capa (usada nos cards)
            type: String,
            required: [true, "Por favor, adicione uma URL de imagem"],
        },
        
        // --- NOVO CAMPO PARA A GALERIA ---
        images: {
            type: [String], // Um array de strings (links de imagem)
            default: [],
        },
        // --- FIM DO NOVO CAMPO ---

        badge: { 
            type: String,
            default: '',
        },
        searchName: {
            type: String,
            index: true,
        },
        colors: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// Lógica de Pré-Salvamento (continua igual)
productSchema.pre('save', function(next) {
    if (this.isModified('name') || this.isNew) {
        const removeDiacritics = (text) => {
            return text
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
        };
        this.searchName = removeDiacritics(this.name).toLowerCase();
    }
    next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;