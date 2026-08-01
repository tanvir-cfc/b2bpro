import React from 'react';
import { 
  ShoppingBag, 
  Box, 
  Clock, 
  Factory, 
  CreditCard 
} from 'lucide-react';

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: ShoppingBag,
      title: 'COMMANDE MINIMUM',
      value: '10 cartons',
      subtitle: '(possibilité par palette)'
    },
    {
      icon: Box,
      title: 'CONDITIONNEMENT',
      value: 'Soigneusement emballés',
      subtitle: 'et sécurisés pour transport'
    },
    {
      icon: Clock,
      title: 'DÉLAI DE LIVRAISON',
      value: '5 à 10 jours ouvrés',
      subtitle: 'en France & Europe'
    },
    {
      icon: Factory,
      title: 'CAPACITÉ DE PRODUCTION',
      value: 'Jusqu\'à 20 000 pots',
      subtitle: 'par série industrielle'
    },
    {
      icon: CreditCard,
      title: 'PAIEMENT B2B',
      value: 'Virement bancaire',
      subtitle: 'à 30 jours (sur accord)'
    }
  ];

  return (
    <section className="bg-emerald-50/70 border-y border-emerald-200/60 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          {props.map((p, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-4 bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#013b22]/10 flex items-center justify-center text-[#013b22] mb-3">
                <p.icon className="w-6 h-6 text-[#013b22]" />
              </div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-1">
                {p.title}
              </h3>
              <p className="text-sm font-black text-[#013b22] leading-tight">
                {p.value}
              </p>
              <p className="text-[11px] font-medium text-gray-500 mt-0.5">
                {p.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
