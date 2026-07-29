import { regions } from "./data/regions";
import { districts } from "./data/districts";
import { cities } from "./data/cities";
import type {
  Region,
  District,
  City,
  RegionalCity,
  CitySubordination,
  Subdivision,
  Names,
  Locatives,
  LanguageCode,
  RegionCategory,
  SubdivisionType,
} from "./types";

// Re-export the public types so consumers can import them from "uzbgeo".
export type {
  Region,
  District,
  City,
  RegionalCity,
  CitySubordination,
  Subdivision,
  Names,
  Locatives,
  LanguageCode,
  RegionCategory,
  SubdivisionType,
};

// ============================================================================
// Regions
// ============================================================================

/**
 * Returns all 14 top-level administrative units of Uzbekistan: 12 viloyats,
 * the autonomous Republic of Karakalpakstan, and the city of Tashkent.
 */
export function getAllRegions(): readonly Region[] {
  return regions;
}

/**
 * Look up a region by its snake_case slug (e.g., `"bukhara"`) or its
 * ISO 3166-2:UZ code (e.g., `"UZ-BU"`). Returns `undefined` if no match.
 */
export function getRegion(slugOrIso: string): Region | undefined {
  return regions.find((r) => r.slug === slugOrIso || r.iso === slugOrIso);
}

// ============================================================================
// Districts (tumani)
// ============================================================================

/**
 * Returns all 175 districts (tumani) of Uzbekistan.
 */
export function getAllDistricts(): readonly District[] {
  return districts;
}

/**
 * Look up a district by its snake_case slug (e.g., `"shakhrikhan"`).
 * Returns `undefined` if no match.
 */
export function getDistrict(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug);
}

/**
 * Returns all districts that belong to the given region, identified by either
 * its snake_case slug (e.g., `"bukhara"`) or its ISO 3166-2:UZ code (e.g.,
 * `"UZ-BU"`). Returns an empty array if no region matches.
 */
export function getDistrictsByRegionId(regionId: string): readonly District[] {
  return districts.filter(
    (d) => d.regionSlug === regionId || d.regionIso === regionId,
  );
}

// ============================================================================
// Cities (shahar)
// ============================================================================

/**
 * Returns ALL cities (shahar) of Uzbekistan — both cities of regional
 * significance and cities of district subordination.
 *
 * NOTE (v2 change): this previously returned only the 31 cities of regional
 * significance. For that exact set, use {@link getRegionalCities}.
 *
 * The city of Tashkent is NOT in this list — it is itself a top-level
 * administrative unit and is returned by `getAllRegions()`.
 */
export function getAllCities(): readonly City[] {
  return cities;
}

/**
 * Returns the 31 cities of regional significance (shahar) — those
 * administratively parallel to districts, not nested within one. This is the
 * set that `getAllCities()` returned prior to v2.
 */
export function getRegionalCities(): readonly City[] {
  return cities.filter((c) => c.subordination === "regional");
}

/**
 * Look up a city by its snake_case slug (e.g., `"bukhara_city"`,
 * `"gazalkent_city"`). City slugs are suffixed with `_city` to make them
 * self-disclosing. Returns `undefined` if no match.
 */
export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/**
 * Returns all cities in the given region — both regional and
 * district-subordinate — identified by either its snake_case slug or its
 * ISO 3166-2:UZ code. Returns an empty array if no region matches.
 */
export function getCitiesByRegionId(regionId: string): readonly City[] {
  return cities.filter(
    (c) => c.regionSlug === regionId || c.regionIso === regionId,
  );
}

/**
 * Returns all cities of district subordination that belong to the given
 * district, identified by its snake_case slug (e.g., `"bostanlyk"` →
 * `[gazalkent_city]`). Returns an empty array if no such cities exist.
 */
export function getCitiesByDistrictId(districtId: string): readonly City[] {
  return cities.filter((c) => c.districtSlug === districtId);
}
