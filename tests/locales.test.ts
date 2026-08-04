import { describe, expect, test } from "bun:test";
import { regions } from "../src/data/regions";
import { districts } from "../src/data/districts";
import { cities } from "../src/data/cities";
import * as mainMetro from "../src/metro";
import type { LanguageCode } from "../src/types";
import * as en from "../src/locales/en";
import * as uz from "../src/locales/uz";
import * as uzc from "../src/locales/uzc";
import * as ru from "../src/locales/ru";
import * as metroEn from "../src/locales/metro/en";
import * as metroUz from "../src/locales/metro/uz";
import * as metroUzc from "../src/locales/metro/uzc";
import * as metroRu from "../src/locales/metro/ru";

const geoEntries = { en, uz, uzc, ru } as const;
const metroEntries = {
  en: metroEn,
  uz: metroUz,
  uzc: metroUzc,
  ru: metroRu,
} as const;
const LOCALES = Object.keys(geoEntries) as LanguageCode[];

describe.each(LOCALES)("uzbgeo/%s", (locale) => {
  const entry = geoEntries[locale];

  test("exports its locale", () => {
    expect(entry.locale).toBe(locale);
  });

  test("carries the full dataset", () => {
    expect(entry.getAllRegions()).toHaveLength(regions.length);
    expect(entry.getAllDistricts()).toHaveLength(districts.length);
    expect(entry.getAllCities()).toHaveLength(cities.length);
    expect(entry.getRegionalCities()).toHaveLength(
      cities.filter((c) => c.subordination === "regional").length,
    );
  });

  test("every entity matches the canonical data projected to this locale", () => {
    for (const region of regions) {
      const localized = entry.getRegion(region.slug);
      expect(localized).toMatchObject({
        slug: region.slug,
        iso: region.iso,
        category: region.category,
        name: region.names[locale],
        title: region.titles[locale],
        locative: {
          name: region.locatives.name[locale],
          title: region.locatives.title[locale],
        },
      });
    }
    for (const district of districts) {
      const localized = entry.getDistrict(district.slug);
      expect(localized).toMatchObject({
        type: "district",
        slug: district.slug,
        parentSlug: district.parentSlug,
        regionSlug: district.regionSlug,
        regionIso: district.regionIso,
        name: district.names[locale],
        title: district.titles[locale],
        locative: {
          name: district.locatives.name[locale],
          title: district.locatives.title[locale],
        },
      });
    }
    for (const city of cities) {
      const localized = entry.getCity(city.slug);
      expect(localized).toMatchObject({
        type: "city",
        slug: city.slug,
        subordination: city.subordination,
        name: city.names[locale],
        title: city.titles[locale],
      });
      expect(localized?.districtSlug).toBe(city.districtSlug);
    }
  });

  test("no other locale's strings leak in", () => {
    // The Bukhara region title differs across all four languages, so it acts
    // as a canary for a wrong-locale projection.
    const bukhara = regions.find((r) => r.slug === "bukhara")!;
    const localized = entry.getRegion("bukhara")!;
    for (const other of LOCALES.filter((l) => l !== locale)) {
      expect(localized.title).not.toBe(bukhara.titles[other]);
    }
  });

  test("lookup by ISO code and region filters work", () => {
    expect(entry.getRegion("UZ-BU")?.slug).toBe("bukhara");
    expect(entry.getDistrictsByRegionId("bukhara").length).toBeGreaterThan(0);
    expect(entry.getDistrictsByRegionId("UZ-BU")).toEqual(
      entry.getDistrictsByRegionId("bukhara"),
    );
    expect(entry.getCitiesByRegionId("bukhara").length).toBeGreaterThan(0);
    const gazalkent = entry.getCity("gazalkent_city");
    expect(gazalkent?.districtSlug).toBe("bostanlyk");
    expect(
      entry.getCitiesByDistrictId("bostanlyk").map((c) => c.slug),
    ).toContain("gazalkent_city");
  });
});

describe.each(LOCALES)("uzbgeo/metro/%s", (locale) => {
  const entry = metroEntries[locale];

  test("exports its locale", () => {
    expect(entry.locale).toBe(locale);
  });

  test("stations and lines match the main entry projected to this locale", () => {
    const mainStations = mainMetro.getAllStations();
    const localizedStations = entry.getAllStations();
    expect(localizedStations).toHaveLength(mainStations.length);
    // Same flat order as the main entry.
    expect(localizedStations.map((s) => s.id)).toEqual(
      mainStations.map((s) => s.id),
    );
    for (const station of mainStations) {
      const localized = entry.getStation(station.id);
      expect(localized).toMatchObject({
        id: station.id,
        subway_line: station.subway_line,
        name: station.names[locale],
        title: station.titles[locale],
      });
      expect(localized?.transfers).toEqual([...station.transfers]);
    }
    for (const line of mainMetro.getAllLines()) {
      const localized = entry.getLine(line.id);
      expect(localized).toMatchObject({
        id: line.id,
        number: line.number,
        color: line.color,
        name: line.names[locale],
      });
      expect(Boolean(localized?.circular)).toBe(Boolean(line.circular));
    }
  });

  test("neighborsOnLine matches the main entry, including ring wrap-around", () => {
    for (const line of mainMetro.getAllLines()) {
      for (const station of mainMetro.getStationsByLine(line.id)) {
        const main = mainMetro.neighborsOnLine(station.id, line.id);
        const localized = entry.neighborsOnLine(station.id, line.id);
        expect(localized.prev?.id ?? null).toBe(main.prev?.id ?? null);
        expect(localized.next?.id ?? null).toBe(main.next?.id ?? null);
      }
    }
    expect(entry.neighborsOnLine("not_a_station", "ring")).toEqual({
      prev: null,
      next: null,
    });
  });

  test("transfer pairs match the main entry", () => {
    expect(entry.getTransfers()).toEqual(mainMetro.getTransfers());
  });
});
