import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react';

const CreateMatch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    locationName: '',
    price: '',
    maxPlayers: 14,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Combine date and time
        const matchDate = new Date(`${formData.date}T${formData.time}`);

        const payload = {
            title: formData.title,
            date: matchDate,
            location: {
                name: formData.locationName,
                lat: 0, // Mock lat/lng
                lng: 0
            },
            price: Number(formData.price),
            maxPlayers: Number(formData.maxPlayers)
        };

        await axios.post('/match', payload);
        navigate('/');
    } catch (error) {
        console.error("Error creating match", error);
        alert("Failed to create match");
    }
  };

  return (
    <div className="p-4 pt-6 pb-24">
      <h1 className="text-2xl font-bold text-white mb-6">Create Match</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
           <label className="block text-sm text-gray-400 mb-1">Match Title</label>
           <input
             type="text"
             name="title"
             value={formData.title}
             onChange={handleChange}
             placeholder="Sunday Friendly"
             className="w-full bg-dark border border-gray-800 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
             required
           />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm text-gray-400 mb-1">Date</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-dark border border-gray-800 rounded-lg p-3 pl-10 text-white focus:border-primary focus:outline-none"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm text-gray-400 mb-1">Time</label>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-dark border border-gray-800 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                    required
                />
            </div>
        </div>

        <div>
           <label className="block text-sm text-gray-400 mb-1">Location</label>
           <div className="relative">
               <MapPin className="absolute left-3 top-3 text-gray-500" size={18} />
               <input
                 type="text"
                 name="locationName"
                 value={formData.locationName}
                 onChange={handleChange}
                 placeholder="Halisaha Name / Address"
                 className="w-full bg-dark border border-gray-800 rounded-lg p-3 pl-10 text-white focus:border-primary focus:outline-none"
                 required
               />
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm text-gray-400 mb-1">Price per Person</label>
               <div className="relative">
                   <DollarSign className="absolute left-3 top-3 text-gray-500" size={18} />
                   <input
                     type="number"
                     name="price"
                     value={formData.price}
                     onChange={handleChange}
                     placeholder="50"
                     className="w-full bg-dark border border-gray-800 rounded-lg p-3 pl-10 text-white focus:border-primary focus:outline-none"
                     required
                   />
               </div>
            </div>
            <div>
               <label className="block text-sm text-gray-400 mb-1">Max Players</label>
               <div className="relative">
                   <Users className="absolute left-3 top-3 text-gray-500" size={18} />
                   <input
                     type="number"
                     name="maxPlayers"
                     value={formData.maxPlayers}
                     onChange={handleChange}
                     className="w-full bg-dark border border-gray-800 rounded-lg p-3 pl-10 text-white focus:border-primary focus:outline-none"
                     required
                   />
               </div>
            </div>
        </div>

        <button
            type="submit"
            className="w-full bg-primary hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-purple-900/50 mt-4"
        >
            Create Match
        </button>
      </form>
    </div>
  );
};

export default CreateMatch;
