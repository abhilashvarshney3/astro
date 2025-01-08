import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManagement from './pages/admin/BlogManagement';
import CommentManagement from './pages/admin/CommentManagement';
import UserManagement from './pages/admin/UserManagement';
import ServicesManagement from './pages/admin/ServicesManagement';
import TestimonialManagement from './pages/admin/TestimonialManagement';
import EditAboutMe from './pages/admin/EditAboutMe';
import Messages from './pages/admin/Messages';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/posts" 
                element={
                  <ProtectedRoute requireAdmin>
                    <BlogManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/comments" 
                element={
                  <ProtectedRoute requireAdmin>
                    <CommentManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute requireAdmin>
                    <UserManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/services" 
                element={
                  <ProtectedRoute requireAdmin>
                    <ServicesManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/testimonials" 
                element={
                  <ProtectedRoute requireAdmin>
                    <TestimonialManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/about" 
                element={
                  <ProtectedRoute requireAdmin>
                    <EditAboutMe />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/messages" 
                element={
                  <ProtectedRoute requireAdmin>
                    <Messages />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
