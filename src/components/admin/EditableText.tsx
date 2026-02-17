"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useContent } from "@/contexts/ContentContext";
import { useAuth } from "@/contexts/AuthContext";

interface EditableTextProps {
  contentKey: string;
  defaultValue: string;
  as?: React.ElementType;
  className?: string;
  multiline?: boolean;
}

export default function EditableText({
  contentKey,
  defaultValue,
  as: Tag = "span",
  className = "",
  multiline = false,
}: EditableTextProps) {
  const { get, update } = useContent();
  const { isAdmin } = useAuth();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const displayValue = get(contentKey, defaultValue);

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

  // Focus input when editing starts
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // Not admin → render normally
  if (!isAdmin) {
    return <Tag className={className}>{displayValue}</Tag>;
  }

  const startEditing = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setValue(displayValue);
    // Calculate position relative to viewport for portal
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopoverPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
    setEditing(true);
  };

  const save = async () => {
    setSaving(true);
    await update(contentKey, value);
    setSaving(false);
    setEditing(false);
  };

  const cancel = () => {
    setEditing(false);
  };

  const isBlockTag = ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "section", "article", "li"].includes(
    typeof Tag === "string" ? Tag : ""
  );

  return (
    <>
      <Tag ref={triggerRef} className={`group/editable relative ${isBlockTag ? "" : "inline"} ${className}`}>
        {displayValue}

        {/* Wrench button */}
        <button
          onClick={startEditing}
          className="ml-1 inline-flex h-5 w-5 translate-y-[-1px] items-center justify-center rounded bg-terracotta/90 text-white opacity-0 shadow-sm transition-all hover:bg-terracotta group-hover/editable:opacity-100"
          title={`Edit: ${contentKey}`}
        >
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
              d="M11.42 15.17 17.25 9.34a2.12 2.12 0 0 0-3-3L8.34 12.42a2 2 0 0 0-.46.82l-.72 2.88a.5.5 0 0 0 .6.6l2.88-.72a2 2 0 0 0 .82-.46ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </Tag>

      {/* Edit popover — rendered via portal to avoid invalid DOM nesting (e.g. <div> inside <p>) */}
      {editing &&
        createPortal(
          <div
            ref={popoverRef}
            style={{ position: "absolute", top: popoverPos.top, left: popoverPos.left }}
            className="z-[9999] min-w-[300px] rounded-xl border border-light-border bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <label className="mb-2 block text-xs font-medium text-warm-gray">
              {contentKey}
            </label>
            {multiline ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-light-border bg-warm-white p-3 text-sm text-foreground focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
                className="w-full rounded-lg border border-light-border bg-warm-white p-3 text-sm text-foreground focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"
              />
            )}
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                onClick={cancel}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-warm-gray hover:bg-warm-white"
              >
                Batal
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-terracotta px-4 py-1.5 text-xs font-medium text-white hover:bg-terracotta-dark disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
