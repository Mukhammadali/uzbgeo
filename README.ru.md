# uzbgeo

[English](./README.md) · [O'zbekcha](./README.uz.md) · **Русский**

Географические данные Республики Узбекистан — области, районы и города, с **краткими названиями** и **полными официальными наименованиями** на 4 языках (английский, узбекский латиница, узбекский кириллица, русский).

- **14** административно-территориальных единиц первого уровня (12 областей + Каракалпакстан + город Ташкент)
- **175** районов (`tumani`)
- **109** городов (`shahar`) — **31** областного подчинения + **78** районного подчинения
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
  getRegionalCities,
  getCity,
  getCitiesByRegionId,
  getCitiesByDistrictId,
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

// Города бывают двух уровней — областного и районного подчинения.
console.log(getAllCities().length);        // 109 (все города)
console.log(getRegionalCities().length);   // 31  (только областного подчинения)

// Города районного подчинения знают свой район:
const gazalkent = getCity("gazalkent_city");
console.log(gazalkent?.subordination);     // "district"
console.log(gazalkent?.districtSlug);      // "bostanlyk"

// Поиск городов по родительскому району:
console.log(getCitiesByDistrictId("bostanlyk").map((c) => c.slug)); // ["gazalkent_city"]
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

### Города (`shahar`)

Города бывают двух административных уровней, различаемых по полю `subordination`:

- **`"regional"`** — города областного подчинения, административно равные районам (31 по стране).
- **`"district"`** — города районного подчинения, вложенные в район (`parentSlug`/`districtSlug` указывают на родительский район).

Slug-имена имеют суффикс `_city`, чтобы отличать их от одноимённых районов (например, `bukhara_city` и `bukhara`).

| Функция | Возвращает |
|---|---|
| `getAllCities()` | **Все 109 городов** (оба уровня) |
| `getRegionalCities()` | 31 город областного подчинения |
| `getCity(slug)` | Один город или `undefined` |
| `getCitiesByRegionId(slugOrIso)` | Все города области (оба уровня) |
| `getCitiesByDistrictId(slug)` | Города районного подчинения внутри района |

> **Миграция с v1:** ранее `getAllCities()` возвращал только 31 город областного подчинения. В v2 он возвращает **все** города; для прежнего поведения вызывайте **`getRegionalCities()`**. См. [CHANGELOG](./CHANGELOG.md).

> **О покрытии:** в города районного подчинения включены только записи с высокой достоверностью. Несколько городов со спорным статусом (например, Хонка/Шават/Гурлен/Кошкупыр в рамках реформы Хорезма 2025 года или спорный район Янгиабада) пока не включены — см. [CHANGELOG](./CHANGELOG.md).

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
  parentSlug: string;                 // "andijan" (область)
  regionSlug: string;                 // "andijan"
  regionIso: string;                  // "UZ-AN"
  names: Names;                       // { en: "Izbaskan", ru: "Избаскан", ... }
  titles: Names;                      // { en: "Izbaskan District", ru: "Избасканский район", ... }
}

interface City {
  slug: string;                       // "bukhara_city" | "gazalkent_city"
  type: "city";
  subordination: "regional" | "district";
  parentSlug: string;                 // slug области (regional) ИЛИ slug района (district)
  districtSlug?: string;              // только при subordination === "district"
  regionSlug: string;                 // "bukhara" | "tashkent"
  regionIso: string;                  // "UZ-BU" | "UZ-TO"
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara City", ru: "Город Бухара", ... }
}
```

Иерархия выражается через `parentSlug`: родитель района — область, родитель города областного подчинения — область, родитель города районного подчинения — район. Поднимайтесь по ней с помощью `getDistrict()` / `getRegion()`. (`RegionalCity` сохранён как устаревший (deprecated) псевдоним `City`.)

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
