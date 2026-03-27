import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Star, Shield } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="p-4 pt-10 pb-24">
      <div className="bg-dark border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-black border-4 border-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
             {user.avatar ? (
                 <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
             ) : (
                <User size={40} className="text-primary" />
             )}
          </div>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-500/30">
              {user.position}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-black/50 p-4 rounded-xl border border-gray-800 flex flex-col items-center">
            <Star className="text-yellow-400 mb-2" />
            <span className="text-2xl font-bold">{user.rating || 0}</span>
            <span className="text-xs text-gray-500">Rating</span>
          </div>
          <div className="bg-black/50 p-4 rounded-xl border border-gray-800 flex flex-col items-center">
             <Shield className="text-secondary mb-2" />
             <span className="text-2xl font-bold">0</span>
             <span className="text-xs text-gray-500">Matches</span>
          </div>
        </div>

        <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2">Bio</h3>
            <p className="text-gray-400 text-sm">
                {user.bio || "No bio yet."}
            </p>
        </div>

        <button
          onClick={logout}
          className="w-full mt-8 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 rounded-lg transition-colors border border-red-500/20"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
