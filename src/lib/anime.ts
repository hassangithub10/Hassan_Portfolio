/** Loads anime.js lazily so it never runs during server rendering. */
export const loadAnime = () => import("animejs").then((m) => m.default);
