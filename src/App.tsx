
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BannerEditor from "./pages/BannerEditor";
import CollectionsEditor from "./pages/CollectionsEditor";
import FeaturedEditor from "./pages/FeaturedEditor";
import ReviewsEditor from "./pages/ReviewsEditor";
import TestimonialsEditor from "./pages/TestimonialsEditor";
import PaymentMethodsEditor from "./pages/PaymentMethodsEditor";
import AboutEditor from "./pages/AboutEditor";
import FooterEditor from "./pages/FooterEditor";
import DashboardSidebar from "./components/DashboardSidebar";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="banner" element={<BannerEditor />} />
            <Route path="collections" element={<CollectionsEditor />} />
            <Route path="featured" element={<FeaturedEditor />} />
            <Route path="reviews" element={<ReviewsEditor />} />
            <Route path="testimonials" element={<TestimonialsEditor />} />
            <Route path="payments" element={<PaymentMethodsEditor />} />
            <Route path="about" element={<AboutEditor />} />
            <Route path="footer" element={<FooterEditor />} />
          </Routes>
        </div>
      </div>
    </SidebarProvider>
  );
};

const App = () => {
  // Check authentication status on load
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Small timeout to ensure localStorage is properly checked
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Login />} />
            
            {/* Dashboard Routes */}
            <Route 
              path="/dashboard/*" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              } 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
