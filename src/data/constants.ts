// ─── Restoran Bilgileri ───────────────────────────────────────────────────────
// NOT: Kesin bilgiler sahipten alındıktan sonra güncelle

export const RESTAURANT = {
  name: "İzmir Balıkçısı",
  tagline: "Taze Deniz, Temiz Sofra",
  description:
    "İzmir'in kalbinde, alkolsüz ve aile dostu bir deniz ürünleri deneyimi. Her gün taze gelen balıklar, sevgi dolu eller.",
  address: "TBD — Adres netleşince eklenecek",
  phone: "TBD — Telefon netleşince eklenecek",
  email: "info@izmirbalıkcisi.com", // netleşince güncelle
  hours: {
    weekdays: "11:00 – 22:00",
    weekends: "10:00 – 23:00",
  },
  social: {
    instagram: "https://instagram.com/izmirbalıkcisi", // güncelle
    facebook: "",
    google: "",
  },
  location: {
    lat: 38.4192,
    lng: 27.1287,
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
    "İzmir'de alkolsüz, aile dostu, taze deniz ürünleri restoranı. Karşıyaka, Alsancak ve çevresi için en iyi balık restoranı.",
  keywords: [
    "izmir balık restoranı",
    "alkolsüz balık",
    "aile dostu restoran izmir",
    "taze deniz ürünleri",
    "izmir balıkçı",
  ],
  ogImage: "/og-image.jpg",
  url: "https://izmir-balikcisi.vercel.app", // güncelle
} as const;
