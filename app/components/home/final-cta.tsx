'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Phone, Mail } from 'lucide-react';

export default function FinalCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-br from-accent-600 via-accent-700 to-accent-800 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          Ready to Schedule Your
          <br />
          Home Inspection?
        </h2>

        <p className="text-xl sm:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed">
          Get your same-day detailed report with 360° photos and an 11 month warranty. 
          Professional service you can trust.
        </p>

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <motion.a
            href="https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary-800 hover:bg-primary-900 text-white px-12 py-6 rounded-xl font-bold text-xl transition-all shadow-2xl inline-flex items-center justify-center space-x-3 group"
          >
            <Calendar className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            <span>Schedule Online Now</span>
          </motion.a>

          <motion.a
            href="tel:7274256300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-100 text-primary-800 px-12 py-6 rounded-xl font-bold text-xl transition-all shadow-2xl inline-flex items-center justify-center space-x-3 group"
          >
            <Phone className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            <span>Call (727) 425-6300</span>
          </motion.a>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90 text-lg">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <a href="tel:7277986480" className="hover:text-white font-medium transition-colors">
              (727) 798-6480
            </a>
          </div>
          <div className="hidden sm:block text-white/50">|</div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <a href="mailto:contact@properlyinspected.com" className="hover:text-white font-medium transition-colors">
              contact@properlyinspected.com
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 pt-10 border-t border-white/20">
          <p className="text-white/90 text-lg">
            🎯 <strong>Military/Veteran Discount Available</strong> • Same-Day Scheduling • Serving All of Tampa Bay
          </p>
        </div>
      </motion.div>
    </section>
  );
}
