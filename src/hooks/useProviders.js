import { useContext } from "react";
import { ProviderContext } from "../context/providerContext.js";

export const useProviders = () => {
  const ctx = useContext(ProviderContext);
  if (!ctx) throw new Error("useProviders must be used within ProviderProvider");
  return ctx;
};