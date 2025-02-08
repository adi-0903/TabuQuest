import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center p-6 bg-white/5 rounded-xl backdrop-blur-lg">
            <Mail className="w-6 h-6 text-pink-400 mr-4" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-300">support@tabuquest.com</p>
            </div>
          </div>
          <div className="flex items-center p-6 bg-white/5 rounded-xl backdrop-blur-lg">
            <Phone className="w-6 h-6 text-purple-400 mr-4" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-gray-300">+91 70098-12679</p>
            </div>
          </div>
          <div className="flex items-center p-6 bg-white/5 rounded-xl backdrop-blur-lg">
            <MapPin className="w-6 h-6 text-indigo-400 mr-4" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-gray-300">Jalandhar,Punjab,INDIA</p>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400">
          <p>&copy; 2025 TabuQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}