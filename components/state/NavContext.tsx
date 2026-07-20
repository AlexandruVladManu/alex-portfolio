"use client";

import { createContext, useContext, useState } from "react";

export type NavContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <NavContext.Provider value={{ open, setOpen }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);

  if (!ctx) {
    throw new Error("useNav must be used inside <NavProvider>");
  }

  return ctx;
}
