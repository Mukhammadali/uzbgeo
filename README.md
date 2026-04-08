# uzbgeo

**English** · [O'zbekcha](./README.uz.md) · [Русский](./README.ru.md)

Geographical data for the Republic of Uzbekistan — regions, districts, and cities of regional significance, with names in 4 languages (English, Uzbek Latin, Uzbek Cyrillic, Russian).

- **14** top-level administrative units (12 viloyats + Karakalpakstan + Tashkent City)
- **175** districts (`tumani`)
- **31** cities of regional significance (`shahar`)
- **ISO 3166-2:UZ** codes for all regions
- **Zero runtime dependencies**, browser-safe, ESM + CJS, written in TypeScript

## Install

```sh
npm install uzbgeo
# or
bun add uzbgeo
# or
pnpm add uzbgeo
# or
yarn add uzbgeo
```

## Usage

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
// or by ISO code:
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

All functions are pure and operate on frozen data. Lookups by region accept either the snake_case slug (`"bukhara"`) or the ISO 3166-2:UZ code (`"UZ-BU"`).

### Regions

| Function | Returns |
|---|---|
| `getAllRegions()` | All 14 top-level units |
| `getRegion(slugOrIso)` | One region, or `undefined` |

### Districts (`tumani`)

| Function | Returns |
|---|---|
| `getAllDistricts()` | All 175 districts |
| `getDistrict(slug)` | One district, or `undefined` |
| `getDistrictsByRegionId(slugOrIso)` | All districts in a given region |

### Cities of regional significance (`shahar`)

These are administratively parallel to districts, not nested inside them. The slugs are suffixed with `_city` to distinguish them from same-named districts (e.g., `bukhara_city` vs `bukhara`).

| Function | Returns |
|---|---|
| `getAllCities()` | All 31 cities of regional significance |
| `getCity(slug)` | One city, or `undefined` |
| `getCitiesByRegionId(slugOrIso)` | All cities in a given region |

## Data shape

```ts
interface Names {
  en: string;   // English
  uz: string;   // Uzbek (Latin script)
  uzc: string;  // Uzbek (Cyrillic script)
  ru: string;   // Russian
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

## Region reference

| ISO | Slug | English | Uzbek (Latin) |
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
| UZ-TK | `tashkent_city` | Tashkent (city) | Toshkent shahri |
| UZ-TO | `tashkent` | Tashkent (region) | Toshkent viloyati |
| UZ-XO | `khorezm` | Khorezm | Xorazm |

English forms follow the official translations published by the Uzbek State Statistics Committee (the SDMX dataset linked below).

## Data sources

- **Authoritative:** SDMX dataset 2.01.01.0036 *"Tumanlar / Районы / Districts"* published by the [State Statistics Committee of the Republic of Uzbekistan](https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_307.pdf), last updated 2025-03-26. All names in all four languages come directly from this source.
- **ISO codes:** [ISO 3166-2:UZ](https://en.wikipedia.org/wiki/ISO_3166-2:UZ).

## License

[MIT](./LICENSE) © Mukhammadali
