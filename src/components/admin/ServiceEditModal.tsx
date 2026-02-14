"use client";

import { useState, useEffect } from "react";
import { useContent } from "@/contexts/ContentContext";
import type { ServiceItem } from "@/lib/types";

interface ServiceEditModalProps {
  service: ServiceItem | null;
  isNew?: boolean;
  onClose: () => void;
}

export default function ServiceEditModal({
  service,
  isNew = false,
  onClose,
}: ServiceEditModalProps) {
  const { updateService, addService, deleteService, uploadImage } =
    useContent();

  const [form, setForm] = useState({
    number: "",
    title: "",
    description: "",
    features: [] as string[],
    image_url: "",
    wa_message: "",
    sort_order: 0,
  });
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (service && !isNew) {
      setForm({
        number: service.number,
        title: service.title,
        description: service.description,
        features: service.features || [],
        image_url: service.image_url,
        wa_message: service.wa_message || "",
        sort_order: service.sort_order,
      });
      setFeaturesText((service.features || []).join(", "));
    }
  }, [service, isNew]);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      features: featuresText
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };
    if (isNew) {
      await addService(data);
    } else if (service) {
      await updateService(service.id, data);
    }
    setSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!service || isNew) return;
    if (confirm("Hapus layanan ini?")) {
      await deleteService(service.id);
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
        className="mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-serif text-xl text-foreground">
            {isNew ? "Tambah Layanan" : "Edit Layanan"}
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
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-warm-gray">
                Nomor
              </label>
              <input
                value={form.number}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, number: e.target.value }))
                }
                placeholder="01"
                className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
              />
            </div>
            <div className="col-span-3">
              <label className="mb-1 block text-xs font-medium text-warm-gray">
                Judul
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-warm-gray">
              Deskripsi
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={3}
              className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-warm-gray">
              Fitur (pisahkan dengan koma)
            </label>
            <input
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Fitur 1, Fitur 2, Fitur 3"
              className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-warm-gray">
              URL Gambar
            </label>
            <div className="flex gap-2">
              <input
                value={form.image_url}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image_url: e.target.value }))
                }
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

          <div>
            <label className="mb-1 block text-xs font-medium text-warm-gray">
              Pesan WhatsApp
            </label>
            <textarea
              value={form.wa_message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, wa_message: e.target.value }))
              }
              rows={2}
              className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>

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
              className="w-full rounded-lg border border-light-border p-3 text-sm focus:border-terracotta focus:outline-none"
            />
          </div>
        </div>

        {/* Preview */}
        {form.image_url && (
          <div className="mt-4 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={form.image_url}
              alt="Preview"
              className="h-32 w-full object-cover"
            />
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          {!isNew && (
            <button
              onClick={handleDelete}
              className="rounded-lg px-4 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
            >
              Hapus
            </button>
          )}
          <div className="ml-auto flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-warm-gray hover:bg-warm-white"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.title}
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
