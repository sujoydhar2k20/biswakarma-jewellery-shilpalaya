
import { Card } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp,
  Eye, 
  MessageSquare,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Website Customization Dashboard</h1>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="flex items-center gap-2">
            <Eye size={16} />
            View Website
          </Button>
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Products" 
          value="64" 
          description="+2 this week" 
          icon={<ShoppingBag className="text-blue-500" />} 
        />
        <StatCard 
          title="Visitors" 
          value="1,240" 
          description="+14% from last month" 
          icon={<Users className="text-green-500" />} 
        />
        <StatCard 
          title="Revenue" 
          value="₹89,240" 
          description="+7.4% from last month" 
          icon={<DollarSign className="text-amber-500" />} 
        />
        <StatCard 
          title="Growth" 
          value="12.5%" 
          description="Increasing steadily" 
          icon={<TrendingUp className="text-ruby-red" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickAccessCard 
              title="Manage Hero Banners" 
              description="Update homepage slider images and text"
              href="/dashboard/banner"
              icon={<Image />}
            />
            <QuickAccessCard 
              title="Edit Products" 
              description="Add, update or remove products from your store"
              href="/dashboard/products"
              icon={<ShoppingBag />}
            />
            <QuickAccessCard 
              title="Update Content" 
              description="Edit About us, contact information and more"
              href="/dashboard/content"
              icon={<FileText />}
            />
            <QuickAccessCard 
              title="Manage Reviews" 
              description="Moderate and respond to customer reviews"
              href="/dashboard/reviews"
              icon={<MessageSquare />}
            />
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Updates</h2>
            <Button variant="ghost" size="sm">View all</Button>
          </div>
          
          <div className="space-y-4">
            <ActivityItem 
              title="Banner Updated" 
              time="2 hours ago"
              description="New homepage banner image uploaded"
            />
            <ActivityItem 
              title="Product Added" 
              time="Yesterday"
              description="Diamond Ring collection updated"
            />
            <ActivityItem 
              title="Content Updated" 
              time="2 days ago"
              description="About us section text changed"
            />
            <ActivityItem 
              title="Review Response" 
              time="3 days ago"
              description="Responded to customer review"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, description, icon }) => {
  return (
    <Card className="p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </Card>
  );
};

const QuickAccessCard = ({ title, description, href, icon }) => {
  return (
    <a href={href} className="block">
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start">
          <div className="mr-4 mt-1 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </Card>
    </a>
  );
};

const ActivityItem = ({ title, time, description }) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 mt-1">
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Edit size={14} />
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <h4 className="font-medium text-sm">{title}</h4>
          <span className="ml-2 text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
};

function Image() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;
}

function FileText() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
}

export default Dashboard;
