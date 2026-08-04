import type { RegionCategory, CitySubordination } from "../types";
import type { LineId } from "../metro/types";

/**
 * Single-locale projection of {@link import("../types").Locatives}: the same
 * ready-to-use "in X" phrases, but for one language only.
 */
export interface LocalizedLocatives {
  /** Locative of the short name (e.g., `"Buxoroda"`, `"в Бухаре"`). */
  name: string;
  /** Locative of the full title (e.g., `"Buxoro viloyatida"`). */
  title: string;
}

/**
 * Single-locale projection of {@link import("../types").Region}: `names`,
 * `titles`, and `locatives` collapse to `name`, `title`, and `locative`
 * strings in the entry point's language. All identifiers are unchanged.
 */
export interface LocalizedRegion {
  slug: string;
  iso: string;
  category: RegionCategory;
  name: string;
  title: string;
  locative: LocalizedLocatives;
}

interface LocalizedSubdivisionBase {
  slug: string;
  parentSlug: string;
  regionSlug: string;
  regionIso: string;
  name: string;
  title: string;
  locative: LocalizedLocatives;
}

/** Single-locale projection of {@link import("../types").District}. */
export interface LocalizedDistrict extends LocalizedSubdivisionBase {
  type: "district";
}

/** Single-locale projection of {@link import("../types").City}. */
export interface LocalizedCity extends LocalizedSubdivisionBase {
  type: "city";
  subordination: CitySubordination;
  districtSlug?: string;
}

/** Any single-locale subdivision — either a district or a city. */
export type LocalizedSubdivision = LocalizedDistrict | LocalizedCity;

/** Single-locale projection of {@link import("../metro/types").Line}. */
export interface LocalizedLine {
  id: LineId;
  number: number;
  color: string;
  name: string;
  circular?: boolean;
}

/** Single-locale projection of {@link import("../metro/types").Station}. */
export interface LocalizedStation {
  id: string;
  subway_line: LineId;
  name: string;
  title: string;
  transfers: readonly string[];
}

/** Dataset consumed by {@link import("./api").createLocaleApi}. */
export interface LocaleGeoData {
  regions: readonly LocalizedRegion[];
  districts: readonly LocalizedDistrict[];
  cities: readonly LocalizedCity[];
}

/** Dataset consumed by {@link import("./metro-api").createMetroApi}. */
export interface LocaleMetroData {
  lines: readonly LocalizedLine[];
  stationsByLine: Readonly<Record<LineId, readonly LocalizedStation[]>>;
  transfers: readonly (readonly [string, string])[];
}
