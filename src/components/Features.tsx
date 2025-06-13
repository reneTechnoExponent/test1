import React from 'react';

export const Features: React.FC = () => {
  const features = [
    {
      title: "Personalized Programs",
      description: "Custom workout plans tailored to your goals and fitness level",
      icon: "📋"
    },
    {
      title: "Expert Trainers",
      description: "Learn from certified professionals with years of experience",
      icon: "👨‍🏫"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your improvements with detailed analytics",
      icon: "📈"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};