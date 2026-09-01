import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Phone, Mail, Building, User, MapPin, FileText, MessageCircle, Sparkles } from 'lucide-react';
import { companyData } from '../data/companyData';
import confetti from 'canvas-confetti';

export default function ClientContactForm({ initialQuoteData, onClientRegistered }) {
  const [formData, setFormData] = useState({
    companyName: '',
    ruc: '',
    contactName: '',
    phone: '',
    email: '',
    city: 'Lima',
    interestProduct: 'Trapo Industrial Cosido de Color',
    estimatedVolume: '100 kg',
    message: '',
    clientType: 'comprador' // comprador or proveedor
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync initial quote data if coming from the calculator
  useEffect(() => {
    if (initialQuoteData) {
      setFormData(prev => ({
        ...prev,
        interestProduct: initialQuoteData.productName || prev.interestProduct,
        estimatedVolume: initialQuoteData.quantity || prev.estimatedVolume,
        city: initialQuoteData.destination === 'Lima' ? 'Lima' : 'Provincias',
        message: `Cotización solicitada desde el cotizador web (${initialQuoteData.estimatedTotal})`
      }));
    }
  }, [initialQuoteData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      id: 'CLI-' + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString('es-PE'),
      ...formData,
      status: 'Nuevo'
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('trapex_clients_db') || '[]');
    const updated = [newClient, ...existing];
    localStorage.setItem('trapex_clients_db', JSON.stringify(updated));

    if (onClientRegistered) {
      onClientRegistered(newClient);
    }

    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="contacto" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 text-sky-400 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              Contacto Comercial & Cotizaciones
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Empecemos a Trabajar Juntos
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Completa el formulario para registrar los datos de tu empresa o contáctanos de inmediato por nuestros canales directos.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-white/10">
                <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0 mt-1" />
                <div className="text-xs">
                  <div className="font-bold text-white">Planta & Almacén Principal</div>
                  <div className="text-slate-400 mt-0.5">{companyData.address}</div>
                  <div className="text-slate-400 font-semibold">{companyData.city}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-white/10">
                <Phone className="w-5 h-5 text-sky-400 flex-shrink-0 mt-1" />
                <div className="text-xs">
                  <div className="font-bold text-white">Líneas de Atención Telefónica</div>
                  <div className="text-slate-300 mt-1 flex flex-col gap-1">
                    {companyData.phones.map((p, i) => (
                      <span key={i} className="font-mono">{p.label}: {p.display}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-800/80 p-4 rounded-2xl border border-white/10">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0 mt-1" />
                <div className="text-xs">
                  <div className="font-bold text-white">Correo Electrónico</div>
                  <div className="text-slate-300 mt-0.5 font-mono">{companyData.email}</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-950 to-slate-900 p-4 rounded-2xl border border-sky-500/20 text-xs text-slate-300">
              <span className="font-bold text-white">Horario de Atención:</span> {companyData.schedule}
            </div>

          </div>

          {/* Right Column: Lead Registration Form */}
          <div className="lg:col-span-7 bg-slate-800 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Solicitud Registrada con Éxito!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Hemos guardado tu solicitud en nuestro sistema. Un asesor comercial de Trapex se comunicará contigo a la brevedad.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-slate-300 hover:text-white underline"
                  >
                    Registrar otra solicitud
                  </button>

                  <a
                    href={`https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent(`Hola Trapex, acabo de registrar la solicitud de ${formData.companyName} (${formData.contactName} - ${formData.phone}) para cotizar ${formData.estimatedVolume} de ${formData.interestProduct}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow hover:bg-emerald-700"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirmar por WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                <div className="border-b border-white/10 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-white">Registro de Cliente / Cotización</h3>
                  <p className="text-xs text-slate-400">Completa los campos para recibir una propuesta formal con precios de fábrica.</p>
                </div>

                {/* Tipo de solicitud */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, clientType: 'comprador' }))}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      formData.clientType === 'comprador'
                        ? 'bg-sky-600 text-white border-sky-500'
                        : 'bg-slate-900 text-slate-400 border-white/10'
                    }`}
                  >
                    Deseo Comprar Insumos
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, clientType: 'proveedor' }))}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      formData.clientType === 'proveedor'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-900 text-slate-400 border-white/10'
                    }`}
                  >
                    Deseo Vender Mermas Textiles
                  </button>
                </div>

                {/* Empresa & RUC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Razón Social o Empresa *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Ej. Taller Mecánico San Martín S.A.C."
                        className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      RUC o DNI
                    </label>
                    <input
                      type="text"
                      name="ruc"
                      value={formData.ruc}
                      onChange={handleChange}
                      placeholder="Ej. 20601234567"
                      className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                {/* Contacto & Telefono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Nombre de Contacto *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Celular / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej. 994 263 070"
                        className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl pl-10 pr-3 py-3 focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Ciudad */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="compras@tuempresa.com"
                      className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Ciudad / Región
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Lima, Arequipa, Trujillo, etc."
                      className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                {/* Producto & Volumen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Producto de Interés
                    </label>
                    <select
                      name="interestProduct"
                      value={formData.interestProduct}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl px-3 py-3 focus:outline-none focus:border-sky-400"
                    >
                      <option value="Trapo Industrial Cosido de Color">Trapo Industrial Cosido de Color</option>
                      <option value="Trapo Industrial Blanco Fino">Trapo Industrial Blanco Fino</option>
                      <option value="Waype de Paño Fino Trapex">Waype de Paño Fino Trapex</option>
                      <option value="Waype Cardado Blanco por Mayor">Waype Cardado Blanco por Mayor (50kg)</option>
                      <option value="Algodón Industrial">Algodón Industrial</option>
                      <option value="Franela Color en Rollo/Sacos">Franela Color en Rollo/Sacos</option>
                      <option value="Esponjas Industriales">Esponjas Industriales</option>
                      <option value="Venta de Mermas Textiles">Venta de Mermas Textiles (Proveedor)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Volumen Estimado
                    </label>
                    <input
                      type="text"
                      name="estimatedVolume"
                      value={formData.estimatedVolume}
                      onChange={handleChange}
                      placeholder="Ej. 100 kg, 5 sacos, 1 tonelada"
                      className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl px-3.5 py-3 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Detalles Adicionales o Preguntas
                  </label>
                  <textarea
                    rows={2}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Indica especificaciones, frecuencia de compra o requerimientos especiales..."
                    className="w-full bg-slate-900 border border-white/15 text-white text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-trapex-red hover:bg-red-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitud de Cotización</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
