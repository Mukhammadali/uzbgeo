# uzbgeo

[English](./README.md) · [O'zbekcha](./README.uz.md) · **Русский**

Географические данные Республики Узбекистан — области, районы и города, с **краткими названиями**, **полными официальными наименованиями** и **предложными формами** на 4 языках (английский, узбекский латиница, узбекский кириллица, русский).

- **14** административно-территориальных единиц первого уровня (12 областей + Каракалпакстан + город Ташкент)
- **175** районов (`tumani`)
- **Предложные формы** для каждой единицы — `в Бухаре` / `Buxoroda` / `in Bukhara` ([подробнее](#предложные-формы))
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

interface Locatives {
  name: Names;                        // { ru: "в Бухаре", uz: "Buxoroda", ... }
  title: Names;                       // { ru: "в Бухарской области", uz: "Buxoro viloyatida", ... }
}

interface Region {
  slug: string;                       // "bukhara"
  iso: string;                        // "UZ-BU"
  category: "region" | "republic" | "city";
  names: Names;                       // { en: "Bukhara", ru: "Бухара", ... }
  titles: Names;                      // { en: "Bukhara Region", ru: "Бухарская область", ... }
  locatives: Locatives;
}

interface District {
  slug: string;                       // "izbaskan"
  type: "district";
  parentSlug: string;                 // "andijan" (область)
  regionSlug: string;                 // "andijan"
  regionIso: string;                  // "UZ-AN"
  names: Names;                       // { en: "Izbaskan", ru: "Избаскан", ... }
  titles: Names;                      // { en: "Izbaskan District", ru: "Избасканский район", ... }
  locatives: Locatives;
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
  locatives: Locatives;
}
```

Иерархия выражается через `parentSlug`: родитель района — область, родитель города областного подчинения — область, родитель города районного подчинения — район. Поднимайтесь по ней с помощью `getDistrict()` / `getRegion()`. (`RegionalCity` сохранён как устаревший (deprecated) псевдоним `City`.)

### Стабильность типов

`Region`, `District` и `City` **описывают данные, которые возвращает uzbgeo**; они не предназначены для создания вручную. Со временем в них добавляются новые поля (`locatives` в 2.1.0) — это минорный релиз, чтение возвращаемых объектов не ломается. Если вы пишете литерал с одним из этих типов (например, фикстуру в тесте), новое поле не скомпилируется, пока вы его не добавите; для реальных данных используйте `getRegion()` / `getDistrict()` / `getCity()`.

### Когда использовать `names`, а когда `titles`

- **`names`** — краткое существительное, без типового слова. Для выпадающих списков, хлебных крошек, меток в `<option>`. Например: `"Бухара"`.
- **`titles`** — полное официальное название с типовым словом. Для заголовков страниц, адресных строк, SEO meta-тегов. Например: `"Бухарская область"`, `"Бухарский район"`.

Поле `titles` особенно полезно для русского языка, где полная административная форма требует знания морфологии прилагательных (`Бухарская область`, `Бухарский район`), и потребители не могут легко вывести её из существительного (`Бухара`).

## Предложные формы

Чтобы получить заголовок вроде **«Работа в Бухаре»** или **«Buxoroda ish»**, недостаточно именительного падежа. Поле `locatives` содержит готовую форму «в X» для каждой единицы на всех четырёх языках:

```ts
const bukhara = getRegion("bukhara");

bukhara?.locatives.name.ru;    // "в Бухаре"
bukhara?.locatives.name.uz;    // "Buxoroda"
bukhara?.locatives.name.uzc;   // "Бухорода"
bukhara?.locatives.name.en;    // "in Bukhara"

bukhara?.locatives.title.ru;   // "в Бухарской области"
bukhara?.locatives.title.uz;   // "Buxoro viloyatida"
```

Каждое значение — **готовая фраза целиком**, а не голое склонённое существительное, потому что в разных языках не хватает разного:

| | Что нужно для локатива | Пример |
| --- | --- | --- |
| Русский | предлог **+** предложный падеж | `Бухара` → `в Бухаре` |
| Узбекский | суффикс `-da` — предлога вообще нет | `Buxoro` → `Buxoroda` |
| Английский | `in` плюс артикль, где он нужен | `Bukhara` → `in Bukhara` |

Порядок слов различается по языкам, поэтому подставляйте значение в шаблон для каждого языка:

```ts
const t = { en: "Jobs {loc}", ru: "Работа {loc}", uz: "{loc} ish" };
t[lang].replace("{loc}", unit.locatives.name[lang]);
// "Jobs in Bukhara" / "Работа в Бухаре" / "Buxoroda ish"
```

### `name` или `title` для SEO

Для страниц областей и районов используйте `locatives.title`. Семь слагов существуют одновременно как область и как район (`bukhara`, `samarkand`, `fergana`, `andijan`, `namangan`, `syrdarya`, `tashkent`), а одноимённый город даёт третий — и все они дают **одинаковый** `locatives.name`:

```ts
getRegion("bukhara")?.locatives.name.ru;       // "в Бухаре"
getCity("bukhara_city")?.locatives.name.ru;    // "в Бухаре"   ← совпадает
getDistrict("bukhara")?.locatives.title.ru;    // "в Бухарском районе"  ← различается
```

### О точности

Русские формы выверены вручную, а не выведены правилом: склонение топонимов знает исключения, которые правило не покрывает. Названия на `-и` и `-у` не склоняются и сохраняют именительную форму — `в Карши`, `в Навои`, `в Балыкчи`, `в Денау`, `в Карасу`, — тогда как наивное «добавить `-е`» дало бы мусор. Названия женского рода на `-ия` получают `-ии` (`Галаасия` → `в Галаасии`). Узбекский `-da` регулярен и применяется механически, включая удвоение после конечного `d` (`Samarqand` → `Samarqandda`).

Полнота локативов проверяется на этапе сборки, поэтому `locatives` — обязательное поле: оно всегда присутствует на всех четырёх языках и не требует проверки во время выполнения.

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
