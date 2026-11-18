import Link from 'next/link';
import {
  Wrench,
  ShieldCheck,
  Heart,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
} from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      title: 'Dignity of Labor & Fair Wages',
      desc: 'Daily wage workers and tradesmen often wait on street corners without guaranteed income. We guarantee transparent fixed rates and timely digital payouts directly to them.',
      icon: Heart,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      title: 'Rigorous Background Verification',
      desc: 'Customer safety is paramount. Every tradesman on our platform undergoes government identity authentication, address verification, and local police record verification.',
      icon: ShieldCheck,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      title: 'Zero-Bargaining Flat Pricing',
      desc: 'No more stressful disputes over labor rates. We benchmark fair, transparent hourly and daily charges so both customers and workers get predictable pricing.',
      icon: Award,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Skill Upgradation & Tool Kits',
      desc: 'We conduct regular workshops for plumbers, electricians, and carpenters to train them on modern power tools, safety protocols, and professional customer etiquette.',
      icon: TrendingUp,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-20">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Our Mission & Impact
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Bridging the Gap Between{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-400">
              Skilled Craftsmen
            </span>{' '}
            & Modern Homes
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Kaam Karao is a mission-driven platform born in Madhya Pradesh to organize India’s informal blue-collar workforce, providing homeowners with reliable doorstep services while uplifting workers with dignified livelihoods.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>The Kaam Karao Story</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why Did We Build Kaam Karao?
          </h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            <p>
              In every city across India, skilled workers—electricians, plumbers, masons, and helpers—gather early every morning at local street chowks, waiting hours in the dust hoping someone will hire them for the day. At the same time, households and shopkeepers struggle for hours trying to find a reliable plumber or helper they can trust in their homes.
            </p>
            <p>
              Kaam Karao was created to solve both sides of this problem. By combining mobile technology with community verification, we allow customers to book police-verified workers in under a minute with fixed rates, while giving our workforce steady jobs, fair pay, and dignity.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              What Sets Kaam Karao Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-slate-700 transition"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${pillar.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-amber-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-cyan-400">1,200+</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Registered Workers</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white">5,000+</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Jobs Completed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-amber-400">₹35 Lakhs+</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Wages Paid Directly</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">98%</p>
              <p className="text-xs text-slate-400 font-medium mt-1">Safety & Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4 pt-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Experience Hassle-Free Service?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Book certified plumbers, electricians, and helpers with transparent rates today.
          </p>
          <div className="pt-2">
            <Link
              href="/bookings"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg transition"
            >
              <span>Book a Worker Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
