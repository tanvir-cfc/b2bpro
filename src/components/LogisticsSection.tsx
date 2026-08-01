import React, { useState } from 'react';
import { 
  Package, 
  Ruler, 
  Weight, 
  Layers, 
  Boxes, 
  Warehouse,
  Truck,
  Calculator,
  Check
} from 'lucide-react';

export const LogisticsSection: React.FC = () => {
  const [palletCount, setPalletCount] = useState(1);

  const totalCartons = palletCount * 100;
  const totalPots = totalCartons * 12;
  const totalNetKg = totalCartons * 3.0;
  const totalGrossKg = totalCartons * 3.5;

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-[#013b22] uppercase tracking-tight">
            INFORMATIONS LOGISTIQUES
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Conditionnements optimisés pour le transport routier, maritime et l'entreposage B2B
          </p>
          <div className="w-16 h-1 bg-[#ea580c] mx-auto mt-2 rounded-full"></div>
        </div>

        {/* 6 Grid Specs Cards matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <Package className="w-7 h-7 text-[#013b22] mb-2" />
            <h3 className="text-[10px] font-black uppercase text-gray-500">CONDITIONNEMENT</h3>
            <p className="text-xs font-black text-[#013b22] mt-1">1 carton = 12 pots</p>
            <p className="text-[10px] text-gray-500">(250g par pot)</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <Ruler className="w-7 h-7 text-[#013b22] mb-2" />
            <h3 className="text-[10px] font-black uppercase text-gray-500">DIMENSIONS CARTON</h3>
            <p className="text-xs font-black text-[#013b22] mt-1">30 x 23 x 15 cm</p>
            <p className="text-[10px] text-gray-500">(L x l x H)</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <Weight className="w-7 h-7 text-[#013b22] mb-2" />
            <h3 className="text-[10px] font-black uppercase text-gray-500">POIDS CARTON</h3>
            <p className="text-xs font-black text-[#013b22] mt-1">Poids net : 3 kg</p>
            <p className="text-[10px] text-gray-500">Poids brut : 3,5 kg</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <Layers className="w-7 h-7 text-[#013b22] mb-2" />
            <h3 className="text-[10px] font-black uppercase text-gray-500">CARTONS / PALETTE</h3>
            <p className="text-xs font-black text-[#013b22] mt-1">100 cartons</p>
            <p className="text-[10px] text-gray-500">(10 couches de 10)</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <Boxes className="w-7 h-7 text-[#013b22] mb-2" />
            <h3 className="text-[10px] font-black uppercase text-gray-500">DIMENSIONS PALETTE</h3>
            <p className="text-xs font-black text-[#013b22] mt-1">120 x 80 x 150 cm</p>
            <p className="text-[10px] text-gray-500">Poids: ~350 kg</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center text-center">
            <Warehouse className="w-7 h-7 text-[#013b22] mb-2" />
            <h3 className="text-[10px] font-black uppercase text-gray-500">STOCKAGE</h3>
            <p className="text-xs font-black text-[#013b22] mt-1">Endroit sec & frais</p>
            <p className="text-[10px] text-gray-500">À l'abri de la lumière</p>
          </div>

        </div>

        {/* Interactive Pallet Estimator Widget */}
        <div className="bg-[#013b22] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulateur d'Expédition par Palette</span>
            </div>
            <h3 className="text-xl font-black uppercase">
              CALCULEZ VOS EXPÉDITIONS B2B
            </h3>
            <p className="text-xs text-emerald-200 max-w-lg">
              Chaque palette Europe (80x120 cm) permet d'optimiser les coûts de transport au conteneur ou au camion complet.
            </p>
          </div>

          <div className="bg-white text-gray-900 rounded-xl p-4 sm:p-5 w-full lg:w-auto min-w-[320px] shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold mb-3 border-b pb-2">
              <span className="text-gray-600">Nombre de Palettes:</span>
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setPalletCount(Math.max(1, palletCount - 1))}
                  className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 font-bold text-[#013b22]"
                  type="button"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={palletCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setPalletCount(isNaN(val) ? 1 : Math.max(1, val));
                  }}
                  className="w-12 h-7 text-center font-black text-sm text-[#013b22] bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#013b22] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button 
                  onClick={() => setPalletCount(palletCount + 1)}
                  className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200 font-bold text-[#013b22]"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Nombre total de cartons:</span>
                <strong className="text-[#013b22]">{totalCartons} cartons</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total bocaux / sachets:</span>
                <strong className="text-[#013b22]">{totalPots.toLocaleString('fr-FR')} pots</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Poids brut estimé:</span>
                <strong className="text-amber-800">{totalGrossKg.toLocaleString('fr-FR')} kg</strong>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t text-[10px] text-emerald-800 font-bold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Optimisé pour logistique routière Gefco / Dachser</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
