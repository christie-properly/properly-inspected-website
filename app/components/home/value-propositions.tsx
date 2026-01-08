'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Camera, Shield, Zap, FileCheck } from 'lucide-react';

export default function ValuePropositions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Camera,
      title: '360° Virtual Photos',
      description:
        'Every inspection includes high-resolution 360° virtual tour photos so you can explore your future home from anywhere.',
      link: '/services',
      gradient: 'from-primary-800 to-primary-900',
    },
    {
      icon: Shield,
      title: '11 Month Warranty',
      description:
        'We stand behind our work with a comprehensive 11 month warranty, giving you peace of mind long after closing.',
      link: '/about',
      gradient: 'from-accent-600 to-accent-700',
    },
    {
      icon: Zap,
      title: 'Same-Day Reports',
      description:
        'Receive your detailed inspection report within 24 hours, keeping your transaction moving forward without delays.',
      link: '/services',
      gradient: 'from-primary-800 to-primary-900',
    },
    {
      icon: FileCheck,
      title: 'Advanced Technology',
      description:
        'State-of-the-art thermal imaging, moisture detection, and drone inspections reveal issues invisible to the naked eye.',
      link: '/about',
      gradient: 'from-accent-600 to-accent-700',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-800 mb-6">
            Why Choose{' '}
            <span className="text-accent-600">Properly Inspected?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just inspect homes—we provide the detailed information and peace of mind you need to make confident decisions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link href={feature.link}>
                  <div className="group relative bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full cursor-pointer overflow-hidden border border-gray-100">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 group-hover:bg-white/20 transition-all">
                          <Icon className="w-8 h-8 text-primary-800 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-primary-800 group-hover:text-white mb-3 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-white/90 leading-relaxed transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
