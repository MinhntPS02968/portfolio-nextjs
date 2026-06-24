import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import gb from "@/locales/gb.json"
import vn from "@/locales/vn.json"

/** Language codes aligned with flag-icons (gb, vn) */
export const I18N_LANG_CODES = ["gb", "vn"] as const
export type I18nLangCode = (typeof I18N_LANG_CODES)[number]

const LEGACY_LANG_MAP: Record<string, I18nLangCode> = {
    en: "gb",
    vi: "vn",
}

export function normalizeI18nLang(code: string): I18nLangCode {
    const mapped = LEGACY_LANG_MAP[code] ?? code
    if (I18N_LANG_CODES.includes(mapped as I18nLangCode)) {
        return mapped as I18nLangCode
    }
    return "gb"
}

export function createI18nInstance(initialLanguage: string = "gb") {
    const lng = normalizeI18nLang(initialLanguage)
    i18n.use(initReactI18next).init({
        resources: {
            gb: { translation: gb },
            vn: { translation: vn },
        },
        lng,
        fallbackLng: "gb",
        interpolation: {
            escapeValue: false,
        },
    })

    return i18n
}
