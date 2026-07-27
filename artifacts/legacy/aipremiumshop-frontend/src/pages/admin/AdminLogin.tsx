import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAdminLogin, useAdminMe, getAdminMeQueryKey } from "@workspace/api-client-react";

export default function AdminLogin() {
  useEffect(() => {
    document.title = "Admin Login — AIPS";
  }, []);
  const [, setLocation] = useLocation();
  const me = useAdminMe({ query: { retry: false, queryKey: getAdminMeQueryKey() } });

  useEffect(() => {
    if (me.data) setLocation("/admin");
  }, [me.data, setLocation]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const login = useAdminLogin({
    mutation: {
      onSuccess: () => setLocation("/admin"),
      onError: () => setError("Invalid email or password"),
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0a0e27", color: "#fff" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          login.mutate({ data: { email, password } });
        }}
        className="w-full max-w-sm rounded-2xl border border-white/10 p-8"
        style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
        data-testid="admin-login-form"
      >
        <h1 className="text-2xl font-bold mb-1">Admin Login</h1>
        <p className="text-sm text-white/60 mb-6">Sign in to manage AIPS</p>

        <label className="block mb-3">
          <span className="block text-xs mb-1 text-white/70">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15" data-testid="admin-email" />
        </label>
        <label className="block mb-5">
          <span className="block text-xs mb-1 text-white/70">Password</span>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15" data-testid="admin-password" />
        </label>

        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

        <button type="submit" disabled={login.isPending} className="w-full py-2.5 rounded-lg font-bold disabled:opacity-60" style={{ backgroundColor: "#f4b942", color: "#0a0e27" }} data-testid="admin-login-submit">
          {login.isPending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
