import { describe, test, expect } from "bun:test";
import {
  getAllStations,
  getStation,
  getStationsByLine,
  getAllLines,
  getLine,
  getTransfers,
  neighborsOnLine,
} from "../src/metro/index";
import type { LineId } from "../src/metro/index";

const LINE_IDS: readonly LineId[] = [
  "chilanzar",
  "uzbekistan",
  "yunusabad",
  "ring",
];

describe("lines", () => {
  test("getAllLines returns all 4 lines", () => {
    expect(getAllLines()).toHaveLength(4);
  });

  test("getLine returns each line by id", () => {
    for (const id of LINE_IDS) {
      const line = getLine(id);
      expect(line).toBeDefined();
      expect(line?.id).toBe(id);
    }
  });

  test("lines are numbered 1..4", () => {
    const numbers = getAllLines().map((l) => l.number).sort();
    expect(numbers).toEqual([1, 2, 3, 4]);
  });

  test("only the ring line is circular", () => {
    for (const line of getAllLines()) {
      if (line.id === "ring") {
        expect(line.circular).toBe(true);
      } else {
        expect(line.circular).toBeFalsy();
      }
    }
  });

  test("every line has all 4 language names populated", () => {
    for (const line of getAllLines()) {
      expect(line.names.en).toBeTruthy();
      expect(line.names.uz).toBeTruthy();
      expect(line.names.uzc).toBeTruthy();
      expect(line.names.ru).toBeTruthy();
    }
  });

  test("line colors are valid hex", () => {
    for (const line of getAllLines()) {
      expect(line.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });
});

describe("stations", () => {
  test("getAllStations returns 50 stations", () => {
    expect(getAllStations()).toHaveLength(50);
  });

  test("station counts per line match the Tashkent map", () => {
    expect(getStationsByLine("chilanzar")).toHaveLength(12);
    expect(getStationsByLine("uzbekistan")).toHaveLength(11);
    expect(getStationsByLine("yunusabad")).toHaveLength(8);
    expect(getStationsByLine("ring")).toHaveLength(19);
  });

  test("getStation looks up by id", () => {
    const s = getStation("paxtakor");
    expect(s).toBeDefined();
    expect(s?.subway_line).toBe("chilanzar");
    expect(s?.names.en).toBe("Paxtakor");
    expect(s?.names.ru).toBe("Пахтакор");
  });

  test("getStation returns undefined for unknown id", () => {
    expect(getStation("nonexistent")).toBeUndefined();
  });

  test("Paxtakor has the expected titles pattern", () => {
    const s = getStation("paxtakor");
    expect(s?.titles.en).toBe("Paxtakor Station");
    expect(s?.titles.uz).toBe("Paxtakor bekati");
    expect(s?.titles.uzc).toBe("Пахтакор бекати");
    expect(s?.titles.ru).toBe("Станция Пахтакор");
  });

  test("every station has all 4 language names and titles", () => {
    for (const s of getAllStations()) {
      expect(s.names.en).toBeTruthy();
      expect(s.names.uz).toBeTruthy();
      expect(s.names.uzc).toBeTruthy();
      expect(s.names.ru).toBeTruthy();
      expect(s.titles.en).toBeTruthy();
      expect(s.titles.uz).toBeTruthy();
      expect(s.titles.uzc).toBeTruthy();
      expect(s.titles.ru).toBeTruthy();
    }
  });

  test("station ids are unique across all lines", () => {
    const ids = getAllStations().map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every station's subway_line matches its grouping", () => {
    for (const lineId of LINE_IDS) {
      for (const s of getStationsByLine(lineId)) {
        expect(s.subway_line).toBe(lineId);
      }
    }
  });

  test("getStationsByLine returns stations in physical order", () => {
    const chilanzar = getStationsByLine("chilanzar");
    expect(chilanzar[0]?.id).toBe("buyuk_ipak_yoli");
    expect(chilanzar[chilanzar.length - 1]?.id).toBe("olmazor");

    const uzbekistan = getStationsByLine("uzbekistan");
    expect(uzbekistan[0]?.id).toBe("beruniy");
    expect(uzbekistan[uzbekistan.length - 1]?.id).toBe("dostlik");

    const ring = getStationsByLine("ring");
    expect(ring[0]?.id).toBe("texnopark");
    expect(ring[ring.length - 1]?.id).toBe("choshtepa");
  });

  test("Russian titles always start with capital Станция", () => {
    for (const s of getAllStations()) {
      expect(s.titles.ru.startsWith("Станция ")).toBe(true);
    }
  });

  test("English titles always end with Station", () => {
    for (const s of getAllStations()) {
      expect(s.titles.en.endsWith(" Station")).toBe(true);
    }
  });

  test("Uzbek Latin titles always end with bekati", () => {
    for (const s of getAllStations()) {
      expect(s.titles.uz.endsWith(" bekati")).toBe(true);
    }
  });

  test("Uzbek Cyrillic titles always end with бекати", () => {
    for (const s of getAllStations()) {
      expect(s.titles.uzc.endsWith(" бекати")).toBe(true);
    }
  });
});

describe("transfers", () => {
  test("getTransfers returns the 5 cross-line pairs", () => {
    expect(getTransfers()).toHaveLength(5);
  });

  test("every transfer references real stations on different lines", () => {
    for (const [a, b] of getTransfers()) {
      const sa = getStation(a);
      const sb = getStation(b);
      expect(sa).toBeDefined();
      expect(sb).toBeDefined();
      expect(sa?.subway_line).not.toBe(sb?.subway_line);
    }
  });

  test("transfers are injected symmetrically on both stations", () => {
    for (const [a, b] of getTransfers()) {
      expect(getStation(a)?.transfers).toContain(b);
      expect(getStation(b)?.transfers).toContain(a);
    }
  });

  test("non-transfer stations have an empty transfers array", () => {
    expect(getStation("pushkin")?.transfers).toEqual([]);
    expect(getStation("bodomzor")?.transfers).toEqual([]);
    expect(getStation("turon")?.transfers).toEqual([]);
  });

  test("specific known transfers", () => {
    expect(getStation("paxtakor")?.transfers).toEqual(["alisher_navoiy"]);
    expect(getStation("alisher_navoiy")?.transfers).toEqual(["paxtakor"]);
    expect(getStation("olmazor")?.transfers).toEqual(["choshtepa"]);
    expect(getStation("choshtepa")?.transfers).toEqual(["olmazor"]);
  });
});

describe("neighborsOnLine", () => {
  test("middle station has both prev and next on a linear line", () => {
    const { prev, next } = neighborsOnLine("paxtakor", "chilanzar");
    expect(prev?.id).toBe("mustaqillik_maydoni");
    expect(next?.id).toBe("xalqlar_dostligi");
  });

  test("first station on a linear line has no prev", () => {
    const { prev, next } = neighborsOnLine("buyuk_ipak_yoli", "chilanzar");
    expect(prev).toBeNull();
    expect(next?.id).toBe("pushkin");
  });

  test("last station on a linear line has no next", () => {
    const { prev, next } = neighborsOnLine("olmazor", "chilanzar");
    expect(prev?.id).toBe("chilonzor");
    expect(next).toBeNull();
  });

  test("first station on the ring line wraps to last as prev", () => {
    const { prev, next } = neighborsOnLine("texnopark", "ring");
    expect(prev?.id).toBe("choshtepa");
    expect(next?.id).toBe("yashnobod");
  });

  test("last station on the ring line wraps to first as next", () => {
    const { prev, next } = neighborsOnLine("choshtepa", "ring");
    expect(prev?.id).toBe("ozgarish");
    expect(next?.id).toBe("texnopark");
  });

  test("returns null/null when the station is not on the given line", () => {
    const { prev, next } = neighborsOnLine("paxtakor", "yunusabad");
    expect(prev).toBeNull();
    expect(next).toBeNull();
  });
});
