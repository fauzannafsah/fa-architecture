"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const { login, isAdmin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAdmin) {
      router.push("/");
    }
  }, [isAdmin, router]);

  if (isAdmin) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            <span className="font-serif text-3xl font-bold text-foreground">
              FA
            </span>
            <span className="text-xs font-light uppercase tracking-[0.3em] text-warm-gray">
              Architecture
            </span>
          </div>
          <h1 className="font-serif text-2xl text-foreground">Admin Login</h1>
          <p className="mt-2 text-sm text-warm-gray">
            Masuk untuk mengedit konten website
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-light-border bg-white p-8 shadow-sm"
        >
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium text-warm-gray"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-light-border bg-warm-white p-3 text-sm text-foreground transition-colors focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                placeholder="admin@fa-architecture.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-medium text-warm-gray"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-light-border bg-warm-white p-3 text-sm text-foreground transition-colors focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-terracotta py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-terracotta-dark disabled:opacity-50"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-warm-gray">
          <a
            href="/"
            className="text-terracotta transition-colors hover:text-terracotta-dark"
          >
            &larr; Kembali ke Beranda
          </a>
        </p>
      </motion.div>
    </div>
  );
}
