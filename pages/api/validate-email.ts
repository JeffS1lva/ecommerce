// pages/api/validate-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Configuração CORS para desenvolvimento
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    const isValid = validator.isEmail(email);
    const suggestions: string[] = [];

    if (!isValid && email.includes('@')) {
      const [user, domain] = email.split('@');
      const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
      
      commonDomains.forEach(d => {
        if (domain && d.startsWith(domain.toLowerCase())) {
          suggestions.push(`${user}@${d}`);
        }
      });
    }

    return res.status(200).json({
      email,
      valid: isValid,
      message: isValid ? 'Email válido' : 'Email inválido',
      ...(suggestions.length > 0 && { suggestions })
    });

  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}