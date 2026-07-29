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
export const regions: readonly Region[] = [
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
    locatives: {
      name: { en: "in Andijan", uz: "Andijonda", uzc: "Андижонда", ru: "в Андижане" },
      title: { en: "in the Andijan Region", uz: "Andijon viloyatida", uzc: "Андижон вилоятида", ru: "в Андижанской области" },
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
    locatives: {
      name: { en: "in Bukhara", uz: "Buxoroda", uzc: "Бухорода", ru: "в Бухаре" },
      title: { en: "in the Bukhara Region", uz: "Buxoro viloyatida", uzc: "Бухоро вилоятида", ru: "в Бухарской области" },
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
    locatives: {
      name: { en: "in Fergana", uz: "Farg'onada", uzc: "Фарғонада", ru: "в Фергане" },
      title: { en: "in the Fergana Region", uz: "Farg'ona viloyatida", uzc: "Фарғона вилоятида", ru: "в Ферганской области" },
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
    locatives: {
      name: { en: "in Jizzakh", uz: "Jizzaxda", uzc: "Жиззахда", ru: "в Джизаке" },
      title: { en: "in the Jizzakh Region", uz: "Jizzax viloyatida", uzc: "Жиззах вилоятида", ru: "в Джизакской области" },
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
    locatives: {
      name: { en: "in Namangan", uz: "Namanganda", uzc: "Наманганда", ru: "в Намангане" },
      title: { en: "in the Namangan Region", uz: "Namangan viloyatida", uzc: "Наманган вилоятида", ru: "в Наманганской области" },
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
    locatives: {
      name: { en: "in Navoi", uz: "Navoiyda", uzc: "Навоийда", ru: "в Навои" },
      title: { en: "in the Navoi Region", uz: "Navoiy viloyatida", uzc: "Навоий вилоятида", ru: "в Навоийской области" },
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
    locatives: {
      name: { en: "in Kashkadarya", uz: "Qashqadaryoda", uzc: "Қашқадарёда", ru: "в Кашкадарье" },
      title: { en: "in the Kashkadarya Region", uz: "Qashqadaryo viloyatida", uzc: "Қашқадарё вилоятида", ru: "в Кашкадарьинской области" },
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
    locatives: {
      name: { en: "in Karakalpakstan", uz: "Qoraqalpog'istonda", uzc: "Қорақалпоғистонда", ru: "в Каракалпакстане" },
      title: { en: "in the Republic of Karakalpakstan", uz: "Qoraqalpog'iston Respublikasida", uzc: "Қорақалпоғистон Республикасида", ru: "в Республике Каракалпакстан" },
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
    locatives: {
      name: { en: "in Samarkand", uz: "Samarqandda", uzc: "Самарқандда", ru: "в Самарканде" },
      title: { en: "in the Samarkand Region", uz: "Samarqand viloyatida", uzc: "Самарқанд вилоятида", ru: "в Самаркандской области" },
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
    locatives: {
      name: { en: "in Syrdarya", uz: "Sirdaryoda", uzc: "Сирдарёда", ru: "в Сырдарье" },
      title: { en: "in the Syrdarya Region", uz: "Sirdaryo viloyatida", uzc: "Сирдарё вилоятида", ru: "в Сырдарьинской области" },
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
    locatives: {
      name: { en: "in Surkhandarya", uz: "Surxondaryoda", uzc: "Сурхондарёда", ru: "в Сурхандарье" },
      title: { en: "in the Surkhandarya Region", uz: "Surxondaryo viloyatida", uzc: "Сурхондарё вилоятида", ru: "в Сурхандарьинской области" },
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
    locatives: {
      name: { en: "in Tashkent", uz: "Toshkentda", uzc: "Тошкентда", ru: "в Ташкенте" },
      title: { en: "in Tashkent City", uz: "Toshkent shahrida", uzc: "Тошкент шаҳрида", ru: "в городе Ташкенте" },
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
    locatives: {
      name: { en: "in Tashkent", uz: "Toshkentda", uzc: "Тошкентда", ru: "в Ташкенте" },
      title: { en: "in the Tashkent Region", uz: "Toshkent viloyatida", uzc: "Тошкент вилоятида", ru: "в Ташкентской области" },
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
    locatives: {
      name: { en: "in Khorezm", uz: "Xorazmda", uzc: "Хоразмда", ru: "в Хорезме" },
      title: { en: "in the Khorezm Region", uz: "Xorazm viloyatida", uzc: "Хоразм вилоятида", ru: "в Хорезмской области" },
    },
  },
];
