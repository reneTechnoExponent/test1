import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">FitLife Gym</h4>
            <p className="text-gray-400">Transform your body and mind with our expert trainers and modern facilities.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Programs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Schedule</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Fitness Street</li>
              <li>New York, NY 10001</li>
              <li>contact@fitlife.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FitLife Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer