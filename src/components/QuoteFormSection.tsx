import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Mail, 
  Phone, 
  FileText 
} from 'lucide-react';
import { QuoteRequest } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface QuoteFormSectionProps {
  onAddQuoteRequest: (quote: QuoteRequest) => void;
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ onAddQuoteRequest }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: 'France',
    quantityDesired: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) return;

    const newQuote: QuoteRequest = {
      id: `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: formData.companyName,
      contactName: formData.contactName || formData.companyName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      message: formData.message,
      requestedQtyDescription: formData.quantityDesired,
      items: [],
      totalEstimatedAmount: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onAddQuoteRequest(newQuote);
    setSubmitted(true);
  };

  return (
    <section id="devis-section" className="py-16 bg-[#f8faf8] border-b border-gray-200 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[#d97706] mb-1">
            PARTNERSHIP & QUOTATIONS
          </p>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#0b2416] tracking-tight">
            BECOME A DISTRIBUTOR OR REQUEST A QUOTE
          </h2>
          <p className="text-sm text-gray-600 mt-2 font-medium">
            Fill out the form below to receive a personalized B2B offer within 24 business hours.
          </p>
          <div className="w-16 h-1 bg-[#d97706] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Become a Distributor */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <span className="bg-emerald-100 text-[#0b2416] text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
                NETWORK
              </span>
              <h3 className="text-xl font-black uppercase text-[#0b2416] mt-2 tracking-tight">
                BECOME OUR DISTRIBUTOR
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed font-normal">
                Join our growing network of distribution partners across Europe and expand your business with authentic African products.
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {[
                'Exclusive distributor benefits & territory opportunities',
                'Comprehensive marketing & sales support materials',
                'Tailored wholesale offers & volume-based pricing',
                'Reliable long-term supply chain partnership'
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 font-semibold">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0b2416] flex items-center justify-center shrink-0 font-black text-[11px] mt-0.5">
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-[#0b2416] space-y-1">
              <p className="font-extrabold uppercase">Fast Response Guaranteed</p>
              <p className="text-gray-600 text-[11px]">Our B2B team reviews all distributor requests within 24 hours.</p>
            </div>
          </div>

          {/* Middle Column: Personalized Quote Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-lg relative">
            <h3 className="text-xl font-black uppercase text-[#0b2416] tracking-tight mb-4">
              REQUEST A PERSONALIZED QUOTE
            </h3>

            {submitted ? (
              <div className="bg-emerald-50 border-2 border-emerald-500 p-8 rounded-xl text-center space-y-4 my-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black uppercase text-[#0b2416]">QUOTE REQUEST SENT!</h4>
                <p className="text-xs text-gray-700">
                  Thank you for your request. Our B2B commercial team will contact you shortly with a personalized offer.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0b2416] text-white px-6 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. EuroFoods Wholesalers SRL"
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2416] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="pro@company.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2416] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2416] focus:bg-white focus:outline-none font-medium"
                    >
                      <option value="France">France</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Germany">Germany</option>
                      <option value="Spain">Spain</option>
                      <option value="Italy">Italy</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Other Europe">Other Europe</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase text-gray-700 mb-1">
                    Message / Product Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your desired products, volumes, pallet estimates or target delivery dates..."
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b2416] focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d97706] hover:bg-[#b45309] text-white py-3.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-amber-400/30"
                >
                  <FileText className="w-4 h-4 text-amber-100" />
                  <span>SEND QUOTE REQUEST</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Need Help / WhatsApp Card */}
          <div className="lg:col-span-3 bg-[#fdfbf7] p-6 rounded-2xl border border-amber-200/90 shadow-sm space-y-5 text-left">
            <div>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider">
                DIRECT CONTACT
              </span>
              <h3 className="text-xl font-black uppercase text-[#0b2416] mt-2 tracking-tight">
                NEED HELP?
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed font-normal">
                Our commercial team is available to answer all your technical, pricing, and shipping questions immediately.
              </p>
            </div>

            <div className="space-y-3 text-xs pt-2 border-t border-amber-200/60">
              <div className="flex items-center gap-2.5 text-gray-700">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">info@sentollbi.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-700">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold">+39 352 067 4106</span>
              </div>
            </div>

            <a
              href="https://wa.me/393520674106"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-green-400/40"
            >
              <MessageSquare className="w-4 h-4 text-white fill-white" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
