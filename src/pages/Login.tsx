
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For now, use a hardcoded admin credential check
      // In production, this should be replaced with proper authentication
      if (email === 'admin@biswakarmagold.com' && password === 'Admin@123') {
        // Store authentication state in localStorage
        localStorage.setItem('isAuthenticated', 'true');
        toast.success("Logged in successfully!");
        navigate('/dashboard');
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="https://d1h96izmtdkx5o.cloudfront.net/-O0Db23L67I9afe9SYhw.jpg?v=2"
            alt="Biswakarma Jewellery Logo"
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-2xl font-playfair font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your website</p>
        </div>
        
        <Card className="p-6">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-ruby-red focus:ring-ruby-red"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-ruby-red hover:text-ruby-dark">
                  Forgot password?
                </a>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Default credentials: <br/>
                  Email: admin@biswakarmagold.com <br/>
                  Password: Admin@123
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Need help? Contact your administrator.
                </p>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
