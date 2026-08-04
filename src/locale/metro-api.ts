import type { LineId } from "../metro/types";
import type {
  LocaleMetroData,
  LocalizedLine,
  LocalizedStation,
} from "./types";

/**
 * The query surface of a per-locale metro entry point (`uzbgeo/metro/en`,
 * etc.). Mirrors `uzbgeo/metro` function-for-function; only the entity shapes
 * differ (single-locale strings instead of `Names` records).
 */
export interface LocaleMetroApi {
  getAllStations(): readonly LocalizedStation[];
  getStation(id: string): LocalizedStation | undefined;
  getStationsByLine(line: LineId): readonly LocalizedStation[];
  getAllLines(): readonly LocalizedLine[];
  getLine(id: LineId): LocalizedLine | undefined;
  getTransfers(): readonly (readonly [string, string])[];
  neighborsOnLine(
    stationId: string,
    line: LineId,
  ): { prev: LocalizedStation | null; next: LocalizedStation | null };
}

/**
 * Binds the metro query functions to one locale's dataset. The generated
 * entries pass stations with `transfers` already baked in (the main entry
 * derives them at module init; here the generator does it once at build time).
 */
export function createMetroApi(data: LocaleMetroData): LocaleMetroApi {
  const { lines, stationsByLine, transfers } = data;
  // stationsByLine is written in canonical line order (chilanzar → uzbekistan
  // → yunusabad → ring), so flattening preserves the main entry's order.
  const allStations = Object.values(stationsByLine).flat();
  const stationById = new Map(allStations.map((s) => [s.id, s]));
  const lineById = new Map(lines.map((l) => [l.id, l]));

  return {
    getAllStations: () => allStations,
    getStation: (id) => stationById.get(id),
    getStationsByLine: (line) => stationsByLine[line],
    getAllLines: () => lines,
    getLine: (id) => lineById.get(id),
    getTransfers: () => transfers,
    neighborsOnLine: (stationId, line) => {
      const order = stationsByLine[line];
      const i = order.findIndex((s) => s.id === stationId);
      if (i === -1) return { prev: null, next: null };

      const n = order.length;
      if (lineById.get(line)?.circular) {
        return {
          prev: order[(i - 1 + n) % n] ?? null,
          next: order[(i + 1) % n] ?? null,
        };
      }
      return {
        prev: i > 0 ? (order[i - 1] ?? null) : null,
        next: i < n - 1 ? (order[i + 1] ?? null) : null,
      };
    },
  };
}
