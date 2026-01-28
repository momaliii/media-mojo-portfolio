import { ReactNode, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/use-is-admin";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LayoutDashboard, FileText, Mail, User, BarChart3 } from "lucide-react";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const location = useLocation();
  const isAdminQuery = useIsAdmin();
  const isAdmin = isAdminQuery.data === true;

  const items = useMemo(() => {
    const base = [{ to: "/profile", label: "Profile", icon: User }];
    if (!isAdmin) return base;
    return [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/admin/case-studies", label: "Case Studies", icon: FileText },
      { to: "/admin/submissions", label: "Submissions", icon: Mail },
      ...base,
    ];
  }, [isAdmin]);

  const isActive = (to: string) => {
    if (to === "/admin") return location.pathname === "/admin";
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const newSubmissionsCountQuery = useQuery({
    queryKey: ["adminSubmissionsNewCount"],
    enabled: isAdmin,
    queryFn: async () => {
      try {
        const { count, error } = await supabase
          .from("contact_submissions")
          .select("*", { count: "exact", head: true })
          .eq("handled", false);
        if (error) return 0;
        return count ?? 0;
      } catch {
        return 0;
      }
    },
    staleTime: 15_000,
    refetchInterval: 30_000,
  });

  const crumbs = useMemo(() => {
    const base = isAdmin ? { label: "Admin", to: "/admin" } : { label: "Account", to: "/profile" };
    const matched =
      items
        .filter((i) => location.pathname === i.to || location.pathname.startsWith(`${i.to}/`))
        .sort((a, b) => b.to.length - a.to.length)[0] ?? null;

    const currentLabel = matched?.label ?? title;
    const currentTo = matched?.to ?? location.pathname;

    if (location.pathname === "/admin") {
      return { base, currentLabel: "Dashboard", currentTo };
    }
    return { base, currentLabel, currentTo };
  }, [isAdmin, items, location.pathname, title]);

  return (
    <SidebarProvider
      defaultOpen
      className="min-h-screen w-full bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950"
    >
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="px-4 py-4 border-b border-sidebar-border">
          <Link to="/" className="font-semibold text-lg leading-none">
            <span className="gradient-text">Mohamed Ali</span>
          </Link>
          <div className="text-xs text-muted-foreground">Admin Panel</div>
        </SidebarHeader>

        <SidebarContent className="px-2 py-2">
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              Manage
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <AdminNavItem
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                    active={isActive(item.to)}
                    badgeCount={
                      item.to === "/admin/submissions" && isAdmin
                        ? (newSubmissionsCountQuery.data ?? 0)
                        : undefined
                    }
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset className="bg-transparent">
        {/* Top bar */}
        <div className="sticky top-0 z-40 border-b bg-white/90 dark:bg-gray-950/90 backdrop-blur">
          <div className="h-14 px-4 md:px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <div className="flex flex-col leading-tight">
                <Breadcrumb className="hidden sm:block">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={crumbs.base.to}>{crumbs.base.label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{crumbs.currentLabel}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h1 className="font-semibold">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="px-4 md:px-6 py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function AdminNavItem({
  to,
  label,
  icon: Icon,
  active,
  badgeCount,
}: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  active: boolean;
  badgeCount?: number;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const badgeText =
    typeof badgeCount === "number" && badgeCount > 0 ? (badgeCount > 99 ? "99+" : String(badgeCount)) : null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active} tooltip={label}>
        <Link
          to={to}
          className="flex items-center gap-2"
          onClick={() => {
            if (isMobile) setOpenMobile(false);
          }}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
      {badgeText ? <SidebarMenuBadge>{badgeText}</SidebarMenuBadge> : null}
    </SidebarMenuItem>
  );
}

