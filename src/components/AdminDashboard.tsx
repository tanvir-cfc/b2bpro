import React, { useState, useRef } from 'react';
import { Product, QuoteRequest, TierPrice, Category } from '../types';
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
  Tag,
  Upload,
  Image as ImageIcon,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { Logo } from './Logo';

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
  const [activeTab, setActiveTab] = useState<'inventory' | 'logo' | 'quotes'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [dbSyncing, setDbSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>('À l\'instant');

  // Custom Logo upload state
  const [logoPreview, setLogoPreview] = useState<string | null>(() => {
    return localStorage.getItem('sentollbi_custom_logo');
  });
  const [logoSaveSuccess, setLogoSaveSuccess] = useState(false);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Form state for Product Add / Edit
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Boissons & Jus',
    format: '33 cl (Canette)',
    ean: '',
    unitsPerCarton: 24,
    stockInCartons: 100,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    description: '',
    origin: 'Sénégal',
    shelfLife: '12 Mois',
    badge: 'Populaire',
    tieredPricing: [
      { minCartons: 10, maxCartons: 49, pricePerUnit: 0.95 },
      { minCartons: 50, maxCartons: 199, pricePerUnit: 0.82 },
      { minCartons: 200, maxCartons: 9999, pricePerUnit: 0.72 }
    ]
  });

  const productImageInputRef = useRef<HTMLInputElement>(null);

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

  // Handle Logo Upload File
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setLogoPreview(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLogo = () => {
    if (logoPreview) {
      localStorage.setItem('sentollbi_custom_logo', logoPreview);
    } else {
      localStorage.removeItem('sentollbi_custom_logo');
    }
    window.dispatchEvent(new Event('sentollbi_logo_updated'));
    setLogoSaveSuccess(true);
    setTimeout(() => setLogoSaveSuccess(false), 3000);
  };

  const handleResetLogo = () => {
    localStorage.removeItem('sentollbi_custom_logo');
    setLogoPreview(null);
    window.dispatchEvent(new Event('sentollbi_logo_updated'));
    setLogoSaveSuccess(true);
    setTimeout(() => setLogoSaveSuccess(false), 3000);
  };

  // Handle Product Image File Upload
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProductForm((prev) => ({
            ...prev,
            image: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Edit Product Modal
  const startEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm(prod);
  };

  // Save Product (Add or Edit)
  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.ean) {
      alert("Veuillez renseigner au moins le nom et le code EAN du produit.");
      return;
    }

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...productForm,
        id: editingProduct.id
      } as Product);
      setEditingProduct(null);
    } else {
      const name = productForm.name || 'Nouveau Produit';
      const newProd: Product = {
        id: `prod_${Date.now()}`,
        name,
        frenchTitle: name,
        subtitle: productForm.subtitle || 'Produit Artisanal Authentique',
        category: (productForm.category as Category) || 'boissons',
        format: productForm.format || '33 cl',
        netWeight: productForm.netWeight || '330g',
        image: productForm.image || 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
        secondaryImages: [],
        badge: productForm.badge || undefined,
        origin: productForm.origin || 'Sénégal',
        description: productForm.description || 'Produit de qualité grossiste B2B.',
        ean: productForm.ean || '370000000000',
        shelfLife: productForm.shelfLife || '12 Mois',
        storageCondition: 'À conserver dans un endroit frais et sec',
        unitsPerCarton: Number(productForm.unitsPerCarton) || 24,
        cartonDimensions: '30 x 20 x 15 cm',
        cartonNetWeightKg: 8.0,
        cartonGrossWeightKg: 8.5,
        cartonsPerPallet: 80,
        palletDimensions: '120 x 80 x 160 cm',
        palletWeightKg: 680,
        stockInCartons: Number(productForm.stockInCartons) || 50,
        minOrderCartons: 10,
        tieredPricing: productForm.tieredPricing || [
          { minQty: 10, maxQty: 49, pricePerUnit: 0.95, label: '10 - 49 cartons' },
          { minQty: 50, maxQty: 199, pricePerUnit: 0.82, label: '50 - 199 cartons' },
          { minQty: 200, maxQty: null, pricePerUnit: 0.72, label: '200+ cartons' }
        ],
        benefits: ['100% Naturel', 'Recette Traditionnelle', 'Traçabilité Garantie']
      };
      onAddProduct(newProd);
      setIsAddingNew(false);
    }
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
              GESTION DE STOCK, IMAGES & LOGO EN TEMPS RÉEL
            </h1>
            <p className="text-xs text-emerald-200 mt-0.5">
              Interface centrale de contrôle des produits, téléversement de vos images produit, modification du logo du site et suivi des devis.
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
        <div className="bg-white p-2 rounded-2xl border border-gray-200 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'inventory'
                ? 'bg-[#013b22] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Boxes className="w-4 h-4 text-amber-400" />
            <span>Inventaire & Produits ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'logo'
                ? 'bg-[#013b22] text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Upload className="w-4 h-4 text-amber-400" />
            <span>Branding & Logo du Site</span>
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

        {/* TAB 1: Inventory Table */}
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
                onClick={() => {
                  setProductForm({
                    name: '',
                    category: 'Boissons & Jus',
                    format: '33 cl (Canette)',
                    ean: '37000' + Math.floor(100000 + Math.random() * 900000),
                    unitsPerCarton: 24,
                    stockInCartons: 100,
                    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
                    description: '',
                    origin: 'Sénégal',
                    shelfLife: '12 Mois',
                    badge: 'Nouveau',
                    tieredPricing: [
                      { minCartons: 10, maxCartons: 49, pricePerUnit: 0.95 },
                      { minCartons: 50, maxCartons: 199, pricePerUnit: 0.82 },
                      { minCartons: 200, maxCartons: 9999, pricePerUnit: 0.72 }
                    ]
                  });
                  setEditingProduct(null);
                  setIsAddingNew(true);
                }}
                className="w-full sm:w-auto bg-[#013b22] hover:bg-[#025a34] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Nouveau Produit (avec Image)</span>
              </button>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-black text-[10px] border-b">
                  <tr>
                    <th className="p-3">Photo / Produit</th>
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
                            className="w-12 h-12 object-cover rounded-xl border border-gray-200 shadow-sm"
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
                              onClick={() => startEditProduct(product)}
                              className="p-2 text-gray-700 hover:text-[#013b22] hover:bg-emerald-50 rounded-lg border border-gray-200 transition-all flex items-center gap-1 font-bold text-[11px]"
                              title="Modifier produit et changer image"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Modifier</span>
                            </button>
                            <button
                              onClick={() => onDeleteProduct(product.id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-100 transition-all"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

        {/* TAB 2: BRANDING & LOGO UPLOAD */}
        {activeTab === 'logo' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-6 space-y-6">
            <div>
              <h2 className="text-xl font-black text-[#013b22] uppercase flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-500" />
                TÉLÉVERSER VOTRE PROPRE LOGO D'ENTREPRISE
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Téléversez une image de logo (PNG transparent, SVG, JPG, WEBP). Elle s'affichera immédiatement sur tout le site (en-tête, pied de page et documentations B2B).
              </p>
            </div>

            {logoSaveSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-extrabold rounded-2xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Modification du logo enregistrée avec succès ! Le site s'est mis à jour.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* File Dropzone */}
              <div className="border-2 border-dashed border-gray-300 hover:border-[#013b22] rounded-3xl p-8 text-center flex flex-col items-center justify-center bg-gray-50/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  ref={logoFileInputRef}
                  onChange={handleLogoFileUpload}
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8" />
                </div>

                <h3 className="font-extrabold text-[#013b22] text-sm uppercase">
                  Sélectionnez un fichier logo sur votre ordinateur
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Format recommandé: PNG transparent ou SVG.
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => logoFileInputRef.current?.click()}
                    className="bg-[#013b22] hover:bg-[#025a34] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Upload className="w-4 h-4 text-amber-400" />
                    <span>Choisir un fichier</span>
                  </button>

                  {logoPreview && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Réinitialiser Logo</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Live Preview Boxes */}
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase text-gray-500 tracking-wider">
                  Aperçu en direct du logo
                </h3>

                {/* Light background preview */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-start gap-2">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Sur Fond Clair (En-tête)</span>
                  <div className="p-2 border rounded-xl bg-white w-full flex items-center justify-start min-h-[60px]">
                    <Logo size="lg" variant="color" />
                  </div>
                </div>

                {/* Dark background preview */}
                <div className="p-6 bg-[#013b22] rounded-2xl shadow-sm flex flex-col items-start gap-2 text-white">
                  <span className="text-[10px] font-bold uppercase text-emerald-300">Sur Fond Sombre (Footer)</span>
                  <div className="p-2 border border-emerald-800/50 rounded-xl bg-[#013b22] w-full flex items-center justify-start min-h-[60px]">
                    <Logo size="lg" variant="white" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveLogo}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs uppercase py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Appliquer et Enregistrer le Logo</span>
                </button>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: Quote Requests */}
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

      {/* ADD / EDIT PRODUCT MODAL (WITH IMAGE UPLOAD) */}
      {(isAddingNew || editingProduct) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 my-8 space-y-5">
            
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-black text-[#013b22] uppercase flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-amber-500" />
                {editingProduct ? 'MODIFIER LE PRODUIT & CHANGER L\'IMAGE' : 'AJOUTER UN NOUVEAU PRODUIT AU CATALOGUE'}
              </h2>
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductForm} className="space-y-4 text-xs">
              
              {/* Product Image Upload Section */}
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-3">
                <label className="font-extrabold text-[#013b22] uppercase block">
                  1. Image du Produit (Téléverser ou Lien URL)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Image Preview */}
                  <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-amber-300 bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative">
                    {productForm.image ? (
                      <img
                        src={productForm.image}
                        alt="Aperçu Produit"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-amber-400" />
                    )}
                  </div>

                  <div className="space-y-2 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      ref={productImageInputRef}
                      onChange={handleProductImageUpload}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() => productImageInputRef.current?.click()}
                      className="bg-[#013b22] hover:bg-[#025a34] text-white px-4 py-2 rounded-xl font-extrabold uppercase flex items-center gap-2 transition-all"
                    >
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Téléverser une image (depuis votre ordinateur)</span>
                    </button>

                    <div className="pt-1">
                      <span className="text-[10px] text-gray-500 block mb-1">Ou coller l'URL de l'image :</span>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={productForm.image || ''}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full px-3 py-1.5 border rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#013b22]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Nom du Produit *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Jus de Bouye (Pain de Singe) Pur"
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-semibold focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Catégorie</label>
                  <select
                    value={productForm.category || 'Boissons & Jus'}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-semibold bg-white focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                  >
                    <option value="Boissons & Jus">Boissons & Jus Nectar</option>
                    <option value="Sirops Artisanaux">Sirops Artisanaux Concentrés</option>
                    <option value="Épices & Condiments">Épices & Condiments B2B</option>
                    <option value="Snacks & Chips">Snacks, Garba & Chips</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Format / Contenance</label>
                  <input
                    type="text"
                    placeholder="Ex: 33 cl (Canette) ou 1L (Bouteille)"
                    value={productForm.format || ''}
                    onChange={(e) => setProductForm({ ...productForm, format: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-semibold focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Code EAN / Code-Barres *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 3700123456789"
                    value={productForm.ean || ''}
                    onChange={(e) => setProductForm({ ...productForm, ean: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl font-mono focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Unités par Carton (Pcs)</label>
                  <input
                    type="number"
                    min="1"
                    value={productForm.unitsPerCarton || 24}
                    onChange={(e) => setProductForm({ ...productForm, unitsPerCarton: parseInt(e.target.value) || 24 })}
                    className="w-full px-3 py-2 border rounded-xl font-semibold focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Stock Initial en Cartons</label>
                  <input
                    type="number"
                    min="0"
                    value={productForm.stockInCartons || 100}
                    onChange={(e) => setProductForm({ ...productForm, stockInCartons: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border rounded-xl font-semibold focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Description B2B</label>
                <textarea
                  rows={2}
                  placeholder="Ingrédients, qualités organoleptiques, conseils de conservation..."
                  value={productForm.description || ''}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-normal focus:ring-2 focus:ring-[#013b22] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border rounded-xl font-bold text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="bg-[#013b22] hover:bg-[#025a34] text-white px-6 py-2 rounded-xl font-black uppercase flex items-center gap-2 shadow-md transition-all"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Enregistrer le Produit</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
