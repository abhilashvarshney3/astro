import React from 'react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, excerpt, date, readTime, category, image, slug }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{excerpt}</p>
        <p className="text-gray-500">{date} - {readTime} min read</p>
        <p className="text-purple-600">{category}</p>
        <a href={`/blog/${slug}`} className="text-purple-600 hover:underline">Read more</a>
      </div>
    </div>
  );
};

export default BlogCard;
