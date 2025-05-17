"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '@/types/types';

// Estendendo o tipo Product para incluir a quantidade
interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = (product: Product): void => {
    // Verifica se o produto já existe no carrinho
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Se o produto já existe, incrementa a quantidade
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      // Se não existe, adiciona com quantidade 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number): void => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number): void => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        // Calcula a nova quantidade e garante que seja pelo menos 1
        const newQuantity = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    setCartItems(updatedCart);
  };

  // Calcula o preço total do carrinho
  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discountPrice !== undefined && item.discountPrice !== null
        ? item.discountPrice
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  // Calcula o número total de itens no carrinho
  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};