"use client"

import { useRef } from "react"
import { useTranslation } from "react-i18next"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCE_ITEMS = [
    {
        id: "beSolution",
        index: "01",
        accent: "one",
    },
    {
        id: "freelancer",
        index: "02",
        accent: "two",
    },
    {
        id: "gic",
        index: "03",
        accent: "three",
        isCurrent: true,
    },
] as const

type ExplorationsSectionProps = {
    ready: boolean
}

export default function ExplorationsSection({ ready }: ExplorationsSectionProps) {
    const { t } = useTranslation()
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(
        () => {
            if (!ready) return

            const section = sectionRef.current
            if (!section) return

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches

            if (reducedMotion) return

            const cards = gsap.utils.toArray<HTMLElement>(
                section.querySelectorAll(".js-explore-card"),
            )

            const isMobile = window.matchMedia("(max-width: 767.98px)").matches

            cards.forEach((card, index) => {
                const featured = card.classList.contains("explore-card--featured")
                const tilt =
                    isMobile || featured ? 0 : index % 2 === 0 ? -2.5 : 2.5

                gsap.set(card, {
                    rotation: tilt,
                    transformOrigin: "center center",
                })

                gsap.from(card, {
                    opacity: 0,
                    y: isMobile ? 40 : 72,
                    scale: isMobile ? 1 : 0.94,
                    rotation: featured || isMobile ? 0 : tilt * 2,
                    duration: isMobile ? 0.75 : 1,
                    delay: index * 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        once: true,
                    },
                })

                if (!isMobile) {
                    gsap.to(card, {
                        y: featured ? -18 : -12,
                        rotation: tilt,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            scrub: 0.6,
                            start: "top bottom",
                            end: "bottom top",
                        },
                    })
                }
            })

            ScrollTrigger.refresh()
        },
        { scope: sectionRef, dependencies: [ready] },
    )

    return (
        <section
            className="explorations-section"
            id="explorations"
            ref={sectionRef}
            aria-labelledby="explorations-title"
        >
            <div className="explorations-header">
                <div className="container explorations-header__inner text-center">
                    <p className="section-meta">{t("explorations.meta")}</p>
                    <h2 className="section-title" id="explorations-title">
                        {t("explorations.title")}
                        <span className="font-display fst-italic">
                            {" "}
                            {t("explorations.titleAccent")}
                        </span>
                    </h2>
                    <p className="section-subtext explorations-header__subtext mx-auto">
                        {t("explorations.subtext")}
                    </p>
                </div>
            </div>

            <div className="container explorations-stack">
                {EXPERIENCE_ITEMS.map((item, position) => {
                    const details = t(
                        `explorations.items.${item.id}.details`,
                        { returnObjects: true },
                    ) as string[]

                    return (
                        <article
                            key={item.id}
                            className={`explore-card js-explore-card explore-card--${item.accent} explore-card--pos-${position}${'isCurrent' in item && item.isCurrent ? ' explore-card--featured' : ''}`}
                        >
                            <div
                                className="explore-card__glow"
                                aria-hidden="true"
                            />
                            <div className="explore-card__surface">
                                <div className="explore-card__visual">
                                    <div
                                        className="explore-card__noise"
                                        aria-hidden="true"
                                    />
                                    <span className="explore-card__index">
                                        {item.index}
                                    </span>
                                    <p className="explore-card__years font-display fst-italic text-nowrap">
                                        {t(
                                            `explorations.items.${item.id}.years`
                                        )}
                                    </p>
                                    <p className="explore-card__period text-nowrap">
                                        {t(
                                            `explorations.items.${item.id}.period`
                                        )}
                                    </p>
                                </div>
                                <div className="explore-card__body">
                                    <div className="explore-card__meta">
                                        <p className="explore-card__company">
                                            {t(
                                                `explorations.items.${item.id}.company`
                                            )}
                                        </p>
                                        {'isCurrent' in item &&
                                        item.isCurrent ? (
                                            <span className="explore-card__badge">
                                                {t('explorations.badgeNow')}
                                            </span>
                                        ) : null}
                                    </div>
                                    <h3 className="explore-card__role">
                                        {t(
                                            `explorations.items.${item.id}.role`
                                        )}
                                    </h3>
                                    <ul className="explore-card__details">
                                        {details.map((detail) => (
                                            <li key={detail}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
