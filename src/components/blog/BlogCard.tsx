import React from 'react';
import { format } from 'date-fns'; // Import date-fns format function
import { Calendar, Clock, Tag } from 'lucide-react';
import { Link } from '../layout/Link';

interface BlogCardProps {
  title: string;
  excerpt: string;
  created_at: string; // Accept created_at timestamp
  readTime: string;
  category: string;
  image: string;
  slug: string;
}

export function BlogCard({ title, excerpt, created_at, readTime, category, image, slug }: BlogCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {created_at && !isNaN(new Date(created_at.replace(' ', 'T')).getTime()) 
              ? format(new Date(created_at.replace(' ', 'T')), 'MMMM dd, yyyy') 
              : 'Invalid date'} {/* Display formatted date or error message */}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readTime}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 hover:text-purple-600 transition-colors">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="text-purple-600 font-medium hover:text-purple-700"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}

export default BlogCard;