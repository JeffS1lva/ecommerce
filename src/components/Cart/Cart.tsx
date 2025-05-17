"use client"

import React, { useState } from 'react';
import { X, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '@/Context/CartContext';
import CartItem from '@/components/Cart/CartItem';
import type { Product } from '@/types/types';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

// Definindo as interfaces usando TypeScript
interface CartItemType extends Product {
  quantity?: number;
}

interface CartContextType {
  cartItems: CartItemType[];
  setIsCartOpen: (isOpen: boolean) => void;
  isCartOpen: boolean;
  removeFromCart?: (id: string | number) => void;
  updateQuantity?: (id: string | number, quantity: number) => void;
}

const Cart: React.FC = () => {
  const { cartItems, setIsCartOpen, isCartOpen } = useCart() as CartContextType;
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  const handleCheckout = (): void => {
    setIsCheckingOut(true);
    // Simular processamento
    setTimeout(() => {
      setIsCheckingOut(false);
      // Aqui você adicionaria lógica para redirecionar para checkout
    }, 1500);
  };

  const subtotal = cartItems.reduce(
    (total: number, item: CartItemType) => 
      total + (item.discountPrice || item.price) * (item.quantity || 1), 
    0
  ).toFixed(2);

  const itemCount = cartItems.reduce(
    (count: number, item: CartItemType) => count + (item.quantity || 1), 
    0
  );

  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-semibold flex items-center">
                Seu Carrinho
                {itemCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                  </Badge>
                )}
              </SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <X size={18} />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <ShoppingCart size={64} strokeWidth={1.5} className="mb-4" />
                </motion.div>
                <p className="text-center">Seu carrinho está vazio</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <motion.ul 
                className="py-4 space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="wait">
                  {cartItems.map((item: CartItemType) => (
                    <motion.li
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <CartItem item={item} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            )}
          </ScrollArea>

          {cartItems.length > 0 && (
            <motion.div 
              className="mt-auto border-t"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-none rounded-none shadow-none">
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span>Total</span>
                    <span className="text-lg">R$ {subtotal}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 p-6 pt-0">
                  <Button 
                    className="w-full" 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Finalizar Compra'
                    )}
                  </Button>
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">
                      Continuar Comprando
                    </Button>
                  </SheetClose>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;