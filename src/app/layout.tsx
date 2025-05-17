import { ReactNode } from 'react';
import { CartProvider } from '@/Context/CartContext';
import './globals.css';

export const metadata = {
  title: 'MODACHIC - Moda Exclusiva',
  description: 'Moda exclusiva e acessórios de qualidade para seu estilo único',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}