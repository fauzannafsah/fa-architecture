"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { ContentProvider } from "@/contexts/ContentContext";
import AdminBar from "@/components/admin/AdminBar";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ContentProvider>
        <AdminBar />
        {children}
      </ContentProvider>
    </AuthProvider>
  );
}
