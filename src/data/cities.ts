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
export const cities = [
  // ===== Andijan (UZ-AN) — 2 cities =====
  {
    slug: "andijan_city",
    type: "city",
    regionSlug: "andijan",
    regionIso: "UZ-AN",
    names: { en: "Andijan", uz: "Andijon", uzc: "Андижон", ru: "Андижан" },
  },
  {
    slug: "khanabad_city",
    type: "city",
    regionSlug: "andijan",
    regionIso: "UZ-AN",
    names: { en: "Khanabad", uz: "Xonobod", uzc: "Хонобод", ru: "Ханабад" },
  },

  // ===== Bukhara (UZ-BU) — 2 cities =====
  {
    slug: "bukhara_city",
    type: "city",
    regionSlug: "bukhara",
    regionIso: "UZ-BU",
    names: { en: "Bukhara", uz: "Buxoro", uzc: "Бухоро", ru: "Бухара" },
  },
  {
    slug: "kagan_city",
    type: "city",
    regionSlug: "bukhara",
    regionIso: "UZ-BU",
    names: { en: "Kagan", uz: "Kogon", uzc: "Когон", ru: "Каган" },
  },

  // ===== Fergana (UZ-FA) — 4 cities =====
  {
    slug: "fergana_city",
    type: "city",
    regionSlug: "fergana",
    regionIso: "UZ-FA",
    names: { en: "Fergana", uz: "Farg'ona", uzc: "Фарғона", ru: "Фергана" },
  },
  {
    slug: "kokand_city",
    type: "city",
    regionSlug: "fergana",
    regionIso: "UZ-FA",
    names: { en: "Kokand", uz: "Qo'qon", uzc: "Қўқон", ru: "Коканд" },
  },
  {
    slug: "kuvasay_city",
    type: "city",
    regionSlug: "fergana",
    regionIso: "UZ-FA",
    names: { en: "Kuvasay", uz: "Quvasoy", uzc: "Қувасой", ru: "Кувасай" },
  },
  {
    slug: "margilan_city",
    type: "city",
    regionSlug: "fergana",
    regionIso: "UZ-FA",
    names: { en: "Margilan", uz: "Marg'ilon", uzc: "Марғилон", ru: "Маргилан" },
  },

  // ===== Jizzakh (UZ-JI) — 1 city =====
  {
    slug: "jizzakh_city",
    type: "city",
    regionSlug: "jizzakh",
    regionIso: "UZ-JI",
    names: { en: "Jizzakh", uz: "Jizzax", uzc: "Жиззах", ru: "Джизак" },
  },

  // ===== Namangan (UZ-NG) — 1 city =====
  {
    slug: "namangan_city",
    type: "city",
    regionSlug: "namangan",
    regionIso: "UZ-NG",
    names: { en: "Namangan", uz: "Namangan", uzc: "Наманган", ru: "Наманган" },
  },

  // ===== Navoi (UZ-NW) — 3 cities =====
  {
    slug: "navoi_city",
    type: "city",
    regionSlug: "navoi",
    regionIso: "UZ-NW",
    names: { en: "Navoi", uz: "Navoiy", uzc: "Навоий", ru: "Навои" },
  },
  {
    slug: "zarafshan_city",
    type: "city",
    regionSlug: "navoi",
    regionIso: "UZ-NW",
    names: { en: "Zarafshan", uz: "Zarafshon", uzc: "Зарафшон", ru: "Зарафшан" },
  },
  {
    slug: "gazgan_city",
    type: "city",
    regionSlug: "navoi",
    regionIso: "UZ-NW",
    names: { en: "Gazgan", uz: "G'ozg'on", uzc: "Ғозғон", ru: "Газган" },
  },

  // ===== Kashkadarya (UZ-QA) — 2 cities =====
  {
    slug: "karshi_city",
    type: "city",
    regionSlug: "kashkadarya",
    regionIso: "UZ-QA",
    names: { en: "Karshi", uz: "Qarshi", uzc: "Қарши", ru: "Карши" },
  },
  {
    slug: "shakhrisabz_city",
    type: "city",
    regionSlug: "kashkadarya",
    regionIso: "UZ-QA",
    names: { en: "Shakhrisabz", uz: "Shahrisabz", uzc: "Шаҳрисабз", ru: "Шахрисабз" },
  },

  // ===== Karakalpakstan (UZ-QR) — 1 city =====
  {
    slug: "nukus_city",
    type: "city",
    regionSlug: "karakalpakstan",
    regionIso: "UZ-QR",
    names: { en: "Nukus", uz: "Nukus", uzc: "Нукус", ru: "Нукус" },
  },

  // ===== Samarkand (UZ-SA) — 2 cities =====
  {
    slug: "samarkand_city",
    type: "city",
    regionSlug: "samarkand",
    regionIso: "UZ-SA",
    names: { en: "Samarkand", uz: "Samarqand", uzc: "Самарқанд", ru: "Самарканд" },
  },
  {
    slug: "kattakurgan_city",
    type: "city",
    regionSlug: "samarkand",
    regionIso: "UZ-SA",
    names: { en: "Kattakurgan", uz: "Kattaqo'rg'on", uzc: "Каттақўрғон", ru: "Каттакурган" },
  },

  // ===== Syrdarya (UZ-SI) — 3 cities =====
  {
    slug: "gulistan_city",
    type: "city",
    regionSlug: "syrdarya",
    regionIso: "UZ-SI",
    names: { en: "Gulistan", uz: "Guliston", uzc: "Гулистон", ru: "Гулистан" },
  },
  {
    slug: "shirin_city",
    type: "city",
    regionSlug: "syrdarya",
    regionIso: "UZ-SI",
    names: { en: "Shirin", uz: "Shirin", uzc: "Ширин", ru: "Ширин" },
  },
  {
    slug: "yangier_city",
    type: "city",
    regionSlug: "syrdarya",
    regionIso: "UZ-SI",
    names: { en: "Yangier", uz: "Yangiyer", uzc: "Янгийер", ru: "Янгиер" },
  },

  // ===== Surkhandarya (UZ-SU) — 1 city =====
  {
    slug: "termiz_city",
    type: "city",
    regionSlug: "surkhandarya",
    regionIso: "UZ-SU",
    names: { en: "Termiz", uz: "Termiz", uzc: "Термиз", ru: "Термез" },
  },

  // ===== Tashkent Region (UZ-TO) — 7 cities =====
  {
    slug: "nurafshan_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Nurafshan", uz: "Nurafshon", uzc: "Нурафшон", ru: "Нурафшан" },
  },
  {
    slug: "almalyk_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Almalyk", uz: "Olmaliq", uzc: "Олмалиқ", ru: "Алмалык" },
  },
  {
    slug: "angren_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Angren", uz: "Angren", uzc: "Ангрен", ru: "Ангрен" },
  },
  {
    slug: "bekabad_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Bekabad", uz: "Bekobod", uzc: "Бекобод", ru: "Бекабад" },
  },
  {
    slug: "chirchik_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Chirchik", uz: "Chirchiq", uzc: "Чирчиқ", ru: "Чирчик" },
  },
  {
    slug: "akhangaran_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Akhangaran", uz: "Ohangaron", uzc: "Оҳангарон", ru: "Ахангаран" },
  },
  {
    slug: "yangiyul_city",
    type: "city",
    regionSlug: "tashkent",
    regionIso: "UZ-TO",
    names: { en: "Yangiyul", uz: "Yangiyo'l", uzc: "Янгийўл", ru: "Янгиюль" },
  },

  // ===== Khorezm (UZ-XO) — 2 cities =====
  {
    slug: "urgench_city",
    type: "city",
    regionSlug: "khorezm",
    regionIso: "UZ-XO",
    names: { en: "Urgench", uz: "Urganch", uzc: "Урганч", ru: "Ургенч" },
  },
  {
    slug: "khiva_city",
    type: "city",
    regionSlug: "khorezm",
    regionIso: "UZ-XO",
    names: { en: "Khiva", uz: "Xiva", uzc: "Хива", ru: "Хива" },
  },
] as const satisfies readonly RegionalCity[];
