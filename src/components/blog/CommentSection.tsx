import React, { useState, useEffect } from 'react';
import { MessageCircle, Trash2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth to access user context
import { supabase } from '../../lib/supabase'; // Import supabase for database operations
import { Comment } from '../../types'; // Update import to use shared Comment interface

interface CommentSectionProps {
  blogId: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
  comments: Comment[];
}

export function CommentSection({ blogId, isLoggedIn, isAdmin, comments: initialComments }: CommentSectionProps) {
  const { user } = useAuth(); // Access user from AuthContext
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from<Comment>('comments')
        .select('*')
        .eq('blog_id', blogId);

      if (error) {
        console.error('Error fetching comments:', error.message); // Log the error message
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [blogId]); // Run effect when blogId changes

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const comment = {
      text: newComment,
      author: user?.name || 'Anonymous', // Use the logged-in user's name
      created_at: new Date().toISOString(), // Use ISO format for timestamp
      isApproved: false,
      blog_id: blogId // Associate the comment with the blog post
    };

    console.log('Comment object to be inserted:', comment); // Log the comment object

    // Save the comment to the database
    const { data, error } = await supabase.from('comments').insert(comment);
  
    if (error) {
      console.error('Error submitting comment:', error); // Log the full error object
    } else if (data && data.length > 0) {
      setComments([...comments, { ...comment, id: data[0].id, date: new Date(comment.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }]); // Add the new comment to the local state
      setNewComment('');
      setShowCommentForm(false);
    } else {
      console.error('No data returned from the insert operation.');
    }
  };

  const handleApproveComment = async (commentId: string) => {
    // Update the comment in the database
    const { error } = await supabase.from('comments').update({ isApproved: true }).eq('id', commentId);
  
    if (error) {
      console.error('Error approving comment:', error.message);
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId ? { ...comment, isApproved: true } : comment
      ));
    }
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  if (!isLoggedIn) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-center">
          Please <Link to="/login" className="text-purple-600 hover:text-purple-700">login</Link> to comment on this post.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
        {!showCommentForm && (
          <button
            onClick={() => setShowCommentForm(true)}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700"
          >
            <MessageCircle className="w-4 h-4" />
            Add Comment
          </button>
        )}
      </div>

      {showCommentForm && (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            rows={3}
            placeholder="Write your comment..."
            required
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setShowCommentForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Post Comment
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {comments.map(comment => {
          const isAuthor = comment.author === user?.name;
          const isVisible = comment.isApproved || isAdmin || isAuthor;
          if (isVisible) {
            return (
              <div key={comment.id} className={`p-4 bg-white rounded-lg shadow ${!comment.isApproved ? 'opacity-50' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{comment.author}</h4>
                    <p className="text-sm text-gray-500">{comment.date}</p>
                  </div>
                  {isAdmin && (
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
                  )}
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            );
          }
          return null; // Do not render the comment if not visible
        })}
      </div>
    </div>
  );
}