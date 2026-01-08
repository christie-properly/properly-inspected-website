'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, Eye, Trash2, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to fetch contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success('Status updated successfully');
        fetchSubmissions();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Submission deleted successfully');
        fetchSubmissions();
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null);
        }
      } else {
        toast.error('Failed to delete submission');
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast.error('Failed to delete submission');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Status', 'Date', 'Message'];
    const rows = submissions.map((s) => [
      s.name,
      s.email,
      s.phone || '',
      s.service || '',
      s.status,
      new Date(s.createdAt).toLocaleDateString(),
      s.message,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Contact Submissions</h2>
          <p className="mt-2 text-gray-600">Manage and respond to customer inquiries</p>
        </div>
        <button
          onClick={exportToCSV}
          disabled={submissions.length === 0}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-medium disabled:opacity-50"
        >
          <Download className="h-5 w-5" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No contact submissions yet.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedSubmission?.id === submission.id ? 'bg-accent-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{submission.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            submission.status === 'new'
                              ? 'bg-blue-100 text-blue-800'
                              : submission.status === 'read'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {submission.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {submission.email}
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {submission.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(submission.createdAt).toLocaleString()}
                        </div>
                      </div>
                      {submission.service && (
                        <p className="mt-2 text-sm text-gray-500">
                          Interested in: <span className="font-medium">{submission.service}</span>
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                        {submission.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submission Detail */}
        <div className="bg-white rounded-lg shadow p-6">
          {selectedSubmission ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-accent-600 hover:text-accent-700"
                    >
                      {selectedSubmission.email}
                    </a>
                  </div>
                  {selectedSubmission.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <a
                        href={`tel:${selectedSubmission.phone}`}
                        className="text-accent-600 hover:text-accent-700"
                      >
                        {selectedSubmission.phone}
                      </a>
                    </div>
                  )}
                  {selectedSubmission.service && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Service</label>
                      <p className="text-gray-900">{selectedSubmission.service}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date</label>
                    <p className="text-gray-900">
                      {new Date(selectedSubmission.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Message</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedSubmission.status}
                  onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="flex-1 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors text-center font-medium"
                >
                  Email Reply
                </a>
                <button
                  onClick={() => handleDelete(selectedSubmission.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Eye className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Select a submission to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
