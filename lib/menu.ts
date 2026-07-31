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

/** Shown instead of a price when the item is not currently available. */
const YOK = 'Sezon balığı değildir';

// Real İzmir Balıkçısı menu with current prices (July 2026).
// Items without a price show the out-of-season note. AR is an editorial translation.
export const MENU: MenuCategory[] = [
  {
    id: 'corba',
    title: L('Çorba', 'Soups', 'الشوربة'),
    items: [
      { name: L('Balık Çorbası', 'Fish Soup', 'شوربة السمك'), price: '240' },
    ],
  },
  {
    id: 'yogurtlu-mezeler',
    title: L('Yoğurtlu Mezeler', 'Yogurt Appetizers', 'مقبلات بالزبادي'),
    items: [
      { name: L('Atom Borani', 'Smashed aubergine in yogurt seasoned with garlic, topped with hot pepper butter sauce', 'باذنجان مهروس بالزبادي والثوم مع صلصة الزبدة والفلفل الحار'), price: '290' },
      { name: L('Akdeniz', 'Thick yogurt, kale, lettuce seasoned with garlic', 'زبادي كثيف مع الكرنب والخس والثوم'), price: '260' },
      { name: L('Yoğurtlu Semizotu', 'Thick yogurt, purslane seasoned with garlic', 'زبادي كثيف مع البقلة والثوم'), price: '250' },
      { name: L('Havuç Tarator', 'Thick yogurt, fried carrots and almonds seasoned with garlic', 'زبادي كثيف مع الجزر المقلي واللوز والثوم'), price: '270' },
      { name: L('Haydari', 'Thick yogurt seasoned with garlic, mint and dill', 'زبادي كثيف بالثوم والنعناع والشبت'), price: '240' },
      { name: L('Kuru Cacık', 'Tzatziki', 'تزاتزيكي (لبن بالخيار والثوم)'), price: '250' },
      { name: L('Yoğurtlu Patlıcan', 'Thick yogurt with aubergine', 'زبادي كثيف مع الباذنجان'), price: '250' },
    ],
  },
  {
    id: 'bakliyatli-mezeler',
    title: L('Bakliyatlı Mezeler', 'Legume Appetizers', 'مقبلات البقوليات'),
    items: [
      { name: L('Fava', 'Mashed broad beans', 'فول مهروس (فافا)'), price: '270' },
      { name: L('Fava Tekmil', 'Mashed broad beans seasoned with dill', 'فول مهروس بالشبت'), price: '260' },
      { name: L('Humus', 'Hummus', 'حمص'), price: '270' },
      { name: L('Kuru Börülce', 'Dried black-eyed bean', 'لوبيا مجففة'), price: YOK },
    ],
  },
  {
    id: 'sebzeli-mezeler',
    title: L('Sebzeli Mezeler', 'Vegetable Appetizers', 'مقبلات الخضار'),
    items: [
      { name: L('Enginar', 'Artichoke', 'خرشوف'), price: '350' },
      { name: L('Acılı Ezme', 'Spicy tomato dip with pepper and onions', 'صلصة طماطم حارة بالفلفل والبصل'), price: '260' },
      { name: L('Babagannuş', 'Smoked aubergine', 'بابا غنوج (باذنجان مدخّن)'), price: '260' },
      { name: L('Patlıcan Salatası', 'Aubergine salad', 'سلطة الباذنجان'), price: '260' },
      { name: L('Şakşuka', 'Fried aubergine with tomato garlic sauce', 'باذنجان مقلي بصلصة الطماطم والثوم'), price: '260' },
      { name: L('Girit Ezme', 'Cretan dip', 'صلصة كريتية'), price: '290' },
      { name: L('Cunda Meze', 'Pepper sauce mixed with tulum cheese', 'صلصة الفلفل ممزوجة بجبن التولوم'), price: '290' },
      { name: L('Bal Kabağı Kızartması', 'Fried pumpkin slices', 'شرائح اليقطين المقلية'), price: '260' },
      { name: L('Deniz Börülcesi', 'Sea beans', 'الهليون البحري (ساليكورنيا)'), price: '280' },
      { name: L('Kaya Koruğu', 'Stone crop', 'حشيشة الجبل (كايا كوروغو)'), price: '250' },
      { name: L('Karışık Ot Tabağı', 'Plate with mixed vegetables', 'طبق أعشاب مشكّلة'), price: '280' },
      { name: L('Hardallı Patlıcan Salatası', 'Aubergine salad with mustard', 'سلطة الباذنجان بالخردل'), price: YOK },
      { name: L('Girit Patlıcan', 'Fried aubergine with tomato sauce', 'باذنجان مقلي بصلصة الطماطم'), price: '290' },
      { name: L('Kıbrıs Meze', 'Cyprus meze', 'مقبلات قبرصية'), price: '290' },
      { name: L('Girit Zeytin', 'Cretan olive', 'زيتون كريتي'), price: YOK },
      { name: L('Yeşil Zeytin', 'Green olive', 'زيتون أخضر'), price: '200' },
      { name: L('Izgara Zeytin', 'Grilled olive', 'زيتون مشوي'), price: YOK },
      { name: L('Pancar', 'Beetroot', 'شمندر'), price: '250' },
    ],
  },
  {
    id: 'ordovr',
    title: L('Ordövr Tabakları', "Hors D'oeuvre Plates", 'أطباق المقبلات'),
    items: [
      { name: L('Sebzeli Ordövr', "Hors d'oeuvre with vegetables", 'طبق مقبلات بالخضار'), price: '750' },
      { name: L('Deniz Ürünleri Ordövr', "Hors d'oeuvre with seafood", 'طبق مقبلات بالمأكولات البحرية'), price: '980' },
    ],
  },
  {
    id: 'salatalar',
    title: L('Salatalar', 'Salads', 'السلطات'),
    items: [
      { name: L('Mevsim Salata', 'Seasonal salad', 'سلطة موسمية'), price: '280' },
      { name: L('Çoban Salata', 'Shepherd salad', 'سلطة الراعي'), price: '280' },
      { name: L('Roka Salatası', 'Rocket salad', 'سلطة الجرجير'), price: '280' },
      { name: L('Gavurdağı Salatası', 'Chopped salad with pomegranate syrup and walnuts', 'سلطة مفرومة بدبس الرمان والجوز'), price: '300' },
      { name: L('Ton Balığı Salatası', 'Tuna salad', 'سلطة التونة'), price: '590' },
    ],
  },
  {
    id: 'deniz-meze',
    title: L('Deniz Mahsülleri Meze', 'Seafood Appetizers', 'مقبلات المأكولات البحرية'),
    items: [
      { name: L('Çiroz', 'Anchovy', 'أنشوجة مجففة (تشيروز)'), price: '350' },
      { name: L('Levrek Marin', 'Marinated sea bass', 'قاروص متبّل (مارينيه)'), price: '360' },
      { name: L('Hardallı Levrek Marin', 'Marinated sea bass with mustard sauce', 'قاروص متبّل بصلصة الخردل'), price: '360' },
      { name: L('Narlı Levrek Marin', 'Marinated sea bass with pomegranate', 'قاروص متبّل بالرمان'), price: YOK },
      { name: L('Akya Marin', 'Marinated leerfish', 'سمك الأكيا المتبّل'), price: '350' },
      { name: L('Karides Marin', 'Marinated shrimps', 'روبيان متبّل'), price: YOK },
      { name: L('Deniz Mahsülleri Salatası', 'Seafood salad', 'سلطة المأكولات البحرية'), price: '380' },
      { name: L('Hamsi Marin', 'Marinated anchovy', 'أنشوجة متبّلة'), price: '320' },
      { name: L('Midye Marin', 'Marinated mussels', 'بلح البحر المتبّل'), price: YOK },
      { name: L('Tütsülenmiş Somon', 'Smoked salmon', 'سلمون مدخّن'), price: YOK },
    ],
  },
  {
    id: 'ara-sicaklar',
    title: L('Ara Sıcaklar', 'Warm Starters', 'المقبلات الساخنة'),
    items: [
      { name: L('Kalamar Tava', 'Fried calamari', 'كاليماري مقلي'), price: '650' },
      { name: L('Kalamar Izgara', 'Grilled calamari', 'كاليماري مشوي'), price: '800' },
      { name: L('Karides Tava', 'Fried shrimps', 'روبيان مقلي'), price: '650' },
      { name: L('Karides Güveç Sebzeli', 'Shrimp casserole with vegetables', 'طاجن روبيان بالخضار'), price: '780' },
      { name: L('Ahtapot Izgara', 'Grilled octopus', 'أخطبوط مشوي'), price: '800' },
      { name: L('Sebzeli Ahtapot Tandır', 'Octopus tandoori with vegetables', 'أخطبوط بالفرن مع الخضار'), price: '980' },
      { name: L('Midye Tava', 'Fried mussels', 'بلح البحر المقلي'), price: '650' },
      { name: L('Balıkçı Böreği', 'Deep fried phyllo pastry with mixed seafood filling', 'بورك محشي بالمأكولات البحرية المشكّلة ومقلي'), price: '260' },
      { name: L('Kadayıflı Levrek Sarma', 'Kadayif wrapped sea bass', 'قاروص ملفوف بالكنافة'), price: '360' },
      { name: L('Balık Pane', 'Fried fish', 'سمك مقلي بالبقسماط'), price: '250' },
      { name: L('Patlıcan Pane', 'Fried aubergine', 'باذنجان مقلي بالبقسماط'), price: '350' },
      { name: L('Izgara Kaşarlı Mantar', 'Grilled mushrooms with cheese', 'فطر مشوي بالجبن'), price: '100' },
      { name: L('Yoğurtlu Sıcak Ot', 'Cooked vegetables with yogurt', 'خضار مطبوخة بالزبادي'), price: '350' },
      { name: L('Cips', 'French fries', 'بطاطا مقلية'), price: '250' },
      { name: L('Çıtır Karides', 'Crispy shrimps', 'روبيان مقرمش'), price: '200' },
      { name: L('Fish and Chips', 'Fish and Chips', 'سمك وبطاطا (فيش أند تشيبس)'), price: '780' },
      { name: L('Deniz Mahsülleri Güveç', 'Seafood casserole', 'طاجن المأكولات البحرية'), price: '980' },
    ],
  },
  {
    id: 'tava-baliklar',
    title: L('Tava Balıklar', 'Fried Fish', 'الأسماك المقلية'),
    items: [
      { name: L('Sardalya Tava', 'Fried sardines', 'سردين مقلي'), price: YOK },
      { name: L('İstavrit Tava', 'Fried horse mackerel', 'إسقمري حصان مقلي'), price: YOK },
      { name: L('Lopa Tava', 'Fried lopa', 'سمك اللوبا المقلي'), price: YOK },
      { name: L('Hamsi Tava', 'Fried anchovy', 'أنشوجة مقلية'), price: YOK },
      { name: L('Barbun Tava', 'Fried red mullet', 'سلطان إبراهيم مقلي'), price: '2700', unit: '₺/kg' },
      { name: L('Mezgit Tava', 'Fried whiting', 'سمك المرلان المقلي'), price: '1850', unit: '₺/kg' },
      { name: L('Balık Kavurması', 'Roasted fish', 'سمك محمّر'), price: '700' },
      { name: L('Deniz Mahsülleri Makarna', 'Pasta with seafood', 'معكرونة بالمأكولات البحرية'), price: '950' },
    ],
  },
  {
    id: 'izgara-baliklar',
    title: L('Izgara Balıklar', 'Grilled Fish', 'الأسماك المشوية'),
    subtitle: L('Kilogram fiyatıdır', 'Priced per kilogram', 'الأسعار بالكيلوغرام'),
    items: [
      { name: L('Laos Şiş', 'Grouper skewer', 'أسياخ الهامور'), price: '720' },
      { name: L('Levrek Lokum', 'Sea bass cubes', 'مكعبات القاروص'), price: '1350', unit: '₺/kg' },
      { name: L('Deniz Levreği KG', 'Sea bass', 'قاروص بحري'), price: '1850', unit: '₺/kg' },
      { name: L('Deniz Çupra KG', 'Sea bream', 'دنيس بحري'), price: '1750', unit: '₺/kg' },
      { name: L('Kaya Levreği KG', 'Stone bass', 'قاروص صخري'), price: '1650', unit: '₺/kg' },
      { name: L('Minakop KG', 'Corb fish', 'سمك المنقوس'), price: '1850', unit: '₺/kg' },
      { name: L('Mercan KG', 'Sea bream', 'مرجان'), price: '2200', unit: '₺/kg' },
      { name: L('Turna KG', 'Pike', 'سمك الكراكي'), price: YOK },
      { name: L('Akya KG', 'Leerfish', 'سمك الأكيا'), price: '1850', unit: '₺/kg' },
      { name: L('Somon KG', 'Salmon', 'سلمون'), price: '1900', unit: '₺/kg' },
      { name: L('Dülger KG', 'John Dory', 'سمك الديك (جون دوري)'), price: YOK },
      { name: L('Çinekop KG', 'Young bluefish', 'لوفر صغير (تشينيكوب)'), price: YOK },
      { name: L('Palamut Adet', 'Bonito (piece)', 'بلاميدة (بالحبة)'), price: YOK },
      { name: L('Uskumru KG', 'Mackerel', 'إسقمري'), price: '1350', unit: '₺/kg' },
      { name: L('Kılıç KG', 'Marlin', 'سمك أبو سيف (مارلين)'), price: YOK },
    ],
  },
  {
    id: 'alternatifler',
    title: L('Alternatifler', 'Alternative Dishes', 'أطباق بديلة'),
    items: [
      { name: L('Kuzu Pirzola', 'Lamb chops', 'ريش الضأن'), price: YOK },
      { name: L('Izgara Köfte', 'Grilled meatballs', 'كفتة مشوية'), price: '650' },
      { name: L('Tavuk Şiş', 'Chicken skewer', 'أسياخ الدجاج'), price: '650' },
    ],
  },
  {
    id: 'tatlilar',
    title: L('Tatlılar', 'Desserts', 'الحلويات'),
    items: [
      { name: L('Kabak Tatlısı', 'Pumpkin dessert', 'حلوى اليقطين'), price: '290' },
      { name: L('Ayva Tatlısı', 'Quince dessert', 'حلوى السفرجل'), price: YOK },
      { name: L('İrmik Tatlısı', 'Semolina dessert', 'حلوى السميد'), price: '290' },
      { name: L('Dondurmalı İrmik', 'Semolina dessert with ice cream', 'حلوى السميد بالآيس كريم'), price: '300' },
      { name: L('Sıcak Helva Tatlısı', 'Baked halva', 'حلاوة بالفرن'), price: '320' },
      { name: L('Sufle', 'Soufflé', 'سوفليه'), price: '350' },
      { name: L('Haşhaşlı Revani', 'Semolina cake with syrup', 'كيك السميد بالشراب (رواني)'), price: '200' },
      { name: L('Dilim Helva', 'Slice of halva', 'شريحة حلاوة'), price: '150' },
    ],
  },
  {
    id: 'mesrubatlar',
    title: L('Meşrubatlar', 'Beverages', 'المشروبات'),
    items: [
      { name: L('Kola', 'Cola', 'كولا'), price: '120' },
      { name: L('Zero Kola', 'Zero Cola', 'كولا زيرو'), price: '120' },
      { name: L('Fanta', 'Fanta', 'فانتا'), price: '120' },
      { name: L('Sprite', 'Sprite', 'سبرايت'), price: '120' },
      { name: L('Gazoz Çeşitleri', 'Assorted sodas', 'أنواع الغازوز'), price: '120' },
      { name: L('Fuse Tea Limon', 'Fuse Tea Lemon', 'فيوز تي ليمون'), price: '120' },
      { name: L('Fuse Tea Şeftali', 'Fuse Tea Peach', 'فيوز تي خوخ'), price: '120' },
      { name: L('Acılı Şalgam', 'Spicy turnip juice', 'عصير شلغم حار'), price: '110' },
      { name: L('Acısız Şalgam', 'Mild turnip juice', 'عصير شلغم غير حار'), price: '110' },
      { name: L('Sıkma Portakal Suyu', 'Fresh orange juice', 'عصير برتقال طازج'), price: '180' },
      { name: L('Soda', 'Sparkling water', 'صودا'), price: '50' },
      { name: L('Büyük Su', 'Large water', 'مياه كبيرة'), price: '70' },
      { name: L('Küçük Su', 'Small water', 'مياه صغيرة'), price: '25' },
    ],
  },
];

// Convenience selectors (static MENU — used by the menu OG image).
export const featuredItems = (): MenuItem[] =>
  MENU.flatMap((c) => c.items.filter((i) => i.featured));

export const itemCount = (): number =>
  MENU.reduce((n, c) => n + c.items.length, 0);
