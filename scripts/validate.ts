/**
 * Build-time data validation for uzbgeo.
 *
 * Asserts the static datasets are internally consistent before any release:
 *   - Counts match the expected totals
 *   - All slugs are unique within their type and follow the snake_case rule
 *   - All ISO 3166-2:UZ codes are well-formed and unique
 *   - Every district/city points at a real parent region
 *   - regionSlug and regionIso on every subdivision are consistent
 *
 * Run via `bun run validate` (also runs as the first step of `bun run build`).
 * Exits non-zero if any check fails.
 */

import { regions } from "../src/data/regions";
import { districts } from "../src/data/districts";
import { cities } from "../src/data/cities";

const EXPECTED_REGIONS = 14;
const EXPECTED_DISTRICTS = 175;
const EXPECTED_CITIES = 31;

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

// ---- report ----
if (errors.length > 0) {
  console.error(`\nuzbgeo: validation failed with ${errors.length} error(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`uzbgeo: data validated successfully`);
console.log(`  regions:   ${regions.length}`);
console.log(`  districts: ${districts.length}`);
console.log(`  cities:    ${cities.length}`);
console.log(`  total subdivisions: ${districts.length + cities.length}`);
