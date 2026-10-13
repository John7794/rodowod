import { FamilyConfig } from '../types';
import { Language } from '../i18n/translations';

export interface RouteInfo {
  lang: Language;
  familyId: string | null;
}

const SUPPORTED_LANGS: Language[] = ['uk', 'pl', 'en'];

/**
 * Parses current location pathname + search to extract language and familyId.
 * Supports:
 * - / (root) -> default uk, stankiewicz or null
 * - /:lang (e.g. /pl, /en, /uk)
 * - /:lang/:familyId (e.g. /uk/stankiewicz, /pl/borkowski, /en/malczewski)
 * - /:familyId (e.g. /stankiewicz -> default lang uk)
 * - Legacy fallback: ?family=stankiewicz&lang=uk
 */
export function parseRoute(pathname: string, search: string): RouteInfo {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath ? cleanPath.split('/') : [];
  
  let lang: Language = 'uk';
  let familyId: string | null = null;

  if (segments.length === 1) {
    if (SUPPORTED_LANGS.includes(segments[0] as Language)) {
      lang = segments[0] as Language;
    } else {
      familyId = segments[0].toLowerCase();
    }
  } else if (segments.length >= 2) {
    if (SUPPORTED_LANGS.includes(segments[0] as Language)) {
      lang = segments[0] as Language;
      familyId = segments[1].toLowerCase();
    } else {
      familyId = segments[0].toLowerCase();
    }
  }

  // Query parameter fallback
  const params = new URLSearchParams(search);
  const langQuery = params.get('lang');
  if (langQuery && SUPPORTED_LANGS.includes(langQuery as Language)) {
    lang = langQuery as Language;
  }
  const familyQuery = params.get('family');
  if (familyQuery) {
    familyId = familyQuery.toLowerCase();
  }

  return { lang, familyId };
}

/**
 * Generates canonical clean URL for a given language and family.
 * e.g. /uk/stankiewicz or /pl/borkowski
 */
export function buildUrl(lang: Language, familyId: string | null = null): string {
  if (!familyId) {
    return lang === 'uk' ? '/' : `/${lang}`;
  }
  return `/${lang}/${familyId}`;
}
