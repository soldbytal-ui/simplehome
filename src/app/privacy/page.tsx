import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'SimpleHome.ca Privacy Policy. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>

      <div className="prose prose-sm max-w-none prose-headings:text-primary prose-p:text-muted prose-li:text-muted prose-strong:text-primary">
        <p><strong>Last Updated:</strong> April 1, 2026</p>

        <p>
          SimpleHome.ca is committed to protecting your privacy in accordance with the Personal
          Information Protection and Electronic Documents Act (PIPEDA) and applicable Canadian
          privacy legislation. This policy explains how we collect, use, disclose, and protect
          your personal information.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide, including:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number submitted through inquiry forms</li>
          <li><strong>Inquiry Details:</strong> Messages, project interests, and preferences you share</li>
          <li><strong>Chat Data:</strong> Conversations with our AI assistant</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device information (collected automatically)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your personal information to:</p>
        <ul>
          <li>Connect you with licensed Ontario real estate professionals who can assist you</li>
          <li>Respond to your inquiries and provide requested information</li>
          <li>Improve our platform, content, and user experience</li>
          <li>Send relevant market updates (with your consent)</li>
          <li>Analyze usage patterns to improve our services</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We may share your contact information with licensed Ontario real estate professionals
          who partner with SimpleHome.ca to assist you with your real estate needs. We do not
          sell your personal information to third parties.
        </p>
        <p>We may also share information:</p>
        <ul>
          <li>With service providers who help us operate the platform (hosting, analytics)</li>
          <li>When required by law or to respond to legal process</li>
          <li>To protect the rights and safety of our users and the public</li>
        </ul>

        <h2>4. Cookies and Tracking</h2>
        <p>
          SimpleHome.ca uses cookies and similar technologies for analytics purposes.
          These help us understand how users interact with our platform and improve the experience.
          You can control cookie settings through your browser preferences.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain personal information for as long as necessary to fulfill the purposes
          described in this policy, or as required by law. Inquiry data is typically retained
          for up to 24 months, after which it is anonymized or deleted.
        </p>

        <h2>6. Your Rights</h2>
        <p>Under PIPEDA, you have the right to:</p>
        <ul>
          <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information</li>
          <li><strong>Withdrawal of Consent:</strong> Withdraw consent for the collection, use, or disclosure of your information</li>
        </ul>
        <p>
          To exercise these rights, contact us at{' '}
          <a href="mailto:privacy@simplehome.ca">privacy@simplehome.ca</a>.
          We will respond to your request within 30 days.
        </p>

        <h2>7. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction. However,
          no method of transmission over the Internet is 100% secure.
        </p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          SimpleHome.ca is not intended for individuals under 18 years of age. We do not knowingly
          collect personal information from children.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with an updated revision date. We encourage you to review this policy periodically.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For privacy inquiries or to exercise your rights under PIPEDA, contact our Privacy Officer:
        </p>
        <p>
          SimpleHome.ca Privacy Officer<br />
          Email: <a href="mailto:privacy@simplehome.ca">privacy@simplehome.ca</a><br />
          Toronto, Ontario, Canada
        </p>
        <p>
          If you are not satisfied with our response, you may file a complaint with the
          Office of the Privacy Commissioner of Canada at{' '}
          <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">www.priv.gc.ca</a>.
        </p>
      </div>
    </div>
  );
}
