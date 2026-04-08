import type { Region } from "../types";

/**
 * The 14 top-level administrative units of the Republic of Uzbekistan.
 *
 * Sorted by ISO 3166-2:UZ code for stability. Names and titles are sourced
 * from the official SDMX dataset 2.01.01.0036 published by the State
 * Statistics Committee of the Republic of Uzbekistan.
 *
 * @see https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_307.pdf
 * @see https://en.wikipedia.org/wiki/ISO_3166-2:UZ
 */
export const regions = [
  {
    slug: "andijan",
    iso: "UZ-AN",
    category: "region",
    names: {
      en: "Andijan",
      uz: "Andijon",
      uzc: "Андижон",
      ru: "Андижан",
    },
    titles: {
      en: "Andijan Region",
      uz: "Andijon viloyati",
      uzc: "Андижон вилояти",
      ru: "Андижанская область",
    },
  },
  {
    slug: "bukhara",
    iso: "UZ-BU",
    category: "region",
    names: {
      en: "Bukhara",
      uz: "Buxoro",
      uzc: "Бухоро",
      ru: "Бухара",
    },
    titles: {
      en: "Bukhara Region",
      uz: "Buxoro viloyati",
      uzc: "Бухоро вилояти",
      ru: "Бухарская область",
    },
  },
  {
    slug: "fergana",
    iso: "UZ-FA",
    category: "region",
    names: {
      en: "Fergana",
      uz: "Farg'ona",
      uzc: "Фарғона",
      ru: "Фергана",
    },
    titles: {
      en: "Fergana Region",
      uz: "Farg'ona viloyati",
      uzc: "Фарғона вилояти",
      ru: "Ферганская область",
    },
  },
  {
    slug: "jizzakh",
    iso: "UZ-JI",
    category: "region",
    names: {
      en: "Jizzakh",
      uz: "Jizzax",
      uzc: "Жиззах",
      ru: "Джизак",
    },
    titles: {
      en: "Jizzakh Region",
      uz: "Jizzax viloyati",
      uzc: "Жиззах вилояти",
      ru: "Джизакская область",
    },
  },
  {
    slug: "namangan",
    iso: "UZ-NG",
    category: "region",
    names: {
      en: "Namangan",
      uz: "Namangan",
      uzc: "Наманган",
      ru: "Наманган",
    },
    titles: {
      en: "Namangan Region",
      uz: "Namangan viloyati",
      uzc: "Наманган вилояти",
      ru: "Наманганская область",
    },
  },
  {
    slug: "navoi",
    iso: "UZ-NW",
    category: "region",
    names: {
      en: "Navoi",
      uz: "Navoiy",
      uzc: "Навоий",
      ru: "Навои",
    },
    titles: {
      en: "Navoi Region",
      uz: "Navoiy viloyati",
      uzc: "Навоий вилояти",
      ru: "Навоийская область",
    },
  },
  {
    slug: "kashkadarya",
    iso: "UZ-QA",
    category: "region",
    names: {
      en: "Kashkadarya",
      uz: "Qashqadaryo",
      uzc: "Қашқадарё",
      ru: "Кашкадарья",
    },
    titles: {
      en: "Kashkadarya Region",
      uz: "Qashqadaryo viloyati",
      uzc: "Қашқадарё вилояти",
      ru: "Кашкадарьинская область",
    },
  },
  {
    slug: "karakalpakstan",
    iso: "UZ-QR",
    category: "republic",
    names: {
      en: "Karakalpakstan",
      uz: "Qoraqalpog'iston",
      uzc: "Қорақалпоғистон",
      ru: "Каракалпакстан",
    },
    titles: {
      en: "Republic of Karakalpakstan",
      uz: "Qoraqalpog'iston Respublikasi",
      uzc: "Қорақалпоғистон Республикаси",
      ru: "Республика Каракалпакстан",
    },
  },
  {
    slug: "samarkand",
    iso: "UZ-SA",
    category: "region",
    names: {
      en: "Samarkand",
      uz: "Samarqand",
      uzc: "Самарқанд",
      ru: "Самарканд",
    },
    titles: {
      en: "Samarkand Region",
      uz: "Samarqand viloyati",
      uzc: "Самарқанд вилояти",
      ru: "Самаркандская область",
    },
  },
  {
    slug: "syrdarya",
    iso: "UZ-SI",
    category: "region",
    names: {
      en: "Syrdarya",
      uz: "Sirdaryo",
      uzc: "Сирдарё",
      ru: "Сырдарья",
    },
    titles: {
      en: "Syrdarya Region",
      uz: "Sirdaryo viloyati",
      uzc: "Сирдарё вилояти",
      ru: "Сырдарьинская область",
    },
  },
  {
    slug: "surkhandarya",
    iso: "UZ-SU",
    category: "region",
    names: {
      en: "Surkhandarya",
      uz: "Surxondaryo",
      uzc: "Сурхондарё",
      ru: "Сурхандарья",
    },
    titles: {
      en: "Surkhandarya Region",
      uz: "Surxondaryo viloyati",
      uzc: "Сурхондарё вилояти",
      ru: "Сурхандарьинская область",
    },
  },
  {
    slug: "tashkent_city",
    iso: "UZ-TK",
    category: "city",
    names: {
      en: "Tashkent",
      uz: "Toshkent",
      uzc: "Тошкент",
      ru: "Ташкент",
    },
    titles: {
      en: "Tashkent City",
      uz: "Toshkent shahri",
      uzc: "Тошкент шаҳри",
      ru: "Город Ташкент",
    },
  },
  {
    slug: "tashkent",
    iso: "UZ-TO",
    category: "region",
    names: {
      en: "Tashkent",
      uz: "Toshkent",
      uzc: "Тошкент",
      ru: "Ташкент",
    },
    titles: {
      en: "Tashkent Region",
      uz: "Toshkent viloyati",
      uzc: "Тошкент вилояти",
      ru: "Ташкентская область",
    },
  },
  {
    slug: "khorezm",
    iso: "UZ-XO",
    category: "region",
    names: {
      en: "Khorezm",
      uz: "Xorazm",
      uzc: "Хоразм",
      ru: "Хорезм",
    },
    titles: {
      en: "Khorezm Region",
      uz: "Xorazm viloyati",
      uzc: "Хоразм вилояти",
      ru: "Хорезмская область",
    },
  },
] as const satisfies readonly Region[];
