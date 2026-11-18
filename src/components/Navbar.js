"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Wrench,
  Menu,
  X,
  PhoneCall,
  CalendarCheck,
  ShieldCheck,
  User,
  LayoutDashboard,
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Book Worker', href: '/bookings' },
    { name: 'About Us', href: '/about' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      {/* Top micro-bar */}
      <div className="hidden md:block bg-gradient-to-r from-cyan-900 via-slate-900 to-cyan-900 border-b border-cyan-800/40 text-xs py-1.5 px-4">
        <div className="container mx-auto flex justify-between items-center text-slate-300">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              100% Background Verified Workers
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Standardized & Transparent Pricing</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+918770223682" className="flex items-center text-amber-400 hover:underline">
              <PhoneCall className="w-3 h-3 mr-1" />
              Helpline: +91 87702 23682
            </a>
            <span className="text-slate-500">|</span>
            <Link href="/admin" className="text-slate-300 hover:text-white flex items-center">
              <LayoutDashboard className="w-3 h-3 mr-1" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center">
                Kaam<span className="text-amber-400 ml-1">Karao</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-cyan-300 font-semibold -mt-1">
                Verified Labor Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              href="/login"
              className="text-slate-300 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800/80 transition flex items-center"
            >
              <User className="w-4 h-4 mr-1.5 text-slate-400" />
              Sign In
            </Link>
            <Link
              href="/bookings"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center space-x-1.5"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book a Worker</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/bookings"
              className="sm:hidden bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium"
            >
              Admin Dashboard
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg border border-slate-700 text-slate-200 text-sm font-medium"
            >
              Sign In / Register
            </Link>
            <Link
              href="/bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-bold shadow"
            >
              Book a Worker Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
