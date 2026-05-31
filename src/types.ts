/**
 * Names of an administrative unit in the four official/working languages
 * used by Uzbekistan's State Statistics Committee (SDMX dataset 2.01.01.0036).
 * https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_307.pdf
 */
export interface Names {
  /** English */
  en: string;
  /** Uzbek (Latin script) — official */
  uz: string;
  /** Uzbek (Cyrillic script) */
  uzc: string;
  /** Russian */
  ru: string;
}

export type LanguageCode = keyof Names;

/**
 * Official ISO 3166-2 category for a top-level administrative unit.
 * - `region`: viloyat — 12 of these
 * - `republic`: autonomous republic — only Karakalpakstan
 * - `city`: city of national significance — only Tashkent
 */
export type RegionCategory = "region" | "republic" | "city";

/**
 * A top-level administrative unit of the Republic of Uzbekistan.
 *
 * There are 14 in total: 12 viloyats, the autonomous Republic of
 * Karakalpakstan, and the city of Tashkent.
 */
export interface Region {
  /**
   * Stable snake_case identifier (e.g., `"bukhara"`, `"tashkent_city"`).
   * Primary key for this region.
   */
  slug: string;
  /**
   * ISO 3166-2:UZ code (e.g., `"UZ-BU"`).
   * @see https://en.wikipedia.org/wiki/ISO_3166-2:UZ
   */
  iso: string;
  /** Official category per ISO 3166-2 and Uzbek classification. */
  category: RegionCategory;
  /**
   * Short noun forms for use as labels, dropdown items, or short headings.
   * Example: `{ en: "Bukhara", uz: "Buxoro", uzc: "Бухоро", ru: "Бухара" }`.
   */
  names: Names;
  /**
   * Full official administrative titles, as they appear in the SDMX dataset.
   * Use these for headings, addresses, SEO, and any context where the type
   * word ("Region", "viloyati", "область", etc.) belongs in the name.
   * Example: `{ en: "Bukhara Region", uz: "Buxoro viloyati", uzc: "Бухоро вилояти", ru: "Бухарская область" }`.
   */
  titles: Names;
}

/**
 * Discriminator for a subdivision of a region.
 * - `district`: tuman — 175 of these
 * - `city`: a city (shahar), either of regional significance (parallel to a
 *   district) or of district subordination (nested inside a district). The
 *   `subordination` field on {@link City} distinguishes the two.
 */
export type SubdivisionType = "district" | "city";

/**
 * Administrative subordination level of a city (shahar).
 * - `regional`: city of regional significance — administratively parallel to a
 *   district, directly under the region. There are 31 of these nationwide.
 * - `district`: city of district subordination — nested inside a district.
 */
export type CitySubordination = "regional" | "district";

interface SubdivisionBase {
  /** Stable snake_case identifier, unique within its type. */
  slug: string;
  /**
   * Slug of the immediate parent administrative unit, forming the hierarchy.
   * - For a district: the region's slug (e.g., `"bukhara"`).
   * - For a regional city: the region's slug.
   * - For a district-subordinate city: the parent district's slug
   *   (e.g., `"bostanlyk"` for `"gazalkent_city"`).
   *
   * Walk this up the tree with `getRegion` / `getDistrict`.
   */
  parentSlug: string;
  /**
   * Slug of the enclosing region (e.g., `"bukhara"`). Always points at the
   * region even for district-subordinate cities, so "everything in region X"
   * stays a single-field filter.
   */
  regionSlug: string;
  /** ISO 3166-2:UZ code of the enclosing region (e.g., `"UZ-BU"`). */
  regionIso: string;
  /**
   * Short noun forms for use as labels, dropdown items, or short headings.
   * Example: `{ en: "Izbaskan", uz: "Izboskan", uzc: "Избоскан", ru: "Избаскан" }`.
   */
  names: Names;
  /**
   * Full official administrative titles, as they appear in the SDMX dataset.
   * Use these for headings, addresses, SEO, and any context where the type
   * word ("District", "tumani", "район", "city", "shahri", "город", etc.)
   * belongs in the name.
   * Example: `{ en: "Izbaskan District", uz: "Izboskan tumani", uzc: "Избоскан тумани", ru: "Избасканский район" }`.
   */
  titles: Names;
}

/** A district (tuman) of a region. */
export interface District extends SubdivisionBase {
  type: "district";
}

/**
 * A city (shahar) of Uzbekistan.
 *
 * Two kinds, told apart by {@link City.subordination}:
 * - `"regional"` — city of regional significance, administratively parallel to
 *   a district within its region (`parentSlug` is the region). 31 nationwide.
 * - `"district"` — city of district subordination, nested inside a district
 *   (`parentSlug` and `districtSlug` are the parent district).
 */
export interface City extends SubdivisionBase {
  type: "city";
  /** Whether this city is parallel to districts (`regional`) or inside one (`district`). */
  subordination: CitySubordination;
  /**
   * Slug of the parent district. Present if and only if
   * `subordination === "district"` (mirrors `parentSlug` in that case).
   */
  districtSlug?: string;
}

/**
 * @deprecated Renamed to {@link City} in v2, which now covers both
 * regional-significance and district-subordinate cities. This alias is kept
 * for backward compatibility and will be removed in a future major version.
 * Filter with `city.subordination === "regional"` for the old meaning.
 */
export type RegionalCity = City;

/** Any subdivision of a region — either a district or a city. */
export type Subdivision = District | City;
