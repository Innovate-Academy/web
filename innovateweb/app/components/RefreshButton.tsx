"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [spinning, setSpinning] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setSpinning(true);
        startTransition(() => {
          router.refresh();
        });
        setTimeout(() => setSpinning(false), 800);
      }}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-brand/30 hover:text-foreground disabled:opacity-60"
    >
      <svg
        className={`h-3.5 w-3.5 ${spinning ? "animate-spin" : ""}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <path d="M21 3v6h-6" />
      </svg>
      Actualizar estado
    </button>
  );
}
