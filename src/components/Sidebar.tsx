import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  CogIcon,
} from '@heroicons/react/outline';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
  { name: 'Settings', icon: CogIcon, path: '/dashboard/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="absolute top-4 left-4 z-50 block lg:hidden bg-gray-800 p-2 rounded-md text-white hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white z-10">{isOpen ? 'Close' : 'Open'}</span>
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 z-40`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-6 w-6 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
} 