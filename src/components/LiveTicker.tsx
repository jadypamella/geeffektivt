import { useEffect, useState } from "react";

const SAMPLES = [
  "Maria from Stockholm just helped 6 people",
  "Lukas from Berlin protected a family",
  "+1 donation • Sofia from Oslo",
  "Aarav from Copenhagen funded 12 nets",
  "Emma from Helsinki started giving monthly",
  "+1 donation • Noah from Amsterdam",
  "Fatima from Malmö protected 4 people",
  "+1 donation • Anders from Aarhus",
];

export function LiveTicker() {
  const doubled = [...SAMPLES, ...SAMPLES];
  return (
    <div className="overflow-hidden border-y border-border bg-warm py-2.5">
      <div className="flex animate-ticker gap-10 whitespace-nowrap text-sm text-muted-foreground">
        {doubled.map((s, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
