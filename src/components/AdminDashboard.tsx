import React, { useState } from 'react';
import { Product, QuoteRequest, TierPrice } from '../types';
import { 
  LayoutDashboard, 
  PackageCheck, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  RefreshCw, 
  FileSpreadsheet, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Boxes, 
  Clock, 
  DollarSign, 
  Database, 
  X,
  Save,
  Tag
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  quotes: QuoteRequest[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateQuoteStatus: (quoteId: string, status: 'pending' | 'processed' | 'shipped' | 'cancelled') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  quotes,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateQuoteStatus
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'quotes' | 'sync'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [dbSyncing, setDbSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>('À l\'instant');

  // Stats calculation
  const totalCartonsInStock = products.reduce((acc, p) => acc + p.stockInCartons, 0);
  const totalUnitsInStock = products.reduce((acc, p) => acc + (p.stockInCartons * p.unitsPerCarton), 0);
  const pendingQuotesCount = quotes.filter((q) => q.status === 'pending').length;
  
  const estimatedStockValue = products.reduce((acc, p) => {
    const minTierPrice = p.tieredPricing[0]?.pricePerUnit || 5;
    return acc + (p.stockInCartons * p.unitsPerCarton * minTierPrice);
  }, 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.ean.includes(searchQuery)
  );

  const handleStockAdjustment = (product: Product, deltaCartons: number) => {
    const updated = {
      ...product,
      stockInCartons: Math.max(0, product.stockInCartons + deltaCartons)
    };
    onUpdateProduct(updated);
  };

  const handleManualSync = () => {
    setDbSyncing(true);
    setTimeout(() => {
      setDbSyncing(false);
      setLastSynced(new Date().toLocaleTimeString('fr-FR'));
    }, 1200);
  };

  const handleExportCSV = () => {
    const headers = "ID,Name,Category,Format,EAN,UnitsPerCarton,StockCartons,MinPrice,MaxPrice\n";
    const rows = products.map(p => 
      `"${p.id}","${p.name}","${p.category}","${p.format}","${p.ean}",${p.unitsPerCarton},${p.stockInCartons},${p.tieredPricing[0].pricePerUnit},${p.tieredPricing[p.tieredPricing.length - 1].pricePerUnit}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Catalogue_Grossiste_SenTollBi_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Dashboard Top Header & DB Status */}
        <div className="bg-[#013b22] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-amber-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded">
                DASHBOARD ADMIN B2B
              </span>
              <span className="flex items-center gap-1 text-emerald-300 text-xs font-bold">
                <Database className="w-3.5 h-3.5 text-emerald-400" /> DB Synced Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
              GESTION DE STOCK & INVENTAIRE EN TEMPS RÉEL
            </h1>
            <p className="text-xs text-emerald-200 mt-0.5">
              Interface centrale de contrôle des stocks de gros, des prix dégressifs et des demandes de devis.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleManualSync}
              disabled={dbSyncing}
              className="bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-600 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 ${dbSyncing ? 'animate-spin' : ''}`} />
              <span>{dbSyncing ? 'Synchronisation...' : `Synchro Base (${lastSynced})`}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="bg-amber-500 hover:bg-amber-600 text-amber-950 px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2 shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Exporter CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase">Références en Catalogue</p>
              <p className="text-2xl font-black text-[#013b22] mt-1">{products.length} SKUs</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#013b22] flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase">Stock Total (Cartons)</p>
              <p className="text-2xl font-black text-[#013b22] mt-1">
                {totalCartonsInStock} <span className="text-xs font-normal text-gray-500">({totalUnitsInStock.toLocaleString('fr-FR')} pcs)</span>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase">Demandes de Devis (RFQ)</p>
              <p className="text-2xl font-black text-[#ea580c] mt-1">{pendingQuotesCount} En Attente</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase">Valeur du Stock HT</p>
              <p className="text-2xl font-black text-[#013b22] mt-1">{estimatedStockValue.toLocaleString('fr-FR')} €</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
              activeTab === 'inventory'
                ? 'bg-[#013b22] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Inventaire & Produits ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'quotes'
                ? 'bg-[#013b22] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>Devis Client B2B ({quotes.length})</span>
            {pendingQuotesCount > 0 && (
              <span className="bg-[#ea580c] text-white text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                {pendingQuotesCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Inventory Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou EAN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border rounded-xl text-xs focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                />
              </div>

              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full sm:w-auto bg-[#013b22] hover:bg-[#025a34] text-white px-4 py-2 rounded-xl text-xs font-extrabold uppercase flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Nouveau Produit Grossiste</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-black text-[10px] border-b">
                  <tr>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Format / EAN</th>
                    <th className="p-3">Conditionnement</th>
                    <th className="p-3">Stock Cartons</th>
                    <th className="p-3">Grille Tarifs (Min - Max)</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredProducts.map((product) => {
                    const isLowStock = product.stockInCartons < 30;
                    const minPrice = product.tieredPricing[0]?.pricePerUnit || 0;
                    const maxPrice = product.tieredPricing[product.tieredPricing.length - 1]?.pricePerUnit || 0;

                    return (
                      <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                        
                        <td className="p-3 flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-10 h-10 object-cover rounded-lg border"
                          />
                          <div>
                            <p className="font-extrabold text-[#013b22] uppercase">{product.name}</p>
                            <p className="text-[10px] text-gray-500">{product.badge || product.category}</p>
                          </div>
                        </td>

                        <td className="p-3">
                          <p className="font-bold text-gray-800">{product.format}</p>
                          <p className="text-[10px] text-gray-400 font-mono">EAN: {product.ean}</p>
                        </td>

                        <td className="p-3 text-gray-700">
                          {product.unitsPerCarton} pcs/ctn
                        </td>

                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-md font-black text-xs ${
                              isLowStock 
                                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                                : 'bg-emerald-100 text-emerald-900'
                            }`}>
                              {product.stockInCartons} cartons
                            </span>

                            {/* Stock Quick buttons */}
                            <div className="flex items-center border rounded bg-white">
                              <button
                                onClick={() => handleStockAdjustment(product, -10)}
                                className="px-1.5 text-xs text-gray-600 hover:bg-gray-100 font-bold"
                                title="Enlever 10 cartons"
                              >
                                -10
                              </button>
                              <button
                                onClick={() => handleStockAdjustment(product, +10)}
                                className="px-1.5 text-xs text-gray-600 hover:bg-gray-100 font-bold border-l"
                                title="Ajouter 10 cartons"
                              >
                                +10
                              </button>
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          <span className="font-extrabold text-amber-800">
                            {maxPrice.toFixed(2)} € — {minPrice.toFixed(2)} € HT
                          </span>
                        </td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-1.5 text-gray-600 hover:text-[#013b22] hover:bg-gray-100 rounded-lg"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(product.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: Quote Requests */}
        {activeTab === 'quotes' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 space-y-4">
            <h2 className="text-lg font-black text-[#013b22] uppercase">
              DEMANDES DE DEVIS REÇUES (RFQ)
            </h2>

            <div className="space-y-3">
              {quotes.map((quote) => (
                <div 
                  key={quote.id}
                  className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#013b22]">{quote.companyName}</span>
                      <span className="bg-gray-200 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {quote.country}
                      </span>
                      <span className="text-gray-400 font-mono text-[10px]">{quote.id}</span>
                    </div>

                    <p className="text-gray-600">
                      📧 {quote.email} | 📞 {quote.phone} {quote.vatNumber ? `| TVA: ${quote.vatNumber}` : ''}
                    </p>

                    {quote.requestedQtyDescription && (
                      <p className="text-amber-900 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200 inline-block">
                        Volumes demandés: {quote.requestedQtyDescription}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={quote.status}
                      onChange={(e) => onUpdateQuoteStatus(quote.id, e.target.value as any)}
                      className="px-3 py-1.5 border rounded-xl text-xs font-bold bg-white"
                    >
                      <option value="pending">⏳ En attente</option>
                      <option value="processed">✅ Traité / Proforma envoyée</option>
                      <option value="shipped">🚚 Expédié</option>
                      <option value="cancelled">❌ Annulé</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
