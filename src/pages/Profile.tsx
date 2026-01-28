import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth();
  const { data: isAdmin } = useIsAdmin();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Logout failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Signed out" });
    navigate("/");
  };

  return (
    <AdminLayout title="Profile">
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">Account details and quick actions.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Email</div>
              <div className="font-medium">{user?.email}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Role</div>
              <div className="font-medium">{isAdmin ? "Admin" : "User"}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {isAdmin && (
              <Link to="/admin">
                <Button className="bg-media-purple hover:bg-media-darkpurple text-white w-full sm:w-auto">
                  Open Admin Dashboard
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={onLogout} className="w-full sm:w-auto">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}

