import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";

type Mode = "initial" | "personal" | "professional";

function App() {
  const [mode, setMode] = useState<Mode>("initial");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    setIsAdmin(
      window.location.pathname === "/admin" ||
        window.location.pathname === "/admin/",
    );
  }, []);

  if (isAdmin) {
    return (
      <AppErrorBoundary>
        <AdminPage />
        <Toaster />
      </AppErrorBoundary>
    );
  }

  return (
    <AppErrorBoundary>
      <div className="h-screen w-screen overflow-hidden bg-background">
        <LandingPage mode={mode} onModeChange={setMode} />
      </div>
      <Toaster />
    </AppErrorBoundary>
  );
}

export default App;
