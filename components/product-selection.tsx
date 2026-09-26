"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Swatch } from "@/lib/types";

type SelectionValue = {
  options: Swatch[];
  color: string;
  setColor: (name: string) => void;
  active: number;
  setActive: (index: number) => void;
  selected: Swatch;
};

const SelectionContext = createContext<SelectionValue | null>(null);

export function ProductSelection({
  options,
  children,
}: {
  options: Swatch[];
  children: ReactNode;
}) {
  const [color, setColorState] = useState(options[0]?.name ?? "");
  const [active, setActive] = useState(0);

  const setColor = useCallback((name: string) => {
    setColorState(name);
    setActive(0);
  }, []);

  const value = useMemo<SelectionValue | null>(() => {
    const selected = options.find((option) => option.name === color) ?? options[0];
    if (!selected) return null;
    return { options, color, setColor, active, setActive, selected };
  }, [active, color, options, setColor]);

  if (!value) return children;

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useProductSelection() {
  const value = useContext(SelectionContext);
  if (!value) {
    throw new Error("useProductSelection must be used within ProductSelection");
  }
  return value;
}
