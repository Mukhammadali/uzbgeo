import { describe, test, expect } from "bun:test";
import {
  getAllRegions,
  getRegion,
  getAllDistricts,
  getDistrict,
  getDistrictsByRegionId,
  getAllCities,
  getCity,
  getCitiesByRegionId,
} from "../src/index";

describe("regions", () => {
  test("getAllRegions returns all 14 top-level units", () => {
    expect(getAllRegions()).toHaveLength(14);
  });

  test("getRegion looks up by slug", () => {
    const r = getRegion("bukhara");
    expect(r).toBeDefined();
    expect(r?.iso).toBe("UZ-BU");
    expect(r?.names.en).toBe("Bukhara");
    expect(r?.names.ru).toBe("Бухара");
  });

  test("getRegion looks up by ISO 3166-2 code", () => {
    const r = getRegion("UZ-BU");
    expect(r).toBeDefined();
    expect(r?.slug).toBe("bukhara");
  });

  test("getRegion returns undefined for unknown id", () => {
    expect(getRegion("nonexistent")).toBeUndefined();
    expect(getRegion("UZ-XX")).toBeUndefined();
  });

  test("getRegion is case-sensitive (matches stored form)", () => {
    expect(getRegion("BUKHARA")).toBeUndefined();
    expect(getRegion("uz-bu")).toBeUndefined();
  });

  test("includes Karakalpakstan as a republic", () => {
    const r = getRegion("karakalpakstan");
    expect(r?.category).toBe("republic");
    expect(r?.iso).toBe("UZ-QR");
  });

  test("includes Tashkent City as a city category", () => {
    const r = getRegion("tashkent_city");
    expect(r?.category).toBe("city");
    expect(r?.iso).toBe("UZ-TK");
  });

  test("Tashkent region and Tashkent City are distinct", () => {
    const region = getRegion("tashkent");
    const city = getRegion("tashkent_city");
    expect(region?.iso).toBe("UZ-TO");
    expect(city?.iso).toBe("UZ-TK");
    expect(region?.category).toBe("region");
    expect(city?.category).toBe("city");
  });

  test("every region has all 4 language names populated", () => {
    for (const r of getAllRegions()) {
      expect(r.names.en).toBeTruthy();
      expect(r.names.uz).toBeTruthy();
      expect(r.names.uzc).toBeTruthy();
      expect(r.names.ru).toBeTruthy();
    }
  });

  test("ISO codes are unique", () => {
    const isos = getAllRegions().map((r) => r.iso);
    expect(new Set(isos).size).toBe(isos.length);
  });

  test("slugs are unique", () => {
    const slugs = getAllRegions().map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("districts", () => {
  test("getAllDistricts returns 175 districts", () => {
    expect(getAllDistricts()).toHaveLength(175);
  });

  test("getDistrict looks up by slug", () => {
    const d = getDistrict("shakhrikhan");
    expect(d).toBeDefined();
    expect(d?.regionSlug).toBe("andijan");
    expect(d?.regionIso).toBe("UZ-AN");
    expect(d?.type).toBe("district");
  });

  test("getDistrict returns undefined for unknown slug", () => {
    expect(getDistrict("nonexistent")).toBeUndefined();
  });

  test("getDistrictsByRegionId works with slug", () => {
    expect(getDistrictsByRegionId("bukhara")).toHaveLength(11);
  });

  test("getDistrictsByRegionId works with ISO code", () => {
    expect(getDistrictsByRegionId("UZ-BU")).toHaveLength(11);
  });

  test("Karakalpakstan has 16 districts", () => {
    expect(getDistrictsByRegionId("karakalpakstan")).toHaveLength(16);
  });

  test("Tashkent City has 12 internal districts", () => {
    expect(getDistrictsByRegionId("tashkent_city")).toHaveLength(12);
  });

  test("Tashkent Region has 15 districts", () => {
    expect(getDistrictsByRegionId("tashkent")).toHaveLength(15);
  });

  test("Fergana has 15 districts", () => {
    expect(getDistrictsByRegionId("fergana")).toHaveLength(15);
  });

  test("getDistrictsByRegionId returns empty for unknown region", () => {
    expect(getDistrictsByRegionId("nonexistent")).toEqual([]);
  });

  test("every district references a real parent region", () => {
    const validSlugs = new Set(getAllRegions().map((r) => r.slug));
    const validIsos = new Set(getAllRegions().map((r) => r.iso));
    for (const d of getAllDistricts()) {
      expect(validSlugs.has(d.regionSlug)).toBe(true);
      expect(validIsos.has(d.regionIso)).toBe(true);
    }
  });

  test("district counts per region sum to 175", () => {
    let total = 0;
    for (const r of getAllRegions()) {
      total += getDistrictsByRegionId(r.slug).length;
    }
    expect(total).toBe(175);
  });

  test("every district has all 4 language names", () => {
    for (const d of getAllDistricts()) {
      expect(d.names.en).toBeTruthy();
      expect(d.names.uz).toBeTruthy();
      expect(d.names.uzc).toBeTruthy();
      expect(d.names.ru).toBeTruthy();
    }
  });
});

describe("cities of regional significance", () => {
  test("getAllCities returns 31 cities", () => {
    expect(getAllCities()).toHaveLength(31);
  });

  test("getCity looks up by slug", () => {
    const c = getCity("bukhara_city");
    expect(c).toBeDefined();
    expect(c?.regionSlug).toBe("bukhara");
    expect(c?.regionIso).toBe("UZ-BU");
    expect(c?.type).toBe("city");
    expect(c?.names.en).toBe("Bukhara");
  });

  test("getCity returns undefined for unknown slug", () => {
    expect(getCity("nonexistent")).toBeUndefined();
  });

  test("Tashkent City is NOT in cities (it is a top-level region)", () => {
    expect(getCity("tashkent_city")).toBeUndefined();
    expect(getCity("tashkent")).toBeUndefined();
  });

  test("getCitiesByRegionId works with slug and ISO", () => {
    expect(getCitiesByRegionId("bukhara")).toHaveLength(2);
    expect(getCitiesByRegionId("UZ-BU")).toHaveLength(2);
  });

  test("Tashkent region has 7 cities of regional significance", () => {
    expect(getCitiesByRegionId("tashkent")).toHaveLength(7);
  });

  test("Karakalpakstan has 1 city (Nukus)", () => {
    const list = getCitiesByRegionId("karakalpakstan");
    expect(list).toHaveLength(1);
    expect(list[0]?.slug).toBe("nukus_city");
  });

  test("every city references a real parent region", () => {
    const validSlugs = new Set(getAllRegions().map((r) => r.slug));
    for (const c of getAllCities()) {
      expect(validSlugs.has(c.regionSlug)).toBe(true);
    }
  });

  test("every city has all 4 language names", () => {
    for (const c of getAllCities()) {
      expect(c.names.en).toBeTruthy();
      expect(c.names.uz).toBeTruthy();
      expect(c.names.uzc).toBeTruthy();
      expect(c.names.ru).toBeTruthy();
    }
  });
});

describe("namespace separation", () => {
  test("a district and a city can share a base name without colliding", () => {
    // Bukhara has a `bukhara` district AND a `bukhara_city` city.
    expect(getDistrict("bukhara")?.type).toBe("district");
    expect(getCity("bukhara_city")?.type).toBe("city");
  });
});
