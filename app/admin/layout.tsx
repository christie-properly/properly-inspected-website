'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  HelpCircle,
  MapPin,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
  { name: 'Services', href: '/admin/services', icon: Briefcase },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Locations', href: '/admin/locations', icon: MapPin },
  { name: 'Contact Forms', href: '/admin/contact', icon: Mail },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 bg-navy-800">
            <Link href="/admin" className="text-white text-xl font-bold">
              Admin Panel
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`${
                    isActive
                      ? 'bg-navy-800 text-white'
                      : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                  } group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    } mr-3 h-5 w-5`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-navy-800">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-navy-800 hover:text-white transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">
              Properly Inspected - Admin
            </h1>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent-600 hover:text-accent-700 font-medium"
            >
              View Site →
            </Link>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
