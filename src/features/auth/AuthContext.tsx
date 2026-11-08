import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { LoginInput, PublicUser, SignupInput } from "../../../shared/auth";
import { api, ApiRequestError } from "../../lib/api";

interface AuthState {
  /** undefined while we're still checking whether there's a session. */
  user: PublicUser | null | undefined;
  login(input: LoginInput): Promise<PublicUser>;
  signup(input: SignupInput): Promise<PublicUser>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    api<{ user: PublicUser }>("/auth/me")
      .then((res) => !cancelled && setUser(res.user))
      .catch((err) => {
        if (cancelled) return;
        if (!(err instanceof ApiRequestError && err.status === 401)) console.warn("Couldn't check session:", err);
        setUser(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const res = await api<{ user: PublicUser }>("/auth/login", { body: input });
    setUser(res.user);
    return res.user;
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    const res = await api<{ user: PublicUser }>("/auth/signup", { body: input });
    setUser(res.user);
    return res.user;
  }, []);

  const logout = useCallback(async () => {
    await api("/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, signup, logout }), [user, login, signup, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
