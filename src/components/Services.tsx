"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { getWhatsAppUrl, WA_MESSAGES } from "@/lib/whatsapp";

const services = [
  {
    number: "01",
    title: "Desain Fasilitas Peternakan",
    description:
      "Kandang, istal, dan struktur pertanian yang dibangun dengan tujuan khusus untuk kesejahteraan hewan optimal, ventilasi, dan efisiensi operasional.",
    features: ["Kandang Sapi & Perah", "Kandang Unggas", "Fasilitas Kuda", "Gudang Pakan"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    waMessage: WA_MESSAGES.livestock,
  },
  {
    number: "02",
    title: "Hunian & Perumahan",
    description:
      "Rumah kontemporer yang memadukan estetika modern dengan lingkungan pedesaan — berkelanjutan, hangat, dan dirancang sesuai gaya hidup Anda.",
    features: ["Rumah Custom", "Rumah Pedesaan", "Desain Berkelanjutan", "Perencanaan Interior"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    waMessage: WA_MESSAGES.housing,
  },
  {
    number: "03",
    title: "Perencanaan Tapak",
    description:
      "Perencanaan tapak menyeluruh yang mengintegrasikan operasi peternakan dengan hunian, menciptakan tata letak peternakan yang harmonis.",
    features: ["Analisis Tapak", "Strategi Zonasi", "Integrasi Lanskap", "Infrastruktur"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    waMessage: WA_MESSAGES.planning,
  },
  {
    number: "04",
    title: "Renovasi & Restorasi",
    description:
      "Menghidupkan kembali bangunan yang sudah ada sambil mempertahankan karakternya — dari konversi kandang warisan hingga perluasan rumah modern.",
    features: ["Konversi Kandang", "Perluasan Rumah", "Restorasi Warisan", "Modernisasi"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    waMessage: WA_MESSAGES.renovation,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-foreground py-28 lg:py-36">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-terracotta/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-terracotta/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <AnimatedSection>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-terracotta-light">
              Layanan Kami
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Keahlian yang{" "}
              <span className="italic text-terracotta-light">Menjembatani</span> Dua
              Dunia
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-white/50">
              Baik itu fasilitas peternakan berperforma tinggi maupun rumah
              impian keluarga, pendekatan kami tetap sama — mendengarkan
              dengan saksama, merancang dengan penuh pertimbangan, membangun
              dengan indah.
            </p>
          </AnimatedSection>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => (
            <AnimatedSection
              key={service.number}
              delay={i * 0.15}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
                  <div className="absolute left-6 top-6">
                    <span className="font-serif text-5xl text-white/10">
                      {service.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition-colors group-hover:border-terracotta/30 group-hover:text-terracotta-light"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Arrow link */}
                  <a
                    href={getWhatsAppUrl(service.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-[#25D366] transition-colors hover:text-[#1fb855]"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-sm font-medium">Tanya via WhatsApp</span>
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </a>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
