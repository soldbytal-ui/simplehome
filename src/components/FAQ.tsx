'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items, title }: { items: FAQItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      {title && (
        <h2 className="font-serif text-section-sm text-primary mb-10">{title}</h2>
      )}
      <div className="divide-y divide-black/[0.06]">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between py-5 text-left group"
            >
              <span className="text-sm font-normal text-primary pr-8 group-hover:text-copper transition-colors duration-300">
                {item.question}
              </span>
              <span className="text-muted text-lg flex-shrink-0 transition-transform duration-300">
                {openIndex === index ? '\u00D7' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="pb-5 text-sm text-muted font-light leading-relaxed animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
        }}
      />
    </section>
  );
}
