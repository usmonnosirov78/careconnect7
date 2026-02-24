import { useEffect, useState } from "react";
import { ProviderContext } from "./providerContext.js";
import { providers as initialProviders } from "../services/providersDB.js";

const STORAGE_KEY = "careconnect_providers";

export const ProviderProvider = ({ children }) => {
  const [list, setList] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialProviders;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  const getProviderByUsername = (username) => {
    if (!username) return null;
    return list.find((p) => p.username === username) || null;
  };

  const upsertProviderProfile = ({ username, companyName, location, phone, services }) => {
    setList((prev) => {
      const idx = prev.findIndex((p) => p.username === username);

      if (idx === -1) {
        return [
          ...prev,
          {
            id: Date.now(),
            username,
            companyName,
            location,
            phone,
            services,
            verified: false,
            createdAt: new Date().toISOString(),
          },
        ];
      }

      const next = [...prev];
      next[idx] = {
        ...next[idx],
        companyName,
        location,
        phone,
        services,
      };
      return next;
    });
  };

  const setProviderVerified = (id, verified) => {
    setList((prev) => prev.map((p) => (p.id === id ? { ...p, verified } : p)));
  };

  return (
    <ProviderContext.Provider
      value={{
        list,
        getProviderByUsername,
        upsertProviderProfile,
        setProviderVerified,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};