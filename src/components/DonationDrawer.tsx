import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useDonation, computeImpact, impactPhrase } from "@/lib/donation";
import { Apple, CreditCard, Heart, Shield, Sparkles, Users } from "lucide-react";

const PRESETS = [10, 25, 50, 100];

export function DonationDrawer() {
  const { drawerOpen, closeDrawer, amount, setAmount, frequency, setFrequency, recordDonation } = useDonation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const impact = computeImpact(amount);

  const reset = () => {
    setStep(1);
    setCustom("");
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      closeDrawer();
      setTimeout(reset, 300);
    }
  };

  const goToPay = () => setStep(2);

  const finalize = async () => {
    setStep(3);
    await new Promise((r) => setTimeout(r, 1500));
    recordDonation(amount, frequency);
    closeDrawer();
    setTimeout(() => {
      reset();
      navigate({
        to: "/thank-you",
        search: { amount, freq: frequency },
      });
    }, 250);
  };

  return (
    <Sheet open={drawerOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto p-0 sm:max-w-md"
      >
        <div className="bg-cta-grad px-6 py-5 text-primary-foreground">
          <SheetHeader className="space-y-1">
            <SheetTitle className="font-display text-2xl text-primary-foreground">
              {step === 3 ? "Confirming…" : step === 2 ? "Almost there" : "Protect a family"}
            </SheetTitle>
            <SheetDescription className="text-primary-foreground/85">
              {step === 1 && "Your gift is matched to evidence-based programs."}
              {step === 2 && "Choose how you'd like to pay. No fees, no fluff."}
              {step === 3 && "Locking in your impact."}
            </SheetDescription>
          </SheetHeader>
        </div>

        {step === 1 && (
          <div className="space-y-6 px-6 py-6">
            <div className="flex rounded-full bg-muted p-1">
              {(["monthly", "once"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                    frequency === f
                      ? "bg-background text-foreground shadow-soft"
                      : "text-muted-foreground"
                  }`}
                >
                  {f === "monthly" ? "Monthly" : "One-time"}
                </button>
              ))}
            </div>
            {frequency === "monthly" && (
              <p className="-mt-3 flex items-center gap-1.5 text-xs text-success">
                <Sparkles className="h-3.5 w-3.5" /> Monthly gifts have 12× the impact over a year
              </p>
            )}

            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setAmount(p);
                    setCustom("");
                  }}
                  className={`rounded-xl border-2 p-4 text-left transition ${
                    amount === p && !custom
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="font-display text-2xl font-semibold">€{p}</div>
                  <div className="text-xs text-muted-foreground">{impactPhrase(p)}</div>
                </button>
              ))}
            </div>

            <div>
              <Label htmlFor="custom" className="text-xs text-muted-foreground">
                Or enter a custom amount
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <Input
                  id="custom"
                  inputMode="numeric"
                  value={custom}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "");
                    setCustom(v);
                    if (v) setAmount(Math.max(1, parseInt(v, 10)));
                  }}
                  placeholder="Custom"
                  className="pl-7"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-warm p-4">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Your impact</div>
              <div className="mt-1 font-display text-xl text-foreground">
                Protects {impact.peopleProtected} {impact.peopleProtected === 1 ? "person" : "people"}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                ≈ {impact.nets} mosquito nets · {impact.treatments} treatments
              </div>
            </div>

            <Button
              onClick={goToPay}
              size="lg"
              className="w-full rounded-full bg-cta-grad text-primary-foreground shadow-glow"
            >
              <Heart className="mr-2 h-4 w-4" /> Continue — €{amount}{frequency === "monthly" ? " / month" : ""}
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" /> Secure · cancel anytime · 100% to charity
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 px-6 py-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground py-3.5 text-background hover:opacity-90"
              onClick={finalize}
            >
              <Apple className="h-5 w-5" /> Pay
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-border bg-background py-3.5 font-medium hover:border-primary/40"
              onClick={finalize}
            >
              <span className="text-sm">G</span> Pay
            </button>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or pay by card <span className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for your receipt"
              />
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Card number" className="pl-9" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM / YY" />
                <Input placeholder="CVC" />
              </div>
            </div>
            <Button
              onClick={finalize}
              size="lg"
              className="w-full rounded-full bg-cta-grad text-primary-foreground shadow-glow"
            >
              Confirm — €{amount}{frequency === "monthly" ? " / month" : ""}
            </Button>
            <button
              onClick={() => setStep(1)}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              ← Back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full pulse-ring" />
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cta-grad text-primary-foreground">
                <Users className="h-7 w-7" />
              </div>
            </div>
            <div className="font-display text-2xl">You're about to protect</div>
            <div className="font-display text-5xl font-semibold text-primary">
              {impact.peopleProtected} people
            </div>
            <p className="text-sm text-muted-foreground">Locking in your impact…</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
