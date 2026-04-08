# uzbgeo

[English](./README.md) · **O'zbekcha** · [Русский](./README.ru.md)

O'zbekiston Respublikasining geografik ma'lumotlari — viloyatlar, tumanlar va viloyat ahamiyatiga molik shaharlar, har biri 4 tilda (ingliz, o'zbek lotin, o'zbek kirill, rus) nomlangan.

- **14** ta yuqori darajadagi ma'muriy birlik (12 viloyat + Qoraqalpog'iston + Toshkent shahri)
- **175** ta tuman
- **31** ta viloyat ahamiyatiga molik shahar
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
  getCity,
  getCitiesByRegionId,
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

const bukharaDistricts = getDistrictsByRegionId("bukhara");
console.log(bukharaDistricts.length); // 11

const tashkentCityDistricts = getDistrictsByRegionId("tashkent_city");
console.log(tashkentCityDistricts.length); // 12
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

### Viloyat ahamiyatiga molik shaharlar

Bu shaharlar tumanlar bilan ma'muriy jihatdan bir xil darajada bo'lib, ularning ichida joylashmagan. Slug nomlariga `_city` qo'shimchasi qo'shilgan, bu esa ularni bir xil nomdagi tumanlardan farqlash uchun (masalan, `bukhara_city` va `bukhara`).

| Funksiya | Qaytaradi |
|---|---|
| `getAllCities()` | Barcha 31 ta viloyat ahamiyatiga molik shahar |
| `getCity(slug)` | Bitta shahar yoki `undefined` |
| `getCitiesByRegionId(slugOrIso)` | Berilgan viloyatdagi barcha shaharlar |

## Ma'lumotlar tuzilishi

```ts
interface Names {
  en: string;   // Ingliz
  uz: string;   // O'zbek (lotin)
  uzc: string;  // O'zbek (kirill)
  ru: string;   // Rus
}

interface Region {
  slug: string;                       // "bukhara"
  iso: string;                        // "UZ-BU"
  category: "region" | "republic" | "city";
  names: Names;
}

interface District {
  slug: string;                       // "shakhrikhan"
  type: "district";
  regionSlug: string;                 // "andijan"
  regionIso: string;                  // "UZ-AN"
  names: Names;
}

interface RegionalCity {
  slug: string;                       // "bukhara_city"
  type: "city";
  regionSlug: string;                 // "bukhara"
  regionIso: string;                  // "UZ-BU"
  names: Names;
}
```

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

## Ma'lumotlar manbalari

- **Asosiy manba:** [O'zbekiston Respublikasi Milliy statistika qo'mitasi](https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_307.pdf) tomonidan chop etilgan SDMX ma'lumotlar to'plami 2.01.01.0036 *"Tumanlar / Районы / Districts"*, oxirgi yangilanish 2025-03-26. Barcha 4 tildagi nomlar to'g'ridan-to'g'ri shu manbadan olingan.
- **ISO kodlar:** [ISO 3166-2:UZ](https://en.wikipedia.org/wiki/ISO_3166-2:UZ).

## Litsenziya

[MIT](./LICENSE) © Mukhammadali
