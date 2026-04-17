# uzbgeo

**English** · [O'zbekcha](./README.uz.md) · [Русский](./README.ru.md)

Geographical data for the Republic of Uzbekistan — regions, districts, and cities of regional significance, with both **short names** and **full official titles** in 4 languages (English, Uzbek Latin, Uzbek Cyrillic, Russian).

- **14** top-level administrative units (12 viloyats + Karakalpakstan + Tashkent City)
- **175** districts (`tumani`)
- **31** cities of regional significance (`shahar`)
- **Tashkent Metro** — 4 lines, 50 stations, cross-line transfers (see [METRO.md](./METRO.md))
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

Every entity carries both a `names` object (short noun forms — good for labels, dropdowns, and short headings) and a `titles` object (full official administrative form — good for headings, addresses, SEO, and any context where the type word like "Region" or "район" belongs in the name).

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
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara Region", ru: "Бухарская область", ... }
}

interface District {
  slug: string;                       // "izbaskan"
  type: "district";
  regionSlug: string;                 // "andijan"
  regionIso: string;                  // "UZ-AN"
  names: Names;                       // { en: "Izbaskan", ru: "Избаскан", ... }
  titles: Names;                      // { en: "Izbaskan District", ru: "Избасканский район", ... }
}

interface RegionalCity {
  slug: string;                       // "bukhara_city"
  type: "city";
  regionSlug: string;                 // "bukhara"
  regionIso: string;                  // "UZ-BU"
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara City", ru: "Город Бухара", ... }
}
```

### When to use `names` vs `titles`

- **`names`** — short noun, no type word. Use for select dropdowns, breadcrumbs, list labels, `<option>` text. Example: `"Bukhara"`, `"Бухара"`.
- **`titles`** — full official name with the type word baked in. Use for page headings, address lines, SEO meta tags, any place where the administrative type matters. Example: `"Bukhara Region"`, `"Бухарская область"`.

The `titles` field is especially useful for Russian, where the full administrative form requires adjective morphology (`Бухарская область`, `Бухарский район`) that consumers can't easily derive from the noun (`Бухара`).

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

## Tashkent Metro

Metro data ships behind a subpath export so consumers who only want regional data don't pull it in.

```ts
import { getAllStations, getStationsByLine, neighborsOnLine } from "uzbgeo/metro";

const chilanzar = getStationsByLine("chilanzar");
console.log(chilanzar[0]?.names.en);     // "Buyuk Ipak Yoli"

const { prev, next } = neighborsOnLine("texnopark", "ring");
console.log(prev?.id, next?.id);         // "choshtepa" "yashnobod" — ring wraps
```

See **[METRO.md](./METRO.md)** for the full API, data shape, line/transfer reference, and design notes.

## Data sources

- **Authoritative:** SDMX dataset 2.01.01.0036 *"Tumanlar / Районы / Districts"* published by the [State Statistics Committee of the Republic of Uzbekistan](https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_307.pdf), last updated 2025-03-26. All names in all four languages come directly from this source.
- **ISO codes:** [ISO 3166-2:UZ](https://en.wikipedia.org/wiki/ISO_3166-2:UZ).

## License

[MIT](./LICENSE) © Mukhammadali
