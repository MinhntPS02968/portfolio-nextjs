"use client";

import { I18nextProvider } from "react-i18next";
import { createI18nInstance, normalizeI18nLang } from "@/utils/i18n";
import { PropsWithChildren, useEffect, useState } from "react";

export function I18nProvider({ children }: PropsWithChildren) {
  const [i18n, setI18n] = useState<any>(null);

  useEffect(() => {
    const raw = localStorage.getItem("i18nextLng") || "gb";
    const savedLang = normalizeI18nLang(raw);
    if (raw !== savedLang) {
      localStorage.setItem("i18nextLng", savedLang);
    }
    const i18nInstance = createI18nInstance(savedLang);
    setI18n(i18nInstance);
  }, []);

  if (i18n) return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
