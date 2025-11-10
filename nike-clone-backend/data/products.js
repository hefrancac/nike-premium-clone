// nike-clone-backend/data/products.js (APENAS PRODUTOS PREMIUM COM GALERIA)

const products = [
    {
        name: 'Balenciaga Moletom Tape Type',
        description: 'Moletom preto com capuz clássico, ombros deslocados, bainha e punhos canelados e detalhe desgastado. Composição: 100% algodão.',
        category: 'Casual',
        price: 6890.90,
        image: '/images/products/balenciaga_tapetype_frente.jpg', // Imagem de capa
        images: [ // Galeria completa
            '/images/products/balenciaga_tapetype_frente.jpg', // Imagem 4
            '/images/products/balenciaga_tapetype_lado.jpg'     // Imagem 5
        ],
        badge: 'Balenciaga',
        colors: ['Preto', 'Cinza'],
    },
    {
        name: 'Balenciaga Suéter com logo',
        description: 'Suéter preto produzido na Itália. Decote careca, mangas longas, bordado de logo no busto, bainha e punhos canelados. Composição: 100% lã.',
        category: 'Casual',
        price: 5790.00,
        image: '/images/products/balenciaga_sweater_frente.jpg', // Imagem de capa
        images: [ // Galeria completa
            '/images/products/balenciaga_sweater_frente.jpg',    // Imagem 6
            '/images/products/balenciaga_sweater_modelo1.jpg',   // Imagem 7
            '/images/products/balenciaga_sweater_costas.jpg',    // Imagem 8
            '/images/products/balenciaga_sweater_modelo2.jpg'    // Imagem 9
        ],
        badge: 'Balenciaga',
        colors: ['Preto', 'Azul Marinho'],
    },
    {
        name: 'Balenciaga Moletom Automobili Lamborghini',
        description: 'Moletom com capuz Automobili Lamborghini. Preto, motivo Lamborghini Shield, bolso canguru, mangas longas e acabamento canelado. Composição: 100% algodão.',
        category: 'Casual',
        price: 6290.00,
        image: '/images/products/balenciaga_lamborghini_hoodie.jpg',
        images: ['/images/products/balenciaga_lamborghini_hoodie.jpg'], // (Adicione mais imagens se tiver)
        badge: 'Exclusivo',
        colors: ['Preto', 'Amarelo'],
    },
    {
        name: 'Diesel T-Boxt-Den T-shirt',
        description: 'Camiseta cinza com decote careca, mangas curtas e acabamento canelado. Composição: 100% algodão.',
        category: 'Casual',
        price: 649.90,
        image: '/images/products/diesel_tboxtden_tshirt.jpg',
        images: ['/images/products/diesel_tboxtden_tshirt.jpg'], // (Adicione mais imagens se tiver)
        badge: 'Diesel',
        colors: ['Cinza', 'Preto', 'Branco'],
    },
    {
        name: 'Diesel Camiseta S-cooler-L1',
        description: 'Camiseta preta com decote careca e patch de logo frontal. Composição: 100% algodão.',
        category: 'Casual',
        price: 519.90,
        image: '/images/products/diesel_scoolerl1_frente.jpg', // Imagem de capa
        images: [ // Galeria completa
            '/images/products/diesel_scoolerl1_frente.jpg',    // Imagem 1
            '/images/products/diesel_scoolerl1_modelo.jpg',    // Imagem 2
            '/images/products/diesel_scoolerl1_costas.jpg'     // Imagem 3
        ],
        badge: 'Diesel',
        colors: ['Preto', 'Branco'],
    }
];

export default products;