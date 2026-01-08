'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Calendar } from 'lucide-react';

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/family_house.jpg"
          alt="Florida Home"
          fill
          className="object-cover"
          priority
        />
        {/* Purple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800/95 via-primary-800/85 to-primary-800/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Best of Florida Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-block"
            >
              <div className="bg-white/10 backdrop-blur-sm border-2 border-accent-600 rounded-full px-6 py-2 inline-flex items-center space-x-2">
                <span className="text-accent-600 font-bold text-lg">🏆</span>
                <span className="font-bold text-lg">VOTED BEST OF FLORIDA® 2025!</span>
              </div>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              PROPERLY INSPECTED
              <br />
              <span className="text-accent-600">HOME INSPECTION SERVICES</span>
            </h1>

            <p className="text-xl sm:text-2xl mb-8 text-gray-100 font-medium leading-relaxed">
              THE PEACE OF MIND YOU DESERVE
            </p>

            <div className="text-lg mb-10 space-y-3">
              <p className="flex items-center space-x-2">
                <span className="text-accent-600 text-2xl">✓</span>
                <span>360° Virtual Tour Photos Included</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-accent-600 text-2xl">✓</span>
                <span>Same-Day Detailed Reports</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-accent-600 text-2xl">✓</span>
                <span>11 Month Warranty on All Inspections</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-600 hover:bg-accent-700 text-white px-10 py-5 rounded-lg font-bold text-xl transition-all shadow-2xl inline-flex items-center justify-center space-x-3 group"
              >
                <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>BOOK NOW</span>
              </motion.a>

              <motion.a
                href="tel:7277986480"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-800 border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-xl transition-all inline-flex items-center justify-center space-x-3 group"
              >
                <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span>CALL TODAY</span>
              </motion.a>
            </div>

            {/* Phone Numbers */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 text-lg">
              <a href="tel:7277986480" className="flex items-center space-x-2 hover:text-accent-600 transition-colors">
                <Phone className="w-5 h-5 text-accent-600" />
                <span className="font-bold">(727) 798-6480</span>
              </a>
              <a href="tel:7274256300" className="flex items-center space-x-2 hover:text-accent-600 transition-colors">
                <Phone className="w-5 h-5 text-accent-600" />
                <span className="font-bold">(727) 425-6300</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column - Image (Hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full h-[600px]">
              <Image
                src="/images/family_house.jpg"
                alt="Professional Home Inspection"
                fill
                className="object-cover rounded-2xl shadow-2xl border-4 border-white/20"
              />
            </div>

            {/* Floating Review Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-6 max-w-xs"
            >
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent-600 text-2xl">★</span>
                ))}
              </div>
              <p className="text-primary-800 font-semibold text-base mb-2">
                "Lloyd was thorough and professional!"
              </p>
              <p className="text-gray-600 text-sm">
                <strong>4.8 Stars</strong> • 91 Google Reviews
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
