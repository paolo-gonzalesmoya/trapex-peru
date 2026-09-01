import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Truck, ArrowRight, PhoneCall, CheckCircle2, Factory, Sparkles, Droplets, Play, Image as ImageIcon, Video } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function HeroSection({ onQuoteClick }) {
  const [activeMedia, setActiveMedia] = useState('waype'); // 'waype', 'video', 'retazos'
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Calculate scroll parallax translation
  const parallaxOffset = Math.min(scrollY * 0.18, 90);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-trapex-navy to-slate-900 text-white pt-8 pb-16 lg:py-20">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40"></div>
      
      {/* Ambient Glows */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-sky-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Waype Pack Hero Visual with Parallax & Media Switcher */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div 
              className="relative mx-auto max-w-md lg:max-w-none group cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Media Mode Tabs */}
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-3">
                <button
                  onClick={() => setActiveMedia('waype')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeMedia === 'waype'
                      ? 'bg-trapex-red text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Waype Trapex</span>
                </button>

                <button
                  onClick={() => setActiveMedia('video')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeMedia === 'video'
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video en Vivo</span>
                </button>

                <button
                  onClick={() => setActiveMedia('retazos')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeMedia === 'retazos'
                      ? 'bg-white/30 text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Retazos de Punto</span>
                </button>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500/25 via-red-500/20 to-sky-500/10 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Main Media Showcase Box */}
              <div 
                className="relative rounded-3xl overflow-hidden border-2 border-white/20 bg-slate-900/90 shadow-2xl transition-all duration-500 ease-out"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) translateY(${parallaxOffset * 0.15}px)`
                }}
              >
                {activeMedia === 'waype' && (
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                      src="/Recursos/waype_pack_hero.jpg"
                      alt="Waype Industrial Trapex Empaque Mayorista"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Glassmorphism Product Tag */}
                    <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-white border border-white/20 text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-sky-400" />
                      <span>Waype Paño Fino Oficial</span>
                    </div>

                    {/* Sello de Calidad */}
                    <div className="absolute top-4 right-4 bg-emerald-600/90 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg">
                      100% ALGODÓN PURO
                    </div>
                  </div>
                )}

                {activeMedia === 'video' && (
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-slate-950 flex items-center justify-center overflow-hidden">
                    <video
                      src="/Recursos/e39bc2a7-0915-43f9-9ca2-05b23089665c.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                    <div className="absolute bottom-4 left-4 bg-slate-950/80 text-white text-xs font-mono px-3 py-1 rounded-lg border border-white/10">
                      PROCESO TRAPEX • DESPACHO CONTINUO
                    </div>
                  </div>
                )}

                {activeMedia === 'retazos' && (
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                      src="/Recursos/imagen1.png"
                      alt="Trapos y Retazos Textiles Trapex"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-3 py-1.5 rounded-xl">
                      Retazos de Punto Cosidos
                    </div>
                  </div>
                )}

                {/* Bottom Overlay Summary Bar */}
                <div className="p-4 bg-slate-950/95 border-t border-white/10 backdrop-blur-md flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-400">
                      Producto Estrella de Fábrica
                    </span>
                    <h4 className="text-sm font-extrabold text-white">
                      Waype Fino & Trapo Cosido en Espiral
                    </h4>
                  </div>
                  <span className="bg-trapex-red text-white text-xs font-black px-2.5 py-1 rounded-lg shadow">
                    RUC 20511918465
                  </span>
                </div>
              </div>

              {/* Floating Floating Stat Widget */}
              <div 
                className="absolute -bottom-4 -left-4 bg-white text-slate-900 p-3.5 rounded-2xl shadow-2xl border border-slate-200 hidden sm:flex items-center gap-3 transition-transform duration-300"
                style={{ transform: `translateY(${-parallaxOffset * 0.25}px)` }}
              >
                <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center text-trapex-navy">
                  <Factory className="w-6 h-6 text-trapex-navy" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">+80 Toneladas / Mes</div>
                  <div className="text-[10px] text-slate-500 font-semibold">Despacho continuo en Lima y Perú</div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Copywriting & High Conversion CTAs */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-sm shadow-sm">
              <span className="bg-trapex-red text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                OFICIAL
              </span>
              <span>Representaciones Trapex E.I.R.L.</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-300 font-bold">Encuéntranos en Sodimac Perú</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display">
                Trapos y Algodón Industrial <br />
                <span className="bg-gradient-to-r from-sky-400 via-white to-sky-200 bg-clip-text text-transparent">
                  Calidad que Rinde por Mayor
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
                Fabricamos y distribuimos trapo industrial cosido y suelto, waype fino y cardado, algodón y franela para minería, talleres mecánicos, imprentas y plantas industriales con entrega inmediata.
              </p>
            </div>

            {/* Technical Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">100% Algodón Sin Metales</h4>
                  <p className="text-[11px] text-slate-300">Sin botones, cremalleras ni impurezas.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Garantía de Peso Exacto</h4>
                  <p className="text-[11px] text-slate-300">Sacos de 20kg, 50kg y fardos certificados.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Stock Permanente</h4>
                  <p className="text-[11px] text-slate-300">Despacho el mismo día a agencias y almacenes.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Precios Directos de Fábrica</h4>
                  <p className="text-[11px] text-slate-300">Escala de descuento para compras por volumen.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <a
                href="#cotizador"
                onClick={onQuoteClick}
                className="inline-flex items-center justify-center gap-2.5 bg-trapex-red hover:bg-red-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-red-950/40 transition-all hover:scale-105 active:scale-95"
              >
                <span>Cotizar Pedido Mayorista</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent('Hola Trapex, requiero cotización inmediata por mayor de trapos y waypes.')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hablar con un Asesor</span>
              </a>

              <a
                href="#catalogo"
                className="inline-flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-colors border border-white/15"
              >
                Ver Catálogo
              </a>
            </div>

            {/* Trust tags */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sky-400" />
                <span>Envíos a todo el Perú</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Facturación RUC 20 & Guías</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Desde 2005</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
