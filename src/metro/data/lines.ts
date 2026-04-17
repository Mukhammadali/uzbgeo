import type { Line, LineId } from "../types";

/**
 * The four Tashkent Metro lines, keyed by `LineId`. Line numbers, colors,
 * and names match the official Tashkent Metro map.
 */
export const LINES: Readonly<Record<LineId, Line>> = {
  chilanzar: {
    id: "chilanzar",
    number: 1,
    color: "#D62828",
    names: {
      en: "Chilanzar Line",
      uz: "Chilonzor yo'li",
      uzc: "Чилонзор йўли",
      ru: "Чиланзарская линия",
    },
  },
  uzbekistan: {
    id: "uzbekistan",
    number: 2,
    color: "#1D3557",
    names: {
      en: "Uzbekistan Line",
      uz: "O'zbekiston yo'li",
      uzc: "Ўзбекистон йўли",
      ru: "Узбекистанская линия",
    },
  },
  yunusabad: {
    id: "yunusabad",
    number: 3,
    color: "#2A9D8F",
    names: {
      en: "Yunusabad Line",
      uz: "Yunusobod yo'li",
      uzc: "Юнусобод йўли",
      ru: "Юнусабадская линия",
    },
  },
  ring: {
    id: "ring",
    number: 4,
    color: "#F4A261",
    circular: true,
    names: {
      en: "Independence 30th Anniversary Line",
      uz: "O'zbekiston mustaqilligining 30 yilligi yo'li",
      uzc: "Ўзбекистон мустақиллигининг 30 йиллиги йўли",
      ru: "Линия 30-летия независимости Узбекистана",
    },
  },
};
