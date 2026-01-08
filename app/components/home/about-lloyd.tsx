'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function AboutLloyd() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const credentials = [
    'FL Home Inspector License #HI13452',
    'FL Mold Assessor License #MRSA5241',
    'InterNACHI Certified Professional Inspector (CPI)',
    'IAC2 Residential & Commercial Certified',
    '10+ Years Professional Experience',
    'Best of Florida 2025 Winner',
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-800 via-primary-900 to-navy-900 text-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/lloyd_tillmann.jpg"
                alt="Lloyd Tillmann - Professional Home Inspector"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Best of Florida Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -top-6 -right-6 w-32 h-32"
            >
              <Image
                src="/images/bofl_seal_2025.png"
                alt="Best of Florida 2025"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
              A Professional and Affordable
              <br />
              <span className="text-accent-600">Home Inspection</span>
            </h2>

            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Properly Inspected Home Inspection Services, owned by <strong className="text-white">Lloyd Tillmann</strong>, 
              understands that a home is a major purchase and investment. It makes sense that buyers want to save money 
              wherever they can. Keep in mind that all home inspectors are different, coming from different backgrounds 
              and having different priorities.
            </p>

            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              While it is tempting to simply hire the cheapest inspector you can find, this will often lead to defects 
              in the home going unnoticed and costing you even more than the inspection cost to begin with. The entire 
              Properly Inspected team takes our jobs and responsibility to the client seriously, so call us about your 
              home inspection needs today!
            </p>

            {/* Credentials List */}
            <div className="space-y-4 mb-10">
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{credential}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span>Learn More About Our Team</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
