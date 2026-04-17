import type { LineId, StationSeed } from "../types";

/**
 * Tashkent Metro stations grouped by line. Array order within each line is
 * the physical station sequence — no separate `LINE_ORDER` table needed.
 *
 * Station naming conventions across languages:
 * - `uz` matches the signage on the official Tashkent Metro map.
 * - `uzc` is the Uzbek Cyrillic script form.
 * - `en` uses the common English rendering (translated where customary,
 *   transliterated otherwise — e.g., "Friendship of Peoples" but "Paxtakor").
 * - `ru` matches the form used on Russian-language signage and Wikipedia
 *   (translated where a standard Russian name exists, transliterated
 *   otherwise — e.g., "Дружба народов" but "Мустакиллик майдони").
 *
 * Title suffix conventions:
 * - `en`: "{name} Station"
 * - `uz`: "{name} bekati"
 * - `uzc`: "{name} бекати"
 * - `ru`: "Станция {name}"
 */
export const STATIONS_BY_LINE: Readonly<Record<LineId, readonly StationSeed[]>> = {
  // -------------------- Line 1: Chilanzar (red) --------------------
  chilanzar: [
    {
      id: "buyuk_ipak_yoli",
      subway_line: "chilanzar",
      names: {
        en: "Buyuk Ipak Yoli",
        uz: "Buyuk Ipak Yo'li",
        uzc: "Буюк Ипак Йўли",
        ru: "Буюк Ипак Йули",
      },
      titles: {
        en: "Buyuk Ipak Yoli Station",
        uz: "Buyuk Ipak Yo'li bekati",
        uzc: "Буюк Ипак Йўли бекати",
        ru: "Станция Буюк Ипак Йули",
      },
    },
    {
      id: "pushkin",
      subway_line: "chilanzar",
      names: { en: "Pushkin", uz: "Pushkin", uzc: "Пушкин", ru: "Пушкин" },
      titles: {
        en: "Pushkin Station",
        uz: "Pushkin bekati",
        uzc: "Пушкин бекати",
        ru: "Станция Пушкин",
      },
    },
    {
      id: "hamid_olimjon",
      subway_line: "chilanzar",
      names: {
        en: "Hamid Olimjon",
        uz: "Hamid Olimjon",
        uzc: "Ҳамид Олимжон",
        ru: "Хамид Алимджан",
      },
      titles: {
        en: "Hamid Olimjon Station",
        uz: "Hamid Olimjon bekati",
        uzc: "Ҳамид Олимжон бекати",
        ru: "Станция Хамид Алимджан",
      },
    },
    {
      id: "amir_temur_xiyoboni",
      subway_line: "chilanzar",
      names: {
        en: "Amir Temur Square",
        uz: "Amir Temur xiyoboni",
        uzc: "Амир Темур хиёбони",
        ru: "Амир Темур хиёбони",
      },
      titles: {
        en: "Amir Temur Square Station",
        uz: "Amir Temur xiyoboni bekati",
        uzc: "Амир Темур хиёбони бекати",
        ru: "Станция Амир Темур хиёбони",
      },
    },
    {
      id: "mustaqillik_maydoni",
      subway_line: "chilanzar",
      names: {
        en: "Independence Square",
        uz: "Mustaqillik maydoni",
        uzc: "Мустақиллик майдони",
        ru: "Мустакиллик майдони",
      },
      titles: {
        en: "Independence Square Station",
        uz: "Mustaqillik maydoni bekati",
        uzc: "Мустақиллик майдони бекати",
        ru: "Станция Мустакиллик майдони",
      },
    },
    {
      id: "paxtakor",
      subway_line: "chilanzar",
      names: { en: "Paxtakor", uz: "Paxtakor", uzc: "Пахтакор", ru: "Пахтакор" },
      titles: {
        en: "Paxtakor Station",
        uz: "Paxtakor bekati",
        uzc: "Пахтакор бекати",
        ru: "Станция Пахтакор",
      },
    },
    {
      id: "xalqlar_dostligi",
      subway_line: "chilanzar",
      names: {
        en: "Friendship of Peoples",
        uz: "Xalqlar do'stligi",
        uzc: "Халқлар дўстлиги",
        ru: "Дружба народов",
      },
      titles: {
        en: "Friendship of Peoples Station",
        uz: "Xalqlar do'stligi bekati",
        uzc: "Халқлар дўстлиги бекати",
        ru: "Станция Дружба народов",
      },
    },
    {
      id: "milliy_bog",
      subway_line: "chilanzar",
      names: {
        en: "National Park",
        uz: "Milliy bog'",
        uzc: "Миллий боғ",
        ru: "Национальный парк",
      },
      titles: {
        en: "National Park Station",
        uz: "Milliy bog' bekati",
        uzc: "Миллий боғ бекати",
        ru: "Станция Национальный парк",
      },
    },
    {
      id: "novza",
      subway_line: "chilanzar",
      names: { en: "Novza", uz: "Novza", uzc: "Новза", ru: "Новза" },
      titles: {
        en: "Novza Station",
        uz: "Novza bekati",
        uzc: "Новза бекати",
        ru: "Станция Новза",
      },
    },
    {
      id: "mirzo_ulugbek",
      subway_line: "chilanzar",
      names: {
        en: "Mirzo Ulugbek",
        uz: "Mirzo Ulug'bek",
        uzc: "Мирзо Улуғбек",
        ru: "Мирзо Улугбек",
      },
      titles: {
        en: "Mirzo Ulugbek Station",
        uz: "Mirzo Ulug'bek bekati",
        uzc: "Мирзо Улуғбек бекати",
        ru: "Станция Мирзо Улугбек",
      },
    },
    {
      id: "chilonzor",
      subway_line: "chilanzar",
      names: { en: "Chilanzar", uz: "Chilonzor", uzc: "Чилонзор", ru: "Чиланзар" },
      titles: {
        en: "Chilanzar Station",
        uz: "Chilonzor bekati",
        uzc: "Чилонзор бекати",
        ru: "Станция Чиланзар",
      },
    },
    {
      id: "olmazor",
      subway_line: "chilanzar",
      names: { en: "Olmazor", uz: "Olmazor", uzc: "Олмазор", ru: "Алмазар" },
      titles: {
        en: "Olmazor Station",
        uz: "Olmazor bekati",
        uzc: "Олмазор бекати",
        ru: "Станция Алмазар",
      },
    },
  ],

  // -------------------- Line 2: Uzbekistan (blue) --------------------
  uzbekistan: [
    {
      id: "beruniy",
      subway_line: "uzbekistan",
      names: { en: "Beruni", uz: "Beruniy", uzc: "Беруний", ru: "Беруни" },
      titles: {
        en: "Beruni Station",
        uz: "Beruniy bekati",
        uzc: "Беруний бекати",
        ru: "Станция Беруни",
      },
    },
    {
      id: "tinchlik",
      subway_line: "uzbekistan",
      names: { en: "Tinchlik", uz: "Tinchlik", uzc: "Тинчлик", ru: "Тинчлик" },
      titles: {
        en: "Tinchlik Station",
        uz: "Tinchlik bekati",
        uzc: "Тинчлик бекати",
        ru: "Станция Тинчлик",
      },
    },
    {
      id: "chorsu",
      subway_line: "uzbekistan",
      names: { en: "Chorsu", uz: "Chorsu", uzc: "Чорсу", ru: "Чорсу" },
      titles: {
        en: "Chorsu Station",
        uz: "Chorsu bekati",
        uzc: "Чорсу бекати",
        ru: "Станция Чорсу",
      },
    },
    {
      id: "gafur_gulom",
      subway_line: "uzbekistan",
      names: {
        en: "Gafur Gulom",
        uz: "G'afur G'ulom",
        uzc: "Ғафур Ғулом",
        ru: "Гафур Гулям",
      },
      titles: {
        en: "Gafur Gulom Station",
        uz: "G'afur G'ulom bekati",
        uzc: "Ғафур Ғулом бекати",
        ru: "Станция Гафур Гулям",
      },
    },
    {
      id: "alisher_navoiy",
      subway_line: "uzbekistan",
      names: {
        en: "Alisher Navoi",
        uz: "Alisher Navoiy",
        uzc: "Алишер Навоий",
        ru: "Алишер Навои",
      },
      titles: {
        en: "Alisher Navoi Station",
        uz: "Alisher Navoiy bekati",
        uzc: "Алишер Навоий бекати",
        ru: "Станция Алишер Навои",
      },
    },
    {
      id: "ozbekiston",
      subway_line: "uzbekistan",
      names: {
        en: "Uzbekistan",
        uz: "O'zbekiston",
        uzc: "Ўзбекистон",
        ru: "Узбекистан",
      },
      titles: {
        en: "Uzbekistan Station",
        uz: "O'zbekiston bekati",
        uzc: "Ўзбекистон бекати",
        ru: "Станция Узбекистан",
      },
    },
    {
      id: "kosmonavtlar",
      subway_line: "uzbekistan",
      names: {
        en: "Cosmonauts",
        uz: "Kosmonavtlar",
        uzc: "Космонавтлар",
        ru: "Космонавты",
      },
      titles: {
        en: "Cosmonauts Station",
        uz: "Kosmonavtlar bekati",
        uzc: "Космонавтлар бекати",
        ru: "Станция Космонавты",
      },
    },
    {
      id: "oybek",
      subway_line: "uzbekistan",
      names: { en: "Oybek", uz: "Oybek", uzc: "Ойбек", ru: "Айбек" },
      titles: {
        en: "Oybek Station",
        uz: "Oybek bekati",
        uzc: "Ойбек бекати",
        ru: "Станция Айбек",
      },
    },
    {
      id: "toshkent",
      subway_line: "uzbekistan",
      names: { en: "Tashkent", uz: "Toshkent", uzc: "Тошкент", ru: "Ташкент" },
      titles: {
        en: "Tashkent Station",
        uz: "Toshkent bekati",
        uzc: "Тошкент бекати",
        ru: "Станция Ташкент",
      },
    },
    {
      id: "mashinasozlar",
      subway_line: "uzbekistan",
      names: {
        en: "Mashinasozlar",
        uz: "Mashinasozlar",
        uzc: "Машинасозлар",
        ru: "Машинасозлар",
      },
      titles: {
        en: "Mashinasozlar Station",
        uz: "Mashinasozlar bekati",
        uzc: "Машинасозлар бекати",
        ru: "Станция Машинасозлар",
      },
    },
    {
      id: "dostlik",
      subway_line: "uzbekistan",
      names: { en: "Dostlik", uz: "Do'stlik", uzc: "Дўстлик", ru: "Дустлик" },
      titles: {
        en: "Dostlik Station",
        uz: "Do'stlik bekati",
        uzc: "Дўстлик бекати",
        ru: "Станция Дустлик",
      },
    },
  ],

  // -------------------- Line 3: Yunusabad (green) --------------------
  yunusabad: [
    {
      id: "turkiston",
      subway_line: "yunusabad",
      names: { en: "Turkistan", uz: "Turkiston", uzc: "Туркистон", ru: "Туркистон" },
      titles: {
        en: "Turkistan Station",
        uz: "Turkiston bekati",
        uzc: "Туркистон бекати",
        ru: "Станция Туркистон",
      },
    },
    {
      id: "yunusobod",
      subway_line: "yunusabad",
      names: { en: "Yunusabad", uz: "Yunusobod", uzc: "Юнусобод", ru: "Юнусабад" },
      titles: {
        en: "Yunusabad Station",
        uz: "Yunusobod bekati",
        uzc: "Юнусобод бекати",
        ru: "Станция Юнусабад",
      },
    },
    {
      id: "shahriston",
      subway_line: "yunusabad",
      names: {
        en: "Shahriston",
        uz: "Shahriston",
        uzc: "Шаҳристон",
        ru: "Шахристан",
      },
      titles: {
        en: "Shahriston Station",
        uz: "Shahriston bekati",
        uzc: "Шаҳристон бекати",
        ru: "Станция Шахристан",
      },
    },
    {
      id: "bodomzor",
      subway_line: "yunusabad",
      names: { en: "Bodomzor", uz: "Bodomzor", uzc: "Бодомзор", ru: "Бадамзар" },
      titles: {
        en: "Bodomzor Station",
        uz: "Bodomzor bekati",
        uzc: "Бодомзор бекати",
        ru: "Станция Бадамзар",
      },
    },
    {
      id: "minor",
      subway_line: "yunusabad",
      names: { en: "Minor", uz: "Minor", uzc: "Минор", ru: "Минор" },
      titles: {
        en: "Minor Station",
        uz: "Minor bekati",
        uzc: "Минор бекати",
        ru: "Станция Минор",
      },
    },
    {
      id: "abdulla_qodiriy",
      subway_line: "yunusabad",
      names: {
        en: "Abdulla Qodiriy",
        uz: "Abdulla Qodiriy",
        uzc: "Абдулла Қодирий",
        ru: "Абдулла Кадыри",
      },
      titles: {
        en: "Abdulla Qodiriy Station",
        uz: "Abdulla Qodiriy bekati",
        uzc: "Абдулла Қодирий бекати",
        ru: "Станция Абдулла Кадыри",
      },
    },
    {
      id: "yunus_rajabiy",
      subway_line: "yunusabad",
      names: {
        en: "Yunus Rajabi",
        uz: "Yunus Rajabiy",
        uzc: "Юнус Ражабий",
        ru: "Юнус Раджаби",
      },
      titles: {
        en: "Yunus Rajabi Station",
        uz: "Yunus Rajabiy bekati",
        uzc: "Юнус Ражабий бекати",
        ru: "Станция Юнус Раджаби",
      },
    },
    {
      id: "ming_orik",
      subway_line: "yunusabad",
      names: {
        en: "Ming Orik",
        uz: "Ming O'rik",
        uzc: "Минг Ўрик",
        ru: "Минг Урик",
      },
      titles: {
        en: "Ming Orik Station",
        uz: "Ming O'rik bekati",
        uzc: "Минг Ўрик бекати",
        ru: "Станция Минг Урик",
      },
    },
  ],

  // -------------------- Line 4: Ring (orange, circular) --------------------
  ring: [
    {
      id: "texnopark",
      subway_line: "ring",
      names: { en: "Technopark", uz: "Texnopark", uzc: "Технопарк", ru: "Технопарк" },
      titles: {
        en: "Technopark Station",
        uz: "Texnopark bekati",
        uzc: "Технопарк бекати",
        ru: "Станция Технопарк",
      },
    },
    {
      id: "yashnobod",
      subway_line: "ring",
      names: { en: "Yashnobod", uz: "Yashnobod", uzc: "Яшнобод", ru: "Яшнобод" },
      titles: {
        en: "Yashnobod Station",
        uz: "Yashnobod bekati",
        uzc: "Яшнобод бекати",
        ru: "Станция Яшнобод",
      },
    },
    {
      id: "tuzel",
      subway_line: "ring",
      names: { en: "Tuzel", uz: "Tuzel", uzc: "Тузель", ru: "Тузель" },
      titles: {
        en: "Tuzel Station",
        uz: "Tuzel bekati",
        uzc: "Тузель бекати",
        ru: "Станция Тузель",
      },
    },
    {
      id: "olmos",
      subway_line: "ring",
      names: { en: "Olmos", uz: "Olmos", uzc: "Олмос", ru: "Олмос" },
      titles: {
        en: "Olmos Station",
        uz: "Olmos bekati",
        uzc: "Олмос бекати",
        ru: "Станция Олмос",
      },
    },
    {
      id: "rohat",
      subway_line: "ring",
      names: { en: "Rohat", uz: "Rohat", uzc: "Роҳат", ru: "Рохат" },
      titles: {
        en: "Rohat Station",
        uz: "Rohat bekati",
        uzc: "Роҳат бекати",
        ru: "Станция Рохат",
      },
    },
    {
      id: "yangiobod",
      subway_line: "ring",
      names: { en: "Yangiobod", uz: "Yangiobod", uzc: "Янгиобод", ru: "Янгиабад" },
      titles: {
        en: "Yangiobod Station",
        uz: "Yangiobod bekati",
        uzc: "Янгиобод бекати",
        ru: "Станция Янгиабад",
      },
    },
    {
      id: "qiyot",
      subway_line: "ring",
      names: { en: "Qiyot", uz: "Qiyot", uzc: "Қиёт", ru: "Киёт" },
      titles: {
        en: "Qiyot Station",
        uz: "Qiyot bekati",
        uzc: "Қиёт бекати",
        ru: "Станция Киёт",
      },
    },
    {
      id: "matonat",
      subway_line: "ring",
      names: { en: "Matonat", uz: "Matonat", uzc: "Матонат", ru: "Матонат" },
      titles: {
        en: "Matonat Station",
        uz: "Matonat bekati",
        uzc: "Матонат бекати",
        ru: "Станция Матонат",
      },
    },
    {
      id: "qoyliq",
      subway_line: "ring",
      names: { en: "Qoyliq", uz: "Qo'yliq", uzc: "Қўйлиқ", ru: "Куйлюк" },
      titles: {
        en: "Qoyliq Station",
        uz: "Qo'yliq bekati",
        uzc: "Қўйлиқ бекати",
        ru: "Станция Куйлюк",
      },
    },
    {
      id: "tolariq",
      subway_line: "ring",
      names: { en: "Tolariq", uz: "To'lariq", uzc: "Тўлариқ", ru: "Толарик" },
      titles: {
        en: "Tolariq Station",
        uz: "To'lariq bekati",
        uzc: "Тўлариқ бекати",
        ru: "Станция Толарик",
      },
    },
    {
      id: "xonobod",
      subway_line: "ring",
      names: { en: "Xonobod", uz: "Xonobod", uzc: "Хонобод", ru: "Ханабад" },
      titles: {
        en: "Xonobod Station",
        uz: "Xonobod bekati",
        uzc: "Хонобод бекати",
        ru: "Станция Ханабад",
      },
    },
    {
      id: "turon",
      subway_line: "ring",
      names: { en: "Turon", uz: "Turon", uzc: "Турон", ru: "Туран" },
      titles: {
        en: "Turon Station",
        uz: "Turon bekati",
        uzc: "Турон бекати",
        ru: "Станция Туран",
      },
    },
    {
      id: "quruvchilar",
      subway_line: "ring",
      names: {
        en: "Quruvchilar",
        uz: "Quruvchilar",
        uzc: "Қурувчилар",
        ru: "Курувчилар",
      },
      titles: {
        en: "Quruvchilar Station",
        uz: "Quruvchilar bekati",
        uzc: "Қурувчилар бекати",
        ru: "Станция Курувчилар",
      },
    },
    {
      id: "qipchoq",
      subway_line: "ring",
      names: { en: "Qipchoq", uz: "Qipchoq", uzc: "Қипчоқ", ru: "Кипчак" },
      titles: {
        en: "Qipchoq Station",
        uz: "Qipchoq bekati",
        uzc: "Қипчоқ бекати",
        ru: "Станция Кипчак",
      },
    },
    {
      id: "chinor",
      subway_line: "ring",
      names: { en: "Chinor", uz: "Chinor", uzc: "Чинор", ru: "Чинар" },
      titles: {
        en: "Chinor Station",
        uz: "Chinor bekati",
        uzc: "Чинор бекати",
        ru: "Станция Чинар",
      },
    },
    {
      id: "yangihayot",
      subway_line: "ring",
      names: {
        en: "Yangihayot",
        uz: "Yangihayot",
        uzc: "Янгиҳаёт",
        ru: "Янгихаёт",
      },
      titles: {
        en: "Yangihayot Station",
        uz: "Yangihayot bekati",
        uzc: "Янгиҳаёт бекати",
        ru: "Станция Янгихаёт",
      },
    },
    {
      id: "sergeli",
      subway_line: "ring",
      names: { en: "Sergeli", uz: "Sergeli", uzc: "Сергели", ru: "Сергели" },
      titles: {
        en: "Sergeli Station",
        uz: "Sergeli bekati",
        uzc: "Сергели бекати",
        ru: "Станция Сергели",
      },
    },
    {
      id: "ozgarish",
      subway_line: "ring",
      names: { en: "Ozgarish", uz: "O'zgarish", uzc: "Ўзгариш", ru: "Узгариш" },
      titles: {
        en: "Ozgarish Station",
        uz: "O'zgarish bekati",
        uzc: "Ўзгариш бекати",
        ru: "Станция Узгариш",
      },
    },
    {
      id: "choshtepa",
      subway_line: "ring",
      names: { en: "Choshtepa", uz: "Cho'shtepa", uzc: "Чўштепа", ru: "Чоштепа" },
      titles: {
        en: "Choshtepa Station",
        uz: "Cho'shtepa bekati",
        uzc: "Чўштепа бекати",
        ru: "Станция Чоштепа",
      },
    },
  ],
};
