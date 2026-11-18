import Link from 'next/link';
import {
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Heart,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper features strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Police-Verified Labor</h4>
              <p className="text-xs text-slate-400">Strict Aadhaar & background check</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30-Min Fast Dispatch</h4>
              <p className="text-xs text-slate-400">Immediate doorstep response</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Upfront Fixed Pricing</h4>
              <p className="text-xs text-slate-400">No bargaining, zero hidden fees</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Dedicated Support</h4>
              <p className="text-xs text-slate-400">7 Days / week active assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">
                Kaam<span className="text-amber-400">Karao</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering local skilled craftsmen and daily wage workers with dignity, fair wages, and steady employment, while delivering dependable doorstep home & industrial services to customers.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-cyan-400 shrink-0" />
                Rewa / Indore / Bhopal, Madhya Pradesh, India
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-cyan-400 shrink-0" />
                +91 87702 23682 / +91 98765 43210
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-cyan-400 shrink-0" />
                support@kaamkarao.in / help@kaamkarao.com
              </p>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Top Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition">
                  Plumbing Services
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition">
                  Electricians & Wiring
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition">
                  Carpentry & Furniture
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition">
                  House Painting & Polish
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition">
                  Masonry & Construction
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition">
                  Unskilled Daily Labor
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-cyan-400 transition">
                  Book a Worker
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-cyan-400 transition">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Worker Dignity & CTA */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-4">
              Join as a Worker
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Are you a skilled electrician, plumber, carpenter, or helper? Register with Kaam Karao for guaranteed daily bookings and timely payments.
            </p>
            <Link
              href="/signup"
              className="inline-block w-full text-center bg-cyan-700/80 hover:bg-cyan-600 text-white font-semibold text-xs py-2.5 px-4 rounded-lg transition"
            >
              Register as Worker
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row justify-between items-center text-slate-500">
          <p>© {new Date().getFullYear()} Kaam Karao Platform. All rights reserved.</p>
          <p className="mt-3 sm:mt-0 flex items-center">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 mx-1 fill-red-500" /> for Indian Workers & Homeowners
          </p>
        </div>
      </div>
    </footer>
  );
}
