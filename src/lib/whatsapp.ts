// WhatsApp configuration
// Default number — can be overridden by Supabase content (key: "wa.number")
export const WA_NUMBER_DEFAULT = "6283874979320";

export const WA_MESSAGES = {
  general: "Halo FA Architecture! Saya tertarik untuk konsultasi tentang proyek arsitektur.",
  hero: "Halo FA Architecture! Saya ingin konsultasi gratis tentang proyek saya.",
  livestock: "Halo FA Architecture! Saya tertarik dengan layanan desain fasilitas peternakan.",
  housing: "Halo FA Architecture! Saya tertarik dengan layanan desain hunian/perumahan.",
  planning: "Halo FA Architecture! Saya tertarik dengan layanan perencanaan tapak.",
  renovation: "Halo FA Architecture! Saya tertarik dengan layanan renovasi & restorasi.",
};

export function getWhatsAppUrl(
  message: string = WA_MESSAGES.general,
  number?: string
): string {
  const waNumber = number || WA_NUMBER_DEFAULT;
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
}
