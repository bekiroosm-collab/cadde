import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, MessageSquare, User, Users } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/my-teams', icon: Users, label: 'Teams' },
    { path: '/create-match', icon: PlusCircle, label: 'Create', special: true },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark border-t border-gray-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive(item.path) ? 'text-neon' : 'text-gray-400'
            }`}
          >
            <item.icon
              size={item.special ? 32 : 24}
              className={item.special ? 'text-primary mb-1' : ''}
            />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
