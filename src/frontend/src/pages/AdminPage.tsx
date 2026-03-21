import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Shield, UserPlus } from "lucide-react";
import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import AdminLogin from "../components/admin/AdminLogin";
import CuriositiesSection from "../components/admin/sections/CuriositiesSection";
import DashboardOverview from "../components/admin/sections/DashboardOverview";
import HowIThinkSection from "../components/admin/sections/HowIThinkSection";
import PersonalProjectsSection from "../components/admin/sections/PersonalProjectsSection";
import ProfessionalProjectsSection from "../components/admin/sections/ProfessionalProjectsSection";
import ToolsSection from "../components/admin/sections/ToolsSection";
import WorkCardsSection from "../components/admin/sections/WorkCardsSection";
import WorkExperienceSection from "../components/admin/sections/WorkExperienceSection";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddAdmin,
  useClaimFirstAdmin,
  useIsAdmin,
} from "../hooks/useQueries";

export type AdminSection =
  | "dashboard"
  | "professional-projects"
  | "personal-projects"
  | "work-experience"
  | "tools"
  | "work-cards"
  | "how-i-think"
  | "curiosities"
  | "manage-admins";

export default function AdminPage() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const claimFirstAdmin = useClaimFirstAdmin();
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  // Loading state
  if (isInitializing || isAdminLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          <p className="text-sm text-white/40 tracking-wider font-light">
            Initializing...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in — show login screen
  if (!identity) {
    return <AdminLogin />;
  }

  // Logged in but not admin — show claim / access denied screen
  if (!isAdmin) {
    const errorMsg = claimFirstAdmin.error
      ? (claimFirstAdmin.error as Error).message
      : null;

    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a] px-6">
        <div className="w-full max-w-sm text-center">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
              <Shield className="w-5 h-5 text-white/60" />
            </div>
          </div>

          <h1 className="text-xl font-light tracking-wide text-white/90 mb-2">
            Admin Setup
          </h1>
          <p className="text-sm text-white/40 font-light mb-8 leading-relaxed">
            Click below to claim first-time admin access, or ask an existing
            admin to add your Principal ID.
          </p>

          {/* Claim button */}
          {!claimFirstAdmin.isSuccess && (
            <Button
              data-ocid="admin.claim.primary_button"
              onClick={() => claimFirstAdmin.mutate()}
              disabled={claimFirstAdmin.isPending}
              className="w-full h-11 bg-white/8 border border-white/15 text-white/80 font-light tracking-wider text-sm hover:bg-white/12 hover:border-white/25 hover:text-white transition-all duration-300 rounded-lg mb-4"
            >
              {claimFirstAdmin.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Claiming access...
                </>
              ) : (
                "Claim Admin Access"
              )}
            </Button>
          )}

          {/* Error message */}
          {errorMsg && (
            <div
              className="mt-2 p-3 rounded-lg bg-red-500/8 border border-red-500/15 text-left"
              data-ocid="admin.claim.error_state"
            >
              <p className="text-xs text-red-400/80 leading-relaxed">
                {errorMsg}
              </p>
              {errorMsg.includes("token") && (
                <p className="text-xs text-white/30 mt-2 leading-relaxed">
                  Tip: Add your setup token to the URL —{" "}
                  <span className="text-white/50 font-mono text-[11px]">
                    /admin?caffeineAdminToken=YOUR_TOKEN
                  </span>
                </p>
              )}
            </div>
          )}

          <p className="mt-8 text-xs text-white/20 font-light">
            Restricted access · Portfolio CMS
          </p>
        </div>
      </div>
    );
  }

  // Admin is authenticated and confirmed
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "professional-projects":
        return <ProfessionalProjectsSection />;
      case "personal-projects":
        return <PersonalProjectsSection />;
      case "work-experience":
        return <WorkExperienceSection />;
      case "tools":
        return <ToolsSection />;
      case "work-cards":
        return <WorkCardsSection />;
      case "how-i-think":
        return <HowIThinkSection />;
      case "curiosities":
        return <CuriositiesSection />;
      case "manage-admins":
        return <ManageAdminsSection />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AdminLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection as (s: string) => void}
    >
      {renderSection()}
    </AdminLayout>
  );
}

function ManageAdminsSection() {
  const [principalId, setPrincipalId] = useState("");
  const [feedback, setFeedback] = useState("");
  const addAdmin = useAddAdmin();

  const handleAdd = async () => {
    setFeedback("");
    try {
      await addAdmin.mutateAsync(principalId.trim());
      setFeedback("Admin added successfully.");
      setPrincipalId("");
    } catch (e) {
      setFeedback(
        (e as Error)?.message || "Invalid Principal ID or operation failed.",
      );
    }
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-light text-white/80 mb-2">Manage Admins</h2>
      <p className="text-sm text-white/40 mb-8">
        Add another admin by entering their Internet Identity Principal ID.
      </p>
      <div className="flex gap-3">
        <Input
          value={principalId}
          onChange={(e) => setPrincipalId(e.target.value)}
          placeholder="e.g. aaaaa-bbbbb-ccccc-ddddd-eeeee-faf"
          className="flex-1 bg-white/5 border-white/10 text-white/80 placeholder:text-white/25 font-light text-sm"
        />
        <Button
          onClick={handleAdd}
          disabled={!principalId.trim() || addAdmin.isPending}
          data-ocid="admin.manage.primary_button"
          className="bg-white/8 border border-white/15 text-white/80 hover:bg-white/12 transition-all duration-200 px-4"
        >
          {addAdmin.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
        </Button>
      </div>
      {feedback && (
        <p
          className={`mt-3 text-sm ${
            feedback.includes("success")
              ? "text-green-400/70"
              : "text-red-400/70"
          }`}
        >
          {feedback}
        </p>
      )}
      <p className="mt-6 text-xs text-white/25 leading-relaxed">
        To find your Principal ID: go to{" "}
        <span className="text-white/50">identity.ic0.app</span>, log in, and
        copy your Principal from the account overview.
      </p>
    </div>
  );
}
