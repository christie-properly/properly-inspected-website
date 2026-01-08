'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SPECTORA_LINK =
  'https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact-page' }),
      });

      if (response?.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-800 mb-6">
            Get in <span className="text-accent-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to schedule your home inspection? Contact us today for fast, professional service.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 rounded-lg p-3">
                    <Phone className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-800 mb-1">Phone</h3>
                    <a href="tel:7274256300" className="text-accent-600 hover:text-accent-700">
                      (727) 425-6300
                    </a>
                    <br />
                    <a href="tel:7277986480" className="text-accent-600 hover:text-accent-700">
                      (727) 798-6480
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 rounded-lg p-3">
                    <Mail className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-800 mb-1">Email</h3>
                    <a
                      href="mailto:contact@properlyinspected.com"
                      className="text-accent-600 hover:text-accent-700"
                    >
                      contact@properlyinspected.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 rounded-lg p-3">
                    <MapPin className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-800 mb-1">Service Area</h3>
                    <p className="text-gray-600">
                      Tampa Bay: Pinellas, Hillsborough, Pasco, Hernando, and Manatee Counties
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent-100 rounded-lg p-3">
                    <Calendar className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-800 mb-1">Schedule Online</h3>
                    <a
                      href={SPECTORA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 hover:text-accent-700 font-semibold"
                    >
                      Book Your Inspection →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-600 to-accent-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Quick Scheduling</h3>
              <p className="mb-6">
                Need an inspection ASAP? We offer same-day and next-day appointments based on availability.
              </p>
              <a
                href={SPECTORA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white text-accent-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Calendar className="w-5 h-5" />
                <span>Schedule Now</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Send Us a Message</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">Message Sent!</h4>
                    <p className="text-sm text-green-700">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">
                    Something went wrong. Please try again or call us directly at (727) 425-6300.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                      placeholder="(727) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Interested In
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="Buyer's Inspection">Buyer's Inspection</option>
                    <option value="4-Point Inspection">4-Point Inspection</option>
                    <option value="Wind Mitigation">Wind Mitigation</option>
                    <option value="New Construction">New Construction</option>
                    <option value="Pre-Listing">Pre-Listing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors resize-none"
                    placeholder="Tell us about your inspection needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-600 hover:bg-accent-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
