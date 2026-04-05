import { Metadata } from 'next';
import { Mail, Phone, MapPin, MessageCircle, Building2, TrendingUp, Users } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with SimpleHome.ca. Connect with a licensed Ontario real estate professional for pre-construction and resale inquiries.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-3">Get In Touch</h1>
          <p className="text-muted mb-8 leading-relaxed">
            Whether you&apos;re looking for pre-construction opportunities, resale properties, or
            simply have questions about the Toronto real estate market, we&apos;re here to help.
            Fill out the form and a licensed Ontario real estate professional will reach out.
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-medium text-primary">Email</div>
                <a href="mailto:hello@simplehome.ca" className="text-sm text-accent hover:underline">
                  hello@simplehome.ca
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-medium text-primary">Phone</div>
                <a href="tel:+14165551234" className="text-sm text-accent hover:underline">
                  (416) 555-1234
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-medium text-primary">Location</div>
                <div className="text-sm text-muted">Toronto, Ontario, Canada</div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-primary mb-4">What We Can Help With</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Building2, title: 'Pre-Construction', desc: 'VIP access to new launches' },
              { icon: TrendingUp, title: 'Investment', desc: 'Portfolio strategy & analysis' },
              { icon: Users, title: 'First-Time Buyers', desc: 'Guidance through the process' },
              { icon: MessageCircle, title: 'Market Insights', desc: 'Expert neighborhood advice' },
            ].map((item) => (
              <div key={item.title} className="bg-surface rounded-xl p-4">
                <item.icon className="w-6 h-6 text-accent mb-2" />
                <h3 className="font-medium text-primary text-sm">{item.title}</h3>
                <p className="text-xs text-muted mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <InquiryForm source="contact-page" />
        </div>
      </div>
    </div>
  );
}
