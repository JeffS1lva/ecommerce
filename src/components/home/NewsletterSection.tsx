"use client"

import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, Check, Copy, Gift, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useRouter } from 'next/navigation';

interface NewsletterFormData {
  email: string;
  title: string;
}

// Simula um serviço de e-commerce
const EcommerceService = {
  // Validar email (verificação básica)
  validateEmail: (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  
  // Verificar se email já está cadastrado
  checkEmailExists: async (email: string): Promise<boolean> => {
    // Simulação de API check
    await new Promise(resolve => setTimeout(resolve, 800));
    return Math.random() < 0.2; // 20% de chance de já estar cadastrado
  },
  
  // Gerar código de cupom
  generateCouponCode: (): string => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'WELCOME20-';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  },
  
  // Registrar usuário para newsletter
  subscribeToNewsletter: async (email: string): Promise<{success: boolean, couponCode?: string}> => {
    // Simulação de API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    const success = Math.random() < 0.9; // 90% de chance de sucesso
    
    if (success) {
      return {
        success: true,
        couponCode: EcommerceService.generateCouponCode()
      };
    }
    
    return { success: false };
  }
};

const NewsletterSection: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [showCouponDialog, setShowCouponDialog] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    // Validar email
    if (!email) {
      setErrorMessage("Por favor, insira seu email.");
      return;
    }
    
    if (!EcommerceService.validateEmail(email)) {
      setErrorMessage("Por favor, insira um email válido.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Verificar se o email já existe
      const emailExists = await EcommerceService.checkEmailExists(email);
      
      if (emailExists) {
        setIsSubmitting(false);
        setErrorMessage("Este email já está cadastrado. Tente outro ou faça login para ver seus cupons.");
        return;
      }
      
      // Registrar para newsletter
      const result = await EcommerceService.subscribeToNewsletter(email);
      
      if (result.success && result.couponCode) {
        setCouponCode(result.couponCode);
        setIsSubmitting(false);
        setIsSubscribed(true);
        // Exibir diálogo com cupom após um breve delay
        setTimeout(() => {
          setShowCouponDialog(true);
        }, 800);
        
        // Salvar email na localStorage (para simular persistência)
        localStorage.setItem("newsletter_email", email);
        localStorage.setItem("discount_coupon", result.couponCode);
        
        toast("Inscrição realizada com sucesso! Seu cupom de 20% foi gerado.");
      } else {
        throw new Error("Falha ao processar a inscrição");
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage("Ocorreu um erro ao processar sua inscrição. Tente novamente mais tarde.");
      toast("Erro: Não foi possível completar sua inscrição. Tente novamente.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode);
    setCopySuccess(true);
    toast("Código copiado! O cupom foi copiado para a área de transferência.");
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const navigateToShop = () => {
    // Simular navegação para a loja com contador
    setCountdown(3);
    setTimeout(() => {
      router.push("/shop");
      // Caso a navegação real não funcione neste ambiente, alertamos o usuário
      alert("Redirecionando para a loja... (Simulação)");
    }, 3000);
  };

  return (
    <>
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4">20% de desconto na primeira compra</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Cadastre-se em nossa newsletter e receba um cupom de 20% de desconto para usar em sua primeira compra.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="max-w-md mx-auto"
          >
            <Card className="border-0 shadow-lg bg-white/10 backdrop-blur-md">
              <CardContent className="p-2 pt-4">
                {!isSubscribed ? (
                  <>
                    <form onSubmit={validateAndSubmit} className="flex flex-col gap-4">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="Seu melhor email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 py-6 bg-white text-gray-800 border-0 rounded-lg focus-visible:ring-indigo-500"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <AnimatePresence>
                        {errorMessage && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <Alert variant="destructive" className="bg-red-500/20 border-red-500 text-white">
                              <AlertTitle className="text-white">Atenção</AlertTitle>
                              <AlertDescription className="text-white">
                                {errorMessage}
                              </AlertDescription>
                            </Alert>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg w-full py-6"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Quero meu desconto de 20%
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                    <p className="text-xs text-white/70 mt-3">
                      Não enviamos spam. Você pode cancelar a inscrição a qualquer momento.
                    </p>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-4 text-center gap-2"
                  >
                    <div className="flex items-center text-lg text-white">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        className="bg-green-500 rounded-full p-1 mr-3"
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                      <span>Cadastro concluído com sucesso!</span>
                    </div>
                    
                    <p className="text-sm text-white/80">
                      Seu cupom aparecerá em instantes...
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Diálogo com cupom */}
      <Dialog open={showCouponDialog} onOpenChange={setShowCouponDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-indigo-600" />
              Seu cupom de 20% de desconto está pronto!
            </DialogTitle>
            <DialogDescription>
              Copie o código abaixo ou clique para navegar direto para nossa loja.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between bg-white rounded-md border border-indigo-300 p-2 mb-3">
              <div className="flex items-center">
                <Tag className="h-4 w-4 text-indigo-600 mr-2" />
                <code className="font-mono text-lg font-bold text-indigo-900">{couponCode}</code>
              </div>
              <Button
                size="sm"
                variant={copySuccess ? "secondary" : "outline"}
                onClick={copyToClipboard}
                className={`${copySuccess ? 'bg-green-100 text-green-700 border-green-300' : ''}`}
              >
                {copySuccess ? (
                  <>
                    <Check className="h-4 w-4 mr-1" /> Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" /> Copiar
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-sm text-indigo-700">
              <span className="font-bold">Detalhes:</span> Válido por 7 dias, para compras acima de R$ 50,00. Não cumulativo com outras promoções.
            </p>
          </div>
          
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button 
              onClick={navigateToShop}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {countdown > 0 ? (
                `Ir para a loja (redirecionando em ${countdown}...)`
              ) : (
                <>Ir para a loja agora <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowCouponDialog(false)}
              className="w-full"
            >
              Continuar navegando
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Toaster />
    </>
  );
};

export default NewsletterSection;