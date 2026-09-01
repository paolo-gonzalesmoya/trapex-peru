import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, ArrowRight, Sparkles, MessageCircle, X, ShieldCheck } from 'lucide-react';
import { productsData, productCategories } from '../data/productsData';
import { companyData } from '../data/companyData';

export default function ProductCatalog({ onSelectProductForQuote }) {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const filteredProducts = selectedCategory === 'todos'
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  const handleOpenModal = (product) => {
    setActiveModalProduct(product);
  };

  const handleCloseModal = () => {
    setActiveModalProduct(null);
  };

  const handleQuoteProduct = (product) => {
    if (onSelectProductForQuote) {
      onSelectProductForQuote(product);
    }
    const element = document.getElementById('cotizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="catalogo" className="py-20 bg-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-trapex-navy/10 text-trapex-navy text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-trapex-navy" />
              Catálogo Oficial Mayorista
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Línea de Trapos, Waypes y Fibras Industriales
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Productos elaborados con mermas de algodón puro seleccionadas. Venta por sacos, paquetes, fardos prensados y toneladas para empresas.
            </p>
          </div>

          {/* Direct WhatsApp Catalog CTA */}
          <a
            href={`https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent('Hola Trapex, deseo recibir el catálogo mayorista con precios actualizados en PDF.')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs px-4 py-3 rounded-xl shadow-sm hover:shadow transition-all flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Pedir Lista de Precios en PDF</span>
          </a>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-trapex-navy text-white shadow-md shadow-trapex-navy/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Image Box */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => handleOpenModal(product)}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-trapex-red text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md shadow">
                    {product.badge}
                  </div>
                )}

                {/* Quick View Button Overlay */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-4 h-4" /> Ver Detalles
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-1">
                    {product.tagline}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-trapex-navy transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="space-y-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-600">
                  {product.specs.slice(0, 2).map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleQuoteProduct(product)}
                    className="flex-1 bg-trapex-navy hover:bg-slate-900 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Cotizar Volumen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent(`Hola Trapex, deseo consultar precio y stock de: ${product.name}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                    title="Consultar por WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative">
            
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Gallery */}
            <div className="relative aspect-[16/10] bg-slate-100">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-trapex-red text-white text-xs font-black uppercase px-3 py-1 rounded shadow">
                {activeModalProduct.badge || 'Trapex'}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  {activeModalProduct.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 font-display">
                  {activeModalProduct.name}
                </h3>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {activeModalProduct.description}
                </p>
              </div>

              {/* Specs */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-3">
                  Especificaciones Técnicas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalProduct.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sectores de aplicación */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider mb-2.5">
                  Sectores Recomendados
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProduct.applications.map((app, i) => (
                    <span key={i} className="bg-sky-50 text-sky-800 text-xs font-bold px-3 py-1 rounded-full border border-sky-100">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    handleCloseModal();
                    handleQuoteProduct(activeModalProduct);
                  }}
                  className="w-full sm:flex-1 bg-trapex-navy hover:bg-slate-900 text-white font-bold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Calcular Cotización para este Producto</span>
                </button>

                <a
                  href={`https://wa.me/${companyData.whatsappDefaultNumber}?text=${encodeURIComponent(`Hola Trapex, deseo información y pedido de: ${activeModalProduct.name}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
