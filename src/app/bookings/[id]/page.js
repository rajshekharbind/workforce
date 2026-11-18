import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  MapPin,
  Phone,
  User,
  Wrench,
  Calendar,
  AlertCircle,
  Home,
  PhoneCall,
  ArrowLeft,
} from 'lucide-react';

const dbName = process.env.DB_NAME || 'booking-system';

export default async function BookingStatusPage({ params }) {
  const resolvedParams = await params;
  const bookingId = resolvedParams?.id;
  let booking = null;

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const bookingsCollection = db.collection('bookings');
    if (bookingId && ObjectId.isValid(bookingId)) {
      booking = await bookingsCollection.findOne({ _id: new ObjectId(bookingId) });
    }
  } catch (error) {
    console.error('Error fetching booking:', error);
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">Booking Not Found</h1>
          <p className="text-sm text-slate-400">
            We could not locate any booking matching ID: <span className="font-mono text-cyan-400">{bookingId}</span>.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const status = booking.status || 'Pending';

  const getStatusBadge = (st) => {
    switch (st.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'in progress':
      case 'assigned':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'canceled':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'pending':
      default:
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Top Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <span className="text-xs text-slate-500">Live Booking Tracker</span>
        </div>

        {/* Success / Status Hero Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
                  Request Confirmed
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  Booking #{booking._id.toString().slice(-6).toUpperCase()}
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  ID: {booking._id.toString()}
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-[11px] text-slate-400 block mb-1">Current Status</span>
              <span
                className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(
                  status
                )}`}
              >
                ● {status}
              </span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="py-8 border-b border-slate-800">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="space-y-2">
                <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                  ✓
                </div>
                <p className="font-bold text-white text-[11px]">Requested</p>
                <p className="text-[10px] text-slate-400">Order Placed</p>
              </div>

              <div className="space-y-2">
                <div
                  className={`w-7 h-7 mx-auto rounded-full font-bold flex items-center justify-center text-xs ${
                    status === 'Pending'
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-emerald-500 text-slate-950'
                  }`}
                >
                  {status === 'Pending' ? '•' : '✓'}
                </div>
                <p className="font-bold text-white text-[11px]">Dispatching</p>
                <p className="text-[10px] text-slate-400">Matching Worker</p>
              </div>

              <div className="space-y-2">
                <div
                  className={`w-7 h-7 mx-auto rounded-full font-bold flex items-center justify-center text-xs ${
                    status === 'In Progress'
                      ? 'bg-blue-500 text-white animate-pulse'
                      : status === 'Completed'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {status === 'Completed' ? '✓' : '•'}
                </div>
                <p className="font-bold text-white text-[11px]">In Progress</p>
                <p className="text-[10px] text-slate-400">At Worksite</p>
              </div>

              <div className="space-y-2">
                <div
                  className={`w-7 h-7 mx-auto rounded-full font-bold flex items-center justify-center text-xs ${
                    status === 'Completed'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {status === 'Completed' ? '✓' : '•'}
                </div>
                <p className="font-bold text-white text-[11px]">Completed</p>
                <p className="text-[10px] text-slate-400">Job Done</p>
              </div>
            </div>
          </div>

          {/* Booking Summary Details Grid */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                  Customer Name
                </span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <User className="w-4 h-4 text-cyan-400" />
                  {booking.customerName || 'Valued Customer'}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                  Contact Phone
                </span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  {booking.phone}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                  Service Address
                </span>
                <span className="text-white font-semibold flex items-start gap-1.5 mt-0.5">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  {booking.location}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                  Worker Type & Skill
                </span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span className="capitalize">{booking.workerType}</span> —{' '}
                  <span className="text-cyan-300">{booking.selectedSkill || 'General'}</span>{' '}
                  ({booking.quantity || 1} Worker{booking.quantity > 1 ? 's' : ''})
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                  Preferred Schedule
                </span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  {booking.bookingDate || 'Today'} • {booking.timeSlot || 'Morning'}
                </span>
              </div>

              {booking.estimatedPrice && (
                <div>
                  <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                    Estimated Cost
                  </span>
                  <span className="text-2xl font-black text-amber-400 mt-0.5 block">
                    ₹{booking.estimatedPrice}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-1">
                Work Description
              </span>
              <p className="text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs sm:text-sm leading-relaxed">
                {booking.workDescription}
              </p>
            </div>
          </div>

          {/* Quick Helpline Strip */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Need help or want to modify your booking?</span>
            </div>
            <a
              href="tel:+918770223682"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Dispatch Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
