import React from 'react'

const Programs = () => {
  const programs = [
    {
      title: "Strength Training",
      description: "Build muscle and increase your strength with our comprehensive program",
      image: "https://images.unsplash.com/photo-1534371020656-6b85825f2b9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Cardio Fitness",
      description: "Improve your endurance and heart health with varied cardio workouts",
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "HIIT Classes",
      description: "High-intensity interval training for maximum fat burn",
      image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <img 
                src={program.image} 
                alt={program.title}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{program.title}</h3>
                <p className="text-white/80">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs