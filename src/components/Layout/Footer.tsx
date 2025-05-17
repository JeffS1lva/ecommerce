"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, Mail, ChevronRight, MapPin, Phone } from 'lucide-react';
import { categories } from '@/data/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MotionLink = motion.a;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
    { icon: <Youtube size={18} />, label: "Youtube", href: "#" },
  ];

  const navLinks = [
    { name: "Página Inicial", href: "#" },
    { name: "Produtos", href: "#" },
    { name: "Ofertas", href: "#" },
    { name: "Sobre nós", href: "#" },
    { name: "Contato", href: "#" },
  ];

  const helpLinks = [
    { name: "FAQ", href: "#" },
    { name: "Envio e Entrega", href: "#" },
    { name: "Política de Devolução", href: "#" },
    { name: "Política de Privacidade", href: "#" },
    { name: "Termos de Serviço", href: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2
                }}
                className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
              >
                <span className="text-white font-bold">M</span>
              </motion.div>
              <h3 className="text-white text-xl font-semibold tracking-tight">MODACHIC</h3>
            </div>
            
            <p className="text-slate-400">
              Moda exclusiva e acessórios de qualidade para seu estilo único.
            </p>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium text-slate-200 mb-3">Inscreva-se na newsletter</h4>
              <div className="flex gap-2">
                <Input 
                  type="email"
                  placeholder="Seu e-mail" 
                  className="bg-slate-900 border-slate-800 focus-visible:ring-indigo-500"
                />
                <Button variant="default" className="shrink-0">
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
            
            <TooltipProvider>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={social.href}
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-900 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors"
                      >
                        {social.icon}
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </motion.div>
          
          {/* Navigation Column */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <h4 className="text-white font-medium mb-5">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.li key={index} variants={item}>
                  <MotionLink 
                    href={link.href}
                    className="hover:text-white flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ChevronRight size={16} className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </MotionLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Categories Column */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <h4 className="text-white font-medium mb-5">Categorias</h4>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((cat: string, index) => (
                <motion.li key={cat} variants={item}>
                  <MotionLink 
                    href="#"
                    className="hover:text-white flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ChevronRight size={16} className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cat}
                  </MotionLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Help Column */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <h4 className="text-white font-medium mb-5">Ajuda</h4>
            <ul className="space-y-3">
              {helpLinks.map((link, index) => (
                <motion.li key={index} variants={item}>
                  <MotionLink 
                    href={link.href}
                    className="hover:text-white flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ChevronRight size={16} className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </MotionLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <div className="pt-4 pb-2 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-slate-400">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-indigo-400" />
              <span>Av. Paulista, 1000 - São Paulo, SP</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-2 text-indigo-400" />
              <span>(11) 9999-9999</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2 text-indigo-400" />
              <span>contato@modachic.com</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-6 bg-slate-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">&copy; 2025 MODACHIC. Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <motion.img 
              src="/api/placeholder/200/32" 
              alt="Métodos de pagamento" 
              className="h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;