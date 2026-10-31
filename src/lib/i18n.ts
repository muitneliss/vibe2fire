// Interface languages for the site chrome (library, shared navigation, 404).
// A comic's own reader labels stay in its comic.yaml; this file only covers pages that are not one comic.
// The first locale is served at the root; every other locale under /<code>/, each with a page file in src/pages/<code>/.

export const LOCALES = ["en", "vi"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export interface UiStrings {
  /** <title> and og:title of the library. */
  libraryTitle: string;
  libraryDescription: string;
  /** The library's heading; *em* turns accent. */
  libraryHeading: string;
  libraryLead: string;
  /** Heading of one language's page; *em* turns accent. */
  languageHeading: (language: string) => string;
  languageLead: (language: string) => string;
  /** The jump link from a language's page back to the whole library. */
  allLanguages: string;
  /** Label of the jump links to each language spread. */
  filterBy: string;
  /** Label of the interface-language switcher. */
  interface: string;
  newest: string;
  /** The link from a full contents page to that language's own page. */
  allIn: (n: number, language: string) => string;
  chapters: (n: number) => string;
  panels: (n: number) => string;
  comics: (n: number) => string;
  empty: string;
  aiNotice: string;
  /** Running head over a language's contents page. */
  contents: string;
  /** Accessible name of a chapter panel on the contents page. */
  chapterLink: (n: number, title: string) => string;
  /** The strip of panels under a comic's title box opens its first chapter. */
  startReading: string;
  /** Who made a comic: art and words. */
  credit: string;
  /** Who made the site. */
  colophon: string;
  notFoundTitle: string;
  notFoundHeading: string;
  notFoundLink: string;
}

const plural = (one: string, many: string) => (n: number) => `${n} ${n === 1 ? one : many}`;

export const UI: Record<Locale, UiStrings> = {
  en: {
    libraryTitle: "Vibe2Fire · comics",
    libraryDescription: "Comics painted with AI image generation and lettered by hand in HTML, in more than one language.",
    libraryHeading: "Comics, *bound* by language.",
    libraryLead:
      "Every comic on Vibe2Fire, newest first. Panels are AI-generated; every caption and balloon is real text, so it reads in any language.",
    languageHeading: (language) => `Comics in *${language}*.`,
    languageLead: (language) => `Every comic in ${language} on Vibe2Fire, newest first.`,
    allLanguages: "All languages",
    filterBy: "Comic language",
    interface: "Interface language",
    newest: "New",
    allIn: (n, language) => `All ${n} in ${language}`,
    chapters: plural("chapter", "chapters"),
    panels: plural("panel", "panels"),
    comics: plural("comic", "comics"),
    empty: "No comics yet.",
    aiNotice: "Panel art is AI-generated (Codex image generation); lettering and stories are written by people.",
    contents: "Contents",
    chapterLink: (n, title) => `Chapter ${n}: ${title}`,
    startReading: "Start reading",
    credit: "art painted by Codex · words written by people",
    colophon: "Designed by Claude and Codex: Codex painted the mockups and the art, Claude built the pages.",
    notFoundTitle: "Not found · Vibe2Fire",
    notFoundHeading: "This page got laid off.",
    notFoundLink: "Back to all comics",
  },
  vi: {
    libraryTitle: "Vibe2Fire · truyện tranh",
    libraryDescription: "Truyện tranh vẽ bằng AI, lời thoại viết tay bằng HTML, nhiều ngôn ngữ.",
    libraryHeading: "Truyện tranh, *đóng tập* theo ngôn ngữ.",
    libraryLead:
      "Mọi truyện trên Vibe2Fire, mới nhất trước. Tranh do AI vẽ; lời dẫn và lời thoại là chữ thật, nên đọc được ở mọi ngôn ngữ.",
    languageHeading: (language) => `Truyện tranh *${language}*.`,
    // Mid-sentence, Vietnamese writes "tiếng Việt", not the title-case "Tiếng Việt".
    languageLead: (language) =>
      `Mọi truyện ${language.charAt(0).toLocaleLowerCase("vi")}${language.slice(1)} trên Vibe2Fire, mới nhất trước.`,
    allLanguages: "Mọi ngôn ngữ",
    filterBy: "Ngôn ngữ truyện",
    interface: "Ngôn ngữ giao diện",
    newest: "Mới",
    allIn: (n, language) => `Cả ${n} truyện ${language}`,
    chapters: (n) => `${n} chương`,
    panels: (n) => `${n} khung`,
    comics: (n) => `${n} truyện`,
    empty: "Chưa có truyện nào.",
    aiNotice: "Tranh do AI vẽ (Codex), lời thoại và cốt truyện do người viết.",
    contents: "Mục lục",
    chapterLink: (n, title) => `Chương ${n}: ${title}`,
    startReading: "Bắt đầu đọc",
    credit: "tranh do Codex vẽ · lời do người viết",
    colophon: "Claude và Codex cùng thiết kế: Codex vẽ bản phác và tranh, Claude dựng trang.",
    notFoundTitle: "Không tìm thấy · Vibe2Fire",
    notFoundHeading: "Trang này đã bị cho nghỉ việc.",
    notFoundLink: "Về danh sách truyện",
  },
};

/** URL prefix of a locale: "" for the default locale, "/vi" otherwise. */
export const localePrefix = (locale: Locale) => (locale === DEFAULT_LOCALE ? "" : `/${locale}`);

/** Library URL for an interface locale (each comic language is a spread on it, at #lang-<code>),
 *  or with `lang`, the page listing every comic in that language. */
export const libraryPath = (locale: Locale, lang?: string) => `${localePrefix(locale)}/${lang ? `language/${lang}/` : ""}`;

/** A language's name in the given locale: ("vi", "en") -> "Vietnamese", ("vi", "vi") -> "Tiếng Việt". */
export const languageName = (lang: string, locale: string) => {
  const name = new Intl.DisplayNames([locale], { type: "language" }).of(lang) ?? lang;
  return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
};

/** Path segments a comic slug may not take, because site routes own them. */
export const RESERVED_SLUGS = new Set<string>([...LOCALES, "language", "comics", "content.json", "404"]);
