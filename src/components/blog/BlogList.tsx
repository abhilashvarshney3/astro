import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns'; // Import date-fns format function

interface BlogPost {
  title: string;
  excerpt: string;
  read_time: string;
  category: string;
  image_url: string; // Ensure this is the full URL
  slug: string; // Ensure slug is included
  created_at: string; // Added created_at field
}

export function BlogList() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*'); // Fetch all blog posts

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        setBlogPosts(data || []); // Ensure data is an array
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Astrological Insights</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our latest articles on astrology, cosmic events, and spiritual growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) // Sort by created_at descending
            .slice(0, 3) // Get the latest 3 posts
            .map((post, index) => (
              <BlogCard key={index} 
                title={post.title} 
                excerpt={post.excerpt} 
                created_at={format(new Date(post.created_at), 'MMMM dd, yyyy')} // Pass the formatted date to BlogCard
                readTime={post.read_time} 
                category={post.category} 
                image={post.image_url} // Ensure this is the full URL
                slug={post.slug} // Pass the slug to BlogCard
              />
          ))}
        </div>
      </div>
    </section>
  );
}