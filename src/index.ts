import { regions } from "./data/regions";
import { districts } from "./data/districts";
import { cities } from "./data/cities";
import type {
  Region,
  District,
  RegionalCity,
  Subdivision,
  Names,
  LanguageCode,
  RegionCategory,
  SubdivisionType,
} from "./types";

// Re-export the public types so consumers can import them from "uzbgeo".
export type {
  Region,
  District,
  RegionalCity,
  Subdivision,
  Names,
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
// Cities of regional significance (shahar)
// ============================================================================

/**
 * Returns all 31 cities of regional significance (shahar). These are
 * administratively parallel to districts, not nested within them.
 *
 * The city of Tashkent is NOT in this list — it is itself a top-level
 * administrative unit and is returned by `getAllRegions()`.
 */
export function getAllCities(): readonly RegionalCity[] {
  return cities;
}

/**
 * Look up a city of regional significance by its snake_case slug (e.g.,
 * `"bukhara_city"`). City slugs are suffixed with `_city` to make them
 * self-disclosing. Returns `undefined` if no match.
 */
export function getCity(slug: string): RegionalCity | undefined {
  return cities.find((c) => c.slug === slug);
}

/**
 * Returns all cities of regional significance in the given region, identified
 * by either its snake_case slug or its ISO 3166-2:UZ code. Returns an empty
 * array if no region matches.
 */
export function getCitiesByRegionId(
  regionId: string,
): readonly RegionalCity[] {
  return cities.filter(
    (c) => c.regionSlug === regionId || c.regionIso === regionId,
  );
}
