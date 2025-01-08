import React from 'react';
import { Moon, Sun, Heart, Sparkles, Compass, Star } from 'lucide-react';

const expertiseAreas = [
  {
    icon: <Moon className="w-6 h-6" />,
    title: "Natal Chart Analysis",
    description: "Understanding your birth chart's unique cosmic blueprint"
  },
  {
    icon: <Sun className="w-6 h-6" />,
    title: "Solar Return Reading",
    description: "Annual forecasts based on your solar return chart"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Relationship Astrology",
    description: "Synastry and composite chart analysis for relationships"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Horary Astrology",
    description: "Answering specific questions through astrological timing"
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: "Transit Analysis",
    description: "Understanding current planetary influences"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Predictive Astrology",
    description: "Future trends and potential opportunities"
  }
];

export function ExpertiseAreas() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Areas of Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the various ways astrology can illuminate your path and provide guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
                {area.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
              <p className="text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}