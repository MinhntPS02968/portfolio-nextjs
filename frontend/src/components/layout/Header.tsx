"use client"

import { useEffect, useRef, useState } from "react"

const NAV_ITEMS = [
    { href: "#hero", label: "Home" },
    { href: "#works", label: "Work" },
    { href: "#stats", label: "Resume" },
]

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeHref, setActiveHref] = useState("#hero")
    const navFrameRef = useRef<HTMLDivElement>(null)

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
                            {item.label}
                        </a>
                    ))}
                </div>
                <span className="nav-divider d-none d-md-block" />
                <a className="say-hi-btn" href="#contact">
                    <span className="say-hi-btn__ring" />
                    <span className="say-hi-btn__inner">
                        Say hi
                        <span className="ms-1">↗</span>
                    </span>
                </a>
            </div>
        </nav>
    )
}
