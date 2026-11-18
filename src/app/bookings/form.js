"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Users,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Calculator,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [workerType, setWorkerType] = useState('skilled');
  const [selectedSkill, setSelectedSkill] = useState('Plumbing');
  const [quantity, setQuantity] = useState(1);
  const [workDescription, setWorkDescription] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (8 AM - 12 PM)');
  const [urgency, setUrgency] = useState('Standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill from query params if present
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const skillParam = searchParams.get('skill');
    const serviceParam = searchParams.get('service');

    if (typeParam === 'unskilled' || typeParam === 'skilled') {
      setWorkerType(typeParam);
    }
    if (skillParam) {
      setSelectedSkill(skillParam);
    } else if (serviceParam) {
      setSelectedSkill(serviceParam);
    }

    // Default booking date to today
    const today = new Date().toISOString().split('T')[0];
    setBookingDate(today);
  }, [searchParams]);

  // Pricing formula
  const getHourlyRate = () => {
    if (workerType === 'unskilled') return 99;
    switch (selectedSkill) {
      case 'Carpentry':
        return 179;
      case 'Masonry':
        return 189;
      case 'Painting':
        return 129;
      case 'Plumbing':
      case 'Electrical':
      default:
        return 149;
    }
  };

  const calculateEstimate = () => {
    const rate = getHourlyRate();
    const minHours = 2; // minimum standard visit estimate
    const urgencyMultiplier = urgency === 'Urgent (Within 2 Hours)' ? 1.25 : 1.0;
    return Math.round(rate * minHours * quantity * urgencyMultiplier);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      customerName: customerName || 'Valued Customer',
      phone,
      location,
      workerType,
      selectedSkill: workerType === 'skilled' ? selectedSkill : 'General Helper / Labor',
      quantity: parseInt(quantity, 10) || 1,
      workDescription,
      bookingDate,
      timeSlot,
      urgency,
      estimatedPrice: calculateEstimate(),
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.bookingId) {
        router.push(`/bookings/${data.bookingId}`);
      } else {
        setErrorMessage(data.message || 'Error saving booking. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error connecting to booking service. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Customer Contact Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Your Contact & Work Location</h3>
            <p className="text-xs text-slate-400">Where should our verified worker arrive?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Your Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              10-Digit Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Full Address & Landmark
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <textarea
                required
                rows="2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="House/Shop No, Street, Landmark, Colony/City (e.g. Rewa, Indore)"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Worker Requirement */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Worker Category & Skills</h3>
            <p className="text-xs text-slate-400">Select what expertise your work requires</p>
          </div>
        </div>

        {/* Worker Type Toggle */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Labor Classification
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => setWorkerType('skilled')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                workerType === 'skilled'
                  ? 'bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">Skilled Professional</span>
                <span className="text-xs font-semibold text-cyan-400">From ₹149/hr</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Plumber, Electrician, Carpenter, Painter, Mason with equipment.
              </p>
            </div>

            <div
              onClick={() => setWorkerType('unskilled')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                workerType === 'unskilled'
                  ? 'bg-cyan-950/60 border-cyan-500 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">Unskilled Daily Helper</span>
                <span className="text-xs font-semibold text-cyan-400">From ₹99/hr</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Shifting, loading/unloading, site clearing, digging, helper tasks.
              </p>
            </div>
          </div>
        </div>

        {/* Skill dropdown if skilled */}
        {workerType === 'skilled' && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Specific Trade
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
            >
              <option value="Plumbing">Plumbing (Pipes, Taps, Tanks, Leakage)</option>
              <option value="Electrical">Electrical (Wiring, Switches, Fans, Appliances)</option>
              <option value="Carpentry">Carpentry (Doors, Locks, Furniture Repair)</option>
              <option value="Painting">Painting & Waterproofing (Interior/Exterior)</option>
              <option value="Masonry">Masonry / Rajmistri (Tiles, Plaster, Cement)</option>
              <option value="Deep Cleaning">Deep Cleaning Specialist</option>
            </select>
          </div>
        )}

        {/* Quantity */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Number of Workers Required
            </label>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {quantity} Worker{quantity > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5, 8].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuantity(num)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                  quantity === num
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Work Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Work Description / Special Instructions
          </label>
          <textarea
            required
            rows="3"
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
            placeholder="Please detail the problem or task (e.g., Bathroom pipe leaking under basin, or Need 2 helpers to shift furniture from 1st floor to ground floor)."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* 3. Schedule & Urgency */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Preferred Schedule & Urgency</h3>
            <p className="text-xs text-slate-400">When do you want the work done?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Preferred Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Preferred Time Slot
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Urgency selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Dispatch Priority
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => setUrgency('Standard')}
              className={`p-3.5 rounded-xl border cursor-pointer text-xs transition ${
                urgency === 'Standard'
                  ? 'bg-slate-800 border-cyan-500 text-white font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Standard Dispatch</span>
                <span className="text-emerald-400 font-semibold">Regular Rate</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Arrival in selected time window.</p>
            </div>

            <div
              onClick={() => setUrgency('Urgent (Within 2 Hours)')}
              className={`p-3.5 rounded-xl border cursor-pointer text-xs transition ${
                urgency === 'Urgent (Within 2 Hours)'
                  ? 'bg-amber-950/50 border-amber-500 text-white font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold">⚡ Urgent Priority</span>
                <span className="text-amber-400 text-[11px] font-semibold">+25% Priority Fee</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Top priority worker dispatched in &lt; 45 mins.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live Calculation & Confirmation Strip */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
              Estimated Initial Cost
            </span>
            <div className="text-3xl font-black text-amber-400 mt-1">
              ₹{calculateEstimate()}
              <span className="text-xs text-slate-400 font-normal ml-2">
                (Based on minimum 2-hr service visit)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pay only after work is inspected & completed</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Confirming Booking with Nearest Dispatch...</span>
          ) : (
            <>
              <span>Confirm & Request Worker</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-500">
          By submitting, you agree to Kaam Karao’s fair wage guarantee and service verification policies.
        </p>
      </div>
    </form>
  );
}
