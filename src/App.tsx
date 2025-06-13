import * as React from 'react'
import './App.css'
import Hero from './components/Hero'
import Features from './components/Features'
import Programs from './components/Programs'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export function App() {
  return (
    <div className="App">
      <Hero />
      <Features />
      <Programs />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  )
}