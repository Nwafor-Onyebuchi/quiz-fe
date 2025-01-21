import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  CogIcon,
  TableIcon,
} from '@heroicons/react/outline';
import Navbar from './Navbar';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Quizes', icon: TableIcon, path: '/dashboard/quizes' },
  { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
  { name: 'Settings', icon: CogIcon, path: '/dashboard/settings' },

];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="relative">
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-200 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 z-20 pt-16`}
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
    </>
  );
} 