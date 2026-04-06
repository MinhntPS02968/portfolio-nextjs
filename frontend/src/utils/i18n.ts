import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import gb from "@/locales/gb.json";
import vn from "@/locales/vn.json";
import kr from "@/locales/kr.json";
import jp from "@/locales/jp.json";
import cn from "@/locales/cn.json";
import fr from "@/locales/fr.json";

/** Mã ngôn ngữ hợp lệ — đồng bộ với mã cờ flag-icons (gb, vn, …) */
export const I18N_LANG_CODES = ["gb", "vn", "kr", "jp", "cn", "fr"] as const;
export type I18nLangCode = (typeof I18N_LANG_CODES)[number];

const LEGACY_LANG_MAP: Record<string, I18nLangCode> = {
  en: "gb",
  vi: "vn",
};

/**
 * Chuẩn hóa mã ngôn ngữ từ localStorage / URL (hỗ trợ migrate en→gb, vi→vn)
 */
export function normalizeI18nLang(code: string): I18nLangCode {
  const mapped = LEGACY_LANG_MAP[code] ?? code;
  if (I18N_LANG_CODES.includes(mapped as I18nLangCode)) {
    return mapped as I18nLangCode;
  }
  return "gb";
}

export function createI18nInstance(initialLanguage: string = "gb") {
  const lng = normalizeI18nLang(initialLanguage);
  i18n.use(initReactI18next).init({
    resources: {
      gb: { translation: gb },
      vn: { translation: vn },
      kr: { translation: kr },
      jp: { translation: jp },
      cn: { translation: cn },
      fr: { translation: fr },
    },
    lng,
    fallbackLng: "gb",
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
}
