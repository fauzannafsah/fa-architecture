"use client";

import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const stats = [
  { number: "150+", label: "Proyek Selesai" },
  { number: "12", label: "Tahun Pengalaman" },
  { number: "98%", label: "Kepuasan Klien" },
  { number: "35+", label: "Penghargaan" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-background py-28 lg:py-36">
      {/* Decorative accent */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <AnimatedSection>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta">
                Tentang Kami
              </span>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Membangun Masa Depan,{" "}
                <span className="text-terracotta">Berakar pada Tujuan</span>
              </h2>
            </AnimatedSection>
          </div>

          <div className="flex flex-col justify-end">
            <AnimatedSection delay={0.2}>
              <p className="text-lg leading-relaxed text-warm-gray">
                Di FA Architecture, kami percaya desain hebat lahir dari
                pemahaman hubungan unik antara manusia, hewan, dan tanah yang
                mereka tempati bersama. Keahlian ganda kami dalam fasilitas
                peternakan dan hunian memungkinkan kami menciptakan ruang
                yang fungsional sekaligus indah.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <p className="mt-6 text-lg leading-relaxed text-warm-gray">
                Dari kandang modern yang dirancang untuk kesejahteraan hewan
                hingga rumah kontemporer yang didesain untuk kenyamanan dan
                keberlanjutan — setiap proyek adalah bukti arsitektur yang
                penuh pertimbangan dan bertujuan.
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Image + Stats Grid */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {/* Large Image */}
          <AnimatedSection className="lg:col-span-2" delay={0.2}>
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-terracotta-muted">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground backdrop-blur-sm">
                  Hunian Pedesaan Modern
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats Column */}
          <div className="flex flex-col gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={0.1 + i * 0.1} direction="right">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 rounded-xl border border-light-border bg-white p-6 transition-shadow duration-300 hover:shadow-lg"
                >
                  <span className="font-serif text-3xl text-terracotta sm:text-4xl">
                    {stat.number}
                  </span>
                  <div className="h-8 w-px bg-light-border" />
                  <span className="text-sm font-medium uppercase tracking-wider text-warm-gray">
                    {stat.label}
                  </span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
