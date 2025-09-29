'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ email: '', company: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch('https://formspree.io/f/xnngpygq', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      setFormData({
        email: data.get('email') as string,
        company: data.get('company') as string
      });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h2>
          <p className="text-gray-600 mb-4">
            We will reach out to you shortly with instructions.
          </p>
          <p className="text-sm text-gray-600 mb-2">
            You can already request your bank to provide:
          </p>
          <ul className="text-sm text-gray-600 text-left mb-6 space-y-1">
            <li>• Monthly fee statement (CSV, PDF, EDI822 or CAMT086)</li>
            <li>• Bank pricing agreement (CSV or PDF)</li>
           </ul>
          <p className="text-sm text-gray-500 mb-6">
            Your audit will be ready in <strong>7 business days</strong>
          </p>
          <a 
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Request Bank Fee Audit</h1>
          <p className="mt-2 text-gray-600">
            Get your analysis in 7 business days
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                required
                placeholder="Your Company Inc."
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Request Audit
            </button>

            <p className="text-xs text-center text-gray-500">
              After submitting, you'll receive instructions to email your documents securely.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}