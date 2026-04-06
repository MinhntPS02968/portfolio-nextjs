"use client";

import Script from "next/script";
import { useTranslation } from "react-i18next";
import HeroSection from "@/components/layout/portfolio/HeroSection";
import SkillsSection from "@/components/layout/portfolio/SkillsSection";
import ProjectsSection from "@/components/layout/portfolio/ProjectsSection";
import ContactSection from "@/components/layout/portfolio/ContactSection";
import Header from "@/components/layout/Header";
import { useEffect, useState } from "react";
import {
  I18N_LANG_CODES,
  I18nLangCode,
  normalizeI18nLang,
} from "@/utils/i18n";

/** hrefLang BCP 47 tương ứng từng mã UI (gb→en, …) */
const HREF_LANG: Record<I18nLangCode, string> = {
  gb: "en",
  vn: "vi",
  kr: "ko",
  jp: "ja",
  cn: "zh",
  fr: "fr",
};

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<I18nLangCode>("gb");

  useEffect(() => {
    setCurrentLang(normalizeI18nLang(i18n.language || "gb"));
  }, [i18n.language]);

  const changeLanguage = (lang: I18nLangCode) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
    setCurrentLang(lang);

    const dropdownElement = document.querySelector(
      '[data-bs-toggle="dropdown"]'
    );
    if (dropdownElement) {
      const dropdown = (window as any).bootstrap?.Dropdown?.getInstance(
        dropdownElement
      );
      if (dropdown) {
        dropdown.hide();
      }
    }
  };

  return (
      <>

          <div className="corex-landing">
              <Header/>
              <main className="portfolio-main mx-auto bg-black border-top">
                  <HeroSection />
                  <SkillsSection />
                  <ProjectsSection />
                  <ContactSection />
              </main>
          </div>
      </>
  )
}
