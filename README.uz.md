# uzbgeo

[English](./README.md) · **O'zbekcha** · [Русский](./README.ru.md)

O'zbekiston Respublikasining geografik ma'lumotlari — viloyatlar, tumanlar va shaharlar, har biri 4 tilda (ingliz, o'zbek lotin, o'zbek kirill, rus) **qisqa nomlari**, **to'liq rasmiy unvonlari** va **o'rin-payt shakllari** bilan.

- **14** ta yuqori darajadagi ma'muriy birlik (12 viloyat + Qoraqalpog'iston + Toshkent shahri)
- **175** ta tuman
- Har bir birlik uchun **o'rin-payt shakllari** — `Buxoroda` / `в Бухаре` / `in Bukhara` ([batafsil](#orin-payt-shakllari))
- **109** ta shahar — **31** ta viloyat ahamiyatiga molik + **78** ta tuman bo'ysunuvidagi
- **Toshkent metropoliteni** — 4 ta yo'l, 50 ta bekat, yo'llararo o'tish joylari ([METRO.md](./METRO.md) ga qarang)
- Barcha viloyatlar uchun **ISO 3166-2:UZ** kodlari
- **Hech qanday runtime bog'liqliklar yo'q**, brauzerda ishlaydi, ESM + CJS, TypeScript'da yozilgan

## O'rnatish

```sh
npm install uzbgeo
# yoki
bun add uzbgeo
# yoki
pnpm add uzbgeo
# yoki
yarn add uzbgeo
```

## Foydalanish

### TypeScript / ESM

```ts
import {
  getAllRegions,
  getRegion,
  getAllDistricts,
  getDistrict,
  getDistrictsByRegionId,
  getAllCities,
  getRegionalCities,
  getCity,
  getCitiesByRegionId,
  getCitiesByDistrictId,
} from "uzbgeo";

const regions = getAllRegions();
console.log(regions.length); // 14

const bukhara = getRegion("bukhara");
// yoki ISO kod orqali:
const sameBukhara = getRegion("UZ-BU");

console.log(bukhara?.names);
// {
//   en:  "Bukhara",
//   uz:  "Buxoro",
//   uzc: "Бухоро",
//   ru:  "Бухара"
// }

console.log(bukhara?.titles);
// {
//   en:  "Bukhara Region",
//   uz:  "Buxoro viloyati",
//   uzc: "Бухоро вилояти",
//   ru:  "Бухарская область"
// }

const bukharaDistricts = getDistrictsByRegionId("bukhara");
console.log(bukharaDistricts.length); // 11

const tashkentCityDistricts = getDistrictsByRegionId("tashkent_city");
console.log(tashkentCityDistricts.length); // 12

// Shaharlar ikki darajada — viloyat ahamiyatiga molik va tuman bo'ysunuvidagi.
console.log(getAllCities().length);        // 109 (barcha shaharlar)
console.log(getRegionalCities().length);   // 31  (viloyat ahamiyatiga molik qism)

// Tuman bo'ysunuvidagi shaharlar o'z tumanini biladi:
const gazalkent = getCity("gazalkent_city");
console.log(gazalkent?.subordination);     // "district"
console.log(gazalkent?.districtSlug);      // "bostanlyk"

// Shaharlarni ota-tuman bo'yicha qidirish:
console.log(getCitiesByDistrictId("bostanlyk").map((c) => c.slug)); // ["gazalkent_city"]
```

### CommonJS

```js
const { getAllRegions, getDistrictsByRegionId } = require("uzbgeo");

const regions = getAllRegions();
const fergana = getDistrictsByRegionId("fergana");
```

## API

Barcha funksiyalar sof (pure) bo'lib, muzlatilgan ma'lumotlar ustida ishlaydi. Viloyat bo'yicha qidiruvlar snake_case slug (`"bukhara"`) yoki ISO 3166-2:UZ kodi (`"UZ-BU"`) ni qabul qiladi.

### Viloyatlar

| Funksiya | Qaytaradi |
|---|---|
| `getAllRegions()` | Barcha 14 ta yuqori darajadagi birlik |
| `getRegion(slugOrIso)` | Bitta viloyat yoki `undefined` |

