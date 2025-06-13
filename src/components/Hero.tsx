import React from 'react'

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"
        }}
      ></div>
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Body, Transform Your Life
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join our state-of-the-art fitness facility and start your journey to a healthier, stronger you.
          </p>
          <button className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition duration-300">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero