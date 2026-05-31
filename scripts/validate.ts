/**
 * Build-time data validation for uzbgeo.
 *
 * Asserts the static datasets are internally consistent before any release:
 *   - Counts match the expected totals
 *   - All slugs are unique within their type and follow the snake_case rule
 *   - All ISO 3166-2:UZ codes are well-formed and unique
 *   - Every district/city points at a real parent region
 *   - Every subdivision's parentSlug resolves to a real region or district
 *   - City subordination and districtSlug are mutually consistent
 *   - regionSlug and regionIso on every subdivision are consistent
 *
 * Run via `bun run validate` (also runs as the first step of `bun run build`).
 * Exits non-zero if any check fails.
 */

import { regions } from "../src/data/regions";
import { districts } from "../src/data/districts";
import { cities } from "../src/data/cities";
import { LINES } from "../src/metro/data/lines";
import { STATIONS_BY_LINE } from "../src/metro/data/stations";
import { TRANSFER_PAIRS } from "../src/metro/data/transfers";
import type { LineId } from "../src/metro/types";

const EXPECTED_REGIONS = 14;
const EXPECTED_DISTRICTS = 175;
const EXPECTED_CITIES = 109;
const EXPECTED_REGIONAL_CITIES = 31;
const EXPECTED_METRO_LINES = 4;
const EXPECTED_METRO_STATIONS = 50;
const EXPECTED_METRO_TRANSFER_PAIRS = 5;

const ISO_RE = /^UZ-[A-Z]{2}$/;
const SLUG_RE = /^[a-z][a-z0-9_]*$/;

const errors: string[] = [];
const fail = (msg: string): void => {
  errors.push(msg);
};

// ---- counts ----
if (regions.length !== EXPECTED_REGIONS) {
  fail(`Expected ${EXPECTED_REGIONS} regions, got ${regions.length}`);
}
if (districts.length !== EXPECTED_DISTRICTS) {
  fail(`Expected ${EXPECTED_DISTRICTS} districts, got ${districts.length}`);
}
if (cities.length !== EXPECTED_CITIES) {
  fail(`Expected ${EXPECTED_CITIES} cities, got ${cities.length}`);
}
const regionalCityCount = cities.filter(
  (c) => c.subordination === "regional",
).length;
if (regionalCityCount !== EXPECTED_REGIONAL_CITIES) {
  fail(
    `Expected ${EXPECTED_REGIONAL_CITIES} regional-significance cities, got ${regionalCityCount}`,
  );
}

// ---- region slug + ISO uniqueness and format ----
const regionSlugs = new Set<string>();
const regionIsos = new Set<string>();
const slugToIso = new Map<string, string>();

for (const r of regions) {
  if (!SLUG_RE.test(r.slug)) {
    fail(`Region "${r.slug}" has invalid slug format (must match ${SLUG_RE})`);
  }
  if (!ISO_RE.test(r.iso)) {
    fail(`Region "${r.slug}" has invalid ISO format: ${r.iso}`);
  }
  if (regionSlugs.has(r.slug)) {
    fail(`Duplicate region slug: ${r.slug}`);
  }
  if (regionIsos.has(r.iso)) {
    fail(`Duplicate region ISO: ${r.iso}`);
  }
  regionSlugs.add(r.slug);
  regionIsos.add(r.iso);
  slugToIso.set(r.slug, r.iso);
}

// ---- district slug uniqueness, format, and parent integrity ----
const districtSlugs = new Set<string>();
for (const d of districts) {
  if (!SLUG_RE.test(d.slug)) {
    fail(`District "${d.slug}" has invalid slug format`);
  }
  if (districtSlugs.has(d.slug)) {
    fail(`Duplicate district slug: ${d.slug}`);
  }
  districtSlugs.add(d.slug);

  if (!regionSlugs.has(d.regionSlug)) {
    fail(`District "${d.slug}" references unknown region slug: ${d.regionSlug}`);
  }
  if (!regionIsos.has(d.regionIso)) {
    fail(`District "${d.slug}" references unknown region ISO: ${d.regionIso}`);
  }
  const expectedIso = slugToIso.get(d.regionSlug);
  if (expectedIso && expectedIso !== d.regionIso) {
    fail(
      `District "${d.slug}" has inconsistent regionSlug/regionIso: ${d.regionSlug} maps to ${expectedIso}, but regionIso is ${d.regionIso}`,
    );
  }
  // A district's parent is always its region.
  if (d.parentSlug !== d.regionSlug) {
    fail(
      `District "${d.slug}" has parentSlug "${d.parentSlug}" but should equal its regionSlug "${d.regionSlug}"`,
    );
  }
}

// ---- city slug uniqueness, format, and parent integrity ----
const citySlugs = new Set<string>();
for (const c of cities) {
  if (!SLUG_RE.test(c.slug)) {
    fail(`City "${c.slug}" has invalid slug format`);
  }
  if (citySlugs.has(c.slug)) {
    fail(`Duplicate city slug: ${c.slug}`);
  }
  citySlugs.add(c.slug);

  if (!regionSlugs.has(c.regionSlug)) {
    fail(`City "${c.slug}" references unknown region slug: ${c.regionSlug}`);
  }
  if (!regionIsos.has(c.regionIso)) {
    fail(`City "${c.slug}" references unknown region ISO: ${c.regionIso}`);
  }
  const expectedIso = slugToIso.get(c.regionSlug);
  if (expectedIso && expectedIso !== c.regionIso) {
    fail(
      `City "${c.slug}" has inconsistent regionSlug/regionIso: ${c.regionSlug} maps to ${expectedIso}, but regionIso is ${c.regionIso}`,
    );
  }

  if (c.subordination === "regional") {
    // Regional cities are parallel to districts: parent is the region, no districtSlug.
    if (c.parentSlug !== c.regionSlug) {
      fail(
        `Regional city "${c.slug}" has parentSlug "${c.parentSlug}" but should equal its regionSlug "${c.regionSlug}"`,
      );
    }
    if (c.districtSlug !== undefined) {
      fail(`Regional city "${c.slug}" must not have a districtSlug`);
    }
  } else if (c.subordination === "district") {
    // District-subordinate cities are nested inside a district.
    if (c.districtSlug === undefined) {
      fail(`District-subordinate city "${c.slug}" is missing districtSlug`);
    } else {
      if (!districtSlugs.has(c.districtSlug)) {
        fail(
          `City "${c.slug}" references unknown districtSlug: ${c.districtSlug}`,
        );
      }
      if (c.parentSlug !== c.districtSlug) {
        fail(
          `District-subordinate city "${c.slug}" has parentSlug "${c.parentSlug}" but should equal its districtSlug "${c.districtSlug}"`,
        );
      }
      // The parent district must live in the same region as the city.
      const parentDistrict = districts.find((d) => d.slug === c.districtSlug);
      if (parentDistrict && parentDistrict.regionSlug !== c.regionSlug) {
        fail(
          `City "${c.slug}" is in region "${c.regionSlug}" but its district "${c.districtSlug}" is in region "${parentDistrict.regionSlug}"`,
        );
      }
    }
  } else {
    fail(`City "${c.slug}" has invalid subordination: ${c.subordination}`);
  }
}

// ---- name + title completeness ----
const checkLocalized = (
  kind: string,
  slug: string,
  field: "names" | "titles",
  bag: { en: string; uz: string; uzc: string; ru: string },
): void => {
  for (const lang of ["en", "uz", "uzc", "ru"] as const) {
    if (!bag[lang] || bag[lang].trim().length === 0) {
      fail(`${kind} "${slug}" is missing the ${lang} entry in ${field}`);
    }
  }
};
for (const r of regions) {
  checkLocalized("Region", r.slug, "names", r.names);
  checkLocalized("Region", r.slug, "titles", r.titles);
}
for (const d of districts) {
  checkLocalized("District", d.slug, "names", d.names);
  checkLocalized("District", d.slug, "titles", d.titles);
}
for (const c of cities) {
  checkLocalized("City", c.slug, "names", c.names);
  checkLocalized("City", c.slug, "titles", c.titles);
}

