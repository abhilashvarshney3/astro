import React from 'react';
import { Sparkles, Clock, Calendar, MessageCircle } from 'lucide-react';

const services = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Birth Chart Reading",
    description: "Deep dive into your natal chart to understand your life's purpose and potential.",
    price: "$150",
    duration: "90 minutes"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Transit Analysis",
    description: "Understand current planetary influences and prepare for upcoming opportunities.",
    price: "$120",
    duration: "60 minutes"
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Yearly Forecast",
    description: "Comprehensive overview of your year ahead with key dates and opportunities.",
    price: "$200",
    duration: "120 minutes"
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Relationship Reading",
    description: "Explore compatibility and relationship dynamics through synastry analysis.",
    price: "$180",
    duration: "90 minutes"
  }
];

export function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Astrological Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover clarity and guidance through professional astrological readings tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-purple-600 font-semibold">{service.price}</span>
                <span className="text-gray-500 text-sm">{service.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}