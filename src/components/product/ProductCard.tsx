"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types/types';
import { useCart } from '@/Context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(product);
  };

  const discountPercentage = product.discountPrice 
    ? Math.round((1 - product.discountPrice / product.price) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-none shadow-lg">
        <div className="relative">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover" 
            />
          </motion.div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:text-rose-500 transition-colors"
                >
                  <Heart size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {product.discountPrice && (
            <Badge variant="destructive" className="absolute top-3 left-3 font-medium">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <h3 className="font-medium text-base line-clamp-2">{product.name}</h3>
            
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i: number) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={cn(
                      "mr-0.5",
                      i < Math.floor(product.rating) 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-muted-foreground/30"
                    )} 
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between pt-0 pb-4 px-4">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <div className="flex items-center">
                <span className="font-semibold text-primary">R${product.discountPrice.toFixed(2)}</span>
                <span className="text-muted-foreground text-sm line-through ml-2">
                  R${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-primary">R${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={handleAddToCart}
                  size="icon"
                  className="rounded-full shadow-md"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                  >
                    <ShoppingCart size={16} />
                  </motion.div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;