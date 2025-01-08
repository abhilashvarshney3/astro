import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';

interface Comment {
  id: string;
  text: string;
  author: string;
  created_at: string;
  isApproved: boolean;
  blog_posts: { title: string }; // Include blog title
}

const CommentManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          blog_posts (title)
        `); // Fetch comments with associated blog titles

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data || []);
      }
    };

    fetchComments();
  }, []);

  const handleApproveComment = async (commentId: string) => {
    const { error } = await supabase
      .from('comments')
      .update({ isApproved: true })
      .eq('id', commentId);

    if (error) {
      console.error('Error approving comment:', error);
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId ? { ...comment, isApproved: true } : comment
      ));
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error('Error deleting comment:', error);
    } else {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  // Filter comments based on search query
  const filteredComments = comments.filter(comment =>
    comment.blog_posts.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout> {/* Use AdminLayout for consistent layout */}
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Comment Management</h1>
        <input
          type="text"
          placeholder="Search by blog title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="space-y-4">
          {filteredComments.map(comment => (
            <div key={comment.id} className={`p-4 bg-white rounded-lg shadow-md flex flex-col space-y-2 ${!comment.isApproved ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{comment.author}</h4>
                  <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Blog Title: {comment.blog_posts.title}</p> {/* Display blog title */}
                </div>
                <div className="flex gap-2">
                  {!comment.isApproved && (
                    <button
                      onClick={() => handleApproveComment(comment.id)}
                      className="p-1 text-green-600 hover:text-green-700"
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CommentManagement;