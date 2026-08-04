import type {
  Region,
  District,
  City,
  Names,
  Locatives,
  LanguageCode,
} from "../types";
import type { Line, Station } from "../metro/types";
import type {
  LocalizedLocatives,
  LocalizedRegion,
  LocalizedDistrict,
  LocalizedCity,
  LocalizedLine,
  LocalizedStation,
} from "./types";

/**
 * Projections from the canonical four-language entities to their
 * single-locale shapes. Used by `scripts/generate-locales.ts` to materialize
 * the per-locale datasets at build time, and by tests as the reference the
 * generated entries are checked against.
 */

const pick = (names: Names, locale: LanguageCode): string => names[locale];

const pickLocatives = (
  locatives: Locatives,
  locale: LanguageCode,
): LocalizedLocatives => ({
  name: locatives.name[locale],
  title: locatives.title[locale],
});

export function localizeRegion(
  region: Region,
  locale: LanguageCode,
): LocalizedRegion {
  return {
    slug: region.slug,
    iso: region.iso,
    category: region.category,
    name: pick(region.names, locale),
    title: pick(region.titles, locale),
    locative: pickLocatives(region.locatives, locale),
  };
}

export function localizeDistrict(
  district: District,
  locale: LanguageCode,
): LocalizedDistrict {
  return {
    type: "district",
    slug: district.slug,
    parentSlug: district.parentSlug,
    regionSlug: district.regionSlug,
    regionIso: district.regionIso,
    name: pick(district.names, locale),
    title: pick(district.titles, locale),
    locative: pickLocatives(district.locatives, locale),
  };
}

export function localizeCity(city: City, locale: LanguageCode): LocalizedCity {
  return {
    type: "city",
    slug: city.slug,
    parentSlug: city.parentSlug,
    regionSlug: city.regionSlug,
    regionIso: city.regionIso,
    subordination: city.subordination,
    // Spread keeps the key absent (not `undefined`) so the serialized JSON
    // matches the canonical data shape.
    ...(city.districtSlug !== undefined
      ? { districtSlug: city.districtSlug }
      : {}),
    name: pick(city.names, locale),
    title: pick(city.titles, locale),
    locative: pickLocatives(city.locatives, locale),
  };
}

export function localizeLine(line: Line, locale: LanguageCode): LocalizedLine {
  return {
    id: line.id,
    number: line.number,
    color: line.color,
    name: pick(line.names, locale),
    ...(line.circular ? { circular: true } : {}),
  };
}

export function localizeStation(
  station: Station,
  locale: LanguageCode,
): LocalizedStation {
  return {
    id: station.id,
    subway_line: station.subway_line,
    name: pick(station.names, locale),
    title: pick(station.titles, locale),
    transfers: station.transfers,
  };
}
