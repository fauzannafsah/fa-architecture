"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "@/contexts/ContentContext";
import { useAuth } from "@/contexts/AuthContext";
import EditableText from "./admin/EditableText";
import TestimonialEditModal from "./admin/TestimonialEditModal";
import type { TestimonialItem } from "@/lib/types";

function usePerPage() {
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerPage(3);
      else if (window.innerWidth >= 640) setPerPage(2);
      else setPerPage(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}

export default function Testimonials() {
  const { testimonials } = useContent();
  const { isAdmin } = useAuth();
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next

  const perPage = usePerPage();
  const totalPages = Math.max(1, Math.ceil(testimonials.length / perPage));

  // Reset page if it exceeds bounds after resize or data change
  useEffect(() => {
    if (page >= totalPages) setPage(Math.max(0, totalPages - 1));
  }, [page, totalPages]);

  const currentItems = useMemo(
    () => testimonials.slice(page * perPage, page * perPage + perPage),
    [testimonials, page, perPage]
  );

  const goTo = useCallback(
    (newPage: number) => {
      setDirection(newPage > page ? 1 : -1);
      setPage(newPage);
    },
    [page]
  );

  const prev = () => goTo(Math.max(0, page - 1));
  const next = () => goTo(Math.min(totalPages - 1, page + 1));

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative bg-background py-28 lg:py-36">
      {/* Decorative accent */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <AnimatedSection>
            <EditableText
              contentKey="testimonials.label"
              defaultValue="Testimoni Klien"
              className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              <EditableText
                contentKey="testimonials.heading"
                defaultValue="Apa Kata"
              />{" "}
              <span className="italic text-terracotta">
                <EditableText
                  contentKey="testimonials.heading_accent"
                  defaultValue="Mereka"
                />
              </span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev / Next buttons */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prev}
                disabled={page === 0}
                className="absolute -left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-light-border bg-white text-foreground shadow-md transition-all hover:bg-terracotta hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:-left-5 lg:-left-8"
                aria-label="Sebelumnya"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={page === totalPages - 1}
                className="absolute -right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-light-border bg-white text-foreground shadow-md transition-all hover:bg-terracotta hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:-right-5 lg:-right-8"
                aria-label="Berikutnya"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          {/* Cards container */}
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {currentItems.map((item, i) => (
                  <motion.div
                    key={item.id || i}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-light-border bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                    onClick={() => {
                      if (isAdmin) return;
                      setLightboxImg(item.image_url);
                    }}
                  >
                    {/* Admin edit button */}
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingItem(item as TestimonialItem);
                        }}
                        className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/90 text-white opacity-0 shadow-lg transition-all hover:bg-terracotta group-hover:opacity-100"
                        title="Edit testimoni"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 9.34a2.12 2.12 0 0 0-3-3L8.34 12.42a2 2 0 0 0-.46.82l-.72 2.88a.5.5 0 0 0 .6.6l2.88-.72a2 2 0 0 0 .82-.46Z" />
                        </svg>
                      </button>
                    )}

                    {/* WhatsApp-green top bar */}
                    <div className="flex items-center gap-2 bg-[#075E54] px-4 py-2">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span className="text-xs font-medium text-white/90">WhatsApp</span>
                    </div>

                    {/* Screenshot image — 9:16 ratio */}
                    <div className="aspect-[9/16] overflow-hidden bg-warm-white">
                      <img
                        src={item.image_url}
                        alt={item.client_name || "Testimoni klien"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>

                    {/* Caption (if provided) */}
                    {(item.client_name || item.project_label) && (
                      <div className="border-t border-light-border px-4 py-3">
                        {item.client_name && (
                          <p className="text-sm font-medium text-foreground">
                            {item.client_name}
                          </p>
                        )}
                        {item.project_label && (
                          <p className="mt-0.5 text-xs text-terracotta">
                            {item.project_label}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Click hint for visitors */}
                    {!isAdmin && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
                        <div className="rounded-full bg-white/90 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators + admin add button */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Dots */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === page
                        ? "w-8 bg-terracotta"
                        : "w-2.5 bg-terracotta/20 hover:bg-terracotta/40"
                    }`}
                    aria-label={`Halaman ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Admin add button */}
            {isAdmin && (
              <button
                onClick={() => setAddingNew(true)}
                className="flex items-center gap-1.5 rounded-full border border-dashed border-warm-gray/40 px-4 py-1.5 text-xs font-medium text-warm-gray transition-colors hover:border-terracotta/50 hover:text-terracotta"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Tambah Testimoni
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setLightboxImg(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Full-size image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightboxImg}
              alt="Testimoni"
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      {editingItem && (
        <TestimonialEditModal
          testimonial={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
      {addingNew && (
        <TestimonialEditModal
          testimonial={null}
          isNew
          onClose={() => setAddingNew(false)}
        />
      )}
    </section>
  );
}
