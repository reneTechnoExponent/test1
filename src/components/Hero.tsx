import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your Body, Transform Your Life
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of fitness enthusiasts and achieve your health goals with personalized workout programs.
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary">Start Free Trial</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
              alt="Fitness training"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};