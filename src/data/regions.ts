import type { Region } from "../types";

/**
 * The 14 top-level administrative units of the Republic of Uzbekistan.
 *
 * Sorted by ISO 3166-2:UZ code for stability. Names are sourced from the
 * official SDMX dataset 2.01.01.0036 published by the State Statistics
 * Committee of the Republic of Uzbekistan.
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
  },
] as const satisfies readonly Region[];
