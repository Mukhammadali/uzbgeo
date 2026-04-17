/**
 * Cross-line transfer pairs for the Tashkent Metro.
 *
 * Each pair links two stations on different lines that form a physical
 * interchange. Symmetry is guaranteed by the builder in `src/metro/index.ts`
 * — if `A ↔ B` is listed here, both stations end up with the other in their
 * `transfers` array.
 */
export const TRANSFER_PAIRS: readonly (readonly [string, string])[] = [
  ["paxtakor", "alisher_navoiy"], // chilanzar ↔ uzbekistan
  ["amir_temur_xiyoboni", "yunus_rajabiy"], // chilanzar ↔ yunusabad
  ["ming_orik", "ozbekiston"], // yunusabad ↔ uzbekistan
  ["dostlik", "texnopark"], // uzbekistan ↔ ring
  ["olmazor", "choshtepa"], // chilanzar ↔ ring
] as const;
