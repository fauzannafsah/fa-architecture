import type { PortfolioProject, ServiceItem, TestimonialItem } from "./types";

// All default text content — used as fallback when Supabase has no data
export const DEFAULTS: Record<string, string> = {
  // Hero
  "hero.badge": "Spesialis Peternakan & Perumahan",
  "hero.heading1": "Merancang Ruang",
  "hero.heading2": "Di Mana",
  "hero.heading2_accent": "Fungsi",
  "hero.heading3": "Bertemu",
  "hero.heading3_accent": "Estetika",
  "hero.subtitle":
    "Kami menciptakan solusi arsitektur yang menyelaraskan hunian modern dengan keunggulan pertanian — dari fasilitas peternakan canggih hingga rumah yang hangat dan berkelanjutan.",
  "hero.cta_primary": "Konsultasi Gratis",
  "hero.cta_secondary": "Lihat Karya Kami",
  "hero.bg_image":
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80",

  // About
  "about.label": "Tentang Kami",
  "about.heading": "Membangun Masa Depan,",
  "about.heading_accent": "Berakar pada Tujuan",
  "about.description1":
    "FA Architecture merupakan studio jasa perencanaan dan desain arsitektur yang berada di bawah naungan PT Agung Sejati Group. Kami bergerak di bidang jasa desain arsitektur, perencanaan bangunan, dan pengembangan konsep ruang untuk kebutuhan hunian maupun fasilitas pendukung lainnya.",
  "about.description2":
    "Dalam menjalankan operasional, FA Architecture fokus pada perencanaan yang fungsional, efisien, dan dapat direalisasikan dengan baik sesuai kebutuhan klien. Proses kerja kami dilakukan secara bertahap dan sistematis, mulai dari penyusunan denah, pengembangan desain, hingga pendampingan perencanaan.",
  "about.description3":
    "Seiring bertambahnya proyek yang masuk, FA Architecture terus melakukan pengembangan usaha guna meningkatkan kualitas layanan, kapasitas kerja, dan profesionalisme operasional.",
  "about.image":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  "about.image_label": "Hunian Pedesaan Modern",
  "about.stat1_number": "150+",
  "about.stat1_label": "Proyek Selesai",
  "about.stat2_number": "12",
  "about.stat2_label": "Tahun Pengalaman",
  "about.stat3_number": "98%",
  "about.stat3_label": "Kepuasan Klien",
  "about.stat4_number": "35+",
  "about.stat4_label": "Penghargaan",

  // Services section
  "services.label": "Layanan Kami",
  "services.heading": "Keahlian yang",
  "services.heading_accent": "Menjembatani",
  "services.heading_suffix": "Dua Dunia",
  "services.subtitle":
    "Baik itu fasilitas peternakan berperforma tinggi maupun rumah impian keluarga, pendekatan kami tetap sama — mendengarkan dengan saksama, merancang dengan penuh pertimbangan, membangun dengan indah.",

  // Portfolio section
  "portfolio.label": "Proyek Unggulan",
  "portfolio.heading": "Karya",
  "portfolio.heading_accent": "Terbaru",
  "portfolio.heading_suffix": "Kami",

  // Contact
  "contact.label": "Hubungi Kami",
  "contact.heading": "Mari Bangun",
  "contact.heading_accent": "Sesuatu",
  "contact.heading_suffix": "yang Luar Biasa",
  "contact.subtitle":
    "Baik Anda merencanakan fasilitas peternakan baru, memimpikan rumah sempurna, atau ingin memperbarui ruang yang ada — langsung hubungi kami via WhatsApp untuk respons tercepat.",
  "contact.email": "hello@fa-architecture.com",
  "contact.address": "Jl. Arsitektur No. 123, Jakarta, Indonesia",
  "contact.wa_display": "+62 838 7497 9320",
  "contact.consult_heading": "Mulai Konsultasi Cepat",
  "contact.consult_subtitle":
    "Pilih jenis proyek Anda, langsung terhubung via WhatsApp. Tidak perlu isi formulir panjang!",

  // Footer
  "footer.description":
    "Merancang ruang inovatif untuk fasilitas peternakan dan hunian modern. Di mana fungsi bertemu estetika.",

  // Testimonials section
  "testimonials.label": "Testimoni Klien",
  "testimonials.heading": "Apa Kata",
  "testimonials.heading_accent": "Mereka",

  // WhatsApp
  "wa.number": "6283874979320",
};

// Default portfolio projects
export const DEFAULT_PORTFOLIO: Omit<PortfolioProject, "id" | "created_at" | "updated_at">[] = [
  {
    title: "Peternakan Sapi Riverside",
    category: "Peternakan",
    year: "2025",
    image_url:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    size: "large",
    tiktok_url: "https://www.tiktok.com/@fa.architecture/video/1",
    sort_order: 0,
  },
  {
    title: "Rumah Modern Hillcrest",
    category: "Perumahan",
    year: "2024",
    image_url:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    size: "small",
    tiktok_url: "https://www.tiktok.com/@fa.architecture/video/2",
    sort_order: 1,
  },
  {
    title: "Kompleks Unggas Oakfield",
    category: "Peternakan",
    year: "2024",
    image_url:
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
    size: "small",
    tiktok_url: "https://www.tiktok.com/@fa.architecture/video/3",
    sort_order: 2,
  },
  {
    title: "Residensi The Meadow",
    category: "Perumahan",
    year: "2025",
    image_url:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    size: "large",
    tiktok_url: "https://www.tiktok.com/@fa.architecture/video/4",
    sort_order: 3,
  },
  {
    title: "Pusat Equestrian Greenfield",
    category: "Peternakan",
    year: "2023",
    image_url:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
    size: "small",
    tiktok_url: "https://www.tiktok.com/@fa.architecture/video/5",
    sort_order: 4,
  },
  {
    title: "Peternakan Cedar Valley",
    category: "Fungsi Campuran",
    year: "2024",
    image_url:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    size: "small",
    tiktok_url: "https://www.tiktok.com/@fa.architecture/video/6",
    sort_order: 5,
  },
];

// Default services
export const DEFAULT_SERVICES: Omit<ServiceItem, "id" | "created_at" | "updated_at">[] = [
  {
    number: "01",
    title: "Desain Fasilitas Peternakan",
    description:
      "Kandang, istal, dan struktur pertanian yang dibangun dengan tujuan khusus untuk kesejahteraan hewan optimal, ventilasi, dan efisiensi operasional.",
    features: [
      "Kandang Sapi & Perah",
      "Kandang Unggas",
      "Fasilitas Kuda",
      "Gudang Pakan",
    ],
    image_url:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    wa_message:
      "Halo FA Architecture! Saya tertarik dengan layanan desain fasilitas peternakan.",
    sort_order: 0,
  },
  {
    number: "02",
    title: "Hunian & Perumahan",
    description:
      "Rumah kontemporer yang memadukan estetika modern dengan lingkungan pedesaan — berkelanjutan, hangat, dan dirancang sesuai gaya hidup Anda.",
    features: [
      "Rumah Custom",
      "Rumah Pedesaan",
      "Desain Berkelanjutan",
      "Perencanaan Interior",
    ],
    image_url:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    wa_message:
      "Halo FA Architecture! Saya tertarik dengan layanan desain hunian/perumahan.",
    sort_order: 1,
  },
  {
    number: "03",
    title: "Perencanaan Tapak",
    description:
      "Perencanaan tapak menyeluruh yang mengintegrasikan operasi peternakan dengan hunian, menciptakan tata letak peternakan yang harmonis.",
    features: [
      "Analisis Tapak",
      "Strategi Zonasi",
      "Integrasi Lanskap",
      "Infrastruktur",
    ],
    image_url:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    wa_message:
      "Halo FA Architecture! Saya tertarik dengan layanan perencanaan tapak.",
    sort_order: 2,
  },
  {
    number: "04",
    title: "Renovasi & Restorasi",
    description:
      "Menghidupkan kembali bangunan yang sudah ada sambil mempertahankan karakternya — dari konversi kandang warisan hingga perluasan rumah modern.",
    features: [
      "Konversi Kandang",
      "Perluasan Rumah",
      "Restorasi Warisan",
      "Modernisasi",
    ],
    image_url:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    wa_message:
      "Halo FA Architecture! Saya tertarik dengan layanan renovasi & restorasi.",
    sort_order: 3,
  },
];

// Default testimonials (placeholders)
export const DEFAULT_TESTIMONIALS: Omit<TestimonialItem, "id" | "created_at" | "updated_at">[] = [
  {
    image_url: "https://placehold.co/360x640/e8e0d8/C45D3E?text=Testimoni+1",
    client_name: "Klien 1",
    project_label: "Proyek Perumahan",
    sort_order: 0,
  },
  {
    image_url: "https://placehold.co/360x640/e8e0d8/C45D3E?text=Testimoni+2",
    client_name: "Klien 2",
    project_label: "Proyek Peternakan",
    sort_order: 1,
  },
  {
    image_url: "https://placehold.co/360x640/e8e0d8/C45D3E?text=Testimoni+3",
    client_name: "Klien 3",
    project_label: "Renovasi",
    sort_order: 2,
  }
];
