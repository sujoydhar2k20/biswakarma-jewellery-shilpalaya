
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  ChevronLeft, 
  Settings, 
  LayoutDashboard, 
  Image, 
  ShoppingBag, 
  FileText, 
  Users, 
  MessageSquare, 
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <div className="flex items-center">
              <img 
                src="https://d1h96izmtdkx5o.cloudfront.net/-O0Db23L67I9afe9SYhw.jpg?v=2" 
                alt="Logo" 
                className="h-8 mr-2" 
              />
              <span className="font-bold text-gray-800">Dashboard</span>
            </div>
          )}
          <Toggle 
            pressed={collapsed} 
            onPressedChange={setCollapsed}
            aria-label="Toggle sidebar"
            className="p-1"
          >
            <ChevronLeft className={`transform transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </Toggle>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <a href="/dashboard" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <LayoutDashboard className={`${collapsed ? 'mx-auto' : 'mr-3'}`} size={collapsed ? 24 : 20} />
                {!collapsed && <span>Dashboard</span>}
              </a>
            </li>
            <li>
              <a href="/dashboard/banner" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <Image className={`${collapsed ? 'mx-auto' : 'mr-3'}`} size={collapsed ? 24 : 20} />
                {!collapsed && <span>Hero Banners</span>}
              </a>
            </li>
            <li>
              <a href="/dashboard/products" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <ShoppingBag className={`${collapsed ? 'mx-auto' : 'mr-3'}`} size={collapsed ? 24 : 20} />
                {!collapsed && <span>Products</span>}
              </a>
            </li>
            <li>
              <a href="/dashboard/content" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <FileText className={`${collapsed ? 'mx-auto' : 'mr-3'}`} size={collapsed ? 24 : 20} />
                {!collapsed && <span>Content</span>}
              </a>
            </li>
            <li>
              <a href="/dashboard/customers" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <Users className={`${collapsed ? 'mx-auto' : 'mr-3'}`} size={collapsed ? 24 : 20} />
                {!collapsed && <span>Customers</span>}
              </a>
            </li>
            <li>
              <a href="/dashboard/reviews" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <MessageSquare className={`${collapsed ? 'mx-auto' : 'mr-3'}`} size={collapsed ? 24 : 20} />
                {!collapsed && <span>Reviews</span>}
              </a>
            </li>
            <li>
              <a href="/dashboard/settings" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <Settings className={`${collapsed ? 'mx-auto' : 'mr-3'}`} size={collapsed ? 24 : 20} />
                {!collapsed && <span>Settings</span>}
              </a>
            </li>
          </ul>
          
          <div className="absolute bottom-4 left-0 right-0 px-2">
            <Button 
              variant="ghost" 
              className={`w-full justify-${collapsed ? 'center' : 'start'} text-gray-700 hover:bg-gray-100`}
            >
              <LogOut className={`${collapsed ? '' : 'mr-3'}`} size={collapsed ? 24 : 20} />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-white shadow-sm">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center">
              <span className="mr-2 text-sm text-gray-600">Admin</span>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
