"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShoppingBag, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CollectionItem {
  id: string;
  title: string;
  isNew: boolean;
  imageUrl: string;
}

// Adicionando URLs de imagens reais do Unsplash para cada coleção
const collections: CollectionItem[] = [
  { 
    id: "summer", 
    title: "Verão 2025", 
    isNew: true,
    imageUrl: "https://images.unsplash.com/photo-1719552979950-f35958f97ebe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "fall", 
    title: "Outono 2025", 
    isNew: false,
    imageUrl: "https://images.unsplash.com/photo-1665598063191-c1faf73bbfb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "winter", 
    title: "Preview Inverno", 
    isNew: false,
    imageUrl: "https://images.unsplash.com/photo-1612694831362-d0f69f3bcf2d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

// URLs de imagens de perfil do Unsplash
const profileImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&q=80"
];

const HeroBanner: React.FC = () => {
  const [currentCollection, setCurrentCollection] = useState<string>("summer");

  // Efeito de rotação automática entre coleções
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCollection(prev => {
        const currentIndex = collections.findIndex(col => col.id === prev);
        const nextIndex = (currentIndex + 1) % collections.length;
        return collections[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentCollectionData = collections.find(col => col.id === currentCollection) || collections[0];

  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-indigo-900 to-purple-800 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-40 w-40 rounded-full bg-purple-400 blur-3xl -top-10 -left-10"></div>
        <div className="absolute h-56 w-56 rounded-full bg-indigo-400 blur-3xl bottom-0 right-10"></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="max-w-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={currentCollection} // Re-run animation when collection changes
          >
            <motion.div variants={itemVariants}>
              {currentCollectionData.isNew && (
                <Badge className="bg-white text-indigo-900 mb-6 hover:bg-gray-100">
                  NOVA COLEÇÃO
                </Badge>
              )}
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              variants={itemVariants}
            >
              Coleção {currentCollectionData.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg mb-8 text-gray-100"
              variants={itemVariants}
            >
              Descubra peças exclusivas com design sofisticado para você renovar seu guarda-roupa com estilo e autenticidade.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="bg-white text-indigo-900 hover:bg-gray-100"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Comprar Agora
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-zinc-900 hover:bg-white hover:bg-opacity-10"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Ver Lookbook
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex items-center"
              variants={itemVariants}
            >
              <div className="flex -space-x-2">
                {profileImages.map((imgSrc, index) => (
                  <div key={index} className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center overflow-hidden">
                    <img src={imgSrc} alt={`Usuário ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="ml-4 text-sm">+2.5K pessoas compraram esta semana</span>
            </motion.div>
          </motion.div>
          
          <div className="hidden lg:block relative h-full min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              key={`image-${currentCollection}`}
              className="relative rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-indigo-900/90 z-10"></div>
              <img 
                src={currentCollectionData.imageUrl}
                alt={`Coleção ${currentCollectionData.title}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
            
            {/* Collection selectors */}
            <div className="absolute bottom-6 right-6 z-20 bg-black/20 backdrop-blur-sm rounded-full p-1 flex gap-2">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setCurrentCollection(collection.id)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    currentCollection === collection.id ? 'bg-white scale-125' : 'bg-white/50 scale-100'
                  }`}
                  aria-label={`Ver coleção ${collection.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto fill-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,64C1120,53,1280,43,1360,37.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;