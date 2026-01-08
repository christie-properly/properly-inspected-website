'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Calendar, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: "Buyer's Inspection", href: '/services/buyers-home-inspection' },
      { name: '4-Point Inspection', href: '/services/4-point-inspection' },
      { name: 'Wind Mitigation', href: '/services/wind-mitigation-inspection' },
      { name: 'New Construction', href: '/services/new-construction-inspection' },
      { name: 'Pre-Listing Inspection', href: '/services/pre-listing-inspection' },
      { name: 'View All Services', href: '/services' },
    ],
  },
  {
    name: 'Locations',
    href: '/locations',
    submenu: [
      { name: 'Odessa', href: '/locations/odessa-fl' },
      { name: 'Westchase Tampa', href: '/locations/westchase-tampa' },
      { name: 'Palm Harbor', href: '/locations/palm-harbor' },
      { name: 'Trinity', href: '/locations/trinity-fl' },
      { name: 'Clearwater', href: '/locations/clearwater' },
      { name: 'View All Areas', href: '/locations' },
    ],
  },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-xl' : 'shadow-md'
      }`}
    >
      {/* Top Bar - Purple Background */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center space-x-6">
              <a href="tel:7277986480" className="flex items-center space-x-2 hover:text-accent-600 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-medium">(727) 798-6480</span>
              </a>
              <a href="tel:7274256300" className="hidden sm:flex items-center space-x-2 hover:text-accent-600 transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-medium">(727) 425-6300</span>
              </a>
              <span className="hidden md:block text-gray-200">Email - contact@properlyinspected.com</span>
            </div>
            <a
              href="https://app.spectora.com/inspection-request/my-inspection-company-0db8e93c2c"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-2 rounded-md font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>CALL FOR AN INSPECTION</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation - White Background */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-48 h-16">
                <Image
                  src="/images/logo.jpg"
                  alt="Properly Inspected"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-primary-800 hover:text-accent-600 font-bold text-base transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span>{item.name}</span>
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Submenu Dropdown */}
                  {item.submenu && activeSubmenu === item.name && (
                    <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-2xl rounded-b-lg overflow-hidden z-50 border-t-2 border-accent-600">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-3 text-sm text-primary-800 hover:bg-accent-50 hover:text-accent-600 transition-colors border-b border-gray-100 last:border-b-0 font-medium"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-primary-800 hover:text-accent-600 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl">
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-base font-bold text-primary-800 hover:bg-accent-50 hover:text-accent-600 rounded-lg transition-colors"
                  onClick={() => !item.submenu && setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent-50 hover:text-accent-600 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
