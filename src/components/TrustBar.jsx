import React from 'react';
import { ShieldCheck, Award, Factory, Users2, ExternalLink } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function TrustBar() {
  const stats = [
    { number: "20+", label: "Años de Trayectoria", sub: "Desde el año 2005", icon: Award },
    { number: "80+", label: "Toneladas / Mes", sub: "Capacidad productiva", icon: Factory },
    { number: "500+", label: "Empresas Atendidas", sub: "Minería, talleres e industrias", icon: Users2 },
    { number: "100%", label: "Algodón Seleccionado", sub: "Cero metales o residuos", icon: ShieldCheck }
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800 py-6 relative z-20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sodimac Endorsement Banner Bar */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border border-sky-500/30 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  Calidad Comprobada
                </span>
                <span className="text-xs text-slate-300 font-semibold hidden sm:inline">
                  Estándar de Homologación Retail
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                TRAPEX es marca presente en Sodimac Perú
              </h3>
              <p className="text-xs text-slate-400">
                Encuentra nuestra línea en tiendas Sodimac o cotiza directamente con nosotros por mayor con precio de fábrica.
              </p>
            </div>
          </div>

          <a
            href={companyData.socials.sodimac}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 flex-shrink-0"
          >
            <span>Ver Sección en Sodimac</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-sky-500/20 transition-all">
                <div className="inline-flex p-2 rounded-lg bg-sky-500/10 text-sky-400 mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {stat.number}
                </div>
                <div className="text-xs font-bold text-slate-200 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
