"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    title: "Peternakan Sapi Riverside",
    category: "Peternakan",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    size: "large",
    tiktok: "https://www.tiktok.com/@fa.architecture/video/1",
  },
  {
    title: "Rumah Modern Hillcrest",
    category: "Perumahan",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    size: "small",
    tiktok: "https://www.tiktok.com/@fa.architecture/video/2",
  },
  {
    title: "Kompleks Unggas Oakfield",
    category: "Peternakan",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
    size: "small",
    tiktok: "https://www.tiktok.com/@fa.architecture/video/3",
  },
  {
    title: "Residensi The Meadow",
    category: "Perumahan",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    size: "large",
    tiktok: "https://www.tiktok.com/@fa.architecture/video/4",
  },
  {
    title: "Pusat Equestrian Greenfield",
    category: "Peternakan",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
    size: "small",
    tiktok: "https://www.tiktok.com/@fa.architecture/video/5",
  },
  {
    title: "Peternakan Cedar Valley",
    category: "Fungsi Campuran",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    size: "small",
    tiktok: "https://www.tiktok.com/@fa.architecture/video/6",
  },
];

export default function Portfolio() {
  return (
    <section id="projects" className="relative bg-warm-white py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <AnimatedSection>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
                Proyek Unggulan
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Karya{" "}
                <span className="italic text-terracotta">Terbaru</span> Kami
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.2}>
            <a
              href="#"
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
          {projects.map((project, i) => (
            <AnimatedSection
              key={project.title}
              delay={i * 0.1}
              className={project.size === "large" ? "md:col-span-2" : ""}
            >
              <motion.div
                whileHover="hovered"
                className="group relative cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => window.open(project.tiktok, "_blank")}
              >
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
                      backgroundImage: `url('${project.image}')`,
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
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
