'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Star, Users, Clock, Shield } from 'lucide-react';

export default function TrustBadges() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      icon: Star,
      value: '4.8 Stars',
      label: '91 Google Reviews',
      color: 'text-accent-600',
    },
    {
      icon: Users,
      value: '10+ Years',
      label: 'Experience',
      color: 'text-primary-800',
    },
    {
      icon: Clock,
      value: '24hr',
      label: 'Report Delivery',
      color: 'text-accent-600',
    },
    {
      icon: Shield,
      value: '11 Month',
      label: 'Warranty',
      color: 'text-primary-800',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Certification Badges */}
        <div className="flex justify-center items-center gap-12 mb-16 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative w-48 h-24"
          >
            <Image
              src="/images/internachi_logo.png"
              alt="InterNACHI Certified Professional Inspector"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-48 h-24"
          >
            <Image
              src="/images/bofl_seal_2025.png"
              alt="Best of Florida 2025"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`${stat.color} mb-4`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <div className={`text-3xl font-extrabold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium text-base">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
