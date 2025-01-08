import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AstrologerIntro() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
              alt="Sarah Anderson - Professional Astrologer"
              className="rounded-2xl shadow-xl w-full h-[600px] object-cover"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Meet Sarah Anderson</h2>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-2 text-gray-600">(500+ Reviews)</span>
            </div>
            <p className="text-gray-600 mb-6">
              As a certified professional astrologer with over 15 years of experience,
              I blend traditional wisdom with modern psychological insights to provide
              you with deep, meaningful guidance for your life's journey.
            </p>
            <p className="text-gray-600 mb-8">
              My mission is to help you understand your unique cosmic blueprint,
              empowering you to make conscious choices aligned with your true purpose.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <h4 className="font-semibold text-purple-600 mb-1">15+ Years</h4>
                <p className="text-sm text-gray-600">Professional Experience</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md">
                <h4 className="font-semibold text-purple-600 mb-1">5,000+</h4>
                <p className="text-sm text-gray-600">Readings Completed</p>
              </div>
            </div>
            <Link
              to="/about"
              className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}