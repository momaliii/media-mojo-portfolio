
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import EditHero from "@/components/dashboard/EditHero";
import EditAbout from "@/components/dashboard/EditAbout";
import EditPortfolio from "@/components/dashboard/EditPortfolio";
import EditContact from "@/components/dashboard/EditContact";
import EditFooter from "@/components/dashboard/EditFooter";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("hero");

  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "hero":
        return <EditHero />;
      case "about":
        return <EditAbout />;
      case "portfolio":
        return <EditPortfolio />;
      case "contact":
        return <EditContact />;
      case "footer":
        return <EditFooter />;
      default:
        return <EditHero />;
    }
  };

  if (!isAuthenticated) {
    return <div className="p-8 text-center">Redirecting to login...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Dashboard - {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("/", "_blank")}
                className="text-sm"
              >
                View Website
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
          <Separator />
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
