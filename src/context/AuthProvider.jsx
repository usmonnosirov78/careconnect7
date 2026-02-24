import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext.js";

const SESSION_KEY = "careconnect_auth";
const USERS_KEY = "careconnect_users";

const SEED_USERS = [{ username: "admin", password: "admin123", role: "admin" }];

const normalizeUzbPhone = (value) => {
  const raw = String(value || "").trim();
  const keepPlusAndDigits = raw.replace(/[^\d+]/g, "");
  const withPlus = keepPlusAndDigits.startsWith("+")
    ? keepPlusAndDigits
    : keepPlusAndDigits
    ? `+${keepPlusAndDigits}`
    : "";
  const compact = withPlus.replace(/\s+/g, "").replace(/-/g, "");
  if (compact && !compact.startsWith("+") && compact.startsWith("998")) return `+${compact}`;
  return compact;
};

const isValidUzbPhone = (value) => /^\+998\d{9}$/.test(normalizeUzbPhone(value));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const [users, setUsers] = useState(() => {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const allUsers = useMemo(() => [...SEED_USERS, ...users], [users]);

  const getUserByUsername = (username) => {
    const u = String(username || "").trim();
    if (!u) return null;
    return allUsers.find((x) => x.username === u) || null;
  };

  const login = (username, password) => {
    const u = String(username || "").trim();
    const found = allUsers.find((x) => x.username === u && x.password === password);
    if (!found) return false;

    setUser({
      username: found.username,
      role: found.role,
      phone: found.phone || "",
    });

    return true;
  };

  const logout = () => setUser(null);

  const registerAccount = ({ username, password, role, phone }) => {
    const u = String(username || "").trim();

    if (!u) return { ok: false, error: "Username is required." };
    if (!password) return { ok: false, error: "Password is required." };
    if (role !== "client" && role !== "provider") return { ok: false, error: "Invalid role." };

    const exists = allUsers.some((x) => x.username === u);
    if (exists) return { ok: false, error: "Username already exists." };

    let safePhone = "";

    if (role === "client") {
      const p = normalizeUzbPhone(phone);
      if (!p) return { ok: false, error: "Phone is required." };
      if (!isValidUzbPhone(p)) return { ok: false, error: "Enter a valid Uzbekistan phone: +998XXXXXXXXX" };
      safePhone = p;
    }

    const newUser =
      role === "client"
        ? { username: u, password, role, phone: safePhone }
        : { username: u, password, role };

    setUsers((prev) => [...prev, newUser]);
    setUser({ username: u, role, phone: safePhone });

    return { ok: true };
  };

  const registerClientAccount = ({ username, password, phone }) =>
    registerAccount({ username, password, role: "client", phone });

  const registerProviderAccount = ({ username, password }) =>
    registerAccount({ username, password, role: "provider" });

  const updateClientPhone = (phone) => {
    if (!user || user.role !== "client") return { ok: false, error: "Only clients can update phone." };

    const p = normalizeUzbPhone(phone);
    if (!p) return { ok: false, error: "Phone is required." };
    if (!isValidUzbPhone(p)) return { ok: false, error: "Enter a valid Uzbekistan phone: +998XXXXXXXXX" };

    setUsers((prev) => prev.map((x) => (x.username === user.username ? { ...x, phone: p } : x)));
    setUser((prev) => ({ ...prev, phone: p }));

    return { ok: true };
  };

  // Admin: list accounts (client/provider only)
  const adminListAccounts = () => {
    if (user?.role !== "admin") return [];
    return (users || []).map((u) => ({
      username: u.username,
      role: u.role,
      phone: u.phone || "",
    }));
  };

  // Admin: reset password -> returns temporary password
  const adminResetPassword = (username) => {
    if (user?.role !== "admin") return { ok: false, error: "Forbidden." };

    const u = String(username || "").trim();
    if (!u) return { ok: false, error: "Username is required." };
    if (u === "admin") return { ok: false, error: "Admin password cannot be reset here." };

    const exists = (users || []).some((x) => x.username === u);
    if (!exists) return { ok: false, error: "User not found." };

    const tempPassword = `cc-${Math.random().toString(36).slice(2, 8)}-${Math.floor(
      100 + Math.random() * 900
    )}`;

    setUsers((prev) => prev.map((x) => (x.username === u ? { ...x, password: tempPassword } : x)));

    return { ok: true, tempPassword };
  };

  // Admin: delete account
  const adminDeleteAccount = (username) => {
    if (user?.role !== "admin") return { ok: false, error: "Forbidden." };

    const u = String(username || "").trim();
    if (!u) return { ok: false, error: "Username is required." };
    if (u === "admin") return { ok: false, error: "Admin cannot be deleted." };

    const exists = (users || []).some((x) => x.username === u);
    if (!exists) return { ok: false, error: "User not found." };

    setUsers((prev) => prev.filter((x) => x.username !== u));

    return { ok: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registerClientAccount,
        registerProviderAccount,
        updateClientPhone,
        getUserByUsername,

        adminListAccounts,
        adminResetPassword,
        adminDeleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};