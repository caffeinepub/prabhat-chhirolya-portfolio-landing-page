import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

export default function AdminLogin() {
  const { login, isLoggingIn, isLoginError, loginError } =
    useInternetIdentity();

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a]">
      <div
        className="w-full max-w-sm px-8 text-center"
        data-ocid="admin.login.panel"
      >
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
            <Lock className="w-5 h-5 text-white/60" />
          </div>
        </div>

        <h1 className="text-xl font-light tracking-wide text-white/90 mb-2">
          Admin Access
        </h1>
        <p className="text-sm text-white/40 font-light tracking-wide mb-10">
          Prabhat Chhirolya · Creative OS
        </p>

        <Button
          onClick={login}
          disabled={isLoggingIn}
          data-ocid="admin.login.primary_button"
          className="w-full h-11 bg-white/8 border border-white/15 text-white/80 font-light tracking-wider text-sm hover:bg-white/12 hover:border-white/25 hover:text-white transition-all duration-300 rounded-lg"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            "Sign in with Internet Identity"
          )}
        </Button>

        {isLoginError && (
          <p
            className="mt-4 text-xs text-red-400/70"
            data-ocid="admin.login.error_state"
          >
            {loginError?.message || "Login failed. Please try again."}
          </p>
        )}

        <p className="mt-8 text-xs text-white/20 font-light">
          Restricted access · Portfolio CMS
        </p>
      </div>
    </div>
  );
}
