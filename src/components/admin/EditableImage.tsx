"use client";

import { useState, useRef, useEffect } from "react";
import { useContent } from "@/contexts/ContentContext";
import { useAuth } from "@/contexts/AuthContext";

interface EditableImageProps {
  contentKey: string;
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

export default function EditableImage({
  contentKey,
  defaultValue,
  className = "",
  children,
}: EditableImageProps) {
  const { get, update, uploadImage } = useContent();
  const { isAdmin } = useAuth();
  const [editing, setEditing] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUrl = get(contentKey, defaultValue);

  // Close on click outside
  useEffect(() => {
    if (!editing) return;
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setEditing(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [editing]);

  if (!isAdmin) {
    return <>{children}</>;
  }

  const startEditing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUrlInput(currentUrl);
    setEditing(true);
  };

  const saveUrl = async () => {
    if (urlInput.trim()) {
      await update(contentKey, urlInput.trim());
    }
    setEditing(false);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const publicUrl = await uploadImage(file);
    if (publicUrl) {
      await update(contentKey, publicUrl);
      setUrlInput(publicUrl);
    }
    setUploading(false);
    setEditing(false);
  };

  return (
    <div className={`group/img ${className}`}>
      {children}

      {/* Wrench overlay */}
      <button
        onClick={startEditing}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/90 text-white opacity-0 shadow-lg transition-all hover:bg-terracotta group-hover/img:opacity-100"
        title={`Edit gambar: ${contentKey}`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0 0 21.75 19.5V4.5A1.5 1.5 0 0 0 20.25 3H3.75A1.5 1.5 0 0 0 2.25 4.5v15A1.5 1.5 0 0 0 3.75 21Z"
          />
        </svg>
      </button>

      {/* Edit popover */}
      {editing && (
        <div
          ref={popoverRef}
          className="absolute right-0 top-14 z-[9999] w-[320px] rounded-xl border border-light-border bg-white p-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <label className="mb-2 block text-xs font-medium text-warm-gray">
            Ganti Gambar
          </label>

          {/* URL input */}
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveUrl()}
            placeholder="Masukkan URL gambar..."
            className="w-full rounded-lg border border-light-border bg-warm-white p-3 text-xs text-foreground focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
          />

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={saveUrl}
              className="flex-1 rounded-lg bg-terracotta px-3 py-2 text-xs font-medium text-white hover:bg-terracotta-dark"
            >
              Simpan URL
            </button>
            <span className="text-xs text-warm-gray">atau</span>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1 rounded-lg border border-light-border px-3 py-2 text-xs font-medium text-foreground hover:bg-warm-white disabled:opacity-50"
            >
              {uploading ? "Mengunggah..." : "Upload File"}
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

          <button
            onClick={() => setEditing(false)}
            className="mt-2 w-full rounded-lg px-3 py-1.5 text-xs text-warm-gray hover:bg-warm-white"
          >
            Batal
          </button>
        </div>
      )}
    </div>
  );
}
