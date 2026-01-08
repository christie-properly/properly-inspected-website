import { prisma } from '@/lib/prisma';
import { ChevronDown } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Frequently Asked Questions | Home Inspection Tampa Bay',
  description:
    'Common questions about home inspections, 4-point inspections, wind mitigation, and more. Get answers from Tampa Bay certified home inspector.',
};

export default async function FAQPage() {
  const faqs = await prisma?.fAQ?.findMany?.({
    where: { published: true },
    orderBy: [{ category: 'asc' }, { order: 'asc' }],
  });

  const categories = Array?.from?.(new Set(faqs?.map?.((f) => f?.category)));

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
            Frequently Asked <span className="text-accent-600">Questions</span>
          </h1>
          <p className="text-xl text-gray-600">
            Get answers to common questions about home inspections in Tampa Bay.
          </p>
        </div>

        {categories?.map?.((category) => {
          const categoryFaqs = faqs?.filter?.((f) => f?.category === category);
          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold text-primary-800 mb-6 pb-3 border-b-2 border-accent-600">
                {category}
              </h2>
              <div className="space-y-4">
                {categoryFaqs?.map?.((faq) => (
                  <details
                    key={faq?.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group"
                  >
                    <summary className="cursor-pointer px-6 py-4 font-semibold text-primary-800 hover:bg-accent-50 transition-colors flex items-center justify-between">
                      <span>{faq?.question}</span>
                      <ChevronDown className="w-5 h-5 text-accent-600 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-200">
                      {faq?.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-16 bg-gradient-to-br from-accent-600 to-accent-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="mb-6">
            Can't find what you're looking for? Give us a call or send us a message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:7274256300"
              className="inline-flex items-center justify-center bg-white text-accent-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Call (727) 425-6300
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-navy-700 hover:bg-navy-800 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
