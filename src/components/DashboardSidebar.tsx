
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image, 
  BookOpen, 
  MessageSquare, 
  CreditCard, 
  Globe, 
  LogOut, 
  Store, 
  Star, 
  Users, 
  FileText,
  Settings
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarSeparator 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center py-6">
        <div className="flex items-center">
          <img 
            src="https://d1h96izmtdkx5o.cloudfront.net/-O0Db23L67I9afe9SYhw.jpg?v=2" 
            alt="Biswakarma Jewellery Logo" 
            className="h-10 mr-3"
          />
          <div>
            <h3 className="font-playfair text-lg font-bold text-ruby-red">Biswakarma</h3>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard"}>
                  <Link to="/dashboard">
                    <LayoutDashboard size={18} />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Website Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard/banner"}>
                  <Link to="/dashboard/banner">
                    <Image size={18} />
                    <span>Hero Banner</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard/collections"}>
                  <Link to="/dashboard/collections">
                    <Store size={18} />
                    <span>Collections</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard/featured"}>
                  <Link to="/dashboard/featured">
                    <Star size={18} />
                    <span>Featured Collections</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard/reviews"}>
                  <Link to="/dashboard/reviews">
                    <MessageSquare size={18} />
                    <span>Reviews</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard/testimonials"}>
                  <Link to="/dashboard/testimonials">
                    <Users size={18} />
                    <span>Customer Stories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard/about"}>
                  <Link to="/dashboard/about">
                    <BookOpen size={18} />
                    <span>About Section</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard/payments"}>
                  <Link to="/dashboard/payments">
                    <CreditCard size={18} />
                    <span>Payment Methods</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === "/dashboard/footer"}>
                  <Link to="/dashboard/footer">
                    <FileText size={18} />
                    <span>Footer Content</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/settings">
                    <Settings size={18} />
                    <span>General Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
