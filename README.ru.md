# uzbgeo

[English](./README.md) · [O'zbekcha](./README.uz.md) · **Русский**

Географические данные Республики Узбекистан — области, районы и города областного подчинения, с **краткими названиями** и **полными официальными наименованиями** на 4 языках (английский, узбекский латиница, узбекский кириллица, русский).

- **14** административно-территориальных единиц первого уровня (12 областей + Каракалпакстан + город Ташкент)
- **175** районов (`tumani`)
- **31** город областного подчинения (`shahar`)
- **Ташкентский метрополитен** — 4 линии, 50 станций, межлинейные пересадки (см. [METRO.md](./METRO.md))
- Коды **ISO 3166-2:UZ** для всех областей
- **Без runtime-зависимостей**, работает в браузере, ESM + CJS, написан на TypeScript

## Установка

```sh
npm install uzbgeo
# или
bun add uzbgeo
# или
pnpm add uzbgeo
# или
yarn add uzbgeo
```

## Использование

### TypeScript / ESM

```ts
import {
  getAllRegions,
  getRegion,
  getAllDistricts,
  getDistrict,
  getDistrictsByRegionId,
  getAllCities,
  getCity,
  getCitiesByRegionId,
} from "uzbgeo";

const regions = getAllRegions();
console.log(regions.length); // 14

const bukhara = getRegion("bukhara");
// или по ISO-коду:
const sameBukhara = getRegion("UZ-BU");

console.log(bukhara?.names);
// {
//   en:  "Bukhara",
//   uz:  "Buxoro",
//   uzc: "Бухоро",
//   ru:  "Бухара"
// }

console.log(bukhara?.titles);
// {
//   en:  "Bukhara Region",
//   uz:  "Buxoro viloyati",
//   uzc: "Бухоро вилояти",
//   ru:  "Бухарская область"
// }

const bukharaDistricts = getDistrictsByRegionId("bukhara");
console.log(bukharaDistricts.length); // 11

const tashkentCityDistricts = getDistrictsByRegionId("tashkent_city");
console.log(tashkentCityDistricts.length); // 12
```

### CommonJS

```js
const { getAllRegions, getDistrictsByRegionId } = require("uzbgeo");

const regions = getAllRegions();
const fergana = getDistrictsByRegionId("fergana");
```

## API

Все функции являются чистыми (pure) и работают со статическими данными. Поиск по области принимает либо snake_case slug (`"bukhara"`), либо ISO 3166-2:UZ код (`"UZ-BU"`).

### Области

| Функция | Возвращает |
|---|---|
| `getAllRegions()` | Все 14 единиц первого уровня |
| `getRegion(slugOrIso)` | Одну область или `undefined` |

### Районы (`tumani`)

| Функция | Возвращает |
|---|---|
| `getAllDistricts()` | Все 175 районов |
| `getDistrict(slug)` | Один район или `undefined` |
| `getDistrictsByRegionId(slugOrIso)` | Все районы заданной области |

### Города областного подчинения (`shahar`)

Эти города административно равны районам, а не вложены в них. Slug-имена имеют суффикс `_city`, чтобы отличать их от одноимённых районов (например, `bukhara_city` и `bukhara`).

| Функция | Возвращает |
|---|---|
| `getAllCities()` | Все 31 город областного подчинения |
| `getCity(slug)` | Один город или `undefined` |
| `getCitiesByRegionId(slugOrIso)` | Все города заданной области |

## Структура данных

Каждый объект содержит два поля: `names` (краткие формы существительных — для меток, выпадающих списков, коротких заголовков) и `titles` (полное официальное административное название — для заголовков, адресов, SEO).

```ts
interface Names {
  en: string;   // Английский
  uz: string;   // Узбекский (латиница)
  uzc: string;  // Узбекский (кириллица)
  ru: string;   // Русский
}

interface Region {
  slug: string;                       // "bukhara"
  iso: string;                        // "UZ-BU"
  category: "region" | "republic" | "city";
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara Region", ru: "Бухарская область", ... }
}

interface District {
  slug: string;                       // "izbaskan"
  type: "district";
  regionSlug: string;                 // "andijan"
  regionIso: string;                  // "UZ-AN"
  names: Names;                       // { en: "Izbaskan", ru: "Избаскан", ... }
  titles: Names;                      // { en: "Izbaskan District", ru: "Избасканский район", ... }
}

interface RegionalCity {
  slug: string;                       // "bukhara_city"
  type: "city";
  regionSlug: string;                 // "bukhara"
  regionIso: string;                  // "UZ-BU"
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara City", ru: "Город Бухара", ... }
}
```

### Когда использовать `names`, а когда `titles`

- **`names`** — краткое существительное, без типового слова. Для выпадающих списков, хлебных крошек, меток в `<option>`. Например: `"Бухара"`.
- **`titles`** — полное официальное название с типовым словом. Для заголовков страниц, адресных строк, SEO meta-тегов. Например: `"Бухарская область"`, `"Бухарский район"`.

Поле `titles` особенно полезно для русского языка, где полная административная форма требует знания морфологии прилагательных (`Бухарская область`, `Бухарский район`), и потребители не могут легко вывести её из существительного (`Бухара`).

## Список областей

| ISO | Slug | По-английски | По-русски |
|---|---|---|---|
| UZ-AN | `andijan` | Andijan | Андижан |
| UZ-BU | `bukhara` | Bukhara | Бухара |
| UZ-FA | `fergana` | Fergana | Фергана |
| UZ-JI | `jizzakh` | Jizzakh | Джизак |
| UZ-NG | `namangan` | Namangan | Наманган |
| UZ-NW | `navoi` | Navoi | Навои |
| UZ-QA | `kashkadarya` | Kashkadarya | Кашкадарья |
| UZ-QR | `karakalpakstan` | Karakalpakstan | Каракалпакстан |
| UZ-SA | `samarkand` | Samarkand | Самарканд |
| UZ-SI | `syrdarya` | Syrdarya | Сырдарья |
| UZ-SU | `surkhandarya` | Surkhandarya | Сурхандарья |
| UZ-TK | `tashkent_city` | Tashkent (city) | Ташкент (город) |
| UZ-TO | `tashkent` | Tashkent (region) | Ташкент (область) |
| UZ-XO | `khorezm` | Khorezm | Хорезм |

Английские формы соответствуют официальным переводам, опубликованным Государственным комитетом Республики Узбекистан по статистике (см. SDMX-источник ниже).

## Ташкентский метрополитен

Данные метро доступны через подпуть импорта — потребители, использующие только региональные данные, не загружают их.

```ts
import { getAllStations, getStationsByLine, neighborsOnLine } from "uzbgeo/metro";

const chilanzar = getStationsByLine("chilanzar");
console.log(chilanzar[0]?.names.ru);     // "Буюк Ипак Йули"

const { prev, next } = neighborsOnLine("texnopark", "ring");
console.log(prev?.id, next?.id);         // "choshtepa" "yashnobod" — кольцо замыкается
```

Полное API, структуру данных, список линий и пересадок смотрите в **[METRO.md](./METRO.md)**.

## Источники данных

- **Основной источник:** SDMX-набор данных 2.01.01.0036 *"Tumanlar / Районы / Districts"*, опубликованный [Государственным комитетом Республики Узбекистан по статистике](https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_307.pdf), последнее обновление 2025-03-26. Все названия на всех 4 языках взяты непосредственно из этого источника.
- **ISO-коды:** [ISO 3166-2:UZ](https://en.wikipedia.org/wiki/ISO_3166-2:UZ).

## Лицензия

[MIT](./LICENSE) © Mukhammadali
