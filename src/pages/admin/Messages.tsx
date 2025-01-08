import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Search } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*');
      setMessages(data || []); // Ensure data is always an array
    };

    fetchMessages();
  }, []);

  const handleReply = (id: number) => {
    // Logic to reply to the message
    console.log('Reply to message ID:', id);
  };

  return (
    <AdminLayout title="Messages">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td className="py-2 px-4 border-b">{msg.name}</td>
                  <td className="py-2 px-4 border-b">{msg.email}</td>
                  <td className="py-2 px-4 border-b">{msg.message}</td>
                  <td className="py-2 px-4 border-b">{new Date(msg.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => handleReply(msg.id)} className="bg-blue-500 text-white p-1 rounded">
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
