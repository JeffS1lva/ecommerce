import { Product } from '@/types/types';

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Vestido Floral Primavera",
    price: 299.99,
    discountPrice: 249.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVzdGlkb3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Vestidos",
    toFixed: function (arg0: number): unknown {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 2,
    name: "Bolsa Couro Artesanal",
    price: 499.99,
    discountPrice: 429.99,
    rating: 4.9,
    image: "https://plus.unsplash.com/premium_photo-1664353833832-b03ab1a002b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9sc2ElMjBjb3Vyb3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Bolsas",
    toFixed: function (arg0: number): unknown {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 3,
    name: "Camisa Linho Premium",
    price: 189.99,
    discountPrice: null,
    rating: 4.7,
    image: "https://plus.unsplash.com/premium_photo-1691367279376-624618a5aac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtaXNhJTIwbGluaG98ZW58MHx8MHx8fDA%3D",
    category: "Camisas",
    toFixed: function (arg0: number): unknown {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: 4,
    name: "Colar Banhado a Ouro",
    price: 159.99,
    discountPrice: 129.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1574960530128-71dc2d784e70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFjZXNzb3Jpb3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Acessórios",
    toFixed: function (arg0: number): unknown {
      throw new Error('Function not implemented.');
    }
  }
];