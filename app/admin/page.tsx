'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Briefcase, MessageSquare, Mail, TrendingUp, Clock } from 'lucide-react';

interface DashboardStats {
  blogPosts: number;
  services: number;
  testimonials: number;
  contactSubmissions: number;
  recentContacts: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
    status: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Blog Posts',
      value: stats?.blogPosts || 0,
      icon: FileText,
      href: '/admin/blog',
      color: 'bg-blue-500',
    },
    {
      name: 'Services',
      value: stats?.services || 0,
      icon: Briefcase,
      href: '/admin/services',
      color: 'bg-green-500',
    },
    {
      name: 'Testimonials',
      value: stats?.testimonials || 0,
      icon: MessageSquare,
      href: '/admin/testimonials',
      color: 'bg-purple-500',
    },
    {
      name: 'Contact Submissions',
      value: stats?.contactSubmissions || 0,
      icon: Mail,
      href: '/admin/contact',
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="mt-2 text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Contact Submissions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Contact Submissions</h3>
            <Link
              href="/admin/contact"
              className="text-sm text-accent-600 hover:text-accent-700 font-medium"
            >
              View All →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {stats?.recentContacts && stats.recentContacts.length > 0 ? (
            stats.recentContacts.map((contact) => (
              <div key={contact.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contact.status === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : contact.status === 'read'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {contact.status}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No recent contact submissions
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/blog/new"
            className="px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors text-center font-medium"
          >
            + New Blog Post
          </Link>
          <Link
            href="/admin/services/new"
            className="px-6 py-4 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors text-center font-medium"
          >
            + New Service
          </Link>
          <Link
            href="/admin/testimonials/new"
            className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
          >
            + New Testimonial
          </Link>
        </div>
      </div>
    </div>
  );
}
