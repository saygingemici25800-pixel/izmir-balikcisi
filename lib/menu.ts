export type MenuItem = {
  name: string;
  price: string;
  unit?: string;
  desc: string;
  tags?: string[];
  img?: string;
  featured?: boolean; // appears on homepage MenuScroll
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: 'mezeler',
    title: 'Mezeler',
    subtitle: 'Soğuk ve sıcak başlangıçlar',
    items: [
      {
        name: 'Ahtapot Carpaccio',
        price: '380',
        unit: '₺',
        desc: 'İnce dilimlenmiş haşlanmış ahtapot, kapari, kişniş yağı, deniz tuzu.',
        tags: ['soğuk'],
        img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80',
        featured: true,
      },
      {
        name: 'Karides Güveç',
        price: '420',
        unit: '₺',
        desc: 'Ege karidesi, kekik, kaşar, taze domates, fırında topraktan toprağa.',
        tags: ['fırın', 'sıcak'],
        img: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80',
        featured: true,
      },
      { name: 'Lakerda',          price: '240', unit: '₺', desc: 'Tuzlanmış palamut, kırmızı soğan, dereotu, sızma zeytinyağı.', tags: ['soğuk'] },
      { name: 'Çiroz Salatası',    price: '220', unit: '₺', desc: 'Güneşte kurutulmuş uskumru, taze soğan, limon, kekik.',     tags: ['soğuk'] },
      { name: 'Topik',             price: '200', unit: '₺', desc: 'Nohut püresi, tahin, kuş üzümü, çam fıstığı; tarçın esintisi.', tags: ['soğuk'] },
      { name: 'Midye Dolma',       price: '180', unit: '₺', desc: 'Pirinç içi, kuş üzümü, dereotu, limon.',                       tags: ['soğuk'] },
      { name: 'Kalamar Tava',      price: '320', unit: '₺', desc: 'Çıtır kaplı, jiletle dilimlenmiş halkalar, tartar sosu.',      tags: ['kızartma', 'sıcak'] },
    ],
  },
  {
    id: 'corbalar',
    title: 'Çorbalar',
    items: [
      { name: 'Balık Çorbası',   price: '160', unit: '₺', desc: 'Günün balığı, sebze suyu, ince doğranmış kereviz, limon.', tags: ['sıcak'] },
      { name: 'Karides Bisque', price: '180', unit: '₺', desc: 'Karides kabuğundan çekilmiş krema, taraçon esintisi.',     tags: ['krema'] },
    ],
  },
  {
    id: 'izgaralar',
    title: 'Izgara Balıklar',
    subtitle: 'Açık ateşte, bütün olarak',
    items: [
      {
        name: 'Çupra Izgara',
        price: '620',
        unit: '₺',
        desc: 'Açık ateş, çıtır kabuk, içi süt gibi. Yanında roka, soğan, nar.',
        tags: ['bütün'],
        img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80',
        featured: true,
      },
      { name: 'Levrek Izgara',  price: '640', unit: '₺', desc: 'Bütün levrek, zeytinyağı, biberiye.', tags: ['bütün'] },
      { name: 'Lüfer Pırasayla',price: '740', unit: '₺', desc: 'Mevsiminde lüfer, közlenmiş pırasa, limon.', tags: ['mevsim'] },
      { name: 'Palamut Izgara', price: '520', unit: '₺', desc: 'Mevsim palamutu, tuzlanmış limon, soğan piyazı.', tags: ['mevsim'] },
    ],
  },
  {
    id: 'bugulama',
    title: 'Buğulama & Fırın',
    items: [
      {
        name: 'Levrek Buğulama',
        price: '680',
        unit: '₺',
        desc: 'Sabah avlanmış levrek, sebze yatağı, limon zeytinyağı, kâğıtta.',
        tags: ['sıcak'],
        img: 'https://images.unsplash.com/photo-1535007813616-79dc02ba4021?auto=format&fit=crop&w=900&q=80',
        featured: true,
      },
      { name: 'Çupra Tuzda Pişmiş', price: '780', unit: '₺', desc: 'Bütün çupra, deniz tuzu kabuğunda, masada açılır.', tags: ['gösterişli'] },
      { name: 'Levrek Sebze Üstü', price: '660', unit: '₺', desc: 'Pırasa, kabak, havuç yatağında fırında.',                tags: ['hafif'] },
    ],
  },
  {
    id: 'tava',
    title: 'Tava & Kızartma',
    items: [
      {
        name: 'Hamsi Tava',
        price: '280',
        unit: '₺',
        desc: 'Karadeniz kavurması değil, Ege üslubu: tek katman, mısır unu, jiletle.',
        tags: ['klasik'],
        img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80',
        featured: true,
      },
      {
        name: 'Kalkan Pane',
        price: '880',
        unit: '₺',
        desc: 'Mevsim başlangıcı. Kalın dilim, gevrek kırık galeta, tartar limonu.',
        tags: ['mevsim', 'şefin'],
        img: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=900&q=80',
        featured: true,
      },
      { name: 'Mezgit Tava',  price: '320', unit: '₺', desc: 'İri taneli galeta, bütün tava.', tags: ['klasik'] },
      { name: 'Barbun Tava',   price: '420', unit: '₺', desc: 'Küçük barbunyalar, mısır unu.',  tags: ['klasik'] },
    ],
  },
  {
    id: 'ekstra',
    title: 'Yanlar',
    items: [
      { name: 'Roka Salatası',         price: '120', unit: '₺', desc: 'Yağlı, limonlu, nar ekşili.' },
      { name: 'Mevsim Yeşillikleri',   price: '140', unit: '₺', desc: 'Roka, marul, dereotu, taze soğan.' },
      { name: 'Patates Pürêsi',        price:  '90', unit: '₺', desc: 'Tereyağlı, kremalı, çırpılmış.' },
      { name: 'Közlenmiş Sebze Karışımı', price: '160', unit: '₺', desc: 'Patlıcan, kabak, biber, sarımsak.' },
    ],
  },
  {
    id: 'tatlilar',
    title: 'Tatlılar',
    items: [
      { name: 'Sakızlı Muhallebi', price: '140', unit: '₺', desc: 'Damla sakızı, fırınlanmış üst, frenk üzümü.' },
      { name: 'Kabak Tatlısı',     price: '160', unit: '₺', desc: 'Tahin, ceviz, kaymak.' },
      { name: 'İncir Tatlısı',     price: '180', unit: '₺', desc: 'Kurutulmuş incir, ceviz, kaymak.' },
      { name: 'Mevsim Meyvesi',    price: '120', unit: '₺', desc: 'Günün taze meyveleri.' },
    ],
  },
  {
    id: 'icecekler',
    title: 'Alkolsüz İçecekler',
    subtitle: 'Burası alkolsüz bir ev — seçeneklerimiz geniş',
    items: [
      { name: 'Ev Limonatası',       price:  '80', unit: '₺', desc: 'Taze sıkılmış limon, nane, sakız.' },
      { name: 'Şalgam Suyu',         price:  '60', unit: '₺', desc: 'Acılı / acısız.' },
      { name: 'Ayran',               price:  '40', unit: '₺', desc: 'Köpürtülmüş, kaymaklı.' },
      { name: 'Soğuk Türk Kahvesi',  price:  '90', unit: '₺', desc: 'Buz, az şeker, kakao.' },
      { name: 'Demlik Çay',          price:  '50', unit: '₺', desc: 'İnce belli bardak, sınırsız demleme.' },
    ],
  },
];

// Convenience selectors
export const featuredItems = (): MenuItem[] =>
  MENU.flatMap((c) => c.items.filter((i) => i.featured));

export const itemCount = (): number =>
  MENU.reduce((n, c) => n + c.items.length, 0);
