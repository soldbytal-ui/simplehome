'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

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
      <div className="border border-black/[0.06] p-8 text-center">
        <CheckCircle className="w-10 h-10 text-copper mx-auto mb-4" strokeWidth={1} />
        <h3 className="font-serif text-xl text-primary">Thank You</h3>
        <p className="text-sm text-muted font-light mt-2">
          A licensed real estate professional will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-black/[0.06] p-8">
      <h3 className="font-serif text-xl text-primary mb-1">
        {projectName ? `Inquire About ${projectName}` : 'Get In Touch'}
      </h3>
      <p className="text-sm text-muted font-light mb-6">
        Connect with a licensed Ontario real estate professional.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-label uppercase text-muted block mb-2">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border-0 border-b border-black/10 pb-2 text-sm font-light text-primary focus:outline-none focus:border-primary transition-colors bg-transparent"
          />
        </div>
        <div>
          <label className="text-label uppercase text-muted block mb-2">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border-0 border-b border-black/10 pb-2 text-sm font-light text-primary focus:outline-none focus:border-primary transition-colors bg-transparent"
          />
        </div>
        <div>
          <label className="text-label uppercase text-muted block mb-2">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border-0 border-b border-black/10 pb-2 text-sm font-light text-primary focus:outline-none focus:border-primary transition-colors bg-transparent"
          />
        </div>
        <div>
          <label className="text-label uppercase text-muted block mb-2">Message</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={projectName ? `I'm interested in ${projectName}...` : ''}
            className="w-full border-0 border-b border-black/10 pb-2 text-sm font-light text-primary focus:outline-none focus:border-primary transition-colors bg-transparent resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3.5 text-nav uppercase hover:bg-primary/80 transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>

      <p className="text-[10px] text-muted/60 mt-4 font-light leading-relaxed">
        By submitting, you agree to our{' '}
        <a href="/terms" className="underline">Terms</a> and{' '}
        <a href="/privacy" className="underline">Privacy Policy</a>.
        SimpleHome.ca partners with licensed Ontario real estate professionals.
      </p>
    </div>
  );
}
