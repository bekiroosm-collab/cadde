import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="max-w-md mx-auto min-h-screen bg-dark relative shadow-2xl shadow-purple-900/20">
        <Outlet />
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
