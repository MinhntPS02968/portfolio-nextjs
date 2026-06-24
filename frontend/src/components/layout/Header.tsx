"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import type { I18nLangCode } from "@/utils/i18n"
import { normalizeI18nLang } from "@/utils/i18n"

const NAV_ITEMS = [
    { href: "#hero", labelKey: "header.nav.home" },
    { href: "#works", labelKey: "header.nav.work" },
    { href: "#stats", labelKey: "header.nav.resume" },
] as const

const LANG_OPTIONS: {
    code: I18nLangCode
    labelKey: "header.lang.english" | "header.lang.vietnamese"
    short: string
}[] = [
    { code: "gb", labelKey: "header.lang.english", short: "EN" },
    { code: "vn", labelKey: "header.lang.vietnamese", short: "VI" },
]

export default function Header() {
    const { i18n, t } = useTranslation()
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeHref, setActiveHref] = useState("#hero")
    const [langOpen, setLangOpen] = useState(false)
    const navFrameRef = useRef<HTMLDivElement>(null)
    const langRef = useRef<HTMLDivElement>(null)

    const currentLang = normalizeI18nLang(i18n.language)
    const currentLangOption =
        LANG_OPTIONS.find((item) => item.code === currentLang) ?? LANG_OPTIONS[0]

    const handleLangChange = (code: I18nLangCode) => {
        i18n.changeLanguage(code)
        localStorage.setItem("i18nextLng", code)
        setLangOpen(false)
    }

    useEffect(() => {
        if (!langOpen) return

        const onPointerDown = (event: MouseEvent) => {
            if (!langRef.current?.contains(event.target as Node)) {
                setLangOpen(false)
            }
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setLangOpen(false)
            }
        }

        document.addEventListener("mousedown", onPointerDown)
        document.addEventListener("keydown", onKeyDown)
        return () => {
            document.removeEventListener("mousedown", onPointerDown)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [langOpen])

    useEffect(() => {
        const navLinks = document.querySelectorAll(".nav-link-item")
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("section[id]"),
        )

        const onScroll = () => {
            setIsScrolled(window.scrollY > 100)

            let activeId = ""
            sections.forEach((section) => {
                const top = section.offsetTop - 140
                if (window.scrollY >= top) {
                    activeId = section.id
                }
            })

            const nextHref = activeId ? `#${activeId}` : "#hero"
            setActiveHref(nextHref)

            navLinks.forEach((link) => {
                const href = link.getAttribute("href")
                link.classList.toggle("is-active", href === nextHref)
            })
        }

        navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href")
                if (!targetId || !targetId.startsWith("#")) return

                event.preventDefault()
                const targetElement = document.querySelector(targetId)
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    })
                }
            })
        })

        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <nav className="portfolio-navbar navbar navbar-expand-lg justify-content-center">
            <div
                ref={navFrameRef}
                className={`navbar-frame d-inline-flex align-items-center ${isScrolled ? "is-scrolled" : ""}`}
            >
                <a className="logo-ring" href="#hero" aria-label="Go to hero">
                    <span className="logo-inner">TM</span>
                </a>
                <span className="nav-divider d-none d-md-block" />
                <div className="nav-links d-inline-flex align-items-center">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={`nav-link-item ${activeHref === item.href ? "is-active" : ""}`}
                        >
                            {t(item.labelKey)}
                        </a>
                    ))}
                </div>
                <span className="nav-divider d-none d-md-block" />
                <div
                    className={`nav-lang-dropdown${langOpen ? " is-open" : ""}`}
                    ref={langRef}
                >
                    <button
                        type="button"
                        className="nav-lang-trigger"
                        aria-label={t("header.lang.select")}
                        aria-haspopup="listbox"
                        aria-expanded={langOpen}
                        onClick={() => setLangOpen((open) => !open)}
                    >
                        <span
                            className={`fi fi-${currentLangOption.code} nav-lang-flag`}
                            aria-hidden="true"
                        />
                        <span className="nav-lang-label">
                            {currentLangOption.short}
                        </span>
                        <span className="nav-lang-chevron" aria-hidden="true">
                            ▾
                        </span>
                    </button>
                    <ul
                        className="nav-lang-menu"
                        role="listbox"
                        aria-label="Language"
                    >
                        {LANG_OPTIONS.map((item) => (
                            <li key={item.code} role="option">
                                <button
                                    type="button"
                                    className={`nav-lang-option${currentLang === item.code ? " is-active" : ""}`}
                                    aria-selected={currentLang === item.code}
                                    onClick={() => handleLangChange(item.code)}
                                >
                                    <span
                                        className={`fi fi-${item.code} nav-lang-flag`}
                                        aria-hidden="true"
                                    />
                                    <span>{t(item.labelKey)}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <span className="nav-divider d-none d-md-block" />
                <a className="say-hi-btn" href="#contact">
                    <span className="say-hi-btn__ring" />
                    <span className="say-hi-btn__inner">
                        {t("header.sayHi")}
                        <span className="ms-1">↗</span>
                    </span>
                </a>
            </div>
        </nav>
    )
}
