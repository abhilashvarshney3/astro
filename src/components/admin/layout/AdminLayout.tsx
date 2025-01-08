import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Star,
  User,
  Settings,
  Mail,
  Package,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const sidebarItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin' },
  { icon: <FileText className="w-5 h-5" />, label: 'Blog Posts', path: '/admin/posts' },
  { icon: <MessageSquare className="w-5 h-5" />, label: 'Comments', path: '/admin/comments' },
  { icon: <Star className="w-5 h-5" />, label: 'Testimonials', path: '/admin/testimonials' },
  { icon: <User className="w-5 h-5" />, label: 'About Me', path: '/admin/about' },
  { icon: <Package className="w-5 h-5" />, label: 'Services', path: '/admin/services' },
  { icon: <Mail className="w-5 h-5" />, label: 'Messages', path: '/admin/messages' },
  { icon: <Settings className="w-5 h-5" />, label: 'Users', path: '/admin/users' },
];

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8 mt-16"> {/* Added mt-16 to create space for the header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