// ---- metro: lines ----
const LINE_IDS: readonly LineId[] = [
  "chilanzar",
  "uzbekistan",
  "yunusabad",
  "ring",
];

const lineKeys = Object.keys(LINES) as LineId[];
if (lineKeys.length !== EXPECTED_METRO_LINES) {
  fail(`Expected ${EXPECTED_METRO_LINES} metro lines, got ${lineKeys.length}`);
}
for (const id of LINE_IDS) {
  const line = LINES[id];
  if (!line) {
    fail(`Metro line "${id}" is missing from LINES`);
    continue;
  }
  if (line.id !== id) {
    fail(`Metro line "${id}" has mismatched id: ${line.id}`);
  }
  for (const lang of ["en", "uz", "uzc", "ru"] as const) {
    if (!line.names[lang] || line.names[lang].trim().length === 0) {
      fail(`Metro line "${id}" is missing the ${lang} entry in names`);
    }
  }
  if (!/^#[0-9A-Fa-f]{6}$/.test(line.color)) {
    fail(`Metro line "${id}" has invalid color: ${line.color}`);
  }
}

// ---- metro: stations ----
const stationSlugs = new Set<string>();
const stationsByLineCount: Record<string, number> = {};
let totalStations = 0;

for (const id of LINE_IDS) {
  const stations = STATIONS_BY_LINE[id];
  if (!stations) {
    fail(`Metro line "${id}" has no stations list`);
    continue;
  }
  stationsByLineCount[id] = stations.length;
  totalStations += stations.length;

  for (const s of stations) {
    if (!SLUG_RE.test(s.id)) {
      fail(`Metro station "${s.id}" has invalid slug format`);
    }
    if (stationSlugs.has(s.id)) {
      fail(`Duplicate metro station slug across lines: ${s.id}`);
    }
    stationSlugs.add(s.id);

    if (s.subway_line !== id) {
      fail(
        `Metro station "${s.id}" is grouped under "${id}" but subway_line is "${s.subway_line}"`,
      );
    }

    checkLocalized("Metro station", s.id, "names", s.names);
    checkLocalized("Metro station", s.id, "titles", s.titles);
  }
}

if (totalStations !== EXPECTED_METRO_STATIONS) {
  fail(`Expected ${EXPECTED_METRO_STATIONS} metro stations, got ${totalStations}`);
}

// ---- metro: transfers ----
if (TRANSFER_PAIRS.length !== EXPECTED_METRO_TRANSFER_PAIRS) {
  fail(
    `Expected ${EXPECTED_METRO_TRANSFER_PAIRS} metro transfer pairs, got ${TRANSFER_PAIRS.length}`,
  );
}
const seenTransferPairs = new Set<string>();
for (const [a, b] of TRANSFER_PAIRS) {
  if (!stationSlugs.has(a)) {
    fail(`Metro transfer references unknown station: ${a}`);
  }
  if (!stationSlugs.has(b)) {
    fail(`Metro transfer references unknown station: ${b}`);
  }
  if (a === b) {
    fail(`Metro transfer pair has identical endpoints: ${a}`);
  }
  const key = [a, b].sort().join("↔");
  if (seenTransferPairs.has(key)) {
    fail(`Duplicate metro transfer pair: ${a} ↔ ${b}`);
  }
  seenTransferPairs.add(key);
}

// ---- report ----
if (errors.length > 0) {
  console.error(`\nuzbgeo: validation failed with ${errors.length} error(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`uzbgeo: data validated successfully`);
console.log(`  regions:   ${regions.length}`);
console.log(`  districts: ${districts.length}`);
console.log(
  `  cities:    ${cities.length} (${regionalCityCount} regional, ${cities.length - regionalCityCount} district-subordinate)`,
);
console.log(`  total subdivisions: ${districts.length + cities.length}`);
console.log(`  metro lines:     ${lineKeys.length}`);
console.log(`  metro stations:  ${totalStations}`);
for (const id of LINE_IDS) {
  console.log(`    ${id}: ${stationsByLineCount[id]}`);
}
console.log(`  metro transfers: ${TRANSFER_PAIRS.length}`);
