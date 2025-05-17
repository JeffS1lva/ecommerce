"use client"

import React, { useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import ProductCard from '../product/ProductCard'
import type { Product } from '@/types/types'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useInView } from 'framer-motion'

const FeaturedProducts: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex justify-between items-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight">Produtos em Destaque</h2>
          <Button 
            variant="ghost" 
            className="text-indigo-700 font-medium flex items-center gap-1 hover:bg-indigo-50"
          >
            <span>Ver todos</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts