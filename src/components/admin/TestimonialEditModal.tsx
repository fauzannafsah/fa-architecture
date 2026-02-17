"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/contexts/ContentContext";
import type { TestimonialItem } from "@/lib/types";

interface TestimonialEditModalProps {
  testimonial: TestimonialItem | null;
  isNew?: boolean;
  onClose: () => void;
}

export default function TestimonialEditModal({
  testimonial,
  isNew = false,
  onClose,
}: TestimonialEditModalProps) {
  const { updateTestimonial, addTestimonial, deleteTestimonial, uploadImage } =
    useContent();

  const [form, setForm] = useState({
    image_url: "",
    client_name: "",
    project_label: "",
    sort_order: 0,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (testimonial && !isNew) {
      setForm({
        image_url: testimonial.image_url,
        client_name: testimonial.client_name || "",
        project_label: testimonial.project_label || "",
        sort_order: testimonial.sort_order,
      });
    }
  }, [testimonial, isNew]);

  const handleSave = async () => {
    if (!form.image_url.trim()) return;
    setSaving(true);
    if (isNew) {
      await addTestimonial(form);
    } else if (testimonial) {
      await updateTestimonial(testimonial.id, form);
    }
    setSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!testimonial || isNew) return;
    if (confirm("Hapus testimoni ini?")) {
      await deleteTestimonial(testimonial.id);
      onClose();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (url) setForm((prev) => ({ ...prev, image_url: url }));
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className="mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-serif text-xl text-foreground">
            {isNew ? "Tambah Testimoni" : "Edit Testimoni"}
          </h3>
          <button
            onClick={onClose}
            className="text-warm-gray hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Image preview */}
          {form.image_url && (
            <div className="flex justify-center">
              <div className="relative w-32 overflow-hidden rounded-xl border border-light-border bg-warm-white">
                <div className="aspect-[9/16]">
                  <img
                    src={form.image_url}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Image URL + upload */}
          <div>
            <label className="mb-1 block text-xs font-medium text-warm-gray">
              Screenshot WhatsApp (rasio 9:16)
            </label>
            <div className="flex gap-2">
              <input
                value={form.image_url}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image_url: e.target.value }))
                }
                placeholder="URL gambar..."
                className="flex-1 rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
              />
              <label className="flex cursor-pointer items-center rounded-lg border border-light-border px-3 text-xs font-medium text-warm-gray hover:bg-warm-white">
                {uploading ? "..." : "Upload"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Client name */}
          <div>
            <label className="mb-1 block text-xs font-medium text-warm-gray">
              Nama Klien (opsional)
            </label>
            <input
              value={form.client_name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, client_name: e.target.value }))
              }
              placeholder="Contoh: Pak Budi"
              className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>

          {/* Project label */}
          <div>
            <label className="mb-1 block text-xs font-medium text-warm-gray">
              Label Proyek (opsional)
            </label>
            <input
              value={form.project_label}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, project_label: e.target.value }))
              }
              placeholder="Contoh: Kandang Ayam"
              className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>

          {/* Sort order */}
          <div>
            <label className="mb-1 block text-xs font-medium text-warm-gray">
              Urutan
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sort_order: parseInt(e.target.value) || 0,
                }))
              }
              className="w-24 rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          {!isNew ? (
            <button
              onClick={handleDelete}
              className="text-xs font-medium text-red-500 hover:text-red-700"
            >
              Hapus Testimoni
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-warm-gray hover:bg-warm-white"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.image_url.trim()}
              className="rounded-lg bg-terracotta px-6 py-2 text-xs font-medium text-white hover:bg-terracotta-dark disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
