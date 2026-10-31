// The library's pages: every filter (all comics, one comic language, one tag) in every interface locale,
// split into pages of PAGE_SIZE comics, newest first. src/pages/[...lib].astro renders one route per entry.
import { listComics, type Comic } from "./comic";
import { localePrefix, LOCALES, type Locale } from "./i18n";

export const PAGE_SIZE = 24;

export interface LibraryFilter {
  lang?: string;
  tag?: string;
}

export interface LibraryPage extends LibraryFilter {
  locale: Locale;
  /** 1-based page number. */
  page: number;
  pages: number;
  /** Every comic matching the filter, newest first; `comics` is this page's slice. */
  matching: Comic[];
  comics: Comic[];
  /** Position of this page's first comic in `matching`. */
  offset: number;
}

export const langOf = (comic: Comic) => comic.config.lang ?? "en";

/** URL of a library page: "/", "/vi/", "/language/vi/", "/tag/ai/page/2/"... */
export const libraryUrl = (locale: Locale, filter: LibraryFilter = {}, page = 1) =>
  `${localePrefix(locale)}/${filter.lang ? `language/${filter.lang}/` : filter.tag ? `tag/${filter.tag}/` : ""}${page > 1 ? `page/${page}/` : ""}`;

/** Every tag in use, most used first. */
export const tagCounts = (comics: Comic[]) => {
  const counts = new Map<string, number>();
  for (const c of comics) for (const t of c.config.tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].sort(([a, x], [b, y]) => y - x || a.localeCompare(b));
};

/** Every library page the site serves. */
export function libraryPages(comics: Comic[] = listComics()): LibraryPage[] {
  const filters: LibraryFilter[] = [
    {},
    ...[...new Set(comics.map(langOf))].map((lang) => ({ lang })),
    ...tagCounts(comics).map(([tag]) => ({ tag })),
  ];
  return LOCALES.flatMap((locale) =>
    filters.flatMap((filter) => {
      const matching = comics.filter(
        (c) => (!filter.lang || langOf(c) === filter.lang) && (!filter.tag || (c.config.tags ?? []).includes(filter.tag)),
      );
      const pages = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
      return Array.from({ length: pages }, (_, i) => ({
        ...filter,
        locale,
        page: i + 1,
        pages,
        matching,
        offset: i * PAGE_SIZE,
        comics: matching.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
      }));
    }),
  );
}
