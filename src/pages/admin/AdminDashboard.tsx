import React, { useEffect, useState } from 'react';
import { FileText, MessageSquare, Users, Star } from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { StatsCard } from '../../components/admin/dashboard/StatsCard';
import { RecentActivity } from '../../components/admin/dashboard/RecentActivity';
import { supabase } from '../../lib/supabase';

interface Post {
  id: number;
  title: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalUsers: 0,
    totalTestimonials: 0,
  });
  const [recentPosts, setRecentPosts] = useState<Post[]>([]); // Define the type for recentPosts

  useEffect(() => {
    const fetchStats = async () => {
      const [posts, comments, users, testimonials] = await Promise.all([
        supabase.from('blog_posts').select('*'),
        supabase.from('comments').select('*'),
        supabase.from('users').select('*'),
        supabase.from('testimonials').select('*'),
      ]);

      setStats({
        totalPosts: posts.data ? posts.data.length : 0,
        totalComments: comments.data ? comments.data.length : 0,
        totalUsers: users.data ? users.data.length : 0,
        totalTestimonials: testimonials.data ? testimonials.data.length : 0,
      });
    };

    const fetchRecentPosts = async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false }).limit(5);
      setRecentPosts(data || []); // Ensure data is always an array
    };

    fetchStats();
    fetchRecentPosts();
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Total Posts" value={stats.totalPosts} icon={FileText} />
        <StatsCard title="Comments" value={stats.totalComments} icon={MessageSquare} />
        <StatsCard title="Users" value={stats.totalUsers} icon={Users} />
        <StatsCard title="Testimonials" value={stats.totalTestimonials} icon={Star} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
          <ul>
            {recentPosts.map((post) => (
              <li key={post.id} className="border-b py-2">
                {post.title}
              </li>
            ))}
          </ul>
        </div>
        <RecentActivity />
      </div>
    </AdminLayout>
  );
}
