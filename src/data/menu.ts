// ─── Gerçek Menü Verisi — Fotoğraftan işlendi ────────────────────────────────

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number | null;
  unit?: string;
  tags?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  nameEn?: string;
  emoji: string;
  items: MenuItem[];
}

export const MENU_DATA: MenuCategory[] = [
  {
    id: 'corba',
    name: 'Çorba',
    nameEn: 'Soups',
    emoji: '🍲',
    items: [
      { id: 'balik-corbasi', name: 'Balık Çorbası', price: null },
      { id: 'fis-soup', name: 'Fis Soup', price: null },
    ],
  },
  {
    id: 'yogurtlu-mezeler',
    name: 'Yoğurtlu Mezeler',
    nameEn: 'Yogurt Appetizers',
    emoji: '🥗',
    items: [
      { id: 'atom-borani', name: 'Atom Borani', description: 'Smoked eggplant & yogurt seasoned with garlic, topped with butter & chili pepper', price: null },
      { id: 'akdeniz', name: 'Akdeniz', description: 'Eggplant with olive oil, walnuts, parsley & chilli, tomato paste & yogurt', price: null },
      { id: 'yogurtlu-semizotu', name: 'Yoğurtlu Semizotu', description: 'Thick yogurt with garlic mixed with purslane & chopped walnuts', price: null },
      { id: 'havuc-taratori', name: 'Havuç Taratori', description: 'Yogurt with carrots and garlic sauce', price: null },
      { id: 'haydari', name: 'Haydari', description: 'Thick yogurt seasoned with mint', price: null },
      { id: 'kuru-cacik', name: 'Kuru Cacık', description: 'Tzatziki', price: null },
      { id: 'yogurtlu-patlican', name: 'Yoğurtlu Patlıcan', description: 'Thick yogurt with aubergine', price: null },
    ],
  },
  {
    id: 'bakliyatli-mezeler',
    name: 'Bakliyatlı Mezeler',
    nameEn: 'Legume Appetizers',
    emoji: '🫘',
    items: [
      { id: 'fava', name: 'Fava', description: 'Mashed broad bean', price: null },
      { id: 'fava-tekmil', name: 'Fava Tekmil', description: 'Mashed broad beans seasoned with olive oil', price: null },
      { id: 'humus', name: 'Humus', description: 'Creamy hummus chick pea', price: null },
      { id: 'kuru-borulce', name: 'Kuru Börülce', description: 'Dried black-eyed bean', price: null },
    ],
  },
  {
    id: 'sebzeli-mezeler',
    name: 'Sebzeli Mezeler',
    nameEn: 'Vegetable Appetizers',
    emoji: '🥬',
    items: [
      { id: 'enginar', name: 'Enginar', price: null },
      { id: 'acili-ezme', name: 'Acılı Ezme', description: 'Spicy tomato with peppers, herbs and onions', price: null },
      { id: 'babagannush', name: 'Babagannuş', description: 'Smoked aubergine with garlic, pepper, tomatoes, dill & crushed red spices', price: null },
      { id: 'patlican-salatasi', name: 'Patlıcan Salatası', description: 'Aubergine salad', price: null },
      { id: 'saksuka', name: 'Şakşuka', description: 'Courgette & fried eggplant with tomato sauce, green peppers & yogurt', price: null },
      { id: 'cunda-meze', name: 'Cunda Meze', description: 'Olives, herbs, roasted tomatoes, kasar cheese, halloumi & salty cheese', price: null },
      { id: 'bal-kabagi-kizartmasi', name: 'Bal Kabağı Kızartması', description: 'Fried pumpkin strips', price: null },
      { id: 'deniz-borulcesi', name: 'Deniz Börülcesi', description: 'Sea herbs', price: null },
      { id: 'kaya-korugu', name: 'Kaya Koruğu', price: null },
      { id: 'karisik-ot-tabagi', name: 'Karışık Ot Tabağı', description: 'Purslane, radish & sea herbs', price: null },
      { id: 'hardalli-patlican', name: 'Hardalı Patlıcan Salatası', description: 'Grilled aubergine & mustard sauce mixed with a special vinegar', price: null },
      { id: 'giritpatlican', name: 'Girit Patlıcan', description: 'Thick yogurt with aubergine, garlic & olive oil sauce, mint & cream & special spices', price: null },
      { id: 'kibris-meze', name: 'Kıbrıs Meze', description: 'Grilled halloumi, dried mint, black olives & olive oil, tomatoes, dried coriander', price: null },
      { id: 'girit-zeytin', name: 'Girit Zeytin', description: 'Green olives with carrot, celery, peppers & aromatic herbs', price: null },
      { id: 'yesil-zeytin', name: 'Yeşil Zeytin', price: null },
      { id: 'izgara-zeytin', name: 'Izgara Zeytin', price: null },
      { id: 'pancar', name: 'Pancar', description: 'Beetroot', price: null },
    ],
  },
  {
    id: 'salatalar',
    name: 'Salatalar',
    nameEn: 'Salads',
    emoji: '🥙',
    items: [
      { id: 'mevsim-salata', name: 'Mevsim Salata', description: 'Garden salad', price: null },
      { id: 'coban-salata', name: 'Çoban Salata', description: 'Shepherd salad', price: null },
      { id: 'roka-salatasi', name: 'Roka Salatası', description: 'Rocket salad', price: null },
      { id: 'gavurdagi-salatasi', name: 'Gavurdağı Salatası', description: 'With walnuts, pomegranate & pomegranate molasses dressing', price: null },
      { id: 'ton-baligi-salatasi', name: 'Ton Balığı Salatası', description: 'Tuna salad', price: null },
    ],
  },
  {
    id: 'deniz-mahsulleri-meze',
    name: 'Deniz Mahsülleri Meze',
    nameEn: 'Seafood Appetizers',
    emoji: '🦐',
    items: [
      { id: 'ciroz', name: 'Çiroz', price: null },
      { id: 'levrek-marin', name: 'Levrek Marin', description: 'Marinated sea bass', price: null },
      { id: 'hardalli-levrek-marin', name: 'Hardalı Levrek Marin', description: 'Marinated sea bass in mustard sauce', price: null },
      { id: 'narli-levrek-marin', name: 'Narlı Levrek Marin', description: 'Marinated sea bass in pomegranate sauce', price: null },
      { id: 'akya-marin', name: 'Akya Marin', description: 'Marinated amberjack', price: null },
      { id: 'karides-marin', name: 'Karides Marin', description: 'Marinated shrimps', price: null },
      { id: 'deniz-mahsulleri-salatasi', name: 'Deniz Mahsülleri Salatası', description: 'Seafood salad', price: null },
      { id: 'hamsi-marin', name: 'Hamsi Marin', description: 'Marinated anchovy', price: null },
      { id: 'midye-marin', name: 'Midye Marin', description: 'Marinated mussels', price: null },
      { id: 'tutsulenmis-somon', name: 'Tütsülenmiş Somon', description: 'Smoked salmon', price: null },
    ],
  },
  {
    id: 'ara-sicaklar',
    name: 'Ara Sıcaklar',
    nameEn: 'Warm Starters',
    emoji: '🔥',
    items: [
      { id: 'kalamar-tava', name: 'Kalamar Tava', description: 'Fried calamari', price: null },
      { id: 'kalamar-izgara', name: 'Kalamar Izgara', description: 'Grilled calamari', price: null },
      { id: 'karides-tava', name: 'Karides Tava', description: 'Fried shrimps', price: null },
      { id: 'karides-guvec-sebzeli', name: 'Karides Güveç Sebzeli', description: 'Shrimps with vegetables & tomato sauce & herbs', price: null },
      { id: 'ahtapot-izgara', name: 'Ahtapot Izgara', description: 'Grilled octopus', price: null },
      { id: 'sebzeli-ahtapot-tandir', name: 'Sebzeli Ahtapot Tandır', description: 'Slow cooked octopus with vegetables & spices', price: null },
      { id: 'midye-tava', name: 'Midye Tava', description: 'Fried mussels', price: null },
      { id: 'balıkci-boregi', name: 'Balıkçı Böreği', description: 'Deep fried filo pastry with mixed seafood filling', price: null },
      { id: 'kadayifli-levrek-sarma', name: 'Kadayıflı Levrek Sarma', description: 'Kadayıf wrapped sea bass with mashed potato & special sauce', price: null },
      { id: 'balik-pane', name: 'Balık Pane', description: 'Fried fish', price: null },
      { id: 'patlican-pane', name: 'Patlıcan Pane', description: 'Fried aubergine', price: null },
      { id: 'izgara-kasarli-mantar', name: 'Izgara Kaşarlı Mantar', description: 'Grilled mushrooms stuffed with kaşar cheese & herbs', price: null },
      { id: 'yogurtlu-sicak-ot', name: 'Yoğurtlu Sıcak Ot', description: 'Cooked fresh herbs with yogurt & garlic & butter', price: null },
      { id: 'cips', name: 'Cips', description: 'Chips', price: null },
      { id: 'citir-karides', name: 'Çıtır Karides', description: 'Crispy shrimps', price: null },
      { id: 'fish-and-chips', name: 'Fish and Chips', price: null },
      { id: 'deniz-mahsulleri-guvec', name: 'Deniz Mahsülleri Güveç', description: 'Seafood casserole', price: null },
    ],
  },
  {
    id: 'tava-baliklar',
    name: 'Tava Balıklar',
    nameEn: 'Fried Fish',
    emoji: '🐠',
    items: [
      { id: 'sardalya-tava', name: 'Sardalya Tava', description: 'Fried sardine', price: null },
      { id: 'istavrit-tava', name: 'İstavrit Tava', description: 'Fried horse mackerel', price: null },
      { id: 'lopa-tava', name: 'Lopa Tava', description: 'Fried lupa', price: null },
      { id: 'hamsi-tava', name: 'Hamsi Tava', description: 'Fried anchovy', price: null },
      { id: 'barbun-tava', name: 'Barbun Tava', description: 'Fried red mullet', price: null },
      { id: 'mezgit-tava', name: 'Mezgit Tava', description: 'Fried whiting', price: null },
      { id: 'balik-kavurmasi', name: 'Balık Kavurması', description: 'Sautéed fish', price: null },
      { id: 'deniz-mahsulleri-makarna', name: 'Deniz Mahsülleri Makarna', description: 'Seafood pasta', price: null },
    ],
  },
  {
    id: 'izgara-baliklar',
    name: 'Izgara Balıklar',
    nameEn: 'Grilled Fish',
    emoji: '🐟',
    items: [
      { id: 'laos-sis', name: 'Laos Şiş', price: null },
      { id: 'levrek-lokum', name: 'Levrek Lokum', description: 'Sea bass', price: null },
      { id: 'deniz-levrek-kg', name: 'Deniz Levreği KG', price: null, unit: 'kg' },
      { id: 'deniz-cipura-kg', name: 'Deniz Çipura KG', price: null, unit: 'kg' },
      { id: 'kaya-levrek-kg', name: 'Kaya Levreği KG', price: null, unit: 'kg' },
      { id: 'minakop-kg', name: 'Minakop KG', price: null, unit: 'kg' },
      { id: 'mercan-kg', name: 'Mercan KG', price: null, unit: 'kg' },
      { id: 'turna-kg', name: 'Turna KG', price: null, unit: 'kg' },
      { id: 'akya-kg', name: 'Akya KG', price: null, unit: 'kg' },
      { id: 'somon-kg', name: 'Somon KG', price: null, unit: 'kg' },
      { id: 'dulger-kg', name: 'Dülger KG', price: null, unit: 'kg' },
      { id: 'cinekop-kg', name: 'Çinekop KG', price: null, unit: 'kg' },
      { id: 'palamut-adet', name: 'Palamut Adet', price: null, unit: 'adet' },
      { id: 'uskumru-kg', name: 'Uskumru KG', price: null, unit: 'kg' },
      { id: 'kilic-kg', name: 'Kılıç KG', price: null, unit: 'kg' },
    ],
  },
  {
    id: 'ordovr-tabaklari',
    name: 'Ordövr Tabakları',
    nameEn: 'Hors Doeuvre Plates',
    emoji: '🍱',
    items: [
      { id: 'sebzeli-ordovr', name: 'Sebzeli Ordövr', description: 'Mixed vegetable appetizers', price: null },
      { id: 'deniz-urunleri-ordovr', name: 'Deniz Ürünleri Ordövr', description: 'Mixed seafood appetizers', price: null },
    ],
  },
  {
    id: 'alternatifler',
    name: 'Alternatifler',
    nameEn: 'Alternative Dishes',
    emoji: '🥩',
    items: [
      { id: 'kuzu-pirzola', name: 'Kuzu Pirzola', description: 'Lamb chops', price: null },
      { id: 'izgara-kofte', name: 'Izgara Köfte', description: 'Grilled meatballs', price: null },
      { id: 'tavuk-sis', name: 'Tavuk Şiş', description: 'Chicken skewer', price: null },
    ],
  },
  {
    id: 'tatlilar',
    name: 'Tatlılar',
    nameEn: 'Desserts',
    emoji: '🍮',
    items: [
      { id: 'kabak-tatlisi', name: 'Kabak Tatlısı', description: 'Pumpkin dessert', price: null },
      { id: 'ayva-tatlisi', name: 'Ayva Tatlısı', description: 'Quince dessert', price: null },
      { id: 'irmik-tatlisi', name: 'İrmik Tatlısı', description: 'Semolina dessert', price: null },
      { id: 'dondurma-irmik', name: 'Dondurmalı İrmik', description: 'Semolina with ice cream & chocolate sauce', price: null },
      { id: 'sicak-helva-tatlisi', name: 'Sıcak Helva Tatlısı', description: 'Chocolate soufflé', price: null },
      { id: 'sufle', name: 'Sufle', description: 'Soufflé', price: null },
      { id: 'hashasli-revani', name: 'Haşhaşlı Revani', description: 'Semolina cake with poppy seeds syrup in halva mousse', price: null },
      { id: 'dilim-helva', name: 'Dilim Helva', description: 'Sliced halva', price: null },
    ],
  },
];
