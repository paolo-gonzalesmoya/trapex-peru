import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, ExternalLink, ArrowUp } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <img
              src="/Recursos/banner.png"
              alt="TRAPEX Representaciones"
              className="h-10 w-auto object-contain bg-white/90 p-1.5 rounded-lg"
            />
            <p className="text-slate-400 text-xs leading-relaxed">
              Empresa peruana líder con más de 20 años de experiencia en la fabricación y distribución de trapos industriales, waypes y algodón por mayor.
            </p>
            <div className="text-[11px] text-slate-500 font-mono space-y-0.5">
              <div>Razón Social: {companyData.name}</div>
              <div>RUC: <span className="text-slate-300 font-bold">{companyData.ruc}</span></div>
              <div>Condición: Habido / Activo</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">Catálogo de Productos</a>
              </li>
              <li>
                <a href="#proceso" className="hover:text-white transition-colors">Proceso y Calidad</a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-white transition-colors">Cotizador Mayorista</a>
              </li>
              <li>
                <a href="#reciclaje" className="hover:text-white transition-colors">Venta de Mermas Textiles</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">Registro de Clientes</a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-sky-400 hover:text-sky-300 font-semibold"
                >
                  Acceso Panel CRUD de Clientes
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Plant */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Planta y Almacén
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{companyData.address}, {companyData.city}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{companyData.phones[0].display} / {companyData.phones[1].display}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span className="font-mono">{companyData.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{companyData.schedule}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Channels & Social Proof */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Respaldo Comercial
            </h4>
            
            <a
              href={companyData.socials.sodimac}
              target="_blank"
              rel="noreferrer"
              className="block p-3.5 bg-slate-900 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all group"
            >
              <div className="flex items-center justify-between text-amber-300 font-bold text-xs">
                <span>Línea Trapex en Sodimac</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Disponibilidad de nuestros productos para entrega inmediata en tiendas Sodimac a nivel nacional.
              </p>
            </a>

            <a
              href={companyData.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="block p-3 bg-slate-900 rounded-2xl border border-white/10 hover:border-sky-400/40 transition-all"
            >
              <div className="text-sky-400 font-bold text-xs flex items-center justify-between">
                <span>Facebook Oficial: WaypeTrapex</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Representaciones Trapex E.I.R.L. Todos los derechos reservados.
          </div>
          
          <div className="flex items-center gap-4">
            <span>Lima, Perú</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Subir al inicio</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
