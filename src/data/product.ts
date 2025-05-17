import { Product } from '@/types/types';

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Vestido Floral Primavera",
    price: 299.99,
    discountPrice: 249.99,
    rating: 4.8,
    image: "/api/placeholder/400/400",
    category: "Vestidos"
  },
  {
    id: 2,
    name: "Bolsa Couro Artesanal",
    price: 499.99,
    discountPrice: 429.99,
    rating: 4.9,
    image: "/api/placeholder/400/400",
    category: "Bolsas"
  },
  {
    id: 3,
    name: "Camisa Linho Premium",
    price: 189.99,
    discountPrice: null,
    rating: 4.7,
    image: "/api/placeholder/400/400",
    category: "Camisas"
  },
  {
    id: 4,
    name: "Colar Banhado a Ouro",
    price: 159.99,
    discountPrice: 129.99,
    rating: 4.6,
    image: "/api/placeholder/400/400",
    category: "Acessórios"
  }
];