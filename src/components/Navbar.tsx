import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const { user } = useAuth();
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
                
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
            <span className="text-gray-800 text-2xl font-bold">Quizly</span>
          </div>
          <div className="flex items-center">
            {/* Add any additional navbar items here */}
            <span className="text-gray-800">Welcome, {user?.username}</span>
          </div>
        </div>
      </div>
    </nav>
  );
} 