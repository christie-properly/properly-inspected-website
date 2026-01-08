import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Calendar, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

const SPECTORA_LINK = 'https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c';

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await prisma?.service?.findUnique?.({ where: { slug: params?.slug } });
  if (!service) notFound();

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{service?.name}</h1>
          <p className="text-xl mb-6">{service?.shortDescription}</p>
          <a href={SPECTORA_LINK} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold">
            <Calendar className="w-5 h-5" />
            <span>Schedule This Inspection</span>
          </a>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">About This Service</h2>
          <p className="text-gray-700 whitespace-pre-line">{service?.fullDescription}</p>
        </div>
        {service?.benefits && service?.benefits?.length > 0 && (
          <div className="bg-accent-50 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Benefits</h2>
            <div className="space-y-3">
              {service?.benefits?.map?.((benefit, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
