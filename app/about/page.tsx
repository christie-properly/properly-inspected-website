import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Shield,
  CheckCircle,
  Camera,
  Thermometer,
  Plane,
  Droplet,
  Calendar,
} from 'lucide-react';

export const metadata = {
  title: 'About Lloyd Tillmann | Certified Home Inspector Tampa Bay',
  description:
    'Meet Lloyd Tillmann, FL Licensed Home Inspector #HI13452 and Mold Assessor. InterNACHI CPI with 10+ years experience serving Tampa Bay.',
};

const SPECTORA_LINK =
  'https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c';

export default function AboutPage() {
  const credentials = [
    {
      title: 'FL Home Inspector',
      detail: 'License #HI13452',
      icon: Shield,
    },
    {
      title: 'FL Mold Assessor',
      detail: 'License #MRSA5241',
      icon: Shield,
    },
    {
      title: 'InterNACHI CPI',
      detail: 'Certified Professional Inspector',
      icon: Award,
    },
    {
      title: 'IAC2 Certified',
      detail: 'Indoor Air Quality Consultant',
      icon: Award,
    },
  ];

  const tools = [
    {
      name: '360° Camera',
      description: 'Exclusive virtual photo technology for complete property tours',
      icon: Camera,
    },
    {
      name: 'Thermal Imaging',
      description: 'Infrared cameras reveal hidden moisture and insulation issues',
      icon: Thermometer,
    },
    {
      name: 'Aerial Drone',
      description: 'Safe, detailed roof inspections without climbing',
      icon: Plane,
    },
    {
      name: 'Moisture Meters',
      description: 'Detect hidden water intrusion and potential mold growth',
      icon: Droplet,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-accent-600/20 border border-accent-500/30 rounded-full px-4 py-2 mb-6">
                <Award className="w-5 h-5 text-accent-600" />
                <span className="text-sm font-semibold text-accent-600">
                  Best of Florida 2025
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Meet{' '}
                <span className="text-accent-600">Lloyd Tillmann</span>
              </h1>
              <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                Certified Home Inspector serving Tampa Bay with over 10 years of
                experience, advanced technology, and a passion for helping clients
                make informed decisions.
              </p>
              <div className="space-y-3 mb-8">
                {credentials?.map?.((cred) => {
                  const Icon = cred?.icon;
                  return (
                    <div key={cred?.title} className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-accent-600 flex-shrink-0" />
                      <div>
                        <span className="font-semibold">{cred?.title}</span>
                        <span className="text-gray-300 text-sm ml-2">
                          {cred?.detail}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a
                href={SPECTORA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Your Inspection</span>
              </a>
            </div>
            <div className="relative">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/lloyd_tillmann_photo.jpg"
                  alt="Lloyd Tillmann - Professional Home Inspector"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
              Why Choose{' '}
              <span className="text-accent-600">Properly Inspected</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go beyond standard inspections with advanced technology and
              certified expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '360° Virtual Photos',
                description:
                  'Unique technology that lets you revisit your inspection anytime, anywhere. No other inspector in Tampa Bay offers this.',
              },
              {
                title: '11 Month Warranty',
                description:
                  'Complete Protection warranty covers appliances and systems for 11 months. 100% parts and labor, no deductible.',
              },
              {
                title: 'Same-Day Reports',
                description:
                  'Detailed reports delivered within hours, not days. Mobile-friendly with photos and repair request generator.',
              },
              {
                title: 'Advanced Technology',
                description:
                  'Thermal imaging, drones, moisture meters, and professional equipment reveal issues others miss.',
              },
              {
                title: 'Multiple Certifications',
                description:
                  'Home Inspector, Mold Assessor, InterNACHI CPI, and IAC2 certified. Fully insured and licensed.',
              },
              {
                title: 'Local Expertise',
                description:
                  '10+ years serving Tampa Bay. We understand Florida-specific issues like moisture, mold, and hurricane damage.',
              },
            ]?.map?.((feature) => (
              <div
                key={feature?.title}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <CheckCircle className="w-10 h-10 text-accent-600 mb-4" />
                <h3 className="text-xl font-bold text-primary-800 mb-3">
                  {feature?.title}
                </h3>
                <p className="text-gray-600">{feature?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Tools */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-4">
              State-of-the-Art{' '}
              <span className="text-accent-600">Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We invest in the best equipment to provide the most thorough
              inspections possible.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools?.map?.((tool) => {
              const Icon = tool?.icon;
              return (
                <div
                  key={tool?.name}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-200"
                >
                  <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-800 mb-2">
                    {tool?.name}
                  </h3>
                  <p className="text-sm text-gray-600">{tool?.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-800 mb-6">
            Ready to Work with Tampa Bay's{' '}
            <span className="text-accent-600">Best Inspector</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Professional, thorough, and fast. Schedule your inspection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SPECTORA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-6 h-6" />
              <span>Schedule Online</span>
            </a>
            <a
              href="tel:7274256300"
              className="inline-flex items-center justify-center space-x-2 bg-navy-700 hover:bg-navy-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              <span>Call (727) 425-6300</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
