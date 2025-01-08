import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { BlogPostModal } from '../../components/admin/blog/BlogPostModal';
import { supabase } from '../../lib/supabase';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  created_at: string;
  status: string;
}

export default function BlogManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]); // Define the type for posts

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('blog_posts').select('*');
      setPosts(data || []);
    };

    fetchPosts();
  }, []);

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await supabase.from('blog_posts').delete().eq('id', id);
      // Refresh posts list
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostCreated = () => {
    // Refresh the posts list after creating a new post
    const fetchPosts = async () => {
      const { data } = await supabase.from('blog_posts').select('*');
      setPosts(data || []);
    };

    fetchPosts();
  };

  return (
    <AdminLayout title="Blog Management">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              setSelectedPost(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className="py-2 px-4 border-b">{post.title}</td>
                  <td className="py-2 px-4 border-b">{post.category}</td>
                  <td className="py-2 px-4 border-b">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{post.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-800">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800 ml-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <BlogPostModal
          post={selectedPost}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPost(null);
          }}
          onPostCreated={handlePostCreated} // Pass the function to refresh posts
        />
      )}
    </AdminLayout>
  );
}
