"use client";

import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Product } from '@/types/types';
import { useCart } from '@/Context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CartItemProps {
  item: Product;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const hasDiscount = item.discountPrice !== undefined && item.discountPrice !== null && item.discountPrice < item.price;
  
  // Função para calcular o preço unitário (considerando desconto se houver)
  const getUnitPrice = () => {
    return hasDiscount && item.discountPrice !== null 
      ? item.discountPrice 
      : item.price;
  };

  // Função para calcular o subtotal deste item (preço × quantidade)
  const getSubtotal = () => {
    const unitPrice = getUnitPrice();
    return unitPrice * (item.quantity || 1);
  };

  // Manipuladores de eventos que chamam diretamente as funções do contexto
  const handleIncreaseQuantity = () => {
    // Chama a função updateQuantity do context, passando +1 como delta
    updateQuantity(item.id, 1);
  };

  const handleDecreaseQuantity = () => {
    if ((item.quantity || 1) > 1) {
      // Chama a função updateQuantity do context, passando -1 como delta
      updateQuantity(item.id, -1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30,
          duration: 0.3 
        }}
        className="mb-4"
        data-testid={`cart-item-${item.id}`}
      >
        <Card className="overflow-hidden">
          <div className="flex p-4 items-center gap-4">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-md shadow-sm" 
                />
              </motion.div>
              
              {hasDiscount && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2"
                >
                  Sale
                </Badge>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-lg">{item.name}</h3>
              <div className="flex items-center mt-1">
                {hasDiscount ? (
                  <>
                    <span className="text-primary font-semibold text-lg">
                      R${item.discountPrice !== null ? item.discountPrice.toFixed(2) : '0.00'}
                    </span>
                    <span className="ml-2 text-muted-foreground line-through text-sm">
                      R${item.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-primary font-semibold text-lg">
                    R${item.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center mt-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={handleDecreaseQuantity}
                        disabled={(item.quantity || 1) <= 1}
                        data-testid="decrease-quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Diminuir quantidade</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <motion.span 
                  key={`quantity-${item.quantity || 1}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-4 font-medium min-w-8 text-center"
                  data-testid="item-quantity"
                >
                  {item.quantity || 1}
                </motion.span>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={handleIncreaseQuantity}
                        data-testid="increase-quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Aumentar quantidade</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-semibold text-right">
                Subtotal: R${getSubtotal().toFixed(2)}
              </span>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="mt-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      onClick={handleRemove}
                      data-testid="remove-item"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remover do carrinho</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartItem;