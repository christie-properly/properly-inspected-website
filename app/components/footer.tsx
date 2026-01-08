import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="relative w-48 h-12 mb-6">
              <Image
                src="/images/logo.jpg"
                alt="Properly Inspected"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-200 text-base mb-6 leading-relaxed">
              Certified home inspection services serving Tampa Bay with 360° photos, same-day reports, and 11 month warranty.
            </p>
            <div className="space-y-3 text-base">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-600" />
                <a href="tel:7274256300" className="hover:text-accent-600 transition-colors font-medium">
                  (727) 425-6300
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent-600" />
                <a href="tel:7277986480" className="hover:text-accent-600 transition-colors font-medium">
                  (727) 798-6480
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent-600" />
                <a href="mailto:contact@properlyinspected.com" className="hover:text-accent-600 transition-colors font-medium">
                  contact@properlyinspected.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">
                  Serving Tampa Bay: Pinellas, Hillsborough, Pasco, Hernando, Manatee Counties
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-accent-600">Services</h3>
            <ul className="space-y-3 text-base">
              {[
                { name: "Buyer's Inspection", href: '/services/buyers-home-inspection' },
                { name: '4-Point Inspection', href: '/services/4-point-inspection' },
                { name: 'Wind Mitigation', href: '/services/wind-mitigation-inspection' },
                { name: 'New Construction', href: '/services/new-construction-inspection' },
                { name: 'Pre-Listing Inspection', href: '/services/pre-listing-inspection' },
                { name: 'Pool & Spa Inspection', href: '/services/pool-spa-inspection' },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-200 hover:text-accent-600 transition-colors font-medium"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-accent-600 hover:text-accent-500 font-bold transition-colors inline-flex items-center"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-accent-600">Service Areas</h3>
            <ul className="space-y-3 text-base">
              {[
                { name: 'Odessa', href: '/locations/odessa-fl' },
                { name: 'Westchase Tampa', href: '/locations/westchase-tampa' },
                { name: 'Palm Harbor', href: '/locations/palm-harbor' },
                { name: 'Trinity', href: '/locations/trinity-fl' },
                { name: 'Clearwater', href: '/locations/clearwater' },
                { name: 'Tarpon Springs', href: '/locations/tarpon-springs' },
                { name: 'St. Petersburg', href: '/locations/st-petersburg' },
              ].map((location) => (
                <li key={location.name}>
                  <Link
                    href={location.href}
                    className="text-gray-200 hover:text-accent-600 transition-colors font-medium"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-accent-600">Company</h3>
            <ul className="space-y-3 text-base mb-8">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-200 hover:text-accent-600 transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/properlyinspected/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-accent-600 p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/properlyinspect/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-accent-600 p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/matt-friesz-5a611412/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-accent-600 p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 pt-10 border-t border-white/20">
          <div className="flex flex-wrap justify-center items-center gap-12 mb-10">
            <div className="relative w-40 h-20">
              <Image
                src="/images/internachi_logo.png"
                alt="InterNACHI Certified Professional Inspector"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="relative w-40 h-20">
              <Image
                src="/images/bofl_seal_2025.png"
                alt="Best of Florida 2025"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-10 border-t border-white/20 text-center text-base text-gray-200">
          <p className="mb-3">
            © {new Date().getFullYear()} Properly Inspected Home Inspection Services. All rights reserved.
          </p>
          <p className="mb-2 font-medium">
            FL Home Inspector License #HI13452 | FL Mold Assessor License #MRSA5241
          </p>
          <p className="font-medium">
            InterNACHI Certified Professional Inspector | IAC2 Certified
          </p>
        </div>
      </div>
    </footer>
  );
}
