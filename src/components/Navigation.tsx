import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600">FitLife</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#programs" className="text-gray-600 hover:text-primary-600">Programs</a>
            <a href="#features" className="text-gray-600 hover:text-primary-600">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary-600">Pricing</a>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
};