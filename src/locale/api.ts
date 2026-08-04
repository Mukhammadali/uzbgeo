import type {
  LocaleGeoData,
  LocalizedRegion,
  LocalizedDistrict,
  LocalizedCity,
} from "./types";

/**
 * The query surface of a per-locale entry point (`uzbgeo/en`, `uzbgeo/uz`,
 * `uzbgeo/uzc`, `uzbgeo/ru`). Mirrors the main entry function-for-function;
 * only the entity shapes differ (single-locale strings instead of `Names`
 * records).
 */
export interface LocaleGeoApi {
  getAllRegions(): readonly LocalizedRegion[];
  getRegion(slugOrIso: string): LocalizedRegion | undefined;
  getAllDistricts(): readonly LocalizedDistrict[];
  getDistrict(slug: string): LocalizedDistrict | undefined;
  getDistrictsByRegionId(regionId: string): readonly LocalizedDistrict[];
  getAllCities(): readonly LocalizedCity[];
  getRegionalCities(): readonly LocalizedCity[];
  getCity(slug: string): LocalizedCity | undefined;
  getCitiesByRegionId(regionId: string): readonly LocalizedCity[];
  getCitiesByDistrictId(districtId: string): readonly LocalizedCity[];
}

/**
 * Binds the query functions to one locale's dataset. Each generated entry
 * point under `src/locales/` calls this with its own pre-projected data, so a
 * bundle built from that entry carries exactly one language.
 */
export function createLocaleApi(data: LocaleGeoData): LocaleGeoApi {
  const { regions, districts, cities } = data;
  return {
    getAllRegions: () => regions,
    getRegion: (slugOrIso) =>
      regions.find((r) => r.slug === slugOrIso || r.iso === slugOrIso),
    getAllDistricts: () => districts,
    getDistrict: (slug) => districts.find((d) => d.slug === slug),
    getDistrictsByRegionId: (regionId) =>
      districts.filter(
        (d) => d.regionSlug === regionId || d.regionIso === regionId,
      ),
    getAllCities: () => cities,
    getRegionalCities: () =>
      cities.filter((c) => c.subordination === "regional"),
    getCity: (slug) => cities.find((c) => c.slug === slug),
    getCitiesByRegionId: (regionId) =>
      cities.filter(
        (c) => c.regionSlug === regionId || c.regionIso === regionId,
      ),
    getCitiesByDistrictId: (districtId) =>
      cities.filter((c) => c.districtSlug === districtId),
  };
}
