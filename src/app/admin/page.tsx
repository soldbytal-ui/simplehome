'use client';

import { useState } from 'react';
import { Lock, RefreshCw, Phone, Mail } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  projectId: string | null;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setAuthenticated(true);
      }
    } catch {
      alert('Failed to fetch leads');
    }
    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="bg-[#1a1a2e] rounded-xl p-8 w-full max-w-sm border border-white/10">
          <Lock className="w-8 h-8 text-accent mx-auto mb-4" />
          <h1 className="text-white text-xl font-bold text-center mb-6">Admin Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchLeads();
            }}
          >
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 mb-4"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Lead Management</h1>
            <p className="text-white/50 text-sm mt-1">{leads.length} total leads</p>
          </div>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm hover:bg-white/15 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/10">
            <div className="text-2xl font-bold text-accent">
              {leads.filter((l) => l.status === 'new').length}
            </div>
            <div className="text-sm text-white/50 mt-1">New Leads</div>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/10">
            <div className="text-2xl font-bold text-secondary">
              {leads.filter((l) => l.status === 'contacted').length}
            </div>
            <div className="text-sm text-white/50 mt-1">Contacted</div>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/10">
            <div className="text-2xl font-bold text-white/70">
              {leads.filter((l) => l.status === 'closed').length}
            </div>
            <div className="text-sm text-white/50 mt-1">Closed</div>
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-[#1a1a2e] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Contact</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Message</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Source</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-white/70">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-1 text-white/50 mt-0.5">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-white/50 max-w-xs truncate">
                      {lead.message || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-white/70">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/50">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          lead.status === 'new'
                            ? 'bg-accent/20 text-accent'
                            : lead.status === 'contacted'
                            ? 'bg-secondary/20 text-secondary'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-white/30">
                      No leads yet. Leads will appear here when users submit inquiries.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
