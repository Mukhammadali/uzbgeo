import { describe, test, expect } from "bun:test";
import {
  getAllRegions,
  getRegion,
  getAllDistricts,
  getDistrict,
  getDistrictsByRegionId,
  getAllCities,
  getRegionalCities,
  getCity,
  getCitiesByRegionId,
  getCitiesByDistrictId,
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

  test("every region has all 4 language titles populated", () => {
    for (const r of getAllRegions()) {
      expect(r.titles.en).toBeTruthy();
      expect(r.titles.uz).toBeTruthy();
      expect(r.titles.uzc).toBeTruthy();
      expect(r.titles.ru).toBeTruthy();
    }
  });

  test("Bukhara region has expected titles", () => {
    const r = getRegion("bukhara");
    expect(r?.titles.en).toBe("Bukhara Region");
    expect(r?.titles.uz).toBe("Buxoro viloyati");
    expect(r?.titles.uzc).toBe("Бухоро вилояти");
    expect(r?.titles.ru).toBe("Бухарская область");
  });

  test("Karakalpakstan title uses 'Republic of' form", () => {
    const r = getRegion("karakalpakstan");
    expect(r?.titles.en).toBe("Republic of Karakalpakstan");
    expect(r?.titles.ru).toBe("Республика Каракалпакстан");
  });

  test("Tashkent City title uses city form, not region form", () => {
    const r = getRegion("tashkent_city");
    expect(r?.titles.en).toBe("Tashkent City");
    expect(r?.titles.ru).toBe("Город Ташкент");
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

  test("every district has all 4 language names and titles", () => {
    for (const d of getAllDistricts()) {
      expect(d.names.en).toBeTruthy();
      expect(d.names.uz).toBeTruthy();
      expect(d.names.uzc).toBeTruthy();
      expect(d.names.ru).toBeTruthy();
      expect(d.titles.en).toBeTruthy();
      expect(d.titles.uz).toBeTruthy();
      expect(d.titles.uzc).toBeTruthy();
      expect(d.titles.ru).toBeTruthy();
    }
  });

  test("Izbaskan district has expected names and titles", () => {
    const d = getDistrict("izbaskan");
    expect(d?.names.en).toBe("Izbaskan");
    expect(d?.names.uz).toBe("Izboskan");
    expect(d?.names.uzc).toBe("Избоскан");
    expect(d?.names.ru).toBe("Избаскан");
    expect(d?.titles.en).toBe("Izbaskan District");
    expect(d?.titles.uz).toBe("Izboskan tumani");
    expect(d?.titles.uzc).toBe("Избоскан тумани");
    expect(d?.titles.ru).toBe("Избасканский район");
  });

  test("districts use Russian noun form in names, adjective form in titles", () => {
    const bukhara = getDistrict("bukhara");
    expect(bukhara?.names.ru).toBe("Бухара");
    expect(bukhara?.titles.ru).toBe("Бухарский район");
  });
});

describe("cities", () => {
  test("getAllCities returns all 109 cities (regional + district)", () => {
    expect(getAllCities()).toHaveLength(109);
  });

  test("getRegionalCities returns the 31 cities of regional significance", () => {
    const regional = getRegionalCities();
    expect(regional).toHaveLength(31);
    expect(regional.every((c) => c.subordination === "regional")).toBe(true);
  });

  test("getAllCities splits into 31 regional + 78 district-subordinate", () => {
    const all = getAllCities();
    expect(all.filter((c) => c.subordination === "regional")).toHaveLength(31);
    expect(all.filter((c) => c.subordination === "district")).toHaveLength(78);
  });

  test("getCity looks up a regional city by slug", () => {
    const c = getCity("bukhara_city");
    expect(c).toBeDefined();
    expect(c?.regionSlug).toBe("bukhara");
    expect(c?.regionIso).toBe("UZ-BU");
    expect(c?.type).toBe("city");
    expect(c?.subordination).toBe("regional");
    expect(c?.districtSlug).toBeUndefined();
    expect(c?.names.en).toBe("Bukhara");
  });

  test("getCity looks up a district-subordinate city by slug", () => {
    const c = getCity("gazalkent_city");
    expect(c).toBeDefined();
    expect(c?.subordination).toBe("district");
    expect(c?.regionSlug).toBe("tashkent");
    expect(c?.regionIso).toBe("UZ-TO");
    expect(c?.districtSlug).toBe("bostanlyk");
    expect(c?.parentSlug).toBe("bostanlyk");
    expect(c?.names.uz).toBe("G'azalkent");
    expect(c?.names.ru).toBe("Газалкент");
  });

  test("getCity returns undefined for unknown slug", () => {
    expect(getCity("nonexistent")).toBeUndefined();
  });

  test("Tashkent City is NOT in cities (it is a top-level region)", () => {
    expect(getCity("tashkent_city")).toBeUndefined();
    expect(getCity("tashkent")).toBeUndefined();
  });

  test("getCitiesByRegionId returns both tiers", () => {
    // Bukhara: 2 regional + 8 district-subordinate = 10.
    expect(getCitiesByRegionId("bukhara")).toHaveLength(10);
    expect(getCitiesByRegionId("UZ-BU")).toHaveLength(10);
  });

  test("Tashkent region has 7 regional + 8 district-subordinate = 15 cities", () => {
    const list = getCitiesByRegionId("tashkent");
    expect(list).toHaveLength(15);
    expect(list.filter((c) => c.subordination === "regional")).toHaveLength(7);
    expect(list.filter((c) => c.subordination === "district")).toHaveLength(8);
  });

  test("getCitiesByDistrictId returns the cities inside a district", () => {
    const list = getCitiesByDistrictId("bostanlyk");
    expect(list).toHaveLength(1);
    expect(list[0]?.slug).toBe("gazalkent_city");
  });

  test("getCitiesByDistrictId can return multiple cities in one district", () => {
    // Kurgantepa District (Andijan) contains both Kurgantepa and Karasu.
    const list = getCitiesByDistrictId("kurgantepa");
    expect(list.map((c) => c.slug).sort()).toEqual([
      "karasu_city",
      "kurgantepa_city",
    ]);
  });

  test("getCitiesByDistrictId returns empty for a district with no cities", () => {
    expect(getCitiesByDistrictId("altynkul")).toEqual([]);
  });

  test("Karakalpakstan has 1 regional city (Nukus)", () => {
    const list = getCitiesByRegionId("karakalpakstan").filter(
      (c) => c.subordination === "regional",
    );
    expect(list).toHaveLength(1);
    expect(list[0]?.slug).toBe("nukus_city");
  });

  test("every city references a real parent region", () => {
    const validSlugs = new Set(getAllRegions().map((r) => r.slug));
    for (const c of getAllCities()) {
      expect(validSlugs.has(c.regionSlug)).toBe(true);
    }
  });

  test("every district-subordinate city's districtSlug resolves to a real district", () => {
    const districtSlugs = new Set(getAllDistricts().map((d) => d.slug));
    for (const c of getAllCities()) {
      if (c.subordination === "district") {
        expect(c.districtSlug).toBeDefined();
        expect(districtSlugs.has(c.districtSlug as string)).toBe(true);
        expect(c.parentSlug).toBe(c.districtSlug);
      }
    }
  });

  test("every regional city's parentSlug is its region and has no districtSlug", () => {
    for (const c of getRegionalCities()) {
      expect(c.parentSlug).toBe(c.regionSlug);
      expect(c.districtSlug).toBeUndefined();
    }
  });

  test("every city has all 4 language names and titles", () => {
    for (const c of getAllCities()) {
      expect(c.names.en).toBeTruthy();
      expect(c.names.uz).toBeTruthy();
      expect(c.names.uzc).toBeTruthy();
      expect(c.names.ru).toBeTruthy();
      expect(c.titles.en).toBeTruthy();
      expect(c.titles.uz).toBeTruthy();
      expect(c.titles.uzc).toBeTruthy();
      expect(c.titles.ru).toBeTruthy();
    }
  });

  test("Bukhara city has expected names and titles", () => {
    const c = getCity("bukhara_city");
    expect(c?.names.en).toBe("Bukhara");
    expect(c?.names.ru).toBe("Бухара");
    expect(c?.titles.en).toBe("Bukhara City");
    expect(c?.titles.uz).toBe("Buxoro shahri");
    expect(c?.titles.uzc).toBe("Бухоро шаҳри");
    expect(c?.titles.ru).toBe("Город Бухара");
  });

  test("Russian city titles use capital 'Город' (PDF form)", () => {
    for (const c of getAllCities()) {
      expect(c.titles.ru.startsWith("Город ")).toBe(true);
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
