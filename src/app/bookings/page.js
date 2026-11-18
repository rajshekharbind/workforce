"use client";

import React, { Suspense } from 'react';
import BookingForm from './form';
import { ShieldCheck, Clock, CheckCircle2, PhoneCall } from 'lucide-react';

export default function BookingPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Page Title & Intro */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Instant Service Request
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Book a Professional or Laborer
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Fill out the details below. We will immediately assign the closest police-verified worker to your address.
          </p>

          {/* Quick trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-3 text-xs text-slate-300">
            <span className="flex items-center text-cyan-400">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              100% Police Verified
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center text-amber-400">
              <Clock className="w-4 h-4 mr-1.5" />
              Doorstep in 30-45 Mins
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Pay After Completion
            </span>
          </div>
        </div>

        {/* Suspense wrapped Form */}
        <Suspense
          fallback={
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              Loading booking configuration...
            </div>
          }
        >
          <BookingForm />
        </Suspense>

        {/* Assistance footer */}
        <div className="mt-12 text-center text-xs text-slate-400 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Need help with custom corporate or bulk labor requirements?</span>
          <a
            href="tel:+918770223682"
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Corporate Support: +91 87702 23682</span>
          </a>
        </div>
      </div>
    </div>
  );
}
