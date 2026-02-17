"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useContent } from "@/contexts/ContentContext";
import { useAuth } from "@/contexts/AuthContext";
import EditableText from "./admin/EditableText";
import PortfolioEditModal from "./admin/PortfolioEditModal";
import type { PortfolioProject } from "@/lib/types";

export default function Portfolio() {
  const { portfolioProjects } = useContent();
  const { isAdmin } = useAuth();
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  return (
    <section id="projects" className="relative bg-warm-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <AnimatedSection>
              <EditableText
                contentKey="portfolio.label"
                defaultValue="Proyek Unggulan"
                className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
                <EditableText
                  contentKey="portfolio.heading"
                  defaultValue="Karya"
                />{" "}
                <span className="italic text-terracotta">
                  <EditableText
                    contentKey="portfolio.heading_accent"
                    defaultValue="Terbaru"
                  />
                </span>{" "}
                <EditableText
                  contentKey="portfolio.heading_suffix"
                  defaultValue="Kami"
                />
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.2}>
            <a
              href="https://www.tiktok.com/@fa.architecture"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-terracotta transition-colors hover:text-terracotta-dark"
            >
              Lihat Semua Proyek
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </AnimatedSection>
        </div>

        {/* Projects Grid - Masonry-like layout */}
        <div className="grid gap-6 md:grid-cols-2">
          {portfolioProjects.map((project, i) => (
            <AnimatedSection
              key={project.id || project.title}
              delay={i * 0.1}
              className={project.size === "large" ? "md:col-span-2" : ""}
            >
              <motion.div
                whileHover="hovered"
                className="group relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => {
                  if (isAdmin) return; // Don't open TikTok in admin mode
                  if (project.tiktok_url) window.open(project.tiktok_url, "_blank");
                }}
              >
                {/* Admin edit button */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProject(project as PortfolioProject);
                    }}
                    className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/90 text-white shadow-lg transition-all hover:bg-terracotta"
                    title="Edit proyek"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 9.34a2.12 2.12 0 0 0-3-3L8.34 12.42a2 2 0 0 0-.46.82l-.72 2.88a.5.5 0 0 0 .6.6l2.88-.72a2 2 0 0 0 .82-.46Z" />
                    </svg>
                  </button>
                )}

                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    project.size === "large"
                      ? "aspect-[21/9]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <motion.div
                    variants={{
                      hovered: { scale: 1.05 },
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${project.image_url}')`,
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Category badge */}
                  <div className="flex justify-end">
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <motion.div
                      variants={{
                        hovered: { y: 0, opacity: 1 },
                      }}
                      initial={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-2 text-xs font-medium uppercase tracking-wider text-terracotta-light"
                    >
                      {project.year}
                    </motion.div>
                    <h3 className="font-serif text-2xl text-white sm:text-3xl">
                      {project.title}
                    </h3>
                    <motion.div
                      variants={{
                        hovered: { width: "3rem" },
                      }}
                      initial={{ width: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mt-3 h-0.5 bg-terracotta"
                    />
                    {/* TikTok indicator */}
                    {project.tiktok_url && (
                      <motion.div
                        variants={{
                          hovered: { opacity: 1, y: 0 },
                        }}
                        initial={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="mt-4 inline-flex items-center gap-2 text-white/70"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.16z" />
                        </svg>
                        <span className="text-xs font-medium uppercase tracking-wider">Tonton Video</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}

          {/* Add new project button (admin only) */}
          {isAdmin && (
            <AnimatedSection delay={portfolioProjects.length * 0.1}>
              <button
                onClick={() => setAddingNew(true)}
                className="flex min-h-[200px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-warm-gray/30 text-warm-gray transition-colors hover:border-terracotta/50 hover:text-terracotta"
              >
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="mt-2 block text-sm">Tambah Proyek</span>
                </div>
              </button>
            </AnimatedSection>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <PortfolioEditModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
        />
      )}
      {addingNew && (
        <PortfolioEditModal
          project={null}
          isNew
          onClose={() => setAddingNew(false)}
        />
      )}
    </section>
  );
}
