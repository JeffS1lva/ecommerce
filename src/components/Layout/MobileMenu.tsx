"use client"

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { categories } from '../../data/categories';

const MobileMenu: React.FC = () => {
  return (
    <div className="lg:hidden bg-white border-t">
      <div className="container mx-auto px-4 py-2">
        <ul className="space-y-2">
          {categories.map((category: string) => (
            <li key={category} className="py-2 border-b">
              <button className="flex items-center justify-between w-full">
                <span>{category}</span>
                <ChevronRight size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;