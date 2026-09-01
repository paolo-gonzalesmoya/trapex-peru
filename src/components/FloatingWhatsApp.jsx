import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('Hola Trapex, requiero cotización inmediata por mayor.');

  const handleSend = () => {
    const url = `https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent(customMsg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200 text-left">
          
          {/* Top Green Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Asesor Comercial TRAPEX</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  En línea • Respuesta rápida
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200/80 shadow-sm text-xs text-slate-700">
              👋 ¡Hola! ¿En qué presentación o volumen de trapos/waypes podemos ayudarte hoy?
            </div>

            <textarea
              rows={2}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
              placeholder="Escribe tu consulta..."
            />

            <button
              onClick={handleSend}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Iniciar Conversación</span>
            </button>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all relative group"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black">
          1
        </span>
      </button>

    </div>
  );
}
