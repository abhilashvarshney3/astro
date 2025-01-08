import React from 'react';
import { Stars, Sun, Moon } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6 space-x-4">
            <Stars className="w-8 h-8 text-purple-600 animate-pulse" />
            <Sun className="w-8 h-8 text-amber-500" />
            <Moon className="w-8 h-8 text-indigo-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Discover Your Celestial Path
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Unlock the mysteries of the universe and find guidance through ancient wisdom and modern insight
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/services" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity">
              Explore Services
            </a>
            <a href="/contact" className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-colors">
              Book a Reading
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}