### Tumanlar

| Funksiya | Qaytaradi |
|---|---|
| `getAllDistricts()` | Barcha 175 ta tuman |
| `getDistrict(slug)` | Bitta tuman yoki `undefined` |
| `getDistrictsByRegionId(slugOrIso)` | Berilgan viloyatdagi barcha tumanlar |

### Shaharlar

Shaharlar `subordination` maydoni orqali ajraladigan ikki ma'muriy darajada bo'ladi:

- **`"regional"`** — viloyat ahamiyatiga molik shaharlar, tumanlar bilan bir xil darajada (mamlakat bo'ylab 31 ta).
- **`"district"`** — tuman bo'ysunuvidagi shaharlar, tuman ichida joylashgan (`parentSlug`/`districtSlug` ota-tumanga ishora qiladi).

Slug nomlariga `_city` qo'shimchasi qo'shilgan, bu esa ularni bir xil nomdagi tumanlardan farqlash uchun (masalan, `bukhara_city` va `bukhara`).

| Funksiya | Qaytaradi |
|---|---|
| `getAllCities()` | **Barcha 109 ta shahar** (ikkala daraja) |
| `getRegionalCities()` | 31 ta viloyat ahamiyatiga molik shahar |
| `getCity(slug)` | Bitta shahar yoki `undefined` |
| `getCitiesByRegionId(slugOrIso)` | Viloyatdagi barcha shaharlar (ikkala daraja) |
| `getCitiesByDistrictId(slug)` | Tuman ichidagi tuman bo'ysunuvidagi shaharlar |

> **v1 dan ko'chish:** ilgari `getAllCities()` faqat 31 ta viloyat ahamiyatiga molik shaharni qaytarardi. v2 da u **barcha** shaharlarni qaytaradi; eski xatti-harakat uchun **`getRegionalCities()`** ni chaqiring. [CHANGELOG](./CHANGELOG.md) ga qarang.

> **Qamrov haqida eslatma:** tuman bo'ysunuvidagi shaharlarga faqat yuqori ishonchli yozuvlar kiritilgan. Holati bahsli bo'lgan bir nechta shahar (masalan, 2025-yilgi Xorazm islohotidagi Xonqa/Shovot/Gurlan/Qoʻshkoʻpir yoki Yangiobodning bahsli tumani) tasdiqlangunga qadar kiritilmagan — [CHANGELOG](./CHANGELOG.md) ga qarang.

## Ma'lumotlar tuzilishi

Har bir obyekt ikki maydonga ega: `names` (qisqa, ot shaklidagi nomlar — yorliqlar, dropdownlar, qisqa sarlavhalar uchun) va `titles` (to'liq rasmiy ma'muriy unvon — sarlavhalar, manzillar, SEO uchun).

```ts
interface Names {
  en: string;   // Ingliz
  uz: string;   // O'zbek (lotin)
  uzc: string;  // O'zbek (kirill)
  ru: string;   // Rus
}

interface Locatives {
  name: Names;                        // { uz: "Buxoroda", ru: "в Бухаре", ... }
  title: Names;                       // { uz: "Buxoro viloyatida", ru: "в Бухарской области", ... }
}

interface Region {
  slug: string;                       // "bukhara"
  iso: string;                        // "UZ-BU"
  category: "region" | "republic" | "city";
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara Region", ru: "Бухарская область", ... }
  locatives: Locatives;
}

interface District {
  slug: string;                       // "izbaskan"
  type: "district";
  parentSlug: string;                 // "andijan" (viloyat)
  regionSlug: string;                 // "andijan"
  regionIso: string;                  // "UZ-AN"
  names: Names;                       // { en: "Izbaskan", ru: "Избаскан", ... }
  titles: Names;                      // { en: "Izbaskan District", ru: "Избасканский район", ... }
  locatives: Locatives;
}

interface City {
  slug: string;                       // "bukhara_city" | "gazalkent_city"
  type: "city";
  subordination: "regional" | "district";
  parentSlug: string;                 // viloyat slug (regional) YOKI tuman slug (district)
  districtSlug?: string;              // faqat subordination === "district" bo'lganda
  regionSlug: string;                 // "bukhara" | "tashkent"
  regionIso: string;                  // "UZ-BU" | "UZ-TO"
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara City", ru: "Город Бухара", ... }
  locatives: Locatives;
}
```

Iyerarxiya `parentSlug` orqali ifodalanadi: tumanning ota-birligi — viloyat, viloyat ahamiyatiga molik shaharning ota-birligi — viloyat, tuman bo'ysunuvidagi shaharning ota-birligi — tuman. Uni `getDistrict()` / `getRegion()` orqali yuqoriga ko'tarib boring. (`RegionalCity` `City` ning eskirgan (deprecated) sinonimi sifatida saqlanib qoladi.)

### Tiplar barqarorligi

`Region`, `District` va `City` **uzbgeo qaytaradigan ma'lumotni tavsiflaydi**; ular qo'lda yaratish uchun mo'ljallanmagan. Vaqt o'tishi bilan ularga yangi maydonlar qo'shiladi (2.1.0 da `locatives`) — bu minor reliz, qaytarilgan obyektlarni o'qish buzilmaydi. Agar siz shu tiplardan biri bilan literal yozsangiz (masalan, testdagi fikstura), yangi maydonni qo'shmaguningizcha kompilyatsiya o'tmaydi; haqiqiy ma'lumot uchun `getRegion()` / `getDistrict()` / `getCity()` dan foydalaning.

### `names` va `titles` qachon ishlatiladi

- **`names`** — qisqa ot, tur so'zisiz. Dropdownlar, breadcrumblar, ro'yxat yorliqlari uchun.
- **`titles`** — to'liq rasmiy nom, tur so'zi bilan. Sahifa sarlavhalari, manzil satrlari, SEO meta-teglar uchun.

`titles` maydoni ayniqsa rus tilida foydali, chunki to'liq ma'muriy shakl sifatdosh morfologiyasini talab qiladi (`Бухарская область`, `Бухарский район`), foydalanuvchilar buni ot shaklidan (`Бухара`) o'zlari osongina hosil qila olmaydilar.

## O'rin-payt shakllari

**"Buxoroda ish"** yoki **"Работа в Бухаре"** kabi sarlavha yasash uchun bosh kelishikdagi nom yetarli emas. `locatives` maydoni har bir birlik uchun tayyor shaklni to'rt tilda saqlaydi:

```ts
const bukhara = getRegion("bukhara");

bukhara?.locatives.name.uz;    // "Buxoroda"
bukhara?.locatives.name.uzc;   // "Бухорода"
bukhara?.locatives.name.ru;    // "в Бухаре"
bukhara?.locatives.name.en;    // "in Bukhara"

bukhara?.locatives.title.uz;   // "Buxoro viloyatida"
bukhara?.locatives.title.ru;   // "в Бухарской области"
```

Har bir qiymat — **butun ibora**, shunchaki turlangan ot emas, chunki har bir tilda yetishmayotgan narsa har xil:

| | O'rin-payt uchun nima kerak | Misol |
| --- | --- | --- |
| O'zbek | `-da` qo'shimchasi — predlog umuman yo'q | `Buxoro` → `Buxoroda` |
| Rus | predlog **+** predlog kelishigi | `Бухара` → `в Бухаре` |
| Ingliz | `in`, kerak bo'lganda artikl bilan | `Bukhara` → `in Bukhara` |

So'z tartibi tillarda farq qiladi, shuning uchun qiymatni har bir til uchun alohida shablonga qo'ying:

```ts
const t = { en: "Jobs {loc}", ru: "Работа {loc}", uz: "{loc} ish" };
t[lang].replace("{loc}", unit.locatives.name[lang]);
// "Jobs in Bukhara" / "Работа в Бухаре" / "Buxoroda ish"
```

### SEO uchun `name` yoki `title`

Viloyat va tuman sahifalari uchun `locatives.title` dan foydalaning. Yettita slug bir vaqtning o'zida ham viloyat, ham tuman sifatida mavjud (`bukhara`, `samarkand`, `fergana`, `andijan`, `namangan`, `syrdarya`, `tashkent`), shu nomli shahar esa uchinchisini qo'shadi — va ularning hammasi **bir xil** `locatives.name` beradi:

```ts
getRegion("bukhara")?.locatives.name.ru;       // "в Бухаре"
getCity("bukhara_city")?.locatives.name.ru;    // "в Бухаре"   ← bir xil
getDistrict("bukhara")?.locatives.title.ru;    // "в Бухарском районе"  ← farqli
```

### Aniqlik haqida

Ruscha shakllar qoida bilan emas, qo'lda yozilgan va tekshirilgan: rus tilida toponimlar turlanishida qoida qamrab olmaydigan istisnolar bor. `-и` va `-у` bilan tugaydigan nomlar turlanmaydi va bosh kelishik shaklini saqlaydi — `в Карши`, `в Навои`, `в Балыкчи`, `в Денау`, `в Карасу`. `-ия` bilan tugaydiganlari `-ии` oladi (`Галаасия` → `в Галаасии`). O'zbekcha `-da` muntazam va mexanik qo'llanadi, oxirgi `d` dan keyingi ikkilanish bilan birga (`Samarqand` → `Samarqandda`).

Locative to'liqligi build bosqichida tekshiriladi, shuning uchun `locatives` majburiy maydon: u har doim to'rt tilda mavjud va ishlash vaqtida tekshiruvni talab qilmaydi.

## Viloyatlar ro'yxati

| ISO | Slug | Inglizcha | O'zbekcha (lotin) |
|---|---|---|---|
| UZ-AN | `andijan` | Andijan | Andijon |
| UZ-BU | `bukhara` | Bukhara | Buxoro |
| UZ-FA | `fergana` | Fergana | Farg'ona |
| UZ-JI | `jizzakh` | Jizzakh | Jizzax |
| UZ-NG | `namangan` | Namangan | Namangan |
| UZ-NW | `navoi` | Navoi | Navoiy |
| UZ-QA | `kashkadarya` | Kashkadarya | Qashqadaryo |
| UZ-QR | `karakalpakstan` | Karakalpakstan | Qoraqalpog'iston |
| UZ-SA | `samarkand` | Samarkand | Samarqand |
| UZ-SI | `syrdarya` | Syrdarya | Sirdaryo |
| UZ-SU | `surkhandarya` | Surkhandarya | Surxondaryo |
| UZ-TK | `tashkent_city` | Tashkent (shahar) | Toshkent shahri |
| UZ-TO | `tashkent` | Tashkent (viloyat) | Toshkent viloyati |
| UZ-XO | `khorezm` | Khorezm | Xorazm |

Inglizcha nomlar O'zbekiston Respublikasi Milliy statistika qo'mitasi tomonidan chop etilgan rasmiy tarjimalarga asoslangan (quyidagi SDMX manbasiga qarang).

## Toshkent metropoliteni

Metro ma'lumotlari alohida subpath orqali eksport qilinadi — faqat hududiy ma'lumotlardan foydalanadigan iste'molchilar uni yuklamaydi.

```ts
import { getAllStations, getStationsByLine, neighborsOnLine } from "uzbgeo/metro";

const chilanzar = getStationsByLine("chilanzar");
console.log(chilanzar[0]?.names.uz);     // "Buyuk Ipak Yo'li"

const { prev, next } = neighborsOnLine("texnopark", "ring");
console.log(prev?.id, next?.id);         // "choshtepa" "yashnobod" — halqa yopiladi
```

To'liq API, ma'lumotlar tuzilishi, yo'llar va o'tish joylari ro'yxati uchun **[METRO.md](./METRO.md)** ga qarang.

## Ma'lumotlar manbalari

- **Asosiy manba:** [O'zbekiston Respublikasi Milliy statistika qo'mitasi](https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_307.pdf) tomonidan chop etilgan SDMX ma'lumotlar to'plami 2.01.01.0036 *"Tumanlar / Районы / Districts"*, oxirgi yangilanish 2025-03-26. Barcha 4 tildagi nomlar to'g'ridan-to'g'ri shu manbadan olingan.
- **ISO kodlar:** [ISO 3166-2:UZ](https://en.wikipedia.org/wiki/ISO_3166-2:UZ).

## Litsenziya

[MIT](./LICENSE) © Mukhammadali
