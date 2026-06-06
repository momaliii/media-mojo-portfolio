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
import { LayoutDashboard, FileText, Mail, User, BarChart3, Image as ImageIcon } from "lucide-react";

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
      { to: "/admin/client-logos", label: "Client Logos", icon: ImageIcon },
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
      className="admin-shell min-h-screen w-full"
    >
      <Sidebar variant="inset" collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader className="px-4 py-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm shadow-[0_8px_24px_-6px_hsl(var(--primary)/0.6)] group-hover:scale-105 transition-transform">
              MH
            </span>
            <span className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
              <span className="font-display font-bold text-base text-sidebar-foreground">Mohamed Ali</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-primary/80 font-semibold">Admin Panel</span>
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="px-2 py-3">
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">
              Manage
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
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
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
          <div className="h-16 px-4 md:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="hidden md:block h-6 w-px bg-border/60" />
              <div className="flex flex-col leading-tight min-w-0">
                <Breadcrumb className="hidden sm:block">
                  <BreadcrumbList className="text-[11px] font-medium">
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild className="text-muted-foreground hover:text-foreground">
                        <Link to={crumbs.base.to}>{crumbs.base.label}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-muted-foreground/60" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-primary font-semibold">{crumbs.currentLabel}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <h1 className="font-display font-bold text-lg tracking-tight text-foreground truncate">{title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="px-4 md:px-8 py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
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

