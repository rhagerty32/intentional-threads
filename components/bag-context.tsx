"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "intentional-threads-bag";
const CHANGE_EVENT = "intentional-threads-bag-change";

export type BagLine = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  color: string;
  size: string | null;
  quantity: number;
};

type AddInput = Omit<BagLine, "id" | "quantity"> & { quantity?: number };

type BagContextValue = {
  lines: BagLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  addItem: (item: AddInput) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
};

const BagContext = createContext<BagContextValue | null>(null);
const emptyLines: BagLine[] = [];

let cachedRaw = "";
let cachedLines: BagLine[] = emptyLines;

function parseLines(raw: string): BagLine[] {
  try {
    const parsed = JSON.parse(raw) as BagLine[];
    if (!Array.isArray(parsed)) return emptyLines;
    return parsed.filter(
      (line) =>
        line &&
        typeof line.id === "string" &&
        typeof line.slug === "string" &&
        typeof line.name === "string" &&
        typeof line.price === "number" &&
        typeof line.quantity === "number",
    );
  } catch {
    return emptyLines;
  }
}

function readRaw() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribe(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot() {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedLines = parseLines(raw);
  }
  return cachedLines;
}

function getServerSnapshot() {
  return emptyLines;
}

function commit(next: BagLine[]) {
  const raw = JSON.stringify(next);
  cachedRaw = raw;
  cachedLines = next;
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    /* Private browsing can block storage. The bag still works for this visit. */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function BagProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<BagContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);

    return {
      lines,
      count,
      subtotal,
      isOpen,
      openBag: () => setIsOpen(true),
      closeBag: () => setIsOpen(false),
      addItem: (input) => {
        const quantity = Math.min(10, input.quantity ?? 1);
        const id = `${input.slug}::${input.color}::${input.size ?? ""}`;
        const current = getSnapshot();
        const existing = current.find((line) => line.id === id);
        const next = existing
          ? current.map((line) =>
              line.id === id
                ? { ...line, quantity: Math.min(10, line.quantity + quantity) }
                : line,
            )
          : [...current, { ...input, id, quantity }];
        commit(next);
        setIsOpen(true);
      },
      setQuantity: (id, quantity) => {
        const current = getSnapshot();
        const next =
          quantity <= 0
            ? current.filter((line) => line.id !== id)
            : current.map((line) =>
                line.id === id ? { ...line, quantity: Math.min(10, quantity) } : line,
              );
        commit(next);
      },
      remove: (id) => {
        commit(getSnapshot().filter((line) => line.id !== id));
      },
    };
  }, [isOpen, lines]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const value = useContext(BagContext);
  if (!value) {
    throw new Error("useBag must be used within BagProvider");
  }
  return value;
}
