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
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronRight,
  Star,
  CheckCircle,
  Calculator,
  PhoneCall,
  ArrowRight,
  Award,
  Layers,
} from 'lucide-react';

export default function Home() {
  // Interactive Calculator State on Home Page
  const [calcType, setCalcType] = useState('skilled');
  const [calcQty, setCalcQty] = useState(1);
  const [calcHours, setCalcHours] = useState(4);

  const getEstimatedCost = () => {
    const baseRatePerHour = calcType === 'skilled' ? 149 : 99;
    return calcQty * calcHours * baseRatePerHour;
  };

  const categories = [
    { name: 'Plumber', icon: Wrench, desc: 'Leakage, taps, pipes, bathroom fittings', rate: '₹149/hr', popular: true },
    { name: 'Electrician', icon: Zap, desc: 'Wiring, MCB, fans, appliances, inverter', rate: '₹149/hr', popular: true },
    { name: 'Carpenter', icon: Hammer, desc: 'Furniture repairs, door locks, woodwork', rate: '₹179/hr', popular: false },
    { name: 'House Painter', icon: Paintbrush, desc: 'Wall painting, waterproof putty, polish', rate: '₹129/hr', popular: false },
    { name: 'Daily Labor', icon: Users, desc: 'Loading, unloading, digging, helper tasks', rate: '₹99/hr', popular: true },
    { name: 'Home Shifting', icon: Truck, desc: 'Furniture shifting, lifting heavy goods', rate: '₹199/hr', popular: false },
  ];

  const benefits = [
    {
      title: 'Police & Aadhaar Verified',
      desc: 'Every worker passes strict identity verification and criminal record background checks before joining our network.',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      title: 'Fixed Transparent Rates',
      desc: 'No endless bargaining at the street corner. Clear hourly and daily flat rates with zero hidden platform charges.',
      icon: Calculator,
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      title: 'Fast Doorstep Arrival (30-45 mins)',
      desc: 'Geo-matched nearest available professional dispatched directly to your location with real-time status tracking.',
      icon: Clock,
      color: 'text-cyan-500 bg-cyan-500/10',
    },
    {
      title: 'Workmanship Assurance',
      desc: '7-day post-service warranty. If any fix malfunctions within a week, our supervisor visits and rectifies it free.',
      icon: Award,
      color: 'text-purple-500 bg-purple-500/10',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Alok Verma',
      city: 'Rewa, MP',
      role: 'Homeowner',
      rating: 5,
      comment:
        'Finding skilled plumbers in Rewa was always a headache. With Kaam Karao, a verified plumber arrived in 35 minutes, fixed our main tank valve, and charged the exact app rate. Truly transformative!',
      service: 'Plumbing Service',
    },
    {
      name: 'Sunita Mehra',
      city: 'Indore, MP',
      role: 'Interior Designer',
      rating: 5,
      comment:
        'I regularly hire 4 to 8 unskilled laborers for construction cleanup and furniture shifting. Their punctuality and discipline are top-notch. Best service in MP!',
      service: 'Unskilled Daily Labor',
    },
    {
      name: 'Rajesh Agrawal',
      city: 'Bhopal, MP',
      role: 'Shop Owner',
      rating: 5,
      comment:
        'Had a sudden electrical short circuit at 8 PM. Their emergency booking got an expert electrician here fast. Safe, polite, and very reasonable pricing.',
      service: 'Electrical Repair',
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>India’s Most Dependable Blue-Collar Labor Network</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Book Verified Skilled & Unskilled Workers{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400">
                In Under 60 Seconds
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              From certified plumbers & electricians to on-demand daily wage helpers. Transparent rates, police-verified personnel, and guaranteed doorstep arrival.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/bookings"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2"
              >
                <span>Book a Worker Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2"
              >
                <span>Browse All Services</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-800/80">
              <div className="text-center p-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">5,000+</p>
                <p className="text-xs text-slate-400 font-medium">Jobs Completed</p>
              </div>
              <div className="text-center p-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.9 / 5.0</p>
                <p className="text-xs text-slate-400 font-medium">Customer Rating</p>
              </div>
              <div className="text-center p-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400">1,200+</p>
                <p className="text-xs text-slate-400 font-medium">Verified Workers</p>
              </div>
              <div className="text-center p-3">
                <p className="text-2xl sm:text-3xl font-extrabold text-white">35 Mins</p>
                <p className="text-xs text-slate-400 font-medium">Avg. Arrival Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800/80">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
                Popular Categories
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                What Work Do You Need Done Today?
              </h2>
            </div>
            <Link
              href="/services"
              className="mt-4 md:mt-0 text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              View Full Price Catalog <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.name}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all group relative flex flex-col justify-between"
                >
                  {cat.popular && (
                    <span className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      Most Booked
                    </span>
                  )}
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-900 transition-transform mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 line-clamp-2">{cat.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Standard Rate</span>
                      <span className="text-base font-extrabold text-white">{cat.rate}</span>
                    </div>
                    <Link
                      href={`/bookings?service=${encodeURIComponent(cat.name)}`}
                      className="px-4 py-2 rounded-lg bg-cyan-600/80 hover:bg-cyan-500 text-white text-xs font-semibold transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Cost Estimator on Home Page */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Transparent Estimation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Instant Labor Cost Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Calculate estimated pricing before booking with zero commitments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Type Select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Labor Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcType('skilled')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      calcType === 'skilled'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Skilled (₹149/h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcType('unskilled')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                      calcType === 'unskilled'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Helper (₹99/h)
                  </button>
                </div>
              </div>

              {/* Workers count slider/input */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Number of Workers</span>
                  <span className="text-cyan-400 font-bold">{calcQty} Worker(s)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={calcQty}
                  onChange={(e) => setCalcQty(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Estimated Hours */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Estimated Duration</span>
                  <span className="text-cyan-400 font-bold">{calcHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={calcHours}
                  onChange={(e) => setCalcHours(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Total Estimate Banner */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/60 p-5 rounded-2xl">
              <div>
                <p className="text-xs text-slate-400">Estimated Total (Inclusive of basic tools & taxes)</p>
                <p className="text-3xl font-black text-amber-400 mt-0.5">
                  ₹{getEstimatedCost()}
                  <span className="text-xs text-slate-400 font-normal ml-2">
                    ({calcQty} × {calcHours}h @ ₹{calcType === 'skilled' ? 149 : 99}/h)
                  </span>
                </p>
              </div>
              <Link
                href="/bookings"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition text-center"
              >
                Proceed With This Booking
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works (3 Steps) */}
      <section className="py-20 bg-slate-900/60 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              How Kaam Karao Works
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              No phone bargaining or wandering to labor chowk. Get work booked from your phone in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative">
              <span className="text-5xl font-black text-slate-800 absolute top-4 right-4">01</span>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1. Select Requirement</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose skilled (Plumber, Electrician, Carpenter) or unskilled daily helper, specify work details, time, and address.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative">
              <span className="text-5xl font-black text-slate-800 absolute top-4 right-4">02</span>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">2. Nearest Match Dispatched</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our system instantly assigns police-verified local professionals within 5 km of your location with upfront flat rates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative">
              <span className="text-5xl font-black text-slate-800 absolute top-4 right-4">03</span>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3. Job Done & Warranty</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Work completed professionally to your satisfaction. Pay easily via cash, UPI, or card with a 7-day workmanship warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us vs Traditional Chowk */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              The Kaam Karao Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Why Customers Trust Us Over Street Chowk
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${benefit.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Customer Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Loved by 5,000+ Happy Customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 mr-1" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.city} • {t.role}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-800/40">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Assistance Banner */}
      <section className="py-16 bg-gradient-to-r from-cyan-900 via-slate-900 to-amber-950 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Need an Electrician, Plumber, or Laborer Urgently?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Don’t wait for hours. Book online now or call our 24/7 dispatch helpline directly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link
              href="/bookings"
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition"
            >
              Book Service in 60s
            </Link>
            <a
              href="tel:+918770223682"
              className="px-8 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-white font-bold text-sm flex items-center gap-2 transition"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Call Dispatch: +91 87702 23682</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
