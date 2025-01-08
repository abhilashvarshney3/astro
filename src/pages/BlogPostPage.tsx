import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Tag, Facebook, Twitter } from 'lucide-react';
import { CommentSection } from '../components/blog/CommentSection';
import { supabase } from '../lib/supabase';

interface BlogPost {
  title: string;
  content: string;
  created_at: string; // Use created_at for the date
  read_time: string;
  category: string;
  image_url: string;
  author: {
    name: string;
    title: string;
  };
  id: string; // Added ID field
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  
  // Add suffix to the day
  const suffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Catch all for 11-13
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${suffix(day)} ${month} ${year}`;
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const isLoggedIn = !!user; // Check if user is logged in
  const isAdmin = user?.role === 'admin'; // Check if user is admin
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]); // Initialize comments with the correct type

  useEffect(() => {
    const fetchBlogPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single(); // Fetch the blog post by slug

      if (error) {
        console.error('Error fetching blog post:', error);
      } else {
        setBlogPost(data);
        fetchComments(data.id); // Fetch comments using the ID of the blog post
      }
    };

    const fetchComments = async (blogId: string) => {
      const { data, error } = await supabase
        .from('comments') // Assuming comments are stored in a separate table
        .select('*')
        .eq('blog_id', blogId)
        .eq('isApproved', true); // Fetch only approved comments

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data || []);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (!blogPost) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="pt-20">
      <article className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <img
            src={blogPost.image_url}
            alt={blogPost.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-8"
          />

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" // Static author image
                alt={'Poonam Sharma'}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{'Poonam Sharma'}</h3>
                <p className="text-sm text-gray-600">{'Certified Astrologer'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(blogPost.created_at)} {/* Use formatted date */}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blogPost.read_time}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {blogPost.category}
              </span>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-8">{blogPost.title}</h1>

          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className="border-t border-gray-200 pt-8 mb-8">
            <h3 className="font-semibold mb-4">Share this article</h3>
            <div className="flex gap-4">
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <CommentSection
            blogId={blogPost.id} // Pass the ID of the blog post
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            comments={comments}
          />
        </div>
      </article>
    </div>
  );
}
