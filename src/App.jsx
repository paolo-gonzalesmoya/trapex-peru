import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustBar from './components/TrustBar';
import VideoShowcase from './components/VideoShowcase';
import ProductCatalog from './components/ProductCatalog';
import QuoteCalculator from './components/QuoteCalculator';
import CircularEconomy from './components/CircularEconomy';
import IndustriesSection from './components/IndustriesSection';
import ClientContactForm from './components/ClientContactForm';
import AdminClientCrud from './components/AdminClientCrud';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [totalClients, setTotalClients] = useState(0);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState(null);
  const [quoteDataForForm, setQuoteDataForForm] = useState(null);

  // Initialize client count
  useEffect(() => {
    const saved = localStorage.getItem('trapex_clients_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTotalClients(parsed.length);
      } catch (e) {
        setTotalClients(0);
      }
    }
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProductForQuote(product);
  };

  const handleSaveQuoteToForm = (quoteInfo) => {
    setQuoteDataForForm(quoteInfo);
  };

  const handleClientRegistered = () => {
    const saved = localStorage.getItem('trapex_clients_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTotalClients(parsed.length);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-trapex-navy selection:text-white">
      
      {/* Navigation Header */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)} 
        totalClientsCount={totalClients} 
      />

      {/* Main Landing Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section (with imagen1.png on the left) */}
        <HeroSection 
          onQuoteClick={() => {
            const el = document.getElementById('cotizador');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Trust Bar & Sodimac Proof */}
        <TrustBar />

        {/* 3. Interactive Video Showcase & 4-Step Process */}
        <VideoShowcase />

        {/* 4. Complete Product Catalog */}
        <ProductCatalog 
          onSelectProductForQuote={handleSelectProduct}
        />

        {/* 5. Live Wholesale Quote Calculator */}
        <QuoteCalculator 
          selectedProductFromCatalog={selectedProductForQuote}
          onSaveQuoteToForm={handleSaveQuoteToForm}
        />

        {/* 6. Industries Served */}
        <IndustriesSection />

        {/* 7. Circular Economy & Textile Waste Sourcing */}
        <CircularEconomy />

        {/* 8. Client Registration & Quotation Form */}
        <ClientContactForm 
          initialQuoteData={quoteDataForForm}
          onClientRegistered={handleClientRegistered}
        />

      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating 1-Click WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Admin Client Management CRUD Modal */}
      <AdminClientCrud
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataChange={(newCount) => setTotalClients(newCount)}
      />

    </div>
  );
}
