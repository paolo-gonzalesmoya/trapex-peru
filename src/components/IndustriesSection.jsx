import React from 'react';
import { Wrench, Pickaxe, Printer, Building2, Cog, Sparkles } from 'lucide-react';

export default function IndustriesSection() {
  const industries = [
    {
      title: "Talleres Mecánicos y Automotriz",
      icon: Wrench,
      recommended: "Trapo Cosido Color & Waype Fino",
      desc: "Absorción ultra rápida de lubricantes, grasas de motor, líquido de frenos y pulido de carrocerías."
    },
    {
      title: "Minería, Petróleo y Energía",
      icon: Pickaxe,
      recommended: "Waype Cardado 50kg & Fardos",
      desc: "Abastecimiento masivo y continuo para faenas mineras, maquinaria pesada y mantenimiento de plantas."
    },
    {
      title: "Artes Gráficas e Imprentas",
      icon: Printer,
      recommended: "Trapo Blanco Fino de Punto",
      desc: "Limpieza de rodillos y planchas con solventes y thínner sin transferir pelusas ni tintes."
    },
    {
      title: "Metalmecánica y Maestranzas",
      icon: Cog,
      recommended: "Trapo Cosido Multicapa",
      desc: "Resistencia superior a rebabas y limaduras metálicas con costuras circulares reforzadas."
    },
    {
      title: "Constructoras y Obras",
      icon: Building2,
      recommended: "Trapo Color Suelto & Algodón",
      desc: "Limpieza de herramientas, retiro de excedentes de selladores, pintura y acabado en obra."
    },
    {
      title: "Servicios de Limpieza y Facility",
      icon: Sparkles,
      recommended: "Franelas & Esponjas Don Lupillo",
      desc: "Soluciones económicas por mayor para empresas de limpieza institucional y mantenimiento."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            Sectores que Confían en Trapex
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Insumos Especializados para Cada Industria
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Diseñamos soluciones a medida según el tipo de residuo, químico o acabado de tu operación.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-400/50 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-trapex-navy/10 flex items-center justify-center text-trapex-navy">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-black uppercase text-slate-400">Producto Sugerido</div>
                  <div className="text-xs font-bold text-trapex-navy mt-0.5">{ind.recommended}</div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
