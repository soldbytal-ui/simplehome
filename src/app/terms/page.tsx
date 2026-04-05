import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'SimpleHome.ca Terms of Service. Read our terms and conditions for using the platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <h1 className="text-3xl font-bold text-primary mb-8">Terms of Service</h1>

      <div className="prose prose-sm max-w-none prose-headings:text-primary prose-p:text-muted prose-li:text-muted prose-strong:text-primary">
        <p><strong>Last Updated:</strong> April 1, 2026</p>

        <h2>1. About SimpleHome.ca</h2>
        <p>
          SimpleHome.ca (&quot;the Platform,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is an informational technology
          platform that provides information about pre-construction and resale real estate
          in the Greater Toronto Area and Ontario, Canada.
        </p>
        <p>
          <strong>SimpleHome.ca is NOT a licensed real estate brokerage</strong> under the Real Estate
          Council of Ontario (RECO). We do not represent buyers or sellers in real estate transactions.
          We do not provide real estate advice, investment advice, legal advice, or financial advice.
        </p>

        <h2>2. Partnership with Licensed Professionals</h2>
        <p>
          SimpleHome.ca partners with licensed Ontario real estate professionals who are registered
          with the Real Estate Council of Ontario (RECO). When you submit an inquiry through our
          platform, your information may be shared with these licensed professionals who can provide
          you with direct assistance and representation.
        </p>

        <h2>3. Information Disclaimer</h2>
        <p>All information provided on SimpleHome.ca, including but not limited to:</p>
        <ul>
          <li>Project descriptions, pricing, floor plans, and specifications</li>
          <li>Neighborhood data and statistics</li>
          <li>Developer information</li>
          <li>Market analysis and blog content</li>
          <li>AI-generated content and chat responses</li>
        </ul>
        <p>
          is <strong>approximate</strong>, based on publicly available data, and <strong>subject to
          change without notice</strong>. We make reasonable efforts to ensure accuracy but cannot
          guarantee that all information is current, complete, or error-free. Users must verify all
          information independently and consult licensed professionals before making any decisions.
        </p>

        <h2>4. No Guarantee of Returns</h2>
        <p>
          Nothing on SimpleHome.ca constitutes investment advice. Past performance of real estate
          markets does not guarantee future results. Real estate values can decrease as well as
          increase. Consult a licensed financial advisor before making investment decisions.
        </p>

        <h2>5. User Responsibilities</h2>
        <p>By using SimpleHome.ca, you agree to:</p>
        <ul>
          <li>Be at least 18 years of age</li>
          <li>Provide accurate information when submitting inquiries</li>
          <li>Use the platform for lawful purposes only</li>
          <li>Not scrape, crawl, or automatically collect data without permission</li>
          <li>Independently verify any information obtained through the platform</li>
          <li>Consult licensed professionals before making real estate decisions</li>
        </ul>

        <h2>6. Privacy</h2>
        <p>
          Your use of SimpleHome.ca is also governed by our <a href="/privacy">Privacy Policy</a>,
          which describes how we collect, use, and protect your personal information in accordance
          with PIPEDA (Personal Information Protection and Electronic Documents Act).
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          All content on SimpleHome.ca, including text, images, graphics, logos, and software,
          is the property of SimpleHome.ca or its licensors and is protected by Canadian copyright
          law. You may not reproduce, distribute, or create derivative works without our written permission.
        </p>

        <h2>8. AI-Generated Content</h2>
        <p>
          SimpleHome.ca uses artificial intelligence to generate certain content, including but not
          limited to project descriptions, blog posts, and chat responses. AI-generated content may
          contain inaccuracies. Users should verify all information with authoritative sources.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by Ontario law, SimpleHome.ca and its operators, employees,
          and partners shall not be liable for any direct, indirect, incidental, special, consequential,
          or punitive damages resulting from your use of the platform, reliance on information provided,
          or any transaction entered into based on information obtained through the platform.
        </p>

        <h2>10. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless SimpleHome.ca, its operators, and partners from
          any claims, losses, damages, liabilities, and expenses arising from your use of the platform
          or violation of these terms.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of the
          Province of Ontario and the federal laws of Canada applicable therein. Any disputes arising
          from these terms shall be subject to the exclusive jurisdiction of the courts of Ontario.
        </p>

        <h2>12. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Changes will be effective upon
          posting to the platform. Continued use of SimpleHome.ca after changes are posted constitutes
          acceptance of the modified terms.
        </p>

        <h2>13. Contact</h2>
        <p>
          For questions about these Terms of Service, please contact us at{' '}
          <a href="mailto:legal@simplehome.ca">legal@simplehome.ca</a>.
        </p>
      </div>
    </div>
  );
}
