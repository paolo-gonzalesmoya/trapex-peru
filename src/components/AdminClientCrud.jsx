import React, { useState, useEffect } from 'react';
import { 
  X, Plus, Search, Filter, Trash2, Edit3, MessageCircle, 
  Download, CheckCircle, Clock, AlertCircle, Building2, User, Phone, FileText, Database, Shield
} from 'lucide-react';
import { companyData } from '../data/companyData';

export default function AdminClientCrud({ isOpen, onClose, onDataChange }) {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  // Initial form state for adding/editing
  const [clientForm, setClientForm] = useState({
    companyName: '',
    ruc: '',
    contactName: '',
    phone: '',
    email: '',
    city: 'Lima',
    interestProduct: 'Trapo Industrial Cosido de Color',
    estimatedVolume: '100 kg',
    message: '',
    clientType: 'comprador',
    status: 'Nuevo'
  });

  // Load clients from localStorage or initialize with sample data if empty
  useEffect(() => {
    const saved = localStorage.getItem('trapex_clients_db');
    if (saved) {
      setClients(JSON.parse(saved));
    } else {
      const initialSeed = [
        {
          id: 'CLI-809121',
          date: '31/08/2026',
          companyName: 'Consorcio Metalúrgico del Sur',
          ruc: '20554891234',
          contactName: 'Ing. Fernando Ramos',
          phone: '987654321',
          email: 'compras@metalurgicasur.pe',
          city: 'Arequipa',
          interestProduct: 'Trapo Industrial Cosido de Color',
          estimatedVolume: '500 kg',
          message: 'Requerimos suministro quincenal de fardos cosidos.',
          clientType: 'comprador',
          status: 'Cotizado'
        },
        {
          id: 'CLI-809122',
          date: '30/08/2026',
          companyName: 'Taller Central de Chapa y Pintura Express',
          ruc: '20601847592',
          contactName: 'Walter Huamán',
          phone: '991234567',
          email: 'walter@pinturaexpress.pe',
          city: 'Lima',
          interestProduct: 'Waype de Paño Fino Trapex',
          estimatedVolume: '50 paquetes (400g)',
          message: 'Para pulido de autos alta gama.',
          clientType: 'comprador',
          status: 'Nuevo'
        },
        {
          id: 'CLI-809123',
          date: '28/08/2026',
          companyName: 'Confecciones Textiles Gamarra S.A.C.',
          ruc: '20509938123',
          contactName: 'Lucía Benavides',
          phone: '994883192',
          email: 'lucia@textilesgamarra.pe',
          city: 'Lima',
          interestProduct: 'Venta de Mermas Textiles',
          estimatedVolume: '2 Toneladas / mes',
          message: 'Tenemos retazos de algodón jersey y rib para recojo.',
          clientType: 'proveedor',
          status: 'Cerrado'
        }
      ];
      setClients(initialSeed);
      localStorage.setItem('trapex_clients_db', JSON.stringify(initialSeed));
    }
  }, [isOpen]);

  const saveToStorage = (updated) => {
    setClients(updated);
    localStorage.setItem('trapex_clients_db', JSON.stringify(updated));
    if (onDataChange) {
      onDataChange(updated.length);
    }
  };

  // Filter logic
  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.ruc && c.ruc.includes(searchTerm)) ||
      c.phone.includes(searchTerm) ||
      c.interestProduct.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || c.status === statusFilter;
    const matchesType = typeFilter === 'Todos' || c.clientType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Handle Create / Update Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingClient) {
      const updated = clients.map(c => c.id === editingClient.id ? { ...editingClient, ...clientForm } : c);
      saveToStorage(updated);
      setEditingClient(null);
    } else {
      const newClient = {
        id: 'CLI-' + Date.now().toString().slice(-6),
        date: new Date().toLocaleDateString('es-PE'),
        ...clientForm
      };
      saveToStorage([newClient, ...clients]);
    }
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setClientForm({ ...client });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este registro de cliente?')) {
      const updated = clients.filter(c => c.id !== id);
      saveToStorage(updated);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = clients.map(c => c.id === id ? { ...c, status: newStatus } : c);
    saveToStorage(updated);
  };

  const resetForm = () => {
    setClientForm({
      companyName: '',
      ruc: '',
      contactName: '',
      phone: '',
      email: '',
      city: 'Lima',
      interestProduct: 'Trapo Industrial Cosido de Color',
      estimatedVolume: '100 kg',
      message: '',
      clientType: 'comprador',
      status: 'Nuevo'
    });
    setEditingClient(null);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["ID,Fecha,Empresa,RUC,Contacto,Teléfono,Email,Ciudad,Producto,Volumen,Tipo,Estado,Notas\n"];
    const rows = clients.map(c => 
      `"${c.id}","${c.date}","${c.companyName}","${c.ruc || ''}","${c.contactName}","${c.phone}","${c.email || ''}","${c.city || ''}","${c.interestProduct}","${c.estimatedVolume}","${c.clientType}","${c.status}","${(c.message || '').replace(/"/g, '""')}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Clientes_TRAPEX_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  Panel de Clientes & Cotizaciones • TRAPEX
                </h2>
                <span className="bg-sky-500/20 text-sky-300 text-xs font-bold px-2 py-0.5 rounded">
                  {clients.length} Registros
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gestión comercial interna, seguimiento de prospectos y exportación de pedidos.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:px-6 bg-slate-900/60 border-b border-slate-800">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Solicitudes</div>
            <div className="text-xl font-bold text-white mt-0.5">{clients.length}</div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-bold text-sky-400">Nuevos por Contactar</div>
            <div className="text-xl font-bold text-sky-300 mt-0.5">
              {clients.filter(c => c.status === 'Nuevo').length}
            </div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-bold text-amber-400">En Cotización</div>
            <div className="text-xl font-bold text-amber-300 mt-0.5">
              {clients.filter(c => c.status === 'Cotizado').length}
            </div>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-bold text-emerald-400">Ventas Cerradas</div>
            <div className="text-xl font-bold text-emerald-300 mt-0.5">
              {clients.filter(c => c.status === 'Cerrado').length}
            </div>
          </div>
        </div>

        {/* Filter and Action Bar */}
        <div className="p-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar por empresa, contacto, RUC o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-sky-400"
            />
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-400"
            >
              <option value="Todos">Todos los Estados</option>
              <option value="Nuevo">Nuevos</option>
              <option value="Contactado">Contactados</option>
              <option value="Cotizado">Cotizados</option>
              <option value="Cerrado">Cerrados</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-400"
            >
              <option value="Todos">Todos los Tipos</option>
              <option value="comprador">Compradores</option>
              <option value="proveedor">Proveedores Textiles</option>
            </select>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-700 transition-colors"
              title="Descargar datos en Excel/CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Exportar CSV</span>
            </button>

            {/* Add New Client Button */}
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-1.5 bg-trapex-red hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Cliente</span>
            </button>

          </div>
        </div>

        {/* Clients Table */}
        <div className="flex-1 overflow-auto">
          {filteredClients.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No se encontraron clientes o cotizaciones con los filtros aplicados.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-950/80 sticky top-0 text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3.5">Empresa / RUC</th>
                  <th className="p-3.5">Contacto</th>
                  <th className="p-3.5">Producto & Volumen</th>
                  <th className="p-3.5">Ciudad</th>
                  <th className="p-3.5">Estado</th>
                  <th className="p-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-800/50 transition-colors">
                    
                    {/* Empresa & RUC */}
                    <td className="p-3.5">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>{client.companyName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>{client.ruc ? `RUC: ${client.ruc}` : 'Sin RUC'}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          client.clientType === 'proveedor' ? 'bg-emerald-950 text-emerald-300' : 'bg-sky-950 text-sky-300'
                        }`}>
                          {client.clientType === 'proveedor' ? 'Proveedor' : 'Cliente'}
                        </span>
                      </div>
                    </td>

                    {/* Contacto */}
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-200">{client.contactName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{client.phone}</div>
                    </td>

                    {/* Producto */}
                    <td className="p-3.5">
                      <div className="font-medium text-white line-clamp-1">{client.interestProduct}</div>
                      <div className="text-[11px] text-sky-400 font-mono font-bold mt-0.5">
                        Vol: {client.estimatedVolume}
                      </div>
                    </td>

                    {/* Ciudad */}
                    <td className="p-3.5 text-slate-300 font-medium">
                      {client.city || 'Lima'}
                    </td>

                    {/* Estado dropdown */}
                    <td className="p-3.5">
                      <select
                        value={client.status}
                        onChange={(e) => handleStatusChange(client.id, e.target.value)}
                        className={`text-xs font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                          client.status === 'Nuevo' ? 'bg-sky-950 text-sky-300 border-sky-600' :
                          client.status === 'Contactado' ? 'bg-indigo-950 text-indigo-300 border-indigo-600' :
                          client.status === 'Cotizado' ? 'bg-amber-950 text-amber-300 border-amber-600' :
                          'bg-emerald-950 text-emerald-300 border-emerald-600'
                        }`}
                      >
                        <option value="Nuevo">Nuevo</option>
                        <option value="Contactado">Contactado</option>
                        <option value="Cotizado">Cotizado</option>
                        <option value="Cerrado">Cerrado / Venta</option>
                      </select>
                    </td>

                    {/* Acciones */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* WhatsApp Contact */}
                        <a
                          href={`https://wa.me/51${client.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${client.contactName}, te saludamos de TRAPEX respecto a tu cotización de ${client.interestProduct}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                          title="Enviar WhatsApp directo al cliente"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(client)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                          title="Editar registro"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                          title="Eliminar cliente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3.5 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Base de datos local segura sincronizada con el navegador</span>
          <span className="font-mono">{new Date().toLocaleDateString('es-PE')} • TRAPEX CORE</span>
        </div>

      </div>

      {/* Add / Edit Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingClient ? 'Editar Cliente / Cotización' : 'Registrar Nuevo Cliente'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs text-left">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Empresa / Razón Social *</label>
                <input
                  type="text"
                  required
                  value={clientForm.companyName}
                  onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">RUC</label>
                  <input
                    type="text"
                    value={clientForm.ruc}
                    onChange={(e) => setClientForm({ ...clientForm, ruc: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Contacto *</label>
                  <input
                    type="text"
                    required
                    value={clientForm.contactName}
                    onChange={(e) => setClientForm({ ...clientForm, contactName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Celular / Teléfono *</label>
                  <input
                    type="text"
                    required
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Ciudad</label>
                  <input
                    type="text"
                    value={clientForm.city}
                    onChange={(e) => setClientForm({ ...clientForm, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Producto</label>
                  <input
                    type="text"
                    value={clientForm.interestProduct}
                    onChange={(e) => setClientForm({ ...clientForm, interestProduct: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Volumen</label>
                  <input
                    type="text"
                    value={clientForm.estimatedVolume}
                    onChange={(e) => setClientForm({ ...clientForm, estimatedVolume: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tipo</label>
                  <select
                    value={clientForm.clientType}
                    onChange={(e) => setClientForm({ ...clientForm, clientType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="comprador">Comprador</option>
                    <option value="proveedor">Proveedor Textil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Estado</label>
                  <select
                    value={clientForm.status}
                    onChange={(e) => setClientForm({ ...clientForm, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Cotizado">Cotizado</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-trapex-red text-white font-bold hover:bg-red-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
