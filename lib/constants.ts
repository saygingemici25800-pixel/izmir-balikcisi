export const RESTAURANT = {
  name: 'İzmir Balıkçısı',
  tagline: 'Taze Deniz Lezzetleri',
  description:
    "Fethiye / Muğla'da, alkolsüz ve aile dostu bir deniz ürünleri deneyimi. 2014'ten beri Fethiye'de, 1999'da başlayan deniz tutkusuyla.",
  founded: 1999,
  city: 'Fethiye',
  region: 'Muğla',
  country: 'TR',
  address: {
    locality: 'Fethiye',
    region: 'Muğla',
    country: 'TR',
    postalCode: '48300',
    street: 'Tuzla, Mustafa Kemal Blv. No:30',
    full: 'Tuzla, Mustafa Kemal Blv. No:30, 48300 Fethiye / Muğla',
  },
  phone: '+90 (0252) 612 18 81',
  phoneE164: '+902526121881',
  phoneDisplay: '(0252) 612 18 81',
  email: 'merhaba@izmirbalikcisi.example',
  hours: {
    everyday: { open: '10:30', close: '22:30' },
  },
  location: { lat: 36.6383, lng: 29.1397 },
  social: {
    instagram: 'https://instagram.com/izmirbalikcisi',
  },
} as const;

export const SITE = {
  name: 'İzmir Balıkçısı',
  url: 'https://izmir-balikcisi.vercel.app',
  locale: 'tr_TR',
} as const;

export const SEO = {
  title: 'İzmir Balıkçısı — Alkolsüz Taze Deniz Ürünleri · Fethiye / Muğla',
  description:
    "Fethiye / Muğla'da alkolsüz, aile dostu, taze deniz ürünleri restoranı. 1999'da başlayan deniz tutkusu, 2014'ten beri Fethiye'de.",
  keywords: [
    'izmir balıkçısı',
    'izmir balıkçısı fethiye',
    'fethiye balık restoranı',
    'muğla balık',
    'alkolsüz balık',
    'aile dostu restoran fethiye',
    'taze deniz ürünleri',
  ],
} as const;
