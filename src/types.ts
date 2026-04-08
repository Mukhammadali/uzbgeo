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
  /** Names in the four working languages. */
  names: Names;
}

/**
 * Discriminator for a subdivision of a region.
 * - `district`: tuman — 175 of these
 * - `city`: city of regional significance (shahar) — administratively
 *   parallel to a district, not contained within one
 */
export type SubdivisionType = "district" | "city";

interface SubdivisionBase {
  /** Stable snake_case identifier, unique within its type. */
  slug: string;
  /** Slug of the parent region (e.g., `"bukhara"`). */
  regionSlug: string;
  /** ISO 3166-2:UZ code of the parent region (e.g., `"UZ-BU"`). */
  regionIso: string;
  /** Names in the four working languages. */
  names: Names;
}

/** A district (tuman) of a region. */
export interface District extends SubdivisionBase {
  type: "district";
}

/**
 * A city of regional significance (shahar). Administratively parallel
 * to a district within the same region, not nested under one.
 */
export interface RegionalCity extends SubdivisionBase {
  type: "city";
}

/** Any subdivision of a region — either a district or a regional city. */
export type Subdivision = District | RegionalCity;
