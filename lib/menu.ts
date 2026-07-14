/** A string localized into the three site languages. */
export type Localized = { tr: string; en: string; ar: string };

/** Pick the string for `locale`, falling back to Turkish (then any available). */
export const pickLocale = (v: Localized | undefined, locale: string): string =>
  (v && (v[locale as keyof Localized] || v.tr || v.en || v.ar)) || '';

export type MenuItem = {
  name: Localized;
  price?: string; // empty until priced in the admin panel; blank → shown as "—"
  unit?: string;
  daily?: boolean; // sold by weight at the daily market price — "ask staff"
  img?: string;
  featured?: boolean; // reserved (homepage highlight)
};

export type MenuCategory = {
  id: string;
  title: Localized;
  subtitle?: Localized;
  items: MenuItem[];
};

/** Localized-string constructor — keeps the menu data compact + readable. */
const L = (tr: string, en: string, ar: string): Localized => ({ tr, en, ar });

// Real İzmir Balıkçısı menu. Prices intentionally blank (edited in /admin);
// grilled fish are sold by daily weight (`daily`). AR is an editorial translation.
export const MENU: MenuCategory[] = [
  {
    id: 'corba',
    title: L('Çorba', 'Soups', 'الشوربة'),
    items: [
      { name: L('Balık Çorbası', 'Fish Soup', 'شوربة السمك') },
    ],
  },
  {
    id: 'yogurtlu-mezeler',
    title: L('Yoğurtlu Mezeler', 'Yogurt Appetizers', 'مقبلات بالزبادي'),
    items: [
      { name: L('Atom Borani', 'Smashed aubergine in yogurt seasoned with garlic, topped with hot pepper butter sauce', 'باذنجان مهروس بالزبادي والثوم مع صلصة الزبدة والفلفل الحار') },
      { name: L('Akdeniz', 'Thick yogurt, kale, lettuce seasoned with garlic', 'زبادي كثيف مع الكرنب والخس والثوم') },
      { name: L('Yoğurtlu Semizotu', 'Thick yogurt, purslane seasoned with garlic', 'زبادي كثيف مع البقلة والثوم') },
      { name: L('Havuç Tarator', 'Thick yogurt, fried carrots and almonds seasoned with garlic', 'زبادي كثيف مع الجزر المقلي واللوز والثوم') },
      { name: L('Haydari', 'Thick yogurt seasoned with garlic, mint and dill', 'زبادي كثيف بالثوم والنعناع والشبت') },
      { name: L('Kuru Cacık', 'Tzatziki', 'تزاتزيكي (لبن بالخيار والثوم)') },
      { name: L('Yoğurtlu Patlıcan', 'Thick yogurt with aubergine', 'زبادي كثيف مع الباذنجان') },
    ],
  },
  {
    id: 'bakliyatli-mezeler',
    title: L('Bakliyatlı Mezeler', 'Legume Appetizers', 'مقبلات البقوليات'),
    items: [
      { name: L('Fava', 'Mashed broad beans', 'فول مهروس (فافا)') },
      { name: L('Fava Tekmil', 'Mashed broad beans seasoned with dill', 'فول مهروس بالشبت') },
      { name: L('Humus', 'Hummus', 'حمص') },
      { name: L('Kuru Börülce', 'Dried black-eyed bean', 'لوبيا مجففة') },
    ],
  },
  {
    id: 'sebzeli-mezeler',
    title: L('Sebzeli Mezeler', 'Vegetable Appetizers', 'مقبلات الخضار'),
    items: [
      { name: L('Enginar', 'Artichoke', 'خرشوف') },
      { name: L('Acılı Ezme', 'Spicy tomato dip with pepper and onions', 'صلصة طماطم حارة بالفلفل والبصل') },
      { name: L('Babagannuş', 'Smoked aubergine', 'بابا غنوج (باذنجان مدخّن)') },
      { name: L('Patlıcan Salatası', 'Aubergine salad', 'سلطة الباذنجان') },
      { name: L('Şakşuka', 'Fried aubergine with tomato garlic sauce', 'باذنجان مقلي بصلصة الطماطم والثوم') },
      { name: L('Girit Ezme', 'Cretan dip', 'صلصة كريتية') },
      { name: L('Cunda Meze', 'Pepper sauce mixed with tulum cheese', 'صلصة الفلفل ممزوجة بجبن التولوم') },
      { name: L('Bal Kabağı Kızartması', 'Fried pumpkin slices', 'شرائح اليقطين المقلية') },
      { name: L('Deniz Börülcesi', 'Sea beans', 'الهليون البحري (ساليكورنيا)') },
      { name: L('Kaya Koruğu', 'Stone crop', 'حشيشة الجبل (كايا كوروغو)') },
      { name: L('Karışık Ot Tabağı', 'Plate with mixed vegetables', 'طبق أعشاب مشكّلة') },
      { name: L('Hardallı Patlıcan Salatası', 'Aubergine salad with mustard', 'سلطة الباذنجان بالخردل') },
      { name: L('Girit Patlıcan', 'Fried aubergine with tomato sauce', 'باذنجان مقلي بصلصة الطماطم') },
      { name: L('Kıbrıs Meze', 'Cyprus meze', 'مقبلات قبرصية') },
      { name: L('Girit Zeytin', 'Cretan olive', 'زيتون كريتي') },
      { name: L('Yeşil Zeytin', 'Green olive', 'زيتون أخضر') },
      { name: L('Izgara Zeytin', 'Grilled olive', 'زيتون مشوي') },
      { name: L('Pancar', 'Beetroot', 'شمندر') },
    ],
  },
  {
    id: 'salatalar',
    title: L('Salatalar', 'Salads', 'السلطات'),
    items: [
      { name: L('Mevsim Salata', 'Seasonal salad', 'سلطة موسمية') },
      { name: L('Çoban Salata', 'Shepherd salad', 'سلطة الراعي') },
      { name: L('Roka Salatası', 'Rocket salad', 'سلطة الجرجير') },
      { name: L('Gavurdağı Salatası', 'Chopped salad with pomegranate syrup and walnuts', 'سلطة مفرومة بدبس الرمان والجوز') },
      { name: L('Ton Balığı Salatası', 'Tuna salad', 'سلطة التونة') },
    ],
  },
  {
    id: 'deniz-meze',
    title: L('Deniz Mahsülleri Meze', 'Seafood Appetizers', 'مقبلات المأكولات البحرية'),
    items: [
      { name: L('Çiroz', 'Anchovy', 'أنشوجة مجففة (تشيروز)') },
      { name: L('Levrek Marin', 'Marinated sea bass', 'قاروص متبّل (مارينيه)') },
      { name: L('Hardallı Levrek Marin', 'Marinated sea bass with mustard sauce', 'قاروص متبّل بصلصة الخردل') },
      { name: L('Narlı Levrek Marin', 'Marinated sea bass with pomegranate', 'قاروص متبّل بالرمان') },
      { name: L('Akya Marin', 'Marinated leerfish', 'سمك الأكيا المتبّل') },
      { name: L('Karides Marin', 'Marinated shrimps', 'روبيان متبّل') },
      { name: L('Deniz Mahsülleri Salatası', 'Seafood salad', 'سلطة المأكولات البحرية') },
      { name: L('Hamsi Marin', 'Marinated anchovy', 'أنشوجة متبّلة') },
      { name: L('Midye Marin', 'Marinated mussels', 'بلح البحر المتبّل') },
      { name: L('Tütsülenmiş Somon', 'Smoked salmon', 'سلمون مدخّن') },
    ],
  },
  {
    id: 'ara-sicaklar',
    title: L('Ara Sıcaklar', 'Warm Starters', 'المقبلات الساخنة'),
    items: [
      { name: L('Kalamar Tava', 'Fried calamari', 'كاليماري مقلي') },
      { name: L('Kalamar Izgara', 'Grilled calamari', 'كاليماري مشوي') },
      { name: L('Karides Tava', 'Fried shrimps', 'روبيان مقلي') },
      { name: L('Karides Güveç Sebzeli', 'Shrimp casserole with vegetables', 'طاجن روبيان بالخضار') },
      { name: L('Ahtapot Izgara', 'Grilled octopus', 'أخطبوط مشوي') },
      { name: L('Sebzeli Ahtapot Tandır', 'Octopus tandoori with vegetables', 'أخطبوط بالفرن مع الخضار') },
      { name: L('Midye Tava', 'Fried mussels', 'بلح البحر المقلي') },
      { name: L('Balıkçı Böreği', 'Deep fried phyllo pastry with mixed seafood filling', 'بورك محشي بالمأكولات البحرية المشكّلة ومقلي') },
      { name: L('Kadayıflı Levrek Sarma', 'Kadayif wrapped sea bass', 'قاروص ملفوف بالكنافة') },
      { name: L('Balık Pane', 'Fried fish', 'سمك مقلي بالبقسماط') },
      { name: L('Patlıcan Pane', 'Fried aubergine', 'باذنجان مقلي بالبقسماط') },
      { name: L('Izgara Kaşarlı Mantar', 'Grilled mushrooms with cheese', 'فطر مشوي بالجبن') },
      { name: L('Yoğurtlu Sıcak Ot', 'Cooked vegetables with yogurt', 'خضار مطبوخة بالزبادي') },
      { name: L('Cips', 'French fries', 'بطاطا مقلية') },
      { name: L('Çıtır Karides', 'Crispy shrimps', 'روبيان مقرمش') },
      { name: L('Fish and Chips', 'Fish and Chips', 'سمك وبطاطا (فيش أند تشيبس)') },
      { name: L('Deniz Mahsülleri Güveç', 'Seafood casserole', 'طاجن المأكولات البحرية') },
    ],
  },
  {
    id: 'tava-baliklar',
    title: L('Tava Balıklar', 'Fried Fish', 'الأسماك المقلية'),
    items: [
      { name: L('Sardalya Tava', 'Fried sardines', 'سردين مقلي') },
      { name: L('İstavrit Tava', 'Fried horse mackerel', 'إسقمري حصان مقلي') },
      { name: L('Lopa Tava', 'Fried lopa', 'سمك اللوبا المقلي') },
      { name: L('Hamsi Tava', 'Fried anchovy', 'أنشوجة مقلية') },
      { name: L('Barbun Tava', 'Fried red mullet', 'سلطان إبراهيم مقلي') },
      { name: L('Mezgit Tava', 'Fried whiting', 'سمك المرلان المقلي') },
      { name: L('Balık Kavurması', 'Roasted fish', 'سمك محمّر') },
      { name: L('Deniz Mahsülleri Makarna', 'Pasta with seafood', 'معكرونة بالمأكولات البحرية') },
    ],
  },
  {
    id: 'ordovr',
    title: L('Ordövr Tabakları', "Hors D'oeuvre Plates", 'أطباق المقبلات'),
    items: [
      { name: L('Sebzeli Ordövr', "Hors d'oeuvre with vegetables", 'طبق مقبلات بالخضار') },
      { name: L('Deniz Ürünleri Ordövr', "Hors d'oeuvre with seafood", 'طبق مقبلات بالمأكولات البحرية') },
    ],
  },
  {
    id: 'izgara-baliklar',
    title: L('Izgara Balıklar', 'Grilled Fish', 'الأسماك المشوية'),
    subtitle: L('Günlük fiyat · kilogram', 'Daily price · per kg', 'السعر يومي · بالكيلوغرام'),
    items: [
      { name: L('Laos Şiş', 'Grouper skewer', 'أسياخ الهامور'), daily: true },
      { name: L('Levrek Lokum', 'Sea bass cubes', 'مكعبات القاروص'), daily: true },
      { name: L('Deniz Levreği KG', 'Sea bass', 'قاروص بحري'), daily: true },
      { name: L('Deniz Çupra KG', 'Sea bream', 'دنيس بحري'), daily: true },
      { name: L('Kaya Levreği KG', 'Stone bass', 'قاروص صخري'), daily: true },
      { name: L('Minakop KG', 'Corb fish', 'سمك المنقوس'), daily: true },
      { name: L('Mercan KG', 'Sea bream', 'مرجان'), daily: true },
      { name: L('Turna KG', 'Pike', 'سمك الكراكي'), daily: true },
      { name: L('Akya KG', 'Leerfish', 'سمك الأكيا'), daily: true },
      { name: L('Somon KG', 'Salmon', 'سلمون'), daily: true },
      { name: L('Dülger KG', 'John Dory', 'سمك الديك (جون دوري)'), daily: true },
      { name: L('Çinekop KG', 'Young bluefish', 'لوفر صغير (تشينيكوب)'), daily: true },
      { name: L('Palamut Adet', 'Bonito (piece)', 'بلاميدة (بالحبة)'), daily: true },
      { name: L('Uskumru KG', 'Mackerel', 'إسقمري'), daily: true },
      { name: L('Kılıç KG', 'Marlin', 'سمك أبو سيف (مارلين)'), daily: true },
    ],
  },
  {
    id: 'alternatifler',
    title: L('Alternatifler', 'Alternative Dishes', 'أطباق بديلة'),
    items: [
      { name: L('Kuzu Pirzola', 'Lamb chops', 'ريش الضأن') },
      { name: L('Izgara Köfte', 'Grilled meatballs', 'كفتة مشوية') },
      { name: L('Tavuk Şiş', 'Chicken skewer', 'أسياخ الدجاج') },
    ],
  },
  {
    id: 'tatlilar',
    title: L('Tatlılar', 'Desserts', 'الحلويات'),
    items: [
      { name: L('Kabak Tatlısı', 'Pumpkin dessert', 'حلوى اليقطين') },
      { name: L('Ayva Tatlısı', 'Quince dessert', 'حلوى السفرجل') },
      { name: L('İrmik Tatlısı', 'Semolina dessert', 'حلوى السميد') },
      { name: L('Dondurmalı İrmik', 'Semolina dessert with ice cream', 'حلوى السميد بالآيس كريم') },
      { name: L('Sıcak Helva Tatlısı', 'Baked halva', 'حلاوة بالفرن') },
      { name: L('Sufle', 'Soufflé', 'سوفليه') },
      { name: L('Haşhaşlı Revani', 'Semolina cake with syrup', 'كيك السميد بالشراب (رواني)') },
      { name: L('Dilim Helva', 'Slice of halva', 'شريحة حلاوة') },
    ],
  },
];

// Convenience selectors (static MENU — used by the menu OG image).
export const featuredItems = (): MenuItem[] =>
  MENU.flatMap((c) => c.items.filter((i) => i.featured));

export const itemCount = (): number =>
  MENU.reduce((n, c) => n + c.items.length, 0);
