# uzbgeo

**English** · [O'zbekcha](./README.uz.md) · [Русский](./README.ru.md)

Geographical data for the Republic of Uzbekistan — regions, districts, and cities, with **short names**, **full official titles**, and **locative (“in X”) phrases** in 4 languages (English, Uzbek Latin, Uzbek Cyrillic, Russian).

- **14** top-level administrative units (12 viloyats + Karakalpakstan + Tashkent City)
- **175** districts (`tumani`)
- **109** cities (`shahar`) — **31** of regional significance + **78** of district subordination
- **Locatives** for every unit — `в Бухаре` / `Buxoroda` / `in Bukhara` (see [Locatives](#locatives))
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
  getRegionalCities,
  getCity,
  getCitiesByRegionId,
  getCitiesByDistrictId,
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

// Cities come in two tiers — regional significance and district subordination.
console.log(getAllCities().length);        // 109 (all cities)
console.log(getRegionalCities().length);   // 31  (the regional-significance subset)

// District-subordinate cities know their parent district:
const gazalkent = getCity("gazalkent_city");
console.log(gazalkent?.subordination);     // "district"
console.log(gazalkent?.districtSlug);      // "bostanlyk"

// Look cities up by their parent district:
console.log(getCitiesByDistrictId("bostanlyk").map((c) => c.slug)); // ["gazalkent_city"]
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

### Cities (`shahar`)

Cities come in two administrative tiers, told apart by the `subordination` field:

- **`"regional"`** — cities of regional significance, administratively parallel to districts (31 nationwide).
- **`"district"`** — cities of district subordination, nested inside a district (`parentSlug`/`districtSlug` point at the parent district).

Slugs are suffixed with `_city` to distinguish them from same-named districts (e.g., `bukhara_city` vs `bukhara`).

| Function | Returns |
|---|---|
| `getAllCities()` | **All 109 cities** (both tiers) |
| `getRegionalCities()` | The 31 cities of regional significance |
| `getCity(slug)` | One city, or `undefined` |
| `getCitiesByRegionId(slugOrIso)` | All cities in a region (both tiers) |
| `getCitiesByDistrictId(slug)` | District-subordinate cities inside a district |

> **Migrating from v1:** `getAllCities()` used to return only the 31 regional-significance cities. In v2 it returns **all** cities; call **`getRegionalCities()`** for the old behavior. See the [CHANGELOG](./CHANGELOG.md).

> **Coverage note:** district-subordinate cities include only high-confidence entries. A handful of cities with disputed status (e.g. the 2025 Khorezm reform of Xonqa/Shovot/Gurlan/Qoʻshkoʻpir, or Yangiobod's contested district) are held back pending verification — see the [CHANGELOG](./CHANGELOG.md).

## Data shape

Every entity carries a `names` object (short noun forms — good for labels, dropdowns, and short headings), a `titles` object (full official administrative form — good for headings and addresses), and a `locatives` object (ready-to-use “in X” phrases — see [Locatives](#locatives)).

```ts
interface Names {
  en: string;   // English
  uz: string;   // Uzbek (Latin script)
  uzc: string;  // Uzbek (Cyrillic script)
  ru: string;   // Russian
}

interface Locatives {
  name: Names;                        // { en: "in Bukhara", ru: "в Бухаре", ... }
  title: Names;                       // { en: "in the Bukhara Region", ru: "в Бухарской области", ... }
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
  parentSlug: string;                 // "andijan" (the region)
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
  parentSlug: string;                 // region slug (regional) OR district slug (district)
  districtSlug?: string;              // set iff subordination === "district"
  regionSlug: string;                 // "bukhara" | "tashkent"
  regionIso: string;                  // "UZ-BU" | "UZ-TO"
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara City", ru: "Город Бухара", ... }
  locatives: Locatives;
}
```

The hierarchy is expressed by `parentSlug`: a district's parent is its region, a regional city's parent is its region, and a district-subordinate city's parent is its district. Walk it up with `getDistrict()` / `getRegion()`. (`RegionalCity` remains exported as a deprecated alias of `City`.)

### Type stability

`Region`, `District` and `City` **describe data uzbgeo returns**; they are not meant to be constructed. New fields get added to them over time (`locatives` in 2.1.0), which is a minor release — reading returned objects is unaffected. If you hand-write a literal annotated with one of these types (a test fixture, say), a new field will fail to compile until you add it; prefer calling `getRegion()` / `getDistrict()` / `getCity()` for real data instead.

### When to use `names` vs `titles`

- **`names`** — short noun, no type word. Use for select dropdowns, breadcrumbs, list labels, `<option>` text. Example: `"Bukhara"`, `"Бухара"`.
- **`titles`** — full official name with the type word baked in. Use for page headings, address lines, SEO meta tags, any place where the administrative type matters. Example: `"Bukhara Region"`, `"Бухарская область"`.

The `titles` field is especially useful for Russian, where the full administrative form requires adjective morphology (`Бухарская область`, `Бухарский район`) that consumers can't easily derive from the noun (`Бухара`).

## Locatives

Building a page title like **"Работа в Бухаре"** or **"Buxoroda ish"** needs more than the nominative name. The `locatives` field carries the finished "in X" phrase for every unit, in all four languages:

```ts
const bukhara = getRegion("bukhara");

bukhara?.locatives.name.ru;    // "в Бухаре"
bukhara?.locatives.name.uz;    // "Buxoroda"
bukhara?.locatives.name.uzc;   // "Бухорода"
bukhara?.locatives.name.en;    // "in Bukhara"

bukhara?.locatives.title.ru;   // "в Бухарской области"
bukhara?.locatives.title.uz;   // "Buxoro viloyatida"
```

Each value is a **complete phrase**, not a bare inflected noun, because what's missing differs by language:

| | What the locative needs | Example |
| --- | --- | --- |
| Russian | preposition **+** prepositional case | `Бухара` → `в Бухаре` |
| Uzbek | the `-da` suffix — no preposition exists | `Buxoro` → `Buxoroda` |
| English | `in`, plus an article where required | `Bukhara` → `in Bukhara` |

Storing whole phrases means consumers never pick a preposition, an article, or a case ending themselves. Word order still varies by language, so substitute these into a per-language template:

```ts
const t = { en: "Jobs {loc}", ru: "Работа {loc}", uz: "{loc} ish" };
t[lang].replace("{loc}", unit.locatives.name[lang]);
// "Jobs in Bukhara" / "Работа в Бухаре" / "Buxoroda ish"
```

### `name` vs `title` for SEO

Use `locatives.title` for region and district pages. Seven slugs exist as both a region and a district (`bukhara`, `samarkand`, `fergana`, `andijan`, `namangan`, `syrdarya`, `tashkent`), and the same-named city adds a third — all of which produce the **same** `locatives.name`:

```ts
getRegion("bukhara")?.locatives.name.ru;       // "в Бухаре"
getCity("bukhara_city")?.locatives.name.ru;    // "в Бухаре"   ← identical
getDistrict("bukhara")?.locatives.title.ru;    // "в Бухарском районе"  ← distinct
```

Keying page titles off `name` alone gives several pairs of pages an identical `<title>`.

### Accuracy notes

Russian forms are hand-authored and reviewed, not rule-generated, because Russian toponym declension has exceptions no rule captures. Names ending in `-и` or `-у` are indeclinable and keep their nominative form — `в Карши`, `в Навои`, `в Балыкчи`, `в Денау`, `в Карасу` — where a naive "add `-е`" rule would produce garbage. Feminine names in `-ия` take `-ии` (`Галаасия` → `в Галаасии`). Uzbek `-da` is regular and applied mechanically, including gemination after a final `d` (`Samarqand` → `Samarqandda`).

Every unit is checked for locative completeness at build time, so `locatives` is a total (non-optional) field: it is always present in all four languages and needs no runtime guard.

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
