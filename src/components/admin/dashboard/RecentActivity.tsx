import React from 'react';
import { MessageSquare, Star, FileText, Mail } from 'lucide-react';

const activities = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: 'New Comment',
    description: 'Sarah left a comment on "Understanding Your Moon Sign"',
    time: '5 minutes ago'
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: 'New Testimonial',
    description: 'John submitted a new testimonial',
    time: '2 hours ago'
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Blog Post Published',
    description: 'Mercury Retrograde Guide is now live',
    time: '4 hours ago'
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'New Message',
    description: 'You received a new contact form submission',
    time: '1 day ago'
  }
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="p-2 bg-purple-100 rounded-full text-purple-600">
              {activity.icon}
            </div>
            <div>
              <h4 className="font-medium">{activity.title}</h4>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}