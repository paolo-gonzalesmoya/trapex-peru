import React, { useState, useEffect } from 'react';
import { Calculator, MessageCircle, Truck, Sparkles, Check, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';
import { productsData } from '../data/productsData';
import { companyData } from '../data/companyData';
import confetti from 'canvas-confetti';

export default function QuoteCalculator({ selectedProductFromCatalog, onSaveQuoteToForm }) {
  const [selectedProductId, setSelectedProductId] = useState(productsData[0].id);
  const [quantity, setQuantity] = useState(100);
  const [unitType, setUnitType] = useState('kg'); // kg or sacos
  const [destination, setDestination] = useState('lima'); // lima, provincias
  const [includeInvoice, setIncludeInvoice] = useState(true);

  // Sync when user clicks a product in the catalog
  useEffect(() => {
    if (selectedProductFromCatalog) {
      setSelectedProductId(selectedProductFromCatalog.id);
    }
  }, [selectedProductFromCatalog]);

  const currentProduct = productsData.find(p => p.id === selectedProductId) || productsData[0];

  // Base price calculation logic
  const getBaseUnitPrice = () => {
    switch (selectedProductId) {
      case 'trapo-cosido-color':
        if (quantity >= 1000) return 7.50;
        if (quantity >= 300) return 7.90;
        if (quantity >= 100) return 8.20;
        return 8.50;
      case 'trapo-blanco-fino':
        if (quantity >= 1000) return 8.60;
        if (quantity >= 300) return 8.90;
        if (quantity >= 100) return 9.20;
        return 9.50;
      case 'waype-pano-fino':
        if (quantity >= 500) return 6.80;
        if (quantity >= 100) return 7.20;
        return 7.90;
      case 'waype-cardado-granel': // priced per 50kg sack
        if (quantity >= 20) return 230.00;
        if (quantity >= 10) return 240.00;
        return 250.00;
      case 'algodon-industrial':
        if (quantity >= 100) return 10.50;
        return 12.90;
      case 'trapo-franela-color':
        if (quantity >= 300) return 6.80;
        return 7.50;
      case 'esponjas-don-lupillo':
        if (quantity >= 10) return 34.00;
        return 38.00;
      default:
        return 8.50;
    }
  };

  const unitPrice = getBaseUnitPrice();
  const subtotal = quantity * unitPrice;
  const igv = includeInvoice ? subtotal * 0.18 : 0;
  const total = subtotal + igv;

  const handleGenerateWhatsApp = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 }
    });

    const msg = `*SOLICITUD DE COTIZACIÓN MAYORISTA - TRAPEX*
---------------------------------------
📦 *Producto:* ${currentProduct.name}
⚖️ *Cantidad:* ${quantity} ${currentProduct.id === 'waype-cardado-granel' ? 'Sacos de 50kg' : 'kg / unidades'}
📍 *Destino:* ${destination === 'lima' ? 'Lima Metropolitana' : 'Provincias (Despacho a Agencia)'}
📄 *Comprobante:* ${includeInvoice ? 'Factura con RUC' : 'Boleta'}
💰 *Presupuesto Estimado:* S/ ${total.toFixed(2)} (Ref. S/ ${unitPrice.toFixed(2)} c/u)
---------------------------------------
_Solicito disponibilidad de stock y fecha de entrega._`;

    const url = `https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleApplyToForm = () => {
    if (onSaveQuoteToForm) {
      onSaveQuoteToForm({
        productName: currentProduct.name,
        quantity: `${quantity} ${currentProduct.id === 'waype-cardado-granel' ? 'sacos 50kg' : 'kg'}`,
        destination: destination === 'lima' ? 'Lima' : 'Provincias',
        estimatedTotal: `S/ ${total.toFixed(2)}`
      });
    }
    const formEl = document.getElementById('contacto');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cotizador" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-trapex-red/20 border border-trapex-red/40 text-red-400 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Cotizador Mayorista en Vivo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Calcula tu Pedido con Escala de Descuento por Volumen
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A mayor volumen, menor precio por kilo o saco. Cotiza al instante y recibe atención comercial preferencial.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-slate-800/90 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-sm">
            
            {/* 1. Select Product */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Selecciona el Producto
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-slate-900 border border-white/20 text-white text-sm font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:border-sky-400"
              >
                {productsData.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Quantity Slider & Preset Buttons */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Cantidad Requerida
                </label>
                <span className="text-sm font-black text-sky-400 bg-sky-950/60 border border-sky-500/30 px-3 py-1 rounded-lg">
                  {quantity} {selectedProductId === 'waype-cardado-granel' ? 'Sacos (x 50kg c/u)' : 'Kg / Unidades'}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={selectedProductId === 'waype-cardado-granel' ? "1" : "20"}
                max={selectedProductId === 'waype-cardado-granel' ? "100" : "2000"}
                step={selectedProductId === 'waype-cardado-granel' ? "1" : "20"}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-trapex-red"
              />

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedProductId === 'waype-cardado-granel' ? (
                  [5, 10, 20, 50].map((val) => (
                    <button
                      key={val}
                      onClick={() => setQuantity(val)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                        quantity === val
                          ? 'bg-trapex-red text-white border-trapex-red'
                          : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {val} sacos ({val * 50} kg)
                    </button>
                  ))
                ) : (
                  [50, 100, 250, 500, 1000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setQuantity(val)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                        quantity === val
                          ? 'bg-trapex-red text-white border-trapex-red'
                          : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {val} kg
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* 3. Destination */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                3. Destino de Entrega
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDestination('lima')}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    destination === 'lima'
                      ? 'bg-sky-950/80 border-sky-400 text-white shadow-md'
                      : 'bg-slate-900/50 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Lima Metropolitana</div>
                    <div className="text-[10px] text-slate-400">Reparto directo o recojo</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDestination('provincias')}
                  className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    destination === 'provincias'
                      ? 'bg-sky-950/80 border-sky-400 text-white shadow-md'
                      : 'bg-slate-900/50 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Provincias (Nacional)</div>
                    <div className="text-[10px] text-slate-400">Agencias Shalom/Marvisur</div>
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Invoice Option */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-slate-300">
                Incluir Factura Electrónica (RUC 20)
              </span>
              <button
                type="button"
                onClick={() => setIncludeInvoice(!includeInvoice)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  includeInvoice ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    includeInvoice ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Quote Summary Box (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-sky-500/30 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-2xl space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Resumen Estimado
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                  Precio Mayorista Directo
                </span>
              </div>

              {/* Product Info */}
              <div className="flex items-center gap-3">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />
                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{currentProduct.name}</h4>
                  <p className="text-xs text-sky-400 font-medium">{quantity} {selectedProductId === 'waype-cardado-granel' ? 'sacos de 50kg' : 'kg'}</p>
                </div>
              </div>

              {/* Breakdown lines */}
              <div className="space-y-2 text-xs text-slate-300 pt-2">
                <div className="flex justify-between">
                  <span>Precio unitario escala:</span>
                  <span className="font-bold text-white">S/ {unitPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white">S/ {subtotal.toFixed(2)}</span>
                </div>
                {includeInvoice && (
                  <div className="flex justify-between text-slate-400">
                    <span>IGV (18%):</span>
                    <span>S/ {igv.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total Display */}
              <div className="bg-slate-900/90 border border-white/15 p-4 rounded-2xl">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Total Cotización Estimada</div>
                <div className="text-3xl font-black text-white font-display mt-0.5 flex items-baseline gap-1">
                  <span>S/ {total.toFixed(2)}</span>
                  <span className="text-xs text-slate-400 font-normal">{includeInvoice ? 'Inc. IGV' : '+ IGV'}</span>
                </div>
              </div>
            </div>

            {/* Quote Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleGenerateWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Enviar Cotización a WhatsApp</span>
              </button>

              <button
                onClick={handleApplyToForm}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors border border-white/15 flex items-center justify-center gap-1.5"
              >
                <span>Guardar y Registrar Datos de la Empresa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Note */}
            <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Precios referenciales sujetos a confirmación de stock y volumen exacto.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
