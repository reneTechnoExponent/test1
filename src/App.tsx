import * as React from 'react'
import './App.css'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Programs } from './components/Programs'
import { CallToAction } from './components/CallToAction'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'

export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <Features />
      <Programs />
      <CallToAction />
      <Footer />
    </div>
  )
}