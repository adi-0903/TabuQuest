import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Brain } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 className="w-8 h-8" />
            <span className="text-2xl font-bold">TabuQuest</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-white text-purple-600' 
                  : 'hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            <Link
              to="/analysis"
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                isActive('/analysis') 
                  ? 'bg-white text-purple-600' 
                  : 'hover:bg-white/10'
              }`}
            >
              Analysis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}