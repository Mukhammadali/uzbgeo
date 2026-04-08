import type { RegionalCity } from "../types";

/**
 * All cities of regional significance (shahar) in the Republic of Uzbekistan.
 *
 * These are administratively parallel to districts (tumani), not nested
 * inside them. Total: 31 entries.
 *
 * Slugs are suffixed with `_city` to make them self-disclosing and to
 * avoid confusion with same-named districts (e.g., the city of Bukhara
 * has slug `bukhara_city`, while the surrounding rural district has slug
 * `bukhara` in `districts.ts`).
 *
 * The city of Tashkent is NOT in this list — it is itself a top-level
 * administrative unit (`tashkent_city` in `regions.ts`).
 *
 * @see https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_307.pdf
 */
export const cities: readonly RegionalCity[] = [
  // ===== Andijan (UZ-AN) — 2 cities =====
  {
    slug: "andijan_city",
    type: "city",
    regionSlug: "andijan",
    regionIso: "UZ-AN",
    names: { en: "Andijan", uz: "Andijon", uzc: "Андижон", ru: "Андижан" },
    titles: {
      en: "Andijan City",
      uz: "Andijon shahri",
      uzc: "Андижон шаҳри",
      ru: "Город Андижан",
    },
  },
  {
    slug: "khanabad_city",
    type: "city",
    regionSlug: "andijan",
    regionIso: "UZ-AN",
    names: { en: "Khanabad", uz: "Xonobod", uzc: "Хонобод", ru: "Ханабад" },
    titles: {
      en: "Khanabad City",
      uz: "Xonobod shahri",
      uzc: "Хонобод шаҳри",
      ru: "Город Ханабад",
    },
  },

  // ===== Bukhara (UZ-BU) — 2 cities =====
  {
    slug: "bukhara_city",
    type: "city",
    regionSlug: "bukhara",
    regionIso: "UZ-BU",
    names: { en: "Bukhara", uz: "Buxoro", uzc: "Бухоро", ru: "Бухара" },
    titles: {
      en: "Bukhara City",
      uz: "Buxoro shahri",
      uzc: "Бухоро шаҳри",
      ru: "Город Бухара",
    },
  },
  {
    slug: "kagan_city",
    type: "city",
    regionSlug: "bukhara",
    regionIso: "UZ-BU",
    names: { en: "Kagan", uz: "Kogon", uzc: "Когон", ru: "Каган" },
    titles: {
      en: "Kagan City",
      uz: "Kogon shahri",
      uzc: "Когон шаҳри",
      ru: "Город Каган",
    },
  },

  // ===== Fergana (UZ-FA) — 4 cities =====
  {
    slug: "fergana_city",
    type: "city",
    regionSlug: "fergana",
    regionIso: "UZ-FA",
    names: { en: "Fergana", uz: "Farg'ona", uzc: "Фарғона", ru: "Фергана" },
    titles: {
      en: "Fergana City",
      uz: "Farg'ona shahri",
      uzc: "Фарғона шаҳри",
      ru: "Город Фергана",
    },
  },
  {
    slug: "kokand_city",
    type: "city",
    regionSlug: "fergana",
    regionIso: "UZ-FA",
    names: { en: "Kokand", uz: "Qo'qon", uzc: "Қўқон", ru: "Коканд" },
    titles: {
      en: "Kokand City",
      uz: "Qo'qon shahri",
      uzc: "Қўқон шаҳри",
      ru: "Город Коканд",
    },
  },
  {
    slug: "kuvasay_city",
    type: "city",
    regionSlug: "fergana",
    regionIso: "UZ-FA",
    names: { en: "Kuvasay", uz: "Quvasoy", uzc: "Қувасой", ru: "Кувасай" },
    titles: {
      en: "Kuvasay City",
      uz: "Quvasoy shahri",
      uzc: "Қувасой шаҳри",
      ru: "Город Кувасай",
    },
  },
  {
    slug: "margilan_city",
    type: "city",
    regionSlug: "fergana",
    regionIso: "UZ-FA",
    names: { en: "Margilan", uz: "Marg'ilon", uzc: "Марғилон", ru: "Маргилан" },
    titles: {
      en: "Margilan City",
      uz: "Marg'ilon shahri",
      uzc: "Марғилон шаҳри",
      ru: "Город Маргилан",
    },
  },

  // ===== Jizzakh (UZ-JI) — 1 city =====
  {
    slug: "jizzakh_city",
    type: "city",
    regionSlug: "jizzakh",
    regionIso: "UZ-JI",
    names: { en: "Jizzakh", uz: "Jizzax", uzc: "Жиззах", ru: "Джизак" },
    titles: {
      en: "Jizzakh City",
      uz: "Jizzax shahri",
      uzc: "Жиззах шаҳри",
      ru: "Город Джизак",
    },
  },

  // ===== Namangan (UZ-NG) — 1 city =====
  {
    slug: "namangan_city",
    type: "city",
    regionSlug: "namangan",
    regionIso: "UZ-NG",
    names: { en: "Namangan", uz: "Namangan", uzc: "Наманган", ru: "Наманган" },
    titles: {
      en: "Namangan City",
      uz: "Namangan shahri",
      uzc: "Наманган шаҳри",
      ru: "Город Наманган",
    },
  },

  // ===== Navoi (UZ-NW) — 3 cities =====
  {
    slug: "navoi_city",
    type: "city",
    regionSlug: "navoi",
    regionIso: "UZ-NW",
    names: { en: "Navoi", uz: "Navoiy", uzc: "Навоий", ru: "Навои" },
    titles: {
      en: "Navoi City",
      uz: "Navoiy shahri",
      uzc: "Навоий шаҳри",
      ru: "Город Навои",
    },
  },
  {
    slug: "zarafshan_city",
    type: "city",
    regionSlug: "navoi",
    regionIso: "UZ-NW",
    names: { en: "Zarafshan", uz: "Zarafshon", uzc: "Зарафшон", ru: "Зарафшан" },
    titles: {
      en: "Zarafshan City",
      uz: "Zarafshon shahri",
      uzc: "Зарафшон шаҳри",
      ru: "Город Зарафшан",
    },
  },
  {
    slug: "gazgan_city",
    type: "city",
    regionSlug: "navoi",
    regionIso: "UZ-NW",
    names: { en: "Gazgan", uz: "G'ozg'on", uzc: "Ғозғон", ru: "Газган" },
    titles: {
      en: "Gazgan City",
      uz: "G'ozg'on shahri",
      uzc: "Ғозғон шаҳри",
      ru: "Город Газган",
    },
  },

  // ===== Kashkadarya (UZ-QA) — 2 cities =====
  {
    slug: "karshi_city",
    type: "city",
    regionSlug: "kashkadarya",
    regionIso: "UZ-QA",
    names: { en: "Karshi", uz: "Qarshi", uzc: "Қарши", ru: "Карши" },
    titles: {
      en: "Karshi City",
      uz: "Qarshi shahri",
      uzc: "Қарши шаҳри",
      ru: "Город Карши",
    },
  },
  {
    slug: "shakhrisabz_city",
    type: "city",
    regionSlug: "kashkadarya",
    regionIso: "UZ-QA",
    names: { en: "Shakhrisabz", uz: "Shahrisabz", uzc: "Шаҳрисабз", ru: "Шахрисабз" },
    titles: {
      en: "Shakhrisabz City",
      uz: "Shahrisabz shahri",
      uzc: "Шаҳрисабз шаҳри",
      ru: "Город Шахрисабз",
    },
  },

  // ===== Karakalpakstan (UZ-QR) — 1 city =====
  {
    slug: "nukus_city",
    type: "city",
    regionSlug: "karakalpakstan",
    regionIso: "UZ-QR",
    names: { en: "Nukus", uz: "Nukus", uzc: "Нукус", ru: "Нукус" },
    titles: {
      en: "Nukus City",
      uz: "Nukus shahri",
      uzc: "Нукус шаҳри",
      ru: "Город Нукус",
    },
  },

  // ===== Samarkand (UZ-SA) — 2 cities =====
  {
    slug: "samarkand_city",
    type: "city",
    regionSlug: "samarkand",
    regionIso: "UZ-SA",
    names: { en: "Samarkand", uz: "Samarqand", uzc: "Самарқанд", ru: "Самарканд" },
    titles: {
      en: "Samarkand City",
      uz: "Samarqand shahri",
      uzc: "Самарқанд шаҳри",
      ru: "Город Самарканд",
    },
  },
  {
    slug: "kattakurgan_city",
    type: "city",
    regionSlug: "samarkand",
    regionIso: "UZ-SA",
    names: { en: "Kattakurgan", uz: "Kattaqo'rg'on", uzc: "Каттақўрғон", ru: "Каттакурган" },
    titles: {
      en: "Kattakurgan City",
      uz: "Kattaqo'rg'on shahri",
      uzc: "Каттақўрғон шаҳри",
      ru: "Город Каттакурган",
    },
  },

  // ===== Syrdarya (UZ-SI) — 3 cities =====
  {
    slug: "gulistan_city",
    type: "city",
    regionSlug: "syrdarya",
    regionIso: "UZ-SI",
    names: { en: "Gulistan", uz: "Guliston", uzc: "Гулистон", ru: "Гулистан" },
    titles: {
      en: "Gulistan City",
      uz: "Guliston shahri",
      uzc: "Гулистон шаҳри",
      ru: "Город Гулистан",
    },
  },
  {
    slug: "shirin_city",
    type: "city",
    regionSlug: "syrdarya",
    regionIso: "UZ-SI",
    names: { en: "Shirin", uz: "Shirin", uzc: "Ширин", ru: "Ширин" },
    titles: {
      en: "Shirin City",
      uz: "Shirin shahri",
      uzc: "Ширин шаҳри",
      ru: "Город Ширин",
    },
  },
  {
    slug: "yangier_city",
    type: "city",
    regionSlug: "syrdarya",
    regionIso: "UZ-SI",
    names: { en: "Yangier", uz: "Yangiyer", uzc: "Янгийер", ru: "Янгиер" },
    titles: {
      en: "Yangier City",
      uz: "Yangiyer shahri",
      uzc: "Янгийер шаҳри",
      ru: "Город Янгиер",
    },
  },

  // ===== Surkhandarya (UZ-SU) — 1 city =====
  {
    slug: "termiz_city",
    type: "city",
    regionSlug: "surkhandarya",
    regionIso: "UZ-SU",
    names: { en: "Termiz", uz: "Termiz", uzc: "Термиз", ru: "Термез" },
    titles: {
      en: "Termiz City",
      uz: "Termiz shahri",
      uzc: "Термиз шаҳри",
      ru: "Город Термез",
    },
  },

  // ===== Tashkent Region (UZ-TO) — 7 cities =====
  {
    slug: "nurafshan_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Nurafshan", uz: "Nurafshon", uzc: "Нурафшон", ru: "Нурафшан" },
    titles: {
      en: "Nurafshan City",
      uz: "Nurafshon shahri",
      uzc: "Нурафшон шаҳри",
      ru: "Город Нурафшан",
    },
  },
  {
    slug: "almalyk_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Almalyk", uz: "Olmaliq", uzc: "Олмалиқ", ru: "Алмалык" },
    titles: {
      en: "Almalyk City",
      uz: "Olmaliq shahri",
      uzc: "Олмалиқ шаҳри",
      ru: "Город Алмалык",
    },
  },
  {
    slug: "angren_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Angren", uz: "Angren", uzc: "Ангрен", ru: "Ангрен" },
    titles: {
      en: "Angren City",
      uz: "Angren shahri",
      uzc: "Ангрен шаҳри",
      ru: "Город Ангрен",
    },
  },
  {
    slug: "bekabad_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Bekabad", uz: "Bekobod", uzc: "Бекобод", ru: "Бекабад" },
    titles: {
      en: "Bekabad City",
      uz: "Bekobod shahri",
      uzc: "Бекобод шаҳри",
      ru: "Город Бекабад",
    },
  },
  {
    slug: "chirchik_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Chirchik", uz: "Chirchiq", uzc: "Чирчиқ", ru: "Чирчик" },
    titles: {
      en: "Chirchik City",
      uz: "Chirchiq shahri",
      uzc: "Чирчиқ шаҳри",
      ru: "Город Чирчик",
    },
  },
  {
    slug: "akhangaran_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Akhangaran", uz: "Ohangaron", uzc: "Оҳангарон", ru: "Ахангаран" },
    titles: {
      en: "Akhangaran City",
      uz: "Ohangaron shahri",
      uzc: "Оҳангарон шаҳри",
      ru: "Город Ахангаран",
    },
  },
  {
    slug: "yangiyul_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Yangiyul", uz: "Yangiyo'l", uzc: "Янгийўл", ru: "Янгиюль" },
    titles: {
      en: "Yangiyul City",
      uz: "Yangiyo'l shahri",
      uzc: "Янгийўл шаҳри",
      ru: "Город Янгиюль",
    },
  },

  // ===== Khorezm (UZ-XO) — 2 cities =====
  {
    slug: "urgench_city",
    type: "city",
    regionSlug: "khorezm",
    regionIso: "UZ-XO",
    names: { en: "Urgench", uz: "Urganch", uzc: "Урганч", ru: "Ургенч" },
    titles: {
      en: "Urgench City",
      uz: "Urganch shahri",
      uzc: "Урганч шаҳри",
      ru: "Город Ургенч",
    },
  },
  {
    slug: "khiva_city",
    type: "city",
    regionSlug: "khorezm",
    regionIso: "UZ-XO",
    names: { en: "Khiva", uz: "Xiva", uzc: "Хива", ru: "Хива" },
    titles: {
      en: "Khiva City",
      uz: "Xiva shahri",
      uzc: "Хива шаҳри",
      ru: "Город Хива",
    },
  },
];
