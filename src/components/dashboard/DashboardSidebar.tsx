
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  UserCircle, 
  Briefcase, 
  MessageSquare, 
  FootprintsIcon,
  Home,
  ChevronLeft
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    { id: 'hero', label: 'Hero Section', icon: <Home size={18} /> },
    { id: 'about', label: 'About Section', icon: <UserCircle size={18} /> },
    { id: 'portfolio', label: 'Portfolio Section', icon: <Briefcase size={18} /> },
    { id: 'contact', label: 'Contact Section', icon: <MessageSquare size={18} /> },
    { id: 'footer', label: 'Footer Section', icon: <FootprintsIcon size={18} /> },
  ];

  return (
    <div
      className={cn(
        "bg-gray-900 text-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex justify-between items-center p-4">
        {!collapsed && (
          <div className="text-lg font-bold">Media Mojo</div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white p-0 h-6 w-6"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            size={18}
            className={cn(
              "transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      <div className="mt-6 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800",
                activeTab === item.id && "bg-gray-800 text-white"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="mr-2">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
