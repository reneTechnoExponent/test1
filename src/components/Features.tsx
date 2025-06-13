import React from 'react'

const Features = () => {
  const features = [
    {
      title: "Expert Trainers",
      description: "Work with certified professionals who are dedicated to your success",
      icon: "💪"
    },
    {
      title: "Modern Equipment",
      description: "Access to top-of-the-line fitness equipment and facilities",
      icon: "🏋️"
    },
    {
      title: "Flexible Classes",
      description: "Choose from various class times that fit your schedule",
      icon: "⏰"
    },
    {
      title: "Nutrition Guide",
      description: "Get personalized nutrition advice to maximize your results",
      icon: "🥗"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features