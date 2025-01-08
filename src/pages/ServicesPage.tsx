import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Clock, Calendar, MessageCircle, Star, Moon, Heart } from 'lucide-react';

const services = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Birth Chart Reading",
    description: "Discover your unique cosmic blueprint through an in-depth analysis of your natal chart. We'll explore your strengths, challenges, and life purpose as written in the stars at the moment of your birth.",
    price: "$150",
    duration: "90 minutes",
    benefits: [
      "Understand your life purpose and potential",
      "Discover your innate talents and abilities",
      "Learn about your relationship patterns",
      "Identify career opportunities aligned with your chart"
    ]
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Transit Analysis",
    description: "Navigate upcoming opportunities and challenges with a detailed analysis of planetary transits. Get practical guidance for making the most of cosmic energies affecting your life.",
    price: "$120",
    duration: "60 minutes",
    benefits: [
      "Preview upcoming opportunities and challenges",
      "Plan important decisions and timing",
      "Understand current life themes",
      "Prepare for major planetary transits"
    ]
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Yearly Forecast",
    description: "Get a comprehensive overview of your year ahead with key dates and opportunities. Perfect for planning major life decisions and understanding the themes of your upcoming year.",
    price: "$200",
    duration: "120 minutes",
    benefits: [
      "Year-long planetary forecast",
      "Key dates for important decisions",
      "Monthly theme breakdown",
      "Personal power periods identification"
    ]
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Relationship Reading",
    description: "Understand relationship dynamics through synastry and composite chart analysis. Perfect for couples, business partners, or anyone wanting to improve their relationships.",
    price: "$180",
    duration: "90 minutes",
    benefits: [
      "Compatibility analysis",
      "Relationship strengths and challenges",
      "Communication patterns",
      "Growth opportunities together"
    ]
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: "Lunar Phase Reading",
    description: "Align your goals with lunar cycles for optimal manifestation. Learn how to work with the moon's energy for personal and professional growth.",
    price: "$100",
    duration: "45 minutes",
    benefits: [
      "Personal lunar cycle analysis",
      "Manifestation timing guidance",
      "Monthly planning strategies",
      "Ritual and intention setting tips"
    ]
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Love & Romance Reading",
    description: "Focus specifically on matters of the heart with this specialized reading. Understand your romantic patterns and potential.",
    price: "$160",
    duration: "75 minutes",
    benefits: [
      "Venus and Mars placement analysis",
      "Romantic compatibility insights",
      "Timing for relationship opportunities",
      "Understanding relationship needs"
    ]
  }
];

export default function ServicesPage() {
  const navigate = useNavigate();

  const handleBookService = (serviceTitle: string) => {
    navigate('/contact', { state: { subject: `Booking: ${serviceTitle}` } });
  };

  return (
    <div className="pt-20">
      <section className="bg-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Astrological Services</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover clarity and guidance through professional astrological readings tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-purple-600" />
                          <span className="text-gray-600">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-purple-600">{service.price}</span>
                        <span className="text-gray-500 ml-2">/ {service.duration}</span>
                      </div>
                      <button
                        onClick={() => handleBookService(service.title)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}