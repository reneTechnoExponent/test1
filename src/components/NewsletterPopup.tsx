import React, { useState, useEffect } from 'react';
import { useNewsletter } from '../hooks/useDatabase';

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

export const NewsletterPopup: React.FC<NewsletterPopupProps> = ({
  isOpen,
  onClose,
  title = "Stay Updated!",
  description = "Subscribe to our newsletter and never miss out on the latest updates.",
  buttonText = "Subscribe Now"
}) => {
  const [email, setEmail] = useState('');
  const { subscribe, loading, error, success, reset, isConfigured } = useNewsletter();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onClose();
        reset();
        setEmail('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose, reset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    await subscribe(email, 'popup');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>

        {!isConfigured ? (
          <div className="text-center">
            <p className="text-yellow-600 mb-4">
              Newsletter signup is available when database is configured.
            </p>
            <p className="text-sm text-gray-500">
              Add your database connection in .env file to enable this feature.
            </p>
          </div>
        ) : success ? (
          <div className="text-center">
            <div className="text-green-600 mb-4">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-green-600 font-semibold">Successfully subscribed!</p>
            <p className="text-gray-600 text-sm">Thank you for joining our newsletter.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Subscribing...' : buttonText}
            </button>
          </form>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};