import React from 'react'

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "29",
      features: [
        "Access to gym equipment",
        "Basic fitness assessment",
        "2 group classes per week",
        "Locker room access"
      ]
    },
    {
      name: "Premium",
      price: "59",
      features: [
        "Unlimited gym access",
        "Advanced fitness assessment",
        "Unlimited group classes",
        "Personal trainer consultation",
        "Nutrition planning"
      ]
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Membership Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="border rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">
                <span className="text-xl">$</span>{plan.price}
                <span className="text-xl">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-600">✓ {feature}</li>
                ))}
              </ul>
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition duration-300">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing