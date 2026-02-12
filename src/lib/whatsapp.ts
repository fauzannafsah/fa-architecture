// WhatsApp configuration — change the number to your actual business number
export const WA_NUMBER = "6281328758098";

export const WA_MESSAGES = {
  general: "Halo FA Architecture! Saya tertarik untuk konsultasi tentang proyek arsitektur.",
  hero: "Halo FA Architecture! Saya ingin konsultasi gratis tentang proyek saya.",
  livestock: "Halo FA Architecture! Saya tertarik dengan layanan desain fasilitas peternakan.",
  housing: "Halo FA Architecture! Saya tertarik dengan layanan desain hunian/perumahan.",
  planning: "Halo FA Architecture! Saya tertarik dengan layanan perencanaan tapak.",
  renovation: "Halo FA Architecture! Saya tertarik dengan layanan renovasi & restorasi.",
};

export function getWhatsAppUrl(message: string = WA_MESSAGES.general): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
