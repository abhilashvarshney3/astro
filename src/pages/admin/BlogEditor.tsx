import React, { useState } from 'react';
import { Save, Image, Link as LinkIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  const generateExcerpt = (content: string) => {
    return content.split('.').slice(0, 2).join('.') + '.'; // First two sentences
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = slug || generateSlug(title);
    const generatedExcerpt = excerpt || generateExcerpt(content);

    // Check if slug already exists
    const { data: existingPost, error: slugError } = await supabase
      .from('posts')
      .select('slug')
      .eq('slug', generatedSlug)
      .single();

    if (slugError && slugError.code !== 'PGRST116') {
      console.error('Error checking slug:', slugError);
      return;
    }

    if (existingPost) {
      alert('Slug already exists. Please choose a different slug.');
      return;
    }

    // Handle blog post submission
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, category, image, slug: generatedSlug, excerpt: generatedExcerpt }]);

    if (error) {
      console.error('Error creating blog post:', error);
    } else {
      console.log('Blog post created:', data);
      // Reset form or redirect as needed
    }
  };

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter post slug"
                required
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter post excerpt"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="lunar-astrology">Lunar Astrology</option>
                <option value="planetary-movements">Planetary Movements</option>
                <option value="birthday-astrology">Birthday Astrology</option>
                <option value="relationship-astrology">Relationship Astrology</option>
                <option value="spiritual-growth">Spiritual Growth</option>
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-2 border-b border-gray-300">
                  <button type="button" className="p-1 hover:bg-gray-200 rounded" title="Add Image">
                    <Image className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded ml-2" title="Add Link">
                    <LinkIcon className="w-5 h-5" />
                  </button>
                </div>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-4 min-h-[400px] focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Write your blog post content..."
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}