import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/layout/AdminLayout';

export default function EditAboutMe() {
  const [name, setName] = useState('Sarah Anderson');
  const [description, setDescription] = useState('With over 15 years of experience in astrology...');
  const [achievements, setAchievements] = useState([
    { title: "Certified Astrologer", description: "International Association of Professional Astrologers" },
    { title: "15+ Years Experience", description: "Helping clients discover their cosmic path" },
    { title: "5000+ Readings", description: "Transformative sessions with clients worldwide" },
    { title: "Featured Expert", description: "Regular contributor to leading astrology publications" }
  ]);

  const handleSave = () => {
    // Logic to save the updated information
    console.log('Saved:', { name, description, achievements });
  };

  return (
    <AdminLayout title="Edit About Me">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2 w-full"
            rows={4}
          />
        </div>
        <h3 className="text-2xl font-semibold mb-4">Achievements</h3>
        {achievements.map((achievement, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={achievement.title}
              onChange={(e) => {
                const newAchievements = [...achievements];
                newAchievements[index].title = e.target.value;
                setAchievements(newAchievements);
              }}
              className="border rounded p-2 w-full"
            />
            <label className="block mb-2">Description</label>
            <textarea
              value={achievement.description}
              onChange={(e) => {
                const newAchievements = [...achievements];
                newAchievements[index].description = e.target.value;
                setAchievements(newAchievements);
              }}
              className="border rounded p-2 w-full"
              rows={2}
            />
          </div>
        ))}
        <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
          Save Changes
        </button>
      </div>
    </AdminLayout>
  );
}
