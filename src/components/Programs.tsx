import React from 'react';

export const Programs: React.FC = () => {
  const programs = [
    {
      title: "Strength Training",
      price: "$49",
      duration: "per month",
      features: ["Customized workout plans", "Progress tracking", "Nutrition guide"]
    },
    {
      title: "HIIT Program",
      price: "$59",
      duration: "per month",
      features: ["High-intensity workouts", "Cardio optimization", "Weekly challenges"]
    },
    {
      title: "Yoga & Wellness",
      price: "$39",
      duration: "per month",
      features: ["Guided sessions", "Meditation classes", "Flexibility training"]
    }
  ];

  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-12">Our Programs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {program.price}
                <span className="text-sm text-gray-500"> {program.duration}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {program.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary w-full">Join Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};