import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface BlogPost {
  title: string;
  excerpt: string;
  read_time: string; // Updated to match the database schema
  category: string;
  image_url: string; // URL of the image
  slug: string;
  author_id?: string; // Optional for updates
  created_at?: string; // Optional for updates
  updated_at?: string; // Optional for updates
  status: string; // Added status field
  content: string; // Added content field
}

interface BlogPostModalProps {
  post?: {
    id?: string;
    title: string;
    content: string;
    category: string;
    image_url: string;
    status: string;
    slug: string; // Include slug in the type
  };
  onClose: () => void;
  onPostCreated: () => void; // New prop for refreshing posts
}

export function BlogPostModal({ post, onClose, onPostCreated }: BlogPostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image_url: '',
    status: 'draft',
    slug: '' // Add slug field
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null); // Reset preview if no file
    }
  }, [imageFile]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/^-|-$/g, ''); // Generate slug from title
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = formData.image_url;

    // Handle image upload if a new image is provided
    if (imageFile) {
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(`public/${imageFile.name}`, imageFile);

      if (error) {
        console.error('Error uploading image:', error);
        return;
      }

      // Construct the full image URL
      imageUrl = `https://ozufoxwbmdowbldzpckh.supabase.co/storage/v1/object/public/blog-images/public/${imageFile.name}`;
    }

    const { data: userData } = await supabase.auth.getUser(); // Fetch the current user
    const userId = userData.user?.id; // Get the user ID

    // Generate slug from title
    const slug = generateSlug(formData.title);

    // Check if slug already exists
    const { data: existingPosts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('slug', slug);

    if (fetchError) {
      console.error('Error checking existing slugs:', fetchError);
      return;
    }

    if (existingPosts.length > 0) {
      console.error('Slug already exists:', slug);
      return; // Prevent submission if slug already exists
    }

    const calculateReadTime = (content: string) => {
      const wordsPerMinute = 200; // Average reading speed
      const words = content.split(/\s+/).length;
      const minutes = Math.ceil(words / wordsPerMinute);
      return `${minutes} minute${minutes > 1 ? 's' : ''} read`;
    };

    const newPostData: BlogPost = {
      ...formData, // Spread other form data
      slug, // Use the generated slug
      excerpt: formData.content.split('\n').slice(0, 2).join(' '), // Generate excerpt from the first 1-2 lines of content
      read_time: calculateReadTime(formData.content), // Calculate reading time
      created_at: new Date().toISOString(), // Set the current date as the post date
      image_url: imageUrl,
      author_id: userId, // Use the current user's ID
      updated_at: new Date().toISOString(), // Set updated_at to current date
    };

    console.log('New Post Data:', newPostData); // Log the data being sent

    const { error } = post
      ? await supabase.from('blog_posts').update(newPostData).eq('id', post.id)
      : await supabase.from('blog_posts').insert([newPostData]);

    if (error) {
      console.error('Error inserting/updating post:', error);
      return;
    }

    onPostCreated(); // Call the function to refresh posts
    onClose();
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null); // Reset the preview
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[80vh]"> {/* Added scrollable styles */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            {post ? 'Edit Post' : 'Create New Post'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              rows={10}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                <option value="Lunar Astrology">Lunar Astrology</option>
                <option value="Planetary Movements">Planetary Movements</option>
                <option value="Birthday Astrology">Birthday Astrology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image
            </label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setImageFile(e.target.files[0]);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Image Preview" className="w-full h-auto rounded-lg" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 text-red-600 hover:text-red-800"
              >
                Remove Image
              </button>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              {post ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}