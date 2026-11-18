"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Truck,
  Users,
  Search,
  CheckCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  Flame,
  Sparkles,
} from 'lucide-react';

const allServices = [
  {
    id: 'plumbing',
    title: 'Plumbing Services',
    category: 'repairs',
    skill: 'Plumbing',
    workerType: 'skilled',
    rate: '₹149/hr',
    dailyRate: '₹899/day',
    eta: '30 mins',
    popular: true,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    description: 'Expert certified plumbers for fast leak fixes, tap & faucet replacement, bathroom sanitary ware, water tank repair, and piping installations.',
    included: [
      'Tap & valve repair/replacement',
      'Drain & blockage cleaning',
      'Water pump & tank pipeline fitting',
      'Standard inspection & pressure test',
    ],
  },
  {
    id: 'electrical',
    title: 'Electrical Repair & Installation',
    category: 'repairs',
    skill: 'Electrical',
    workerType: 'skilled',
    rate: '₹149/hr',
    dailyRate: '₹949/day',
    eta: '30 mins',
    popular: true,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    description: 'Licensed electricians for short-circuit diagnosis, fuse/MCB upgrades, inverter connection, chandelier/fan hanging, switchboard repairs, and safety earthing.',
    included: [
      'MCB tripping & wiring diagnosis',
      'Fan, tube, and fancy light installation',
      'Inverter battery setup & servicing',
      'Complete switchboard overhaul',
    ],
  },
  {
    id: 'carpentry',
    title: 'Carpentry & Woodwork',
    category: 'repairs',
    skill: 'Carpentry',
    workerType: 'skilled',
    rate: '₹179/hr',
    dailyRate: '₹999/day',
    eta: '45 mins',
    popular: false,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    description: 'Experienced carpenters for wooden furniture making, wardrobe hinge repair, sliding door channels, lock repairs, and bed assembly.',
    included: [
      'Door locks, latches & handle fixing',
      'Cupboard and drawer realignment',
      'Modular furniture assembly',
      'Custom shelf and bracket fitting',
    ],
  },
  {
    id: 'painting',
    title: 'House Painting & Waterproofing',
    category: 'finishing',
    skill: 'Painting',
    workerType: 'skilled',
    rate: '₹129/hr',
    dailyRate: '₹799/day',
    eta: 'Scheduled',
    popular: true,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    description: 'Interior and exterior wall painters for emulsion, enamel, distemper, wall putty smoothing, texture design, and ceiling dampness waterproofing.',
    included: [
      'Wall crack filling & putty application',
      'Two coats of premium emulsion paint',
      'Floor and furniture protective masking',
      'Post-painting room cleanup',
    ],
  },
  {
    id: 'labor',
    title: 'Unskilled Daily Wage Labor',
    category: 'labor',
    skill: 'General Labor',
    workerType: 'unskilled',
    rate: '₹99/hr',
    dailyRate: '₹599/day',
    eta: '30 mins',
    popular: true,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    description: 'Physically fit and energetic daily laborers for site clearing, soil digging, brick carrying, loading & unloading trucks, garden weeding, and helper work.',
    included: [
      'Material loading and unloading',
      'Debris removal and site sweeping',
      'Assistance to masons and contractors',
      'Tough physical manual tasks',
    ],
  },
  {
    id: 'shifting',
    title: 'Home & Office Shifting Helpers',
    category: 'labor',
    skill: 'Shifting',
    workerType: 'unskilled',
    rate: '₹119/hr',
    dailyRate: '₹699/day',
    eta: '45 mins',
    popular: false,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    description: 'Careful helpers specialized in packing, lifting heavy sofas, fridges, washing machines, and safe loading into transport vehicles.',
    included: [
      'Heavy appliance handling & lifting',
      'Carton packing & bubble wrapping',
      'Stairs transport & vehicle loading',
      'Unpacking & placement in rooms',
    ],
  },
  {
    id: 'masonry',
    title: 'Masonry & Tile Fitting',
    category: 'finishing',
    skill: 'Masonry',
    workerType: 'skilled',
    rate: '₹189/hr',
    dailyRate: '₹1,099/day',
    eta: 'Scheduled',
    popular: false,
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
    description: 'Skilled Rajmistri (masons) for wall plaster, broken tile replacement, marble cutting, bathroom flooring slope correction, and concrete repairs.',
    included: [
      'Floor & bathroom tile replacement',
      'Wall plastering & crack grouting',
      'Boundary wall & brickwork repairs',
      'Leveling and cement concrete mix',
    ],
  },
  {
    id: 'deep-cleaning',
    title: 'Deep House & Post-Work Cleaning',
    category: 'finishing',
    skill: 'Cleaning',
    workerType: 'unskilled',
    rate: '₹110/hr',
    dailyRate: '₹649/day',
    eta: '45 mins',
    popular: false,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    description: 'Intense cleaning of tile stains, paint drops removal, kitchen chimney degreasing, bathroom scrubbing, and post-construction dust vacuuming.',
    included: [
      'Acid-safe floor tile stain scrubbing',
      'Paint spots & tape adhesive removal',
      'Window glass and frame washing',
      'Dusting and wet vacuuming',
    ],
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = allServices.filter((service) => {
    const matchesCategory =
      activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.skill.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Transparent On-Demand Services
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Skilled Trades & Daily Helpers Catalog
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every professional is background checked, trained, and equipped with the right tools. Choose a service to view rates and book instantly.
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mt-6">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by service (e.g. plumber, wire, paint, helper)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition shadow-inner text-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'repairs', label: 'Repairs & Maintenance' },
              { id: 'finishing', label: 'Painting & Masonry' },
              { id: 'labor', label: 'Daily Wage & Shifting' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  activeCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-800/40">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.eta}
                    </span>
                    {service.popular && (
                      <span className="flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950">
                        <Flame className="w-3 h-3 mr-1" />
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded">
                      {service.workerType === 'skilled' ? 'Skilled Specialist' : 'General Labor'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Included bullets */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Included in Service
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {service.included.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Rate & CTA */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Standard Rate</div>
                    <div className="text-lg font-black text-white">
                      {service.rate}{' '}
                      <span className="text-xs text-slate-400 font-normal">
                        ({service.dailyRate})
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/bookings?type=${service.workerType}&skill=${encodeURIComponent(
                      service.skill
                    )}`}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl max-w-lg mx-auto">
            <p className="text-lg font-bold text-white mb-2">No services found</p>
            <p className="text-sm text-slate-400 mb-6">
              We couldn’t find any service matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
