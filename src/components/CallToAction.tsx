import React from 'react';

export const CallToAction: React.FC = () => {
  return (
    <section className="bg-primary-600 text-white py-20">
      <div className="container-custom text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of others who have transformed their lives with our comprehensive fitness programs.
        </p>
        <button className="btn bg-white text-primary-600 hover:bg-gray-100">
          Start Free Trial
        </button>
      </div>
    </section>
  );
};