"use client"

import React from 'react';
import AnnouncementBar from '@/components/Layout/AnnoucementBar';
import Header from '@/components/Layout/Header';
import HeroBanner from '../components/home/HeroBanner';
import CategoryHighlights from '@/components/home/CategoryHighlighhts';
import SpecialOffer from '../components/home/SpecialOffer';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewsletterSection from '../components/home/NewsletterSection';
import Footer from '@/components/Layout/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <CategoryHighlights />
        <SpecialOffer />
        <FeaturedProducts />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}