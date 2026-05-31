# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## [2.0.0]

### Summary

Cities of **district subordination** (nested inside a district, e.g. Gʻazalkent)
are now part of the dataset. To support this without painting future tiers into
a corner, the model gained a real parent-pointer hierarchy (`parentSlug`) and a
`subordination` discriminator on cities. Any deeper administrative tier added
later is now pure data — no further breaking release is needed for structure.

### Breaking changes

- **`getAllCities()` now returns _all_ cities (109), not just the 31 of regional
  significance.** Call the new **`getRegionalCities()`** for the previous
  behavior. This is the only behavioral break; it is loud (count changes
  31 → 109) and the drop-in replacement is provided.
- **`getCitiesByRegionId(regionId)` now returns both tiers** of cities in a
  region, not only the regional-significance ones. Filter on
  `c.subordination === "regional"` if you need the old result.
- **The `RegionalCity` type is renamed to `City`.** `RegionalCity` is kept as a
  **deprecated alias** of `City`, so existing imports keep compiling; it will be
  removed in a future major version.

### Added

- **`parentSlug`** on every subdivision (district and city). For a district or a
  regional city it is the region slug; for a district-subordinate city it is the
  parent district slug. This is the recursive backbone of the hierarchy.
- **`subordination: "regional" | "district"`** and an optional **`districtSlug`**
  on `City`. `districtSlug` is present if and only if
  `subordination === "district"`.
- **`getRegionalCities()`** — the 31 cities of regional significance (the old
  `getAllCities()`).
- **`getCitiesByDistrictId(slug)`** — district-subordinate cities inside a given
  district (e.g. `"bostanlyk"` → `[gazalkent_city]`).
- **`City`** and **`CitySubordination`** exported types.
- **78 cities of district subordination** across all regions, each with names
  and titles in all four languages and a `districtSlug` linking it to its parent
  district. City total: **31 → 109**.

### Notes

- **Toytepa is not added as a separate city.** It was renamed **Nurafshon** in
  2017 and promoted to the regional capital of Tashkent Region — it is already
  in the dataset as the regional-significance city `nurafshan_city`. Adding a
  district-subordinate "Toytepa" would have duplicated it.

### Coverage notes

Only high-confidence cities (shahar, with a clear parent district) were added.
The following are **deliberately held back pending verification** and are *not*
in the dataset yet:

- **Khorezm 2025 reform** — Xonqa, Shovot, Gurlan, Qoʻshkoʻpir, Hazorasp:
  reportedly elevated to cities in 2025, but sources still disagree
  (some list them as urban-type settlements / `shaharcha`).
- **Yangiobod** (Tashkent region) — its parent district is reported
  inconsistently across sources (Angren city / Yangiyoʻl / Ohangaron).
- **Other borderline / `shaharcha` cases** flagged during research:
  Baliqchi (Andijan), Hamza and Toʻraqoʻrgʻon (Fergana/Namangan),
  Gazli (Bukhara), Dashtobod, Oqtosh, Urgut (Samarkand/Jizzakh),
  Taxiatosh and Xaliqobod (Karakalpakstan).

These may be added in a later minor release once their status is confirmed —
adding them is data-only and non-breaking.

### Migration

```diff
- import { getAllCities, RegionalCity } from "uzbgeo";
+ import { getRegionalCities, City } from "uzbgeo";

- const cities = getAllCities();        // was: 31 regional cities
+ const cities = getRegionalCities();   // 31 regional cities (unchanged set)
+ // …or getAllCities() for all 109, both tiers
```

## [1.1.1]

- Ship `METRO.md` in the npm tarball so the README link resolves.
- Fix the Choshtepa metro station name.

## [1.1.0]

- Add the Tashkent Metro dataset behind the `uzbgeo/metro` subpath export
  (4 lines, 50 stations, cross-line transfers).

## [1.0.0]

- Initial release: 14 regions, 175 districts, 31 cities of regional
  significance, with `names` and `titles` in 4 languages and ISO 3166-2:UZ
  codes.
