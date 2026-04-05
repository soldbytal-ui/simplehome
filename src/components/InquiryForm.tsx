'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface InquiryFormProps {
  projectName?: string;
  projectId?: string;
  source?: string;
}

export default function InquiryForm({ projectName, projectId, source = 'website' }: InquiryFormProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source, projectId }),
      });
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-card p-6 text-center">
        <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-3" />
        <h3 className="font-semibold text-primary text-lg">Thank You!</h3>
        <p className="text-muted text-sm mt-2">
          A licensed real estate professional will reach out to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h3 className="font-semibold text-primary text-lg mb-1">
        {projectName ? `Inquire About ${projectName}` : 'Get In Touch'}
      </h3>
      <p className="text-muted text-sm mb-4">
        Connect with a licensed Ontario real estate professional.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Full Name *"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
        />
        <input
          type="email"
          placeholder="Email *"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
        />
        <textarea
          placeholder={projectName ? `I'm interested in ${projectName}...` : 'How can we help you?'}
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>

      <p className="text-xs text-muted mt-3 leading-relaxed">
        By submitting this form, you agree to our{' '}
        <a href="/terms" className="underline">Terms of Service</a> and{' '}
        <a href="/privacy" className="underline">Privacy Policy</a>.
        SimpleHome.ca partners with licensed Ontario real estate professionals to assist you.
        We are an informational platform and do not directly participate in real estate transactions.
      </p>
    </div>
  );
}
