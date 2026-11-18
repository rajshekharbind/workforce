"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Search,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Wrench,
  Phone,
  MapPin,
  Calendar,
  Trash2,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  AlertCircle,
  Eye,
  X,
  Filter,
} from 'lucide-react';

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Selected Booking Details Modal
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings
  const fetchBookings = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setError(data.message || 'Error fetching bookings from database.');
      }
    } catch (err) {
      setError('Unable to connect to database. Please check connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Update Status
  const updateStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
        );
        if (selectedBooking && selectedBooking._id === bookingId) {
          setSelectedBooking((prev) => ({ ...prev, status: newStatus }));
        }
        setSuccessMessage(`Booking status changed to "${newStatus}"`);
        setTimeout(() => setSuccessMessage(null), 3500);
      } else {
        setError(data.message || 'Error updating status');
      }
    } catch (err) {
      setError('Error updating status.');
    }
  };

  // Delete Booking
  const deleteBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to delete this booking permanently?')) {
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
        if (selectedBooking && selectedBooking._id === bookingId) {
          setSelectedBooking(null);
        }
        setSuccessMessage('Booking deleted successfully.');
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const data = await res.json();
        setError(data.message || 'Error deleting booking.');
      }
    } catch (err) {
      setError('Error communicating with server.');
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      statusFilter === 'All' ||
      (b.status || 'Pending').toLowerCase() === statusFilter.toLowerCase();

    const matchesType =
      typeFilter === 'All' ||
      (b.workerType || 'unskilled').toLowerCase() === typeFilter.toLowerCase();

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      (b.customerName && b.customerName.toLowerCase().includes(q)) ||
      (b.phone && b.phone.toLowerCase().includes(q)) ||
      (b.location && b.location.toLowerCase().includes(q)) ||
      (b.workDescription && b.workDescription.toLowerCase().includes(q)) ||
      (b.selectedSkill && b.selectedSkill.toLowerCase().includes(q)) ||
      b._id.toString().includes(q);

    return matchesStatus && matchesType && matchesSearch;
  });

  // Calculate Metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => (b.status || 'Pending').toLowerCase() === 'pending').length;
  const inProgressCount = bookings.filter((b) => (b.status || '').toLowerCase() === 'in progress').length;
  const completedCount = bookings.filter((b) => (b.status || '').toLowerCase() === 'completed').length;
  const totalLaborers = bookings.reduce((sum, b) => sum + (parseInt(b.quantity, 10) || 1), 0);

  const getStatusColor = (st) => {
    switch ((st || 'Pending').toLowerCase()) {
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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Dispatch & Booking Command Center
              </h1>
              <p className="text-xs text-slate-400">
                Manage worker requests, dispatch status, customer orders & workforce assignment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchBookings(true)}
              disabled={refreshing}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs text-slate-200 font-semibold transition flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-cyan-400' : ''}`} />
              <span>Refresh</span>
            </button>
            <Link
              href="/bookings"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
            >
              + Create New Booking
            </Link>
          </div>
        </div>

        {/* Alerts */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Orders</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white mt-2">{totalCount}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Lifetime bookings</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400 font-medium">Pending Action</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">{pendingCount}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Awaiting worker match</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-400 font-medium">In Progress</span>
              <Wrench className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-400 mt-2">{inProgressCount}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Worker at worksite</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-medium">Completed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">{completedCount}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Successfully done</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-400 font-medium">Total Laborers</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-purple-400 mt-2">{totalLaborers}</p>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Headcount dispatched</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer, phone, location, skill..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
              {['All', 'Pending', 'In Progress', 'Completed', 'Canceled'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition ${
                    statusFilter === st
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Types</option>
              <option value="skilled">Skilled Only</option>
              <option value="unskilled">Unskilled Only</option>
            </select>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-sm text-slate-400">Loading bookings from MongoDB database...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="py-20 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-base font-bold text-white">No bookings found</p>
              <p className="text-xs text-slate-400">
                {searchQuery || statusFilter !== 'All'
                  ? 'No results matched your active search or filter criteria.'
                  : 'There are currently no bookings in the database.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
                    <th className="py-4 px-6">Customer & Phone</th>
                    <th className="py-4 px-6">Work / Skill</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Labor Count</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredBookings.map((booking) => {
                    const st = booking.status || 'Pending';
                    return (
                      <tr key={booking._id} className="hover:bg-slate-800/40 transition">
                        {/* Customer Info */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-white">
                            {booking.customerName || 'Valued Customer'}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-cyan-400" />
                            <span>{booking.phone}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">
                            ID: {booking._id.toString().slice(-6).toUpperCase()}
                          </span>
                        </td>

                        {/* Trade / Skill */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                booking.workerType === 'skilled'
                                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {booking.workerType || 'unskilled'}
                            </span>
                            <span className="font-semibold text-white">
                              {booking.selectedSkill || 'General Labor'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 max-w-xs truncate">
                            {booking.workDescription}
                          </p>
                        </td>

                        {/* Location */}
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-1 text-slate-300 text-xs max-w-xs truncate">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{booking.location}</span>
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="py-4 px-6">
                          <span className="font-bold text-white">
                            {booking.quantity || 1} Worker{booking.quantity > 1 ? 's' : ''}
                          </span>
                          {booking.estimatedPrice && (
                            <div className="text-xs text-amber-400 font-semibold">
                              Est: ₹{booking.estimatedPrice}
                            </div>
                          )}
                        </td>

                        {/* Status Select */}
                        <td className="py-4 px-6">
                          <select
                            value={st}
                            onChange={(e) => updateStatus(booking._id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none transition ${getStatusColor(
                              st
                            )} bg-slate-950`}
                          >
                            <option value="Pending">● Pending</option>
                            <option value="In Progress">● In Progress</option>
                            <option value="Completed">● Completed</option>
                            <option value="Canceled">● Canceled</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => setSelectedBooking(booking)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white transition"
                            title="View Full Booking Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/bookings/${booking._id}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-white transition inline-block"
                            title="Open Customer Status Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => deleteBooking(booking._id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-red-400 transition"
                            title="Delete Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal: View Full Booking Details */}
        {selectedBooking && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    Booking Details
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    #{selectedBooking._id.toString().slice(-6).toUpperCase()}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 block">Customer</span>
                    <span className="font-bold text-white">
                      {selectedBooking.customerName || 'Valued Customer'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone</span>
                    <a
                      href={`tel:${selectedBooking.phone}`}
                      className="font-bold text-cyan-400 hover:underline"
                    >
                      {selectedBooking.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block">Work Location</span>
                  <span className="font-medium text-slate-200">{selectedBooking.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 block">Trade / Worker Type</span>
                    <span className="font-bold text-white capitalize">
                      {selectedBooking.workerType} —{' '}
                      <span className="text-cyan-300">{selectedBooking.selectedSkill}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Labor Count</span>
                    <span className="font-bold text-white">
                      {selectedBooking.quantity || 1} Worker(s)
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">Work Description</span>
                  <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                    {selectedBooking.workDescription}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Preferred Schedule</span>
                    <span className="font-medium text-slate-200">
                      {selectedBooking.bookingDate || 'Today'} •{' '}
                      {selectedBooking.timeSlot || 'Morning'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Estimated Cost</span>
                    <span className="font-black text-amber-400 text-base">
                      ₹{selectedBooking.estimatedPrice || 'Standard hourly'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <a
                  href={`tel:${selectedBooking.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
