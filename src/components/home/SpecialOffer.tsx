"use client"

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SpecialOffer: React.FC = () => {
  return (
    <div className="container mx-auto px-4 my-6">
      <Alert className="bg-indigo-50 border-indigo-200">
        <AlertTitle className="text-indigo-800">Oferta Especial</AlertTitle>
        <AlertDescription>
          Até 40% de desconto em toda coleção de inverno. Oferta por tempo limitado!
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SpecialOffer;