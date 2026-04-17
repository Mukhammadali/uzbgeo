import type { Line, LineId, Station, StationSeed } from "./types";
import { LINES } from "./data/lines";
import { STATIONS_BY_LINE as SEEDS_BY_LINE } from "./data/stations";
import { TRANSFER_PAIRS } from "./data/transfers";

// Re-export public types so metro consumers can import everything from "uzbgeo/metro".
export type { Line, LineId, Station, Names, LanguageCode } from "./types";

// ============================================================================
// Build-time derivation
// ============================================================================

// Symmetric transfer index built once at module init. For every pair [a, b]
// in TRANSFER_PAIRS, both directions end up populated.
const TRANSFERS_BY_STATION = (() => {
  const map = new Map<string, string[]>();
  for (const [a, b] of TRANSFER_PAIRS) {
    if (!map.has(a)) map.set(a, []);
    if (!map.has(b)) map.set(b, []);
    map.get(a)!.push(b);
    map.get(b)!.push(a);
  }
  return map;
})();

const injectTransfers = (seeds: readonly StationSeed[]): readonly Station[] =>
  seeds.map(
    (seed): Station => ({
      ...seed,
      transfers: TRANSFERS_BY_STATION.get(seed.id) ?? [],
    }),
  );

const STATIONS_BY_LINE: Readonly<Record<LineId, readonly Station[]>> = {
  chilanzar: injectTransfers(SEEDS_BY_LINE.chilanzar),
  uzbekistan: injectTransfers(SEEDS_BY_LINE.uzbekistan),
  yunusabad: injectTransfers(SEEDS_BY_LINE.yunusabad),
  ring: injectTransfers(SEEDS_BY_LINE.ring),
};

const ALL_STATIONS: readonly Station[] = Object.values(STATIONS_BY_LINE).flat();
const ALL_LINES: readonly Line[] = Object.values(LINES);

const STATION_BY_ID = new Map<string, Station>(
  ALL_STATIONS.map((s) => [s.id, s]),
);

// ============================================================================
// Stations
// ============================================================================

/**
 * Returns all Tashkent Metro stations as a flat list, ordered by line
 * (chilanzar → uzbekistan → yunusabad → ring) then by physical sequence
 * within each line.
 */
export function getAllStations(): readonly Station[] {
  return ALL_STATIONS;
}

/**
 * Look up a station by its snake_case id (e.g., `"paxtakor"`).
 * Returns `undefined` if no match.
 */
export function getStation(id: string): Station | undefined {
  return STATION_BY_ID.get(id);
}

/**
 * Returns all stations on the given line, in physical order.
 * For the ring line, order starts at `texnopark` and proceeds clockwise
 * on the map; the last station (`choshtepa`) is adjacent to the first.
 */
export function getStationsByLine(line: LineId): readonly Station[] {
  return STATIONS_BY_LINE[line];
}

// ============================================================================
// Lines
// ============================================================================

/**
 * Returns all four Tashkent Metro lines, ordered by their official number.
 */
export function getAllLines(): readonly Line[] {
  return ALL_LINES;
}

/**
 * Look up a line by its id. Returns `undefined` if the id is unknown —
 * though since `LineId` is a string literal union, TypeScript will narrow
 * the return type when called with a literal argument.
 */
export function getLine(id: LineId): Line | undefined {
  return LINES[id];
}

// ============================================================================
// Transfers
// ============================================================================

/**
 * Returns the raw list of cross-line transfer pairs. Each pair links two
 * stations on different lines that form a physical interchange.
 *
 * Note: every `Station` already has a `transfers: string[]` field populated
 * in both directions, so most consumers don't need this raw list.
 */
export function getTransfers(): readonly (readonly [string, string])[] {
  return TRANSFER_PAIRS;
}

// ============================================================================
// Neighbors
// ============================================================================

/**
 * Returns the previous and next stations on the given line relative to
 * `stationId`. For linear lines, the first station has `prev: null` and the
 * last has `next: null`. For the ring line, both are always populated
 * (the order wraps around).
 *
 * Returns `{ prev: null, next: null }` if the station is not on that line.
 */
export function neighborsOnLine(
  stationId: string,
  line: LineId,
): { prev: Station | null; next: Station | null } {
  const order = STATIONS_BY_LINE[line];
  const i = order.findIndex((s) => s.id === stationId);
  if (i === -1) return { prev: null, next: null };

  const n = order.length;
  if (LINES[line].circular) {
    return {
      prev: order[(i - 1 + n) % n] ?? null,
      next: order[(i + 1) % n] ?? null,
    };
  }
  return {
    prev: i > 0 ? (order[i - 1] ?? null) : null,
    next: i < n - 1 ? (order[i + 1] ?? null) : null,
  };
}
