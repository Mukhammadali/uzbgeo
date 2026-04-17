# uzbgeo/metro — Tashkent Metro

> Part of [`uzbgeo`](./README.md) · exported from the `uzbgeo/metro` subpath for clean tree-shaking.

Stations, lines, and cross-line transfers of the Tashkent Metro, with **short names** and **full titles** in 4 languages (English, Uzbek Latin, Uzbek Cyrillic, Russian).

- **4** lines — Chilanzar, Uzbekistan, Yunusabad, and the circular Independence 30th Anniversary Line
- **50** stations
- **5** cross-line transfers, injected symmetrically on both stations
- **Zero runtime dependencies**, browser-safe, ESM + CJS

## Install

Metro data ships with the core `uzbgeo` package — no separate install.

```sh
npm install uzbgeo
```

## Import

Everything metro-related lives behind the `uzbgeo/metro` subpath. Consumers that only use region/district data never pull in the metro graph.

```ts
import {
  getAllStations,
  getStation,
  getStationsByLine,
  getAllLines,
  getLine,
  getTransfers,
  neighborsOnLine,
} from "uzbgeo/metro";
```

## Quick example

```ts
import { getStation, getStationsByLine, neighborsOnLine } from "uzbgeo/metro";

const paxtakor = getStation("paxtakor");
console.log(paxtakor?.titles.ru);        // "Станция Пахтакор"
console.log(paxtakor?.transfers);        // ["alisher_navoiy"]

const chilanzarLine = getStationsByLine("chilanzar");
console.log(chilanzarLine.length);       // 12
console.log(chilanzarLine[0]?.id);       // "buyuk_ipak_yoli"

const { prev, next } = neighborsOnLine("texnopark", "ring");
console.log(prev?.id, next?.id);         // "choshtepa" "yashnobod" — ring wraps
```

## API

### Stations

| Function | Returns |
|---|---|
| `getAllStations()` | All 50 stations, flat, grouped by line order then physical sequence |
| `getStation(id)` | One station, or `undefined` |
| `getStationsByLine(lineId)` | Stations on the given line, in physical order |

### Lines

| Function | Returns |
|---|---|
| `getAllLines()` | All 4 lines, ordered 1→4 |
| `getLine(lineId)` | One line, or `undefined` |

### Transfers

| Function | Returns |
|---|---|
| `getTransfers()` | Raw list of `[stationA, stationB]` pairs |

Most consumers don't need `getTransfers()` directly — every `Station` already carries a `transfers: string[]` field populated symmetrically from the pair list.

### Navigation

| Function | Returns |
|---|---|
| `neighborsOnLine(stationId, lineId)` | `{ prev, next }` stations on that line, ring-aware |

On linear lines the first station has `prev: null` and the last has `next: null`. On the ring line both are always populated — the order wraps around.

## Data shape

```ts
type LineId = "chilanzar" | "uzbekistan" | "yunusabad" | "ring";

interface Names {
  en: string;
  uz: string;   // Uzbek Latin
  uzc: string;  // Uzbek Cyrillic
  ru: string;
}

interface Line {
  id: LineId;
  number: number;            // 1..4
  color: string;             // "#D62828"
  names: Names;              // full line name with "Line" baked in
  circular?: boolean;        // true only for the ring line
}

interface Station {
  id: string;                // snake_case, unique across all lines
  subway_line: LineId;       // line this station primarily belongs to
  names: Names;              // short noun: "Paxtakor", "Пахтакор"
  titles: Names;             // full: "Paxtakor Station", "Станция Пахтакор"
  transfers: readonly string[]; // ids of stations on other lines, both directions
}
```

### When to use `names` vs `titles`

- **`names`** — the station's proper name, no "Station" word. Use for maps, dropdowns, list labels. Example: `"Paxtakor"`, `"Пахтакор"`.
- **`titles`** — full form with the station word baked in. Use for page headings, addresses, SEO. Example: `"Paxtakor Station"`, `"Станция Пахтакор"`.

Title suffix/prefix patterns are consistent across every station:

| Language | Pattern |
|---|---|
| English | `{name} Station` |
| Uzbek Latin | `{name} bekati` |
| Uzbek Cyrillic | `{name} бекати` |
| Russian | `Станция {name}` |

## Lines reference

| # | Id | Color | English |
|---|---|---|---|
| 1 | `chilanzar` | `#D62828` | Chilanzar Line |
| 2 | `uzbekistan` | `#1D3557` | Uzbekistan Line |
| 3 | `yunusabad` | `#2A9D8F` | Yunusabad Line |
| 4 | `ring` | `#F4A261` | Independence 30th Anniversary Line (circular) |

## Transfer pairs

| Chilanzar | Uzbekistan | Yunusabad | Ring |
|---|---|---|---|
| `paxtakor` | `alisher_navoiy` | | |
| `amir_temur_xiyoboni` | | `yunus_rajabiy` | |
| | `ozbekiston` | `ming_orik` | |
| | `dostlik` | | `texnopark` |
| `olmazor` | | | `choshtepa` |

## Tree-shaking

The metro module sits behind a subpath export (`uzbgeo/metro`). Consumers that only import from `uzbgeo` never pull in metro data, and vice versa. Within the metro entry, all exports are flat named functions — any bundler that respects `"sideEffects": false` (every modern one does) will drop unused functions.

## What's not in v1

Intentionally out of scope for now, reserved as optional fields on the `Station` type so they can be added later without a breaking change:

- `segments` — travel time between adjacent stations
- `surface` — connecting buses, trains, airport, nearby landmarks
- `accessibility` — elevators, ramps, tactile paving

Contributions welcome.

## Data sources

- **Lines, stations, order, colors:** official Tashkent Metro map.
- **Transfers:** official Tashkent Metro map.
- **Russian and English renderings:** Tashkent Metro signage and Russian-language Wikipedia articles on individual stations.

## License

[MIT](./LICENSE) © Mukhammadali
