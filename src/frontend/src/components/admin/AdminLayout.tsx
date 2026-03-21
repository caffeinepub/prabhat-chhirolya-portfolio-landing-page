import {
  Brain,
  Briefcase,
  CreditCard,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import type { AdminSection } from "../../pages/AdminPage";

interface NavItem {
  id: AdminSection;
  label: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    id: "professional-projects",
    label: "Professional Projects",
    icon: <FolderOpen className="w-4 h-4" />,
  },
  {
    id: "personal-projects",
    label: "Personal Projects",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "work-experience",
    label: "Work Experience",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: "tools",
    label: "Tools & Ecosystem",
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: "work-cards",
    label: "How I See My Work",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    id: "how-i-think",
    label: "How I Think",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: "curiosities",
    label: "Current Curiosities",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "manage-admins",
    label: "Manage Admins",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
];

interface AdminLayoutProps {
  activeSection: AdminSection;
  onSectionChange: (section: string) => void;
  children: ReactNode;
}

export default function AdminLayout({
  activeSection,
  onSectionChange,
  children,
}: AdminLayoutProps) {
  const { clear, identity } = useInternetIdentity();
  const principal = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principal ? `${principal.slice(0, 10)}...` : "";

  return (
    <div className="h-screen w-screen flex bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col border-r border-white/5 bg-[#0d0d0d]">
        <div className="px-5 py-6 border-b border-white/5">
          <p className="text-xs font-light tracking-[0.15em] text-white/30 uppercase mb-1">
            Creative OS
          </p>
          <p className="text-sm font-light text-white/70 tracking-wide">
            Admin Dashboard
          </p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              data-ocid={`admin.${item.id}.tab`}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm font-light tracking-wide transition-all duration-200 ${
                activeSection === item.id
                  ? "text-white/90 bg-white/6 border-r border-white/20"
                  : "text-white/35 hover:text-white/60 hover:bg-white/3"
              }`}
            >
              <span
                className={
                  activeSection === item.id ? "text-white/70" : "text-white/25"
                }
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/5">
          <p className="text-xs text-white/20 font-light mb-3 truncate">
            {shortPrincipal}
          </p>
          <button
            type="button"
            onClick={clear}
            data-ocid="admin.logout.button"
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 font-light tracking-wide"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
