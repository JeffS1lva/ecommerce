"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: "1", name: "Vestidos", image: "https://images.unsplash.com/photo-1589400363677-81704324e25b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fHZlc3RpZG98ZW58MHx8MHx8fDA%3D" },
  { id: "2", name: "Bolsas", image: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9sc2FzfGVufDB8fDB8fHww" },
  { id: "3", name: "Acessórios", image: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWNlc3MlQzMlQjNyaW9zfGVufDB8fDB8fHww" },
  { id: "4", name: "Calçados", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FsJUMzJUE3YWRvc3xlbnwwfHwwfHx8MA%3D%3D" },
];

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const CategoryHighlights: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Categorias em Destaque</h2>
          <Button variant="ghost" className="flex items-center text-gray-700 hover:text-gray-900">
            Ver todas
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Card className="overflow-hidden border-none shadow-md group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 relative">
                  <div className="overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="w-full">
                      <h3 className="text-white font-semibold text-xl mb-1">{category.name}</h3>
                      <div className="w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryHighlights;