import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="lg:ml-64 pt-16">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 