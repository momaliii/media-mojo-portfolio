
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Create the context
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

// Create the provider component
export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check local storage for auth state on initial load
  useEffect(() => {
    const storedAuthState = localStorage.getItem('adminIsAuthenticated');
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Hard-coded admin credentials (in a real app, these would be stored securely)
  const adminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  const login = (username: string, password: string): boolean => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminIsAuthenticated', 'true');
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin dashboard',
        duration: 3000,
      });
      return true;
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid username or password',
        variant: 'destructive',
        duration: 3000,
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminIsAuthenticated');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
      duration: 3000,
    });
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Create a hook for easier consumption of the context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
