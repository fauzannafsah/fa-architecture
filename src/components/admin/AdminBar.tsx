"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminBar() {
  const { isAdmin, user, logout } = useAuth();
  const router = useRouter();
  const [showHint, setShowHint] = useState(true);

  if (!isAdmin) return null;

  return (
    <>
    {/* Spacer to push page content below the fixed bar */}
    <div className="h-10" />
    <div className="fixed left-0 right-0 top-0 z-[9999] flex h-10 items-center justify-between bg-foreground/95 px-4 py-2 text-xs text-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-full bg-terracotta/20 px-3 py-1 text-terracotta-light">
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17 17.25 9.34a2.12 2.12 0 0 0-3-3L8.34 12.42a2 2 0 0 0-.46.82l-.72 2.88a.5.5 0 0 0 .6.6l2.88-.72a2 2 0 0 0 .82-.46Z"
            />
          </svg>
          Mode Admin
        </span>
        <span className="hidden text-white/40 sm:inline">
          {user?.email}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {showHint && (
          <span className="hidden items-center gap-1 text-white/40 sm:flex">
            Hover konten untuk edit
            <button
              onClick={() => setShowHint(false)}
              className="ml-1 text-white/30 hover:text-white/60"
            >
              &times;
            </button>
          </span>
        )}
        <button
          onClick={async () => {
            await logout();
            router.push("/");
          }}
          className="rounded-lg border border-white/10 px-3 py-1 text-white/60 transition-colors hover:border-white/30 hover:text-white"
        >
          Keluar
        </button>
      </div>
    </div>
    </>
  );
}
