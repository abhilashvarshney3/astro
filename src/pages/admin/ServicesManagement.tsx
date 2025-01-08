import React, { useState } from 'react';
import { Plus, Search, Package, Pencil, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';
import { ServiceModal } from '../../components/admin/services/ServiceModal';
import { supabase } from '../../lib/supabase';

export default function ServicesManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AdminLayout title="Services Management">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Cards */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <Package className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-purple-600">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Birth Chart Reading</h3>
            <p className="text-gray-600 text-sm mb-4">Deep dive into your natal chart to understand your life's purpose.</p>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-purple-600">$150</span>
              <span className="text-gray-500">90 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ServiceModal
          service={selectedService}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
        />
      )}
    </AdminLayout>
  );
}