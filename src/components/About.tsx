"use client";

import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";
import { useContent } from "@/contexts/ContentContext";
import EditableText from "./admin/EditableText";
import EditableImage from "./admin/EditableImage";

export default function About() {
  const { get } = useContent();

  const stats = [
    { number: get("about.stat1_number", "150+"), label: get("about.stat1_label", "Proyek Selesai"), numKey: "about.stat1_number", labelKey: "about.stat1_label" },
    { number: get("about.stat2_number", "12"), label: get("about.stat2_label", "Tahun Pengalaman"), numKey: "about.stat2_number", labelKey: "about.stat2_label" },
    { number: get("about.stat3_number", "98%"), label: get("about.stat3_label", "Kepuasan Klien"), numKey: "about.stat3_number", labelKey: "about.stat3_label" },
    { number: get("about.stat4_number", "35+"), label: get("about.stat4_label", "Penghargaan"), numKey: "about.stat4_number", labelKey: "about.stat4_label" },
  ];

  return (
    <section id="about" className="relative bg-background py-28 lg:py-36">
      {/* Decorative accent */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <AnimatedSection>
              <EditableText
                contentKey="about.label"
                defaultValue="Tentang Kami"
                className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta"
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
                <EditableText
                  contentKey="about.heading"
                  defaultValue="Membangun Masa Depan,"
                />{" "}
                <span className="text-terracotta">
                  <EditableText
                    contentKey="about.heading_accent"
                    defaultValue="Berakar pada Tujuan"
                  />
                </span>
              </h2>
            </AnimatedSection>
          </div>

          <div className="flex flex-col justify-end">
            <AnimatedSection delay={0.2}>
              <EditableText
                contentKey="about.description1"
                defaultValue="FA Architecture merupakan studio jasa perencanaan dan desain arsitektur yang berada di bawah naungan PT Agung Sejati Group. Kami bergerak di bidang jasa desain arsitektur, perencanaan bangunan, dan pengembangan konsep ruang untuk kebutuhan hunian maupun fasilitas pendukung lainnya."
                as="p"
                className="text-lg leading-relaxed text-warm-gray"
                multiline
              />
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <EditableText
                contentKey="about.description2"
                defaultValue="Dalam menjalankan operasional, FA Architecture fokus pada perencanaan yang fungsional, efisien, dan dapat direalisasikan dengan baik sesuai kebutuhan klien. Proses kerja kami dilakukan secara bertahap dan sistematis, mulai dari penyusunan denah, pengembangan desain, hingga pendampingan perencanaan."
                as="p"
                className="mt-6 text-lg leading-relaxed text-warm-gray"
                multiline
              />
            </AnimatedSection>
            <AnimatedSection delay={0.5}>
              <EditableText
                contentKey="about.description3"
                defaultValue="Seiring bertambahnya proyek yang masuk, FA Architecture terus melakukan pengembangan usaha guna meningkatkan kualitas layanan, kapasitas kerja, dan profesionalisme operasional."
                as="p"
                className="mt-6 text-lg leading-relaxed text-warm-gray"
                multiline
              />
            </AnimatedSection>
          </div>
        </div>

        {/* Image + Stats Grid */}
        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {/* Large Image */}
          <AnimatedSection className="lg:col-span-2" delay={0.2}>
            <EditableImage
              contentKey="about.image"
              defaultValue="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
            >
              <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-terracotta-muted">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${get(
                      "about.image",
                      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                    )}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground backdrop-blur-sm">
                    <EditableText
                      contentKey="about.image_label"
                      defaultValue="Hunian Pedesaan Modern"
                    />
                  </span>
                </div>
              </div>
            </EditableImage>
          </AnimatedSection>

          {/* Stats Column */}
          <div className="flex flex-col gap-6">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.labelKey} delay={0.1 + i * 0.1} direction="right">
                <motion.div
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-4 rounded-xl border border-light-border bg-white p-6 transition-shadow duration-300 hover:shadow-lg"
                >
                  <span className="font-serif text-3xl text-terracotta sm:text-4xl">
                    <EditableText
                      contentKey={stat.numKey}
                      defaultValue={stat.number}
                    />
                  </span>
                  <div className="h-8 w-px bg-light-border" />
                  <span className="text-sm font-medium uppercase tracking-wider text-warm-gray">
                    <EditableText
                      contentKey={stat.labelKey}
                      defaultValue={stat.label}
                    />
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
