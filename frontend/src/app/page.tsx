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
          <Script
              src="https://unpkg.com/aos@2.3.1/dist/aos.js"
              strategy="afterInteractive"
              onLoad={() => {
                  if (typeof (window as any).AOS !== 'undefined') {
                      ;(window as any).AOS.init({
                          duration: 800,
                          once: true,
                          offset: window.innerWidth < 768 ? -100 : 50,
                          easing: 'ease-out-cubic',
                      })
                  }
              }}
          />
          <div className="corex-landing">
              <Header/>
              <main className="portfolio-main mx-auto bg-black border-top">
                  <HeroSection />
                  <SkillsSection />
                  <ProjectsSection />
                  <ContactSection />
                  
                  {/* Bọc các section cũ của corex bên dưới nếu muốn giữ lại */}
                  <div style={{ display: 'none' }}>
                  <section
                      className="corex-hero"
                      id="hero"
                      aria-label={t('hero_aria')}
                  >
                      <div
                          className="corex-hero__glow corex-hero__glow--tr"
                          aria-hidden="true"
                      ></div>
                      <div
                          className="corex-hero__glow corex-hero__glow--br"
                          aria-hidden="true"
                      ></div>
                      <div
                          className="corex-hero__glow corex-hero__glow--tl"
                          aria-hidden="true"
                      ></div>
                      <div
                          className="corex-hero__glow corex-hero__glow--bl"
                          aria-hidden="true"
                      ></div>
                      <div className="corex-hero__bg">
                          <img
                              className="corex-hero__bg-img"
                              src="client/images/corex/hero-bg.png"
                              alt=""
                              loading="eager"
                              decoding="async"
                          />
                      </div>
                      <div className="container-xxl corex-hero__content">
                          <div className="row align-items-center gy-5">
                              <div
                                  className="col-lg-6"
                                  data-aos="fade-right"
                                  data-aos-duration="800"
                              >
                                  <div className="row">
                                      <div className="col-9 col-md-10 mx-auto">
                                          <div className="corex-hero__visual">
                                              <img
                                                  className="corex-hero__visual-frame"
                                                  src="client/images/corex/frame-banner.png"
                                                  loading="eager"
                                                  decoding="async"
                                              />
                                              <a
                                                  className="corex-hero__visual-center"
                                                  href="https://corex.is/"
                                                  target="_blank"
                                              >
                                                  <img
                                                      className="w-100"
                                                      src="client/images/corex/logo-center.png"
                                                      alt={t(
                                                          'hero_visual_center_alt'
                                                      )}
                                                      loading="eager"
                                                      decoding="async"
                                                  />
                                              </a>
                                              <a
                                                  className="corex-hero__visual-top"
                                                  href="https://crxex.com/"
                                                  target="_blank"
                                              >
                                                  <img
                                                      className="w-100"
                                                      src="client/images/corex/rx-exchange.png"
                                                      alt=""
                                                      loading="eager"
                                                      decoding="async"
                                                  />
                                              </a>
                                              <a
                                                  className="corex-hero__visual-right"
                                                  href="javascript:void(0)"
                                                  target="_blank"
                                              >
                                                  <img
                                                      className="w-100"
                                                      src="client/images/corex/rx-swap.png"
                                                      alt=""
                                                      loading="eager"
                                                      decoding="async"
                                                  />
                                              </a>
                                              <a
                                                  className="corex-hero__visual-left"
                                                  href="javascript:void(0)"
                                                  target="_blank"
                                              >
                                                  <img
                                                      className="w-100"
                                                      src="client/images/corex/rx-wallet.png"
                                                      alt=""
                                                      loading="eager"
                                                      decoding="async"
                                                  />
                                              </a>
                                              <a
                                                  className="corex-hero__visual-bottom"
                                                  href="https://corexshop.is/"
                                                  target="_blank"
                                              >
                                                  <img
                                                      className="w-100"
                                                      src="client/images/corex/rx-shop.png"
                                                      alt=""
                                                      loading="eager"
                                                      decoding="async"
                                                  />
                                              </a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div
                                  className="col-lg-6"
                                  data-aos="fade-left"
                                  data-aos-duration="800"
                              >
                                  <div className="corex-hero__copy-wrap">
                                      <div className="corex-hero__copy-stack">
                                          <div className="row">
                                              <div className="col-10 col-lg-12 mx-auto">
                                                  <img
                                                      className="corex-hero__frame"
                                                      src="client/images/corex/hero-title-frame.png"
                                                      alt=""
                                                      loading="eager"
                                                      decoding="async"
                                                  />
                                              </div>
                                          </div>
                                          <div className="corex-hero__copy-text">
                                              <p className="corex-hero__headline">
                                                  {t('hero_headline')}
                                              </p>
                                              <div className="corex-title-line corex-title-line--hero"></div>
                                              <p className="corex-hero__tagline">
                                                  {t('hero_tagline')}
                                              </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
                  <section
                      className="corex-section-py"
                      id="introduction"
                      aria-labelledby="introduction-heading"
                  >
                      <div className="container-xl">
                          <div className="row gy-5 align-items-center">
                              <div className="col-lg-6" data-aos="fade-up">
                                  <header className="mb-4">
                                      <h2
                                          className="corex-section-title"
                                          id="introduction-heading"
                                      >
                                          {t('intro_title')}
                                      </h2>
                                      <div className="corex-title-line me-auto"></div>
                                  </header>
                                  <div className="corex-body">
                                      <p>{t('intro_p1')}</p>
                                      <p>{t('intro_p2')}</p>
                                      <p>{t('intro_p3')}</p>
                                      <p>{t('intro_p4')}</p>
                                      <ul>
                                          <li>{t('intro_li1')}</li>
                                          <li>{t('intro_li2')}</li>
                                          <li>{t('intro_li3')}</li>
                                          <li>{t('intro_li4')}</li>
                                      </ul>
                                      <p>{t('intro_p5')}</p>
                                      <p className="mb-0">{t('intro_p6')}</p>
                                      <p className="mb-0">{t('intro_p7')}</p>
                                  </div>
                              </div>
                              <div
                                  className="col-lg-6"
                                  data-aos="fade-up"
                                  data-aos-delay="100"
                              >
                                  <div className="position-relative">
                                      <img
                                          className="corex-illustration"
                                          src="client/images/corex/intro-stack.png"
                                          alt={t('intro_illustration_alt')}
                                          loading="lazy"
                                          decoding="async"
                                      />
                                      <span className="visually-hidden">
                                          {t('intro_illustration_caption')}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
                  <section
                      className="corex-section-py"
                      id="vision-mission"
                      aria-labelledby="vision-heading"
                  >
                      <div className="container-xl">
                          <div className="row gy-5 align-items-center">
                              <div
                                  className="col-lg-6 order-lg-1"
                                  data-aos="fade-up"
                              >
                                  <img
                                      className="corex-illustration"
                                      src="client/images/corex/vision-illustration.png"
                                      alt={t('vision_illustration_alt')}
                                      loading="lazy"
                                      decoding="async"
                                  />
                              </div>
                              <div
                                  className="col-lg-6 order-lg-2"
                                  data-aos="fade-up"
                                  data-aos-delay="80"
                              >
                                  <header className="mb-4">
                                      <h2
                                          className="corex-section-title"
                                          id="vision-heading"
                                      >
                                          {t('vision_title')}
                                      </h2>
                                      <div className="corex-title-line me-auto"></div>
                                  </header>
                                  <div className="corex-body mb-5">
                                      <p>{t('vision_p1')}</p>
                                      <ul>
                                          <li>{t('vision_li1')}</li>
                                          <li>{t('vision_li2')}</li>
                                          <li>{t('vision_li3')}</li>
                                      </ul>
                                      <p className="mb-0">{t('vision_p2')}</p>
                                  </div>
                                  <header className="mb-4">
                                      <h2 className="corex-section-title">
                                          {t('mission_title')}
                                      </h2>
                                      <div className="corex-title-line me-auto"></div>
                                  </header>
                                  <div className="corex-body">
                                      <p>{t('mission_p1')}</p>
                                      <ul>
                                          <li>{t('mission_li1')}</li>
                                          <li>{t('mission_li2')}</li>
                                          <li>{t('mission_li3')}</li>
                                      </ul>
                                      <p>{t('mission_p2')}</p>
                                      <ul className="mb-0">
                                          <li>{t('mission_li4')}</li>
                                          <li>{t('mission_li5')}</li>
                                          <li>{t('mission_li6')}</li>
                                      </ul>
                                      <p className="mb-0">{t('mission_p3')}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
                  <section
                      className="corex-section-py"
                      id="core-strategy"
                      aria-labelledby="strategy-heading"
                  >
                      <div className="container-xl">
                          <header
                              className="text-center mb-2"
                              data-aos="fade-up"
                          >
                              <h2
                                  className="corex-section-title"
                                  id="strategy-heading"
                              >
                                  {t('strategy_title')}
                              </h2>
                              <div className="corex-title-line mx-auto mb-3"></div>
                              <p className="corex-section-subtitle mb-2">
                                  {t('strategy_subtitle')}
                              </p>
                          </header>
                          <p
                              className="corex-body text-center mb-5 pb-lg-3"
                              data-aos="fade-up"
                          >
                              {t('strategy_lead')}
                          </p>
                          <div className="row g-4">
                              <div
                                  className="col-md-6 col-xl-4 mt-5"
                                  data-aos="fade-up"
                              >
                                  <article className="corex-card corex-card--phase">
                                      <img
                                          className="corex-card__thumb"
                                          src="client/images/corex/phase-card-1.png"
                                          alt=""
                                          loading="lazy"
                                          decoding="async"
                                      />
                                      <p className="corex-card__phase-label">
                                          {t('phase1_label')}
                                      </p>
                                      <div className="corex-title-line mx-auto mb-2"></div>
                                      <h3 className="corex-card__phase-title">
                                          {t('phase1_title')}
                                      </h3>
                                      <ul className="corex-card__list">
                                          <li>{t('phase1_li1')}</li>
                                          <li>{t('phase1_li2')}</li>
                                          <li>{t('phase1_li3')}</li>
                                      </ul>
                                  </article>
                              </div>
                              <div
                                  className="col-md-6 col-xl-4 mt-5"
                                  data-aos="fade-up"
                                  data-aos-delay="60"
                              >
                                  <article className="corex-card corex-card--phase">
                                      <img
                                          className="corex-card__thumb"
                                          src="client/images/corex/phase-card-2.png"
                                          alt=""
                                          loading="lazy"
                                          decoding="async"
                                      />
                                      <p className="corex-card__phase-label">
                                          {t('phase2_label')}
                                      </p>
                                      <div className="corex-title-line mx-auto mb-2"></div>
                                      <h3 className="corex-card__phase-title">
                                          {t('phase2_title')}
                                      </h3>
                                      <ul className="corex-card__list">
                                          <li>{t('phase2_li1')}</li>
                                          <li>{t('phase2_li2')}</li>
                                          <li>{t('phase2_li3')}</li>
                                      </ul>
                                  </article>
                              </div>
                              <div
                                  className="col-md-6 col-xl-4 mt-5"
                                  data-aos="fade-up"
                                  data-aos-delay="120"
                              >
                                  <article className="corex-card corex-card--phase">
                                      <img
                                          className="corex-card__thumb"
                                          src="client/images/corex/phase-card-3.png"
                                          alt=""
                                          loading="lazy"
                                          decoding="async"
                                      />
                                      <p className="corex-card__phase-label">
                                          {t('phase3_label')}
                                      </p>
                                      <div className="corex-title-line mx-auto mb-2"></div>
                                      <h3 className="corex-card__phase-title">
                                          {t('phase3_title')}
                                      </h3>
                                      <ul className="corex-card__list">
                                          <li>{t('phase3_li1')}</li>
                                          <li>{t('phase3_li2')}</li>
                                          <li>{t('phase3_li3')}</li>
                                      </ul>
                                  </article>
                              </div>
                          </div>
                      </div>
                  </section>
                  <div className="corex-glow-mid-band">
                      <section
                          className="corex-section-py"
                          id="ecosystem"
                          aria-labelledby="ecosystem-heading"
                      >
                          <div className="container-xl">
                              <header
                                  className="corex-eco-intro"
                                  data-aos="fade-up"
                              >
                                  <h2
                                      className="corex-section-title"
                                      id="ecosystem-heading"
                                  >
                                      {t('eco_title')}
                                  </h2>
                                  <div className="corex-title-line mx-auto mb-3"></div>
                                  <p className="corex-section-subtitle mb-3">
                                      {t('eco_subtitle')}
                                  </p>
                                  <div className="corex-body">
                                      <p className="mb-1">{t('eco_p1')}</p>
                                      <p className="mb-0">{t('eco_p2')}</p>
                                  </div>
                              </header>
                              <div
                                  className="corex-eco-diagram"
                                  data-aos="zoom-in"
                                  data-aos-duration="900"
                                  aria-label={t('eco_diagram_aria')}
                              >
                                  <div className="corex-eco-diagram__hub">
                                      <div
                                          className="corex-eco-diagram__orbit corex-eco-diagram__orbit--0"
                                          aria-hidden="true"
                                      ></div>
                                      <div
                                          className="corex-eco-diagram__orbit corex-eco-diagram__orbit--1"
                                          aria-hidden="true"
                                      ></div>
                                      <div
                                          className="corex-eco-diagram__orbit corex-eco-diagram__orbit--2"
                                          aria-hidden="true"
                                      ></div>
                                      <div
                                          className="corex-eco-diagram__orbit corex-eco-diagram__orbit--3"
                                          aria-hidden="true"
                                      ></div>
                                      <div
                                          className="corex-eco-diagram__orbit corex-eco-diagram__orbit--4"
                                          aria-hidden="true"
                                      ></div>
                                      <div
                                          className="corex-eco-diagram__orbit corex-eco-diagram__orbit--5"
                                          aria-hidden="true"
                                      ></div>
                                      <div
                                          className="corex-eco-diagram__orbit corex-eco-diagram__orbit--6"
                                          aria-hidden="true"
                                      ></div>
                                      <div className="corex-eco-diagram__vector corex-eco-diagram__vector--a">
                                          <img
                                              src="client/images/corex/eco-vector-a.png"
                                              alt=""
                                              loading="lazy"
                                              decoding="async"
                                          />
                                      </div>
                                      <div className="corex-eco-diagram__vector corex-eco-diagram__vector--b">
                                          <img
                                              src="client/images/corex/eco-vector-b.png"
                                              alt=""
                                              loading="lazy"
                                              decoding="async"
                                          />
                                      </div>
                                      <div className="corex-eco-diagram__center">
                                          <img
                                              src="client/images/corex/ecosystem-center.png"
                                              alt={t('eco_center_alt')}
                                              loading="lazy"
                                              decoding="async"
                                          />
                                      </div>
                                  </div>
                                  <article className="corex-eco-pin corex-eco-pin--wallet">
                                      <h3 className="corex-eco-pin__title">
                                          <span className="corex-brand">
                                              {t('brand_corex')}
                                          </span>
                                          <span className="corex-brand-rest">
                                              {t('eco_wallet')}
                                          </span>
                                      </h3>
                                      <p className="corex-eco-pin__text">
                                          {t('eco_wallet_text')}
                                      </p>
                                  </article>
                                  <article className="corex-eco-pin corex-eco-pin--dao">
                                      <h3 className="corex-eco-pin__title">
                                          <span className="corex-brand">
                                              {t('brand_corex')}
                                          </span>
                                          <span className="corex-brand-rest">
                                              {t('eco_dao')}
                                          </span>
                                      </h3>
                                      <p className="corex-eco-pin__text">
                                          {t('eco_dao_text')}
                                      </p>
                                  </article>
                                  <article className="corex-eco-pin corex-eco-pin--commerce">
                                      <h3 className="corex-eco-pin__title">
                                          <span className="corex-brand">
                                              {t('brand_corex')}
                                          </span>
                                          <span className="corex-brand-rest">
                                              {t('eco_commerce')}
                                          </span>
                                      </h3>
                                      <p className="corex-eco-pin__text">
                                          {t('eco_commerce_text')}
                                      </p>
                                  </article>
                                  <article className="corex-eco-pin corex-eco-pin--lending">
                                      <h3 className="corex-eco-pin__title">
                                          <span className="corex-brand">
                                              {t('brand_corex')}
                                          </span>
                                          <span className="corex-brand-rest">
                                              {t('eco_lending')}
                                          </span>
                                      </h3>
                                      <p className="corex-eco-pin__text">
                                          {t('eco_lending_text')}
                                      </p>
                                  </article>
                                  <article className="corex-eco-pin corex-eco-pin--dex">
                                      <h3 className="corex-eco-pin__title">
                                          <span className="corex-brand">
                                              {t('brand_corex')}
                                          </span>
                                          <span className="corex-brand-rest">
                                              {t('eco_dex')}
                                          </span>
                                      </h3>
                                      <p className="corex-eco-pin__text">
                                          {t('eco_dex_text')}
                                      </p>
                                  </article>
                                  <article className="corex-eco-pin corex-eco-pin--cex">
                                      <h3 className="corex-eco-pin__title">
                                          <span className="corex-brand">
                                              {t('brand_corex')}
                                          </span>
                                          <span className="corex-brand-rest">
                                              {t('eco_cex')}
                                          </span>
                                      </h3>
                                      <p className="corex-eco-pin__text">
                                          {t('eco_cex_text')}
                                      </p>
                                  </article>
                                  <article className="corex-eco-pin corex-eco-pin--launchpad">
                                      <h3 className="corex-eco-pin__title">
                                          <span className="corex-brand">
                                              {t('brand_corex')}
                                          </span>
                                          <span className="corex-brand-rest">
                                              {t('eco_launchpad')}
                                          </span>
                                      </h3>
                                      <p className="corex-eco-pin__text">
                                          {t('eco_launchpad_text')}
                                      </p>
                                  </article>
                              </div>
                          </div>
                      </section>
                      <section
                          className="corex-section-py"
                          id="corx-token"
                          aria-labelledby="token-heading"
                      >
                          <div className="container-xl">
                              <header
                                  className="corex-token-header text-center mb-4"
                                  data-aos="fade-up"
                              >
                                  <h2
                                      className="corex-section-title"
                                      id="token-heading"
                                  >
                                      {t('token_title')}
                                  </h2>
                                  <div className="corex-title-line mx-auto mb-3"></div>
                                  <p className="corex-section-subtitle mb-3">
                                      {t('token_subtitle')}
                                  </p>
                                  <div className="corex-body">
                                      <p className="mb-1">{t('token_p1')}</p>
                                      <p className="mb-0">{t('token_p2')}</p>
                                  </div>
                              </header>
                              <div className="row g-4 gy-5 justify-content-around">
                                  <div className="col-lg-5" data-aos="fade-up">
                                      <article className="corex-card corex-card--hex text-center">
                                          <img
                                              className="corex-token-poly"
                                              src="client/images/corex/token-poly-1.png"
                                              alt=""
                                              loading="lazy"
                                              decoding="async"
                                          />
                                          <p className="corex-card__phase-label">
                                              {t('token_phase_12')}
                                          </p>
                                          <div className="corex-title-line mx-auto mb-2"></div>
                                          <h3 className="corex-card__phase-title">
                                              {t('token_utility_title')}
                                          </h3>
                                          <ul className="corex-card__list text-start d-inline-block">
                                              <li>{t('token_utility_li1')}</li>
                                              <li>{t('token_utility_li2')}</li>
                                              <li>{t('token_utility_li3')}</li>
                                              <li>{t('token_utility_li4')}</li>
                                              <li>{t('token_utility_li5')}</li>
                                          </ul>
                                      </article>
                                  </div>
                                  <div
                                      className="col-lg-5"
                                      data-aos="fade-up"
                                      data-aos-delay="80"
                                  >
                                      <article className="corex-card corex-card--hex text-center">
                                          <img
                                              className="corex-token-poly"
                                              src="client/images/corex/token-poly-2.png"
                                              alt=""
                                              loading="lazy"
                                              decoding="async"
                                          />
                                          <p className="corex-card__phase-label">
                                              {t('token_phase_3')}
                                          </p>
                                          <div className="corex-title-line mx-auto mb-2"></div>
                                          <h3 className="corex-card__phase-title">
                                              {t('token_chain_title')}
                                          </h3>
                                          <ul className="corex-card__list text-start d-inline-block">
                                              <li>{t('token_chain_li1')}</li>
                                              <li>{t('token_chain_li2')}</li>
                                              <li>{t('token_chain_li3')}</li>
                                              <li>{t('token_chain_li4')}</li>
                                              <li>{t('token_chain_li5')}</li>
                                          </ul>
                                      </article>
                                  </div>
                              </div>
                          </div>
                      </section>
                      <section
                          className="corex-section-py"
                          id="ai-layer"
                          aria-labelledby="ai-heading"
                      >
                          <div className="container-xl">
                              <div className="row gy-5 align-items-center">
                                  <div className="col-lg-6" data-aos="fade-up">
                                      <header className="mb-4">
                                          <h2
                                              className="corex-section-title"
                                              id="ai-heading"
                                          >
                                              {t('ai_title')}
                                          </h2>
                                          <div className="corex-title-line me-auto"></div>
                                          <p className="corex-section-subtitle mt-3 mb-0">
                                              {t('ai_subtitle')}
                                          </p>
                                      </header>
                                      <div className="corex-body">
                                          <p>{t('ai_p1')}</p>
                                          <ul>
                                              <li>{t('ai_li1')}</li>
                                              <li>{t('ai_li2')}</li>
                                              <li>{t('ai_li3')}</li>
                                              <li>{t('ai_li4')}</li>
                                              <li>{t('ai_li5')}</li>
                                              <li>{t('ai_li6')}</li>
                                          </ul>
                                          <p className="mb-0">{t('ai_p2')}</p>
                                      </div>
                                  </div>
                                  <div
                                      className="col-lg-6"
                                      data-aos="fade-up"
                                      data-aos-delay="100"
                                  >
                                      <img
                                          className="corex-illustration"
                                          src="client/images/corex/ai-layer.png"
                                          alt={t('ai_alt')}
                                          loading="lazy"
                                          decoding="async"
                                      />
                                  </div>
                              </div>
                          </div>
                      </section>
                  </div>
                  <section
                      className="corex-section-py corex-roadmap"
                      id="roadmap"
                      aria-labelledby="roadmap-heading"
                  >
                      <div className="container-xl">
                          <header
                              className="text-center mb-4"
                              data-aos="fade-up"
                          >
                              <h2
                                  className="corex-section-title"
                                  id="roadmap-heading"
                              >
                                  {t('roadmap_title')}
                              </h2>
                              <div className="corex-title-line mx-auto mb-3"></div>
                              <p className="corex-body mb-0">
                                  {t('roadmap_lead')}
                              </p>
                          </header>
                          <div className="corex-roadmap__track">
                              <div
                                  className="corex-roadmap__axis"
                                  aria-hidden="true"
                              ></div>
                              <div className="row g-4 gy-4 align-items-stretch">
                                  <div className="col-lg-4" data-aos="fade-up">
                                      <div className="corex-roadmap__column">
                                          <article className="corex-card corex-card--roadmap text-center">
                                              <img
                                                  className="corex-card__icon"
                                                  src="client/images/corex/roadmap-2026.png"
                                                  alt=""
                                                  loading="lazy"
                                                  decoding="async"
                                              />
                                              <p className="corex-card__phase-label mb-0">
                                                  {t('roadmap_2026')}
                                              </p>
                                              <div className="corex-title-line mx-auto my-2"></div>
                                              <h3 className="corex-card__phase-title">
                                                  {t(
                                                      'roadmap_foundation_title'
                                                  )}
                                              </h3>
                                              <ul className="corex-card__list text-start">
                                                  <li>
                                                      {t(
                                                          'roadmap_foundation_li1'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_foundation_li2'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_foundation_li3'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_foundation_li4'
                                                      )}
                                                  </li>
                                              </ul>
                                          </article>
                                          <div className="corex-roadmap__connector">
                                              <div className="corex-roadmap__stem"></div>
                                              <div className="corex-roadmap__node"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      className="col-lg-4"
                                      data-aos="fade-up"
                                      data-aos-delay="60"
                                  >
                                      <div className="corex-roadmap__column">
                                          <article className="corex-card corex-card--roadmap text-center">
                                              <img
                                                  className="corex-card__icon"
                                                  src="client/images/corex/roadmap-late2026.png"
                                                  alt=""
                                                  loading="lazy"
                                                  decoding="async"
                                              />
                                              <p className="corex-card__phase-label mb-0 corex-roadmap__phase-split">
                                                  <span className="corex-roadmap__phase-late">
                                                      {t('roadmap_late')}
                                                  </span>
                                                  <span className="corex-roadmap__phase-year">
                                                      {t('roadmap_2026')}
                                                  </span>
                                              </p>
                                              <div className="corex-title-line mx-auto my-2"></div>
                                              <h3 className="corex-card__phase-title">
                                                  {t('roadmap_expansion_title')}
                                              </h3>
                                              <ul className="corex-card__list text-start">
                                                  <li>
                                                      {t(
                                                          'roadmap_expansion_li1'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_expansion_li2'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_expansion_li3'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_expansion_li4'
                                                      )}
                                                  </li>
                                              </ul>
                                          </article>
                                          <div className="corex-roadmap__connector">
                                              <div className="corex-roadmap__stem"></div>
                                              <div className="corex-roadmap__node"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div
                                      className="col-lg-4"
                                      data-aos="fade-up"
                                      data-aos-delay="120"
                                  >
                                      <div className="corex-roadmap__column">
                                          <article className="corex-card corex-card--roadmap text-center">
                                              <img
                                                  className="corex-card__icon"
                                                  src="client/images/corex/roadmap-2027.png"
                                                  alt=""
                                                  loading="lazy"
                                                  decoding="async"
                                              />
                                              <p className="corex-card__phase-label mb-0">
                                                  {t('roadmap_2027')}
                                              </p>
                                              <div className="corex-title-line mx-auto my-2"></div>
                                              <h3 className="corex-card__phase-title">
                                                  {t(
                                                      'roadmap_sovereignty_title'
                                                  )}
                                              </h3>
                                              <ul className="corex-card__list text-start">
                                                  <li>
                                                      {t(
                                                          'roadmap_sovereignty_li1'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_sovereignty_li2'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_sovereignty_li3'
                                                      )}
                                                  </li>
                                                  <li>
                                                      {t(
                                                          'roadmap_sovereignty_li4'
                                                      )}
                                                  </li>
                                              </ul>
                                          </article>
                                          <div className="corex-roadmap__connector">
                                              <div className="corex-roadmap__stem"></div>
                                              <div className="corex-roadmap__node"></div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
                  <section
                      className="corex-section-py"
                      id="positioning"
                      aria-labelledby="positioning-heading"
                  >
                      <div className="container-xl">
                          <div className="row gy-5 align-items-center">
                              <div className="col-lg-6" data-aos="fade-up">
                                  <img
                                      className="corex-illustration"
                                      src="client/images/corex/positioning.png"
                                      alt={t('positioning_alt')}
                                      loading="lazy"
                                      decoding="async"
                                  />
                              </div>
                              <div
                                  className="col-lg-6"
                                  data-aos="fade-up"
                                  data-aos-delay="80"
                              >
                                  <header className="mb-4">
                                      <h2
                                          className="corex-section-title"
                                          id="positioning-heading"
                                      >
                                          {t('positioning_title')}
                                      </h2>
                                      <div className="corex-title-line me-auto"></div>
                                  </header>
                                  <div className="corex-body mb-4">
                                      <p>{t('positioning_p1')}</p>
                                      <p>{t('positioning_p2')}</p>
                                      <ul>
                                          <li>{t('positioning_li1')}</li>
                                          <li>{t('positioning_li2')}</li>
                                          <li>{t('positioning_li3')}</li>
                                          <li>{t('positioning_li4')}</li>
                                      </ul>
                                  </div>
                                  <div className="corex-body">
                                      <p>{t('positioning_p3')}</p>
                                      <ul className="mb-0">
                                          <li>{t('positioning_li5')}</li>
                                          <li>{t('positioning_li6')}</li>
                                          <li>{t('positioning_li7')}</li>
                                          <li>{t('positioning_li8')}</li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
                  <section
                      className="corex-section-py"
                      id="conclusion"
                      aria-labelledby="conclusion-heading"
                  >
                      <div className="container-xl">
                          <div className="row gy-5 align-items-center">
                              <div
                                  className="col-lg-6 order-lg-2"
                                  data-aos="fade-up"
                              >
                                  <img
                                      className="corex-illustration"
                                      src="client/images/corex/conclusion.png"
                                      alt={t('conclusion_alt')}
                                      loading="lazy"
                                      decoding="async"
                                  />
                              </div>
                              <div
                                  className="col-lg-6 order-lg-1"
                                  data-aos="fade-up"
                                  data-aos-delay="80"
                              >
                                  <header className="mb-4">
                                      <h2
                                          className="corex-section-title"
                                          id="conclusion-heading"
                                      >
                                          {t('conclusion_title')}
                                      </h2>
                                      <div className="corex-title-line me-auto"></div>
                                  </header>
                                  <div className="corex-body">
                                      <p>{t('conclusion_p1')}</p>
                                      <p>{t('conclusion_p2')}</p>
                                      <ul>
                                          <li>{t('conclusion_li1')}</li>
                                          <li>{t('conclusion_li2')}</li>
                                          <li>{t('conclusion_li3')}</li>
                                          <li>{t('conclusion_li4')}</li>
                                          <li>{t('conclusion_li5')}</li>
                                      </ul>
                                      <p className="mb-0">
                                          {t('conclusion_p3')}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
                  <section
                      className="corex-contact"
                      id="contact"
                      aria-labelledby="contact-heading"
                  >
                      <div className="corex-contact__bg">
                          <img
                              className="corex-contact__bg-img"
                              src="client/images/corex/contact-bg.png"
                              alt=""
                              loading="lazy"
                              decoding="async"
                          />
                      </div>
                      <div className="corex-contact__inner">
                          <header className="mb-4" data-aos="fade-up">
                              <h2
                                  className="corex-section-title"
                                  id="contact-heading"
                              >
                                  {t('contact_title')}
                              </h2>
                              <div className="corex-title-line mx-auto mb-0"></div>
                          </header>
                          <div
                              className="corex-contact__block"
                              data-aos="fade-up"
                              data-aos-delay="60"
                          >
                              <p className="mb-3">
                                  <strong>{t('contact_heading_strong')}</strong>
                              </p>
                              <p className="mb-2">{t('contact_intro')}</p>
                              <p className="mb-3">
                                  <strong>{t('contact_offices')}</strong>
                              </p>
                              <p className="mb-1">{t('contact_hq')}</p>
                              <p className="mb-4">{t('contact_regional')}</p>
                              <p className="mb-2">
                                  <span className="corex-contact__label">
                                      {t('contact_email_label')}
                                  </span>
                                  <span> info@corexcenter.com</span>
                              </p>
                              <p className="mb-2">
                                  <span className="corex-contact__label">
                                      {t('contact_hotline_label')}
                                  </span>
                                  <span>
                                      {' '}
                                      +1 (415) 800-7799 / +65 6908 9898
                                  </span>
                              </p>
                              <p className="mb-2">
                                  <strong>{t('contact_get_in_touch')}</strong>
                              </p>
                              <p className="mb-0">{t('contact_submit_note')}</p>
                          </div>
                      </div>
                  </section>
                  </div>
              </main>
          </div>
      </>
  )
}
