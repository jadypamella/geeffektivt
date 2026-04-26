import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

type Frequency = "monthly" | "once";

type DonationState = {
  amount: number;
  frequency: Frequency;
  drawerOpen: boolean;
  totalGivenLifetime: number; // for gamification
};

type DonationContextType = DonationState & {
  setAmount: (n: number) => void;
  setFrequency: (f: Frequency) => void;
  openDrawer: (preset?: number) => void;
  closeDrawer: () => void;
  recordDonation: (amount: number, frequency: Frequency) => void;
  impact: ReturnType<typeof computeImpact>;
};

const DonationCtx = createContext<DonationContextType | null>(null);

const STORAGE_KEY = "givewise.state.v1";

export function computeImpact(amount: number) {
  // Placeholder cost-effectiveness model (illustrative).
  // ~€5 per mosquito net, each net protects ~2 people, ~€2,500 saves a statistical life.
  const nets = Math.max(0, Math.round(amount / 5));
  const peopleProtected = nets * 2;
  const treatments = Math.round(amount / 1.2); // €1.20 per malaria treatment
  const livesFraction = +(amount / 2500).toFixed(3);
  return { nets, peopleProtected, treatments, livesFraction };
}

export function impactPhrase(amount: number) {
  const { peopleProtected, nets } = computeImpact(amount);
  if (amount >= 100) return `Help save a life: ${peopleProtected} people protected`;
  if (amount >= 50) return `Shield a family: ${peopleProtected} people protected`;
  if (amount >= 25) return `${nets} mosquito nets, protects ${peopleProtected} people`;
  if (amount >= 10) return `${nets} mosquito nets, protects ${peopleProtected} people`;
  return `Every euro counts`;
}

export function DonationProvider({ children }: { children: ReactNode }) {
  const [amount, setAmount] = useState<number>(50);
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [totalGivenLifetime, setTotal] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.totalGivenLifetime === "number") setTotal(p.totalGivenLifetime);
      }
    } catch {}
  }, []);

  const persist = useCallback((next: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ totalGivenLifetime: next }));
    } catch {}
  }, []);

  const openDrawer = useCallback((preset?: number) => {
    if (preset) setAmount(preset);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const recordDonation = useCallback(
    (amt: number, _freq: Frequency) => {
      setTotal((t) => {
        const next = t + amt;
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const value = useMemo<DonationContextType>(
    () => ({
      amount,
      frequency,
      drawerOpen,
      totalGivenLifetime,
      setAmount,
      setFrequency,
      openDrawer,
      closeDrawer,
      recordDonation,
      impact: computeImpact(amount),
    }),
    [amount, frequency, drawerOpen, totalGivenLifetime, openDrawer, closeDrawer, recordDonation]
  );

  return <DonationCtx.Provider value={value}>{children}</DonationCtx.Provider>;
}

export function useDonation() {
  const ctx = useContext(DonationCtx);
  if (!ctx) throw new Error("useDonation must be used within DonationProvider");
  return ctx;
}
