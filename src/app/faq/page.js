"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  ShieldCheck,
  CreditCard,
  Clock,
  Sparkles,
} from 'lucide-react';

const faqData = [
  {
    category: 'booking',
    q: 'How quickly does a worker arrive after booking?',
    a: 'For urgent requests in city limits (Rewa, Indore, Bhopal), our nearest verified tradesman arrives at your doorstep within 30 to 45 minutes. For scheduled bookings, the worker arrives strictly within your chosen time slot.',
  },
  {
    category: 'booking',
    q: 'What is the difference between Skilled and Unskilled labor?',
    a: 'Skilled professionals include certified plumbers, electricians, carpenters, painters, and masons who bring their own standard tools and specialized expertise. Unskilled workers are energetic daily helpers who assist with heavy lifting, site debris clearing, construction material shifting, and loading/unloading.',
  },
  {
    category: 'pricing',
    q: 'Are the prices fixed or do I need to bargain with the worker?',
    a: 'All rates on Kaam Karao are completely fixed and transparent! Skilled labor starts at ₹149/hour and unskilled helpers start at ₹99/hour. There is zero awkward street bargaining. You only pay for the actual hours worked plus any spare material costs you approve.',
  },
  {
    category: 'pricing',
    q: 'When and how do I make the payment?',
    a: 'You do not pay any advance booking fee. Payment is made only after the worker completes the work to your full satisfaction. You can pay via cash directly to the worker or online through UPI (Google Pay, PhonePe, Paytm).',
  },
  {
    category: 'safety',
    q: 'Are the workers police-verified and safe for homes?',
    a: 'Yes, 100%! Every single worker registered with Kaam Karao undergoes mandatory Aadhaar biometric verification, local address verification, and police background clearance. Their official profile and photo are recorded with our dispatch office.',
  },
  {
    category: 'safety',
    q: 'What if a repair breaks down again after the worker leaves?',
    a: 'We offer an unconditional 7-Day Workmanship Warranty on all skilled repair jobs. If the same issue recurs within 7 days of the completed booking, our supervisor will send a technician to inspect and fix it at no additional service charge.',
  },
  {
    category: 'booking',
    q: 'Can I book multiple workers for a full-day or multi-day construction job?',
    a: 'Yes! On our booking form, simply increase the worker count slider (up to 10 workers) or contact our corporate dispatch desk (+91 87702 23682) for bulk labor deployments at attractive daily discounted packages.',
  },
  {
    category: 'cancellation',
    q: 'Is there any cancellation fee if my plans change?',
    a: 'No, cancellations are 100% free as long as they are made before the worker is physically dispatched to your location. You can cancel directly by calling our dispatch support.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Got Questions?
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-sm">
            Everything you need to know about booking verified workers, pricing transparency, safety checks, and warranty guarantees.
          </p>

          {/* Search box */}
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your question (e.g. rate, payment, warranty, safety)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 shadow-inner"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'booking', label: 'Booking & Dispatch' },
              { id: 'pricing', label: 'Pricing & Payments' },
              { id: 'safety', label: 'Safety & Warranty' },
              { id: 'cancellation', label: 'Cancellations' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
              <p className="text-sm text-slate-400">
                No questions found matching &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-850 focus:outline-none"
                  >
                    <span className="font-bold text-white text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-cyan-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Still Have Questions or Custom Needs?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Our support desk is available 7 days a week from 7 AM to 10 PM to assist with orders and inquiries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition"
            >
              Contact Support Form
            </Link>
            <a
              href="tel:+918770223682"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 87702 23682</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
