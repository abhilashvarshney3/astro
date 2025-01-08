import React from 'react';
import { Award, BookOpen, Users, Star } from 'lucide-react';

const achievements = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Certified Astrologer",
    description: "International Association of Professional Astrologers"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "15+ Years Experience",
    description: "Helping clients discover their cosmic path"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "5000+ Readings",
    description: "Transformative sessions with clients worldwide"
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Featured Expert",
    description: "Regular contributor to leading astrology publications"
  }
];

export function About() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-gray-600">
              Guiding souls through the cosmic journey of self-discovery
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-16">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                alt="Professional Astrologer"
                className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">Sarah Anderson</h3>
              <p className="text-gray-600 mb-4">
                With over 15 years of experience in astrology, I've dedicated my life to helping
                others understand their cosmic blueprint and navigate life's journey with confidence
                and clarity.
              </p>
              <p className="text-gray-600 mb-6">
                My approach combines traditional astrological wisdom with modern psychological
                insights, offering a holistic perspective that resonates with contemporary seekers
                of truth.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-purple-600">
                  <Star className="w-5 h-5" />
                  <span>Certified Professional Astrologer</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <Star className="w-5 h-5" />
                  <span>Specializing in Natal Chart Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-purple-600">
                  <Star className="w-5 h-5" />
                  <span>Relationship Compatibility Expert</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  {achievement.icon}
                </div>
                <h4 className="font-semibold mb-2">{achievement.title}</h4>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}