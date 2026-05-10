// ─── Restoran Bilgileri ───────────────────────────────────────────────────────
// NOT: Kesin bilgiler sahipten alındıktan sonra güncelle

export const RESTAURANT = {
  name: "İzmir Balıkçısı",
  tagline: "Taze Deniz, Temiz Sofra",
  description:
    "Fethiye / Muğla'da, alkolsüz ve aile dostu bir deniz ürünleri deneyimi. Her gün taze gelen balıklar, sevgi dolu eller.",
  address: "TBD — Adres netleşince eklenecek (Fethiye / Muğla)",
  phone: "TBD — Telefon netleşince eklenecek",
  email: "info@izmirbalikcisi.com", // netleşince güncelle
  hours: {
    weekdays: "11:00 – 22:00",
    weekends: "10:00 – 23:00",
  },
  social: {
    instagram: "https://instagram.com/izmirbalikcisi", // güncelle
    facebook: "",
    google: "",
  },
  location: {
    lat: 36.6536,
    lng: 29.1268,
    mapsUrl: "https://maps.google.com", // kesin link ekle
  },
} as const;

// ─── Kardeş Mekan ────────────────────────────────────────────────────────────

export const SISTER_VENUE = {
  name: "Çalış Balıkçısı",
  location: "Fethiye",
  url: "https://calis-balikcisi.vercel.app/",
  description: "Fethiye'nin gözde balık restoranı",
} as const;

// ─── Navigasyon ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Menü", href: "/menu" },
  { label: "Hakkımızda", href: "/#hakkimizda" },
  { label: "Galeri", href: "/#galeri" },
  { label: "İletişim", href: "/#iletisim" },
] as const;

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const SEO = {
  title: "İzmir Balıkçısı — Alkolsüz Taze Deniz Ürünleri Restoranı",
  description:
    "Fethiye / Muğla'da alkolsüz, aile dostu, taze deniz ürünleri restoranı. Bölgenin en iyi balık restoranı.",
  keywords: [
    "izmir balıkçısı",
    "izmir balıkçısı fethiye",
    "fethiye balık restoranı",
    "muğla balık",
    "alkolsüz balık",
    "aile dostu restoran fethiye",
    "taze deniz ürünleri",
  ],
  ogImage: "/og-image.jpg",
  url: "https://izmir-balikcisi.vercel.app", // güncelle
} as const;
