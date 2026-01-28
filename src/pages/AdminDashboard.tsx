import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mail, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          Manage your portfolio content and submissions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-media-purple" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Track submissions and content performance at a glance.
            </p>
            <Link to="/admin/analytics">
              <Button variant="outline">Open Analytics</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-media-purple" />
              Case Studies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create, edit, preview and publish case studies.
            </p>
            <Link to="/admin/case-studies">
              <Button className="bg-media-purple hover:bg-media-darkpurple text-white">
                Manage Case Studies
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-media-purple" />
              Contact Submissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View contact form submissions (admin-only).
            </p>
            <Link to="/admin/submissions">
              <Button variant="outline">View Submissions</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

