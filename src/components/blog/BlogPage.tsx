import React, { useState, useEffect } from 'react';
import BlogCard from '../components/blog/BlogCard';
import { supabase } from '../../lib/supabase'; // Import Supabase client

const categories = [
  "All",
  "Lunar Astrology",
  "Planetary Movements",
  "Birthday Astrology",
  "Relationship Astrology",
  "Spiritual Growth"
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]); // State to hold fetched blog posts

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

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Astrological Insights Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of articles on astrology, cosmic events, and spiritual growth
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}