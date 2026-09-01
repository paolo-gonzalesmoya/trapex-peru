import React from 'react';
import { RefreshCw, Leaf, Coins, CheckCircle, ArrowRight, MessageCircle, Factory } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function CircularEconomy() {
  return (
    <section id="reciclaje" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Subtle green ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              Economía Circular & Proveedores Textiles
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display leading-tight">
              ¿Eres Fábrica o Taller de Confección? <br />
              <span className="text-emerald-400">Compramos tus Mermas y Residuos Textiles</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              En TRAPEX cerramos el ciclo productivo de la industria textil peruana. Compramos retazos de punto de algodón, saldos de tela y mermas de corte al por mayor en Lima y provincias, pagando al contado y con recojo programado.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Pago Inmediato al Contado</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Monetiza los retazos que ocupan espacio en tu planta.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Recojo con Flota Propia</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Retiramos el material en tus instalaciones según cronograma.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Compromiso Cero Desperdicio</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Transformamos mermas en trapos de alta durabilidad.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Comprobante y Formalidad</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Empresa formal con RUC 20 y documentación en regla.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <a
                href={`https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent('Hola Trapex, soy confeccionista/empresa textil y deseo vender mermas y retazos de algodón.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Vender Residuos Textiles (WhatsApp)</span>
              </a>

              <span className="text-xs text-slate-400">
                Atención en Gamarra, Ate, San Juan de Lurigancho, Villa El Salvador y provincias.
              </span>
            </div>

          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-800 shadow-2xl">
              <img
                src="/Recursos/276195663_5094882450570881_3547849191141535746_n.png"
                alt="Economía Circular Trapex"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Impacto Positivo
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  Más de 80 toneladas de material textil recicladas mensualmente
                </h4>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
