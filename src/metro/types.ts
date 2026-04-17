import type { Names } from "../types";

/**
 * Re-export Names so metro-only consumers don't need to reach into the main
 * entry for the shared localization shape.
 */
export type { Names, LanguageCode } from "../types";

/**
 * The four Tashkent Metro lines.
 * - `chilanzar` (red, #1) — Chilonzor liniyasi
 * - `uzbekistan` (blue, #2) — O'zbekiston liniyasi
 * - `yunusabad` (green, #3) — Yunusobod liniyasi
 * - `ring` (orange, #4) — Halqa yo'li / Independence 30th Anniversary Line
 */
export type LineId = "chilanzar" | "uzbekistan" | "yunusabad" | "ring";

/**
 * A Tashkent Metro line. `names` holds the full line name in each language
 * (e.g., "Chilanzar Line", "Чиланзарская линия"). Lines don't split into
 * names/titles the way stations and regions do — consumers always want the
 * full form with the word "Line" baked in.
 */
export interface Line {
  /** Stable identifier for the line. */
  id: LineId;
  /** Official line number (1–4) displayed on maps and rolling stock. */
  number: number;
  /** Hex color used for the line on the official map. */
  color: string;
  /**
   * Full line name in all four languages. Example:
   * `{ en: "Chilanzar Line", uz: "Chilonzor yo'li", uzc: "Чилонзор йўли", ru: "Чиланзарская линия" }`.
   */
  names: Names;
  /**
   * `true` for the ring line, which loops back on itself. For a circular
   * line, the last station in the order is adjacent to the first.
   */
  circular?: boolean;
}

/**
 * A Tashkent Metro station.
 *
 * Stations are grouped by line in the source data (`STATIONS_BY_LINE`), and
 * the array order within each line is the physical station sequence. The
 * flat list returned by `getAllStations()` flattens these in line order:
 * chilanzar → uzbekistan → yunusabad → ring.
 */
export interface Station {
  /**
   * Stable snake_case identifier (e.g., `"paxtakor"`, `"amir_temur_xiyoboni"`).
   * Unique across all lines.
   */
  id: string;
  /** Line this station primarily belongs to. Transfers are covered by `transfers`. */
  subway_line: LineId;
  /**
   * Short names: just the station's proper name, no "Station" word.
   * Example: `{ en: "Paxtakor", uz: "Paxtakor", uzc: "Пахтакор", ru: "Пахтакор" }`.
   */
  names: Names;
  /**
   * Full titles with the station word baked in. Use for headings, addresses,
   * SEO, and any context where the type word ("Station", "bekati", "Станция")
   * belongs in the name.
   * Example: `{ en: "Paxtakor Station", uz: "Paxtakor bekati", uzc: "Пахтакор бекати", ru: "Станция Пахтакор" }`.
   */
  titles: Names;
  /**
   * IDs of stations on *other* lines that this station transfers to.
   * Always populated: `[]` for non-transfer stations, filled in both
   * directions for transfer stations. Derived at module init from
   * `TRANSFER_PAIRS` — do not mutate.
   */
  transfers: readonly string[];
}

/**
 * Internal shape for station source data, before `transfers` is injected.
 * Consumers of the public API never see this — they always get fully
 * populated `Station` objects.
 */
export type StationSeed = Omit<Station, "transfers">;
