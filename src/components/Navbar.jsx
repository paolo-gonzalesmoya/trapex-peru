import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, ShieldCheck, Database, ShoppingBag, Truck } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Navbar({ onOpenAdmin, totalClientsCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Productos', href: '#catalogo' },
    { label: 'Proceso & Video', href: '#proceso' },
    { label: 'Cotizador Mayorista', href: '#cotizador' },
    { label: 'Economía Circular', href: '#reciclaje' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-trapex-navy text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Planta Operativa & Stock Permanente
            </span>
            <span className="hidden md:inline">• RUC: {companyData.ruc}</span>
            <span className="hidden lg:inline">• Envíos a todo el Perú</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={companyData.socials.sodimac} 
              target="_blank" 
              rel="noreferrer"
              className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1 text-[11px] font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> De venta oficial en Sodimac Perú
            </a>
            <span className="text-white/20">|</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-all"
            >
              <Database className="w-3 h-3" /> Panel Clientes {totalClientsCount > 0 && `(${totalClientsCount})`}
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' 
          : 'bg-white py-3.5 border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img 
              src="/Recursos/banner.png" 
              alt="TRAPEX Representaciones" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-trapex-navy transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-trapex-red hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Phone & WhatsApp Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${companyData.phones[0].number}`}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-trapex-navy px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-4 h-4 text-trapex-navy" />
              <span>{companyData.phones[0].display}</span>
            </a>

            <a
              href={`https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent('Hola Trapex, deseo solicitar una cotización por mayor de trapos y waypes.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>WhatsApp Ventas</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-trapex-navy hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 hover:text-trapex-navy py-2 border-b border-slate-50"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="pt-3 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent('Hola Trapex, deseo cotizar.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-lg text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar por WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex items-center justify-center gap-2 bg-slate-100 text-trapex-navy font-bold py-2.5 rounded-lg text-sm"
                >
                  <Database className="w-4 h-4" />
                  <span>Panel CRUD de Clientes</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
