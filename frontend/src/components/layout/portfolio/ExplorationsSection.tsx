"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

type Experience = {
    role: string
    company: string
    period: string
    years: string
    index: string
    accent: string
    isCurrent?: boolean
    details: string[]
}

const EXPERIENCES: Experience[] = [
    {
        role: "Inter PHP & Front-end",
        company: "BE Solution",
        period: "02/2017 — 09/2018",
        years: "2017–18",
        index: "01",
        accent: "one",
        details: [
            "Design website interface using PHP, Yii Framework and Laravel",
            "Maintain and update websites periodically",
            "Survey, setup and standardize databases per client requirements",
        ],
    },
    {
        role: "Fresher Front-end",
        company: "Freelancer",
        period: "12/2018 — 07/2019",
        years: "2018–19",
        index: "02",
        accent: "two",
        details: [
            "Design website interfaces based on client requirements",
            "Develop and maintain responsive web apps with HTML, CSS, JavaScript",
        ],
    },
    {
        role: "Frontend Developer",
        company: "G.I.C",
        period: "02/2020 — Present",
        years: "2020—",
        index: "03",
        accent: "three",
        isCurrent: true,
        details: [
            "Build interactive web interfaces with vanilla JS, Bootstrap and Tailwind CSS",
            "Leverage AI tools to debug and generate boilerplate, cutting dev time by 20%",
            "Collaborate with Product Owner and UI/UX Designer for intuitive user experience",
        ],
    },
]

type ExplorationsSectionProps = {
    ready: boolean
}

export default function ExplorationsSection({ ready }: ExplorationsSectionProps) {
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
                    <p className="section-meta">Experience</p>
                    <h2 className="section-title" id="explorations-title">
                        Career
                        <span className="font-display fst-italic">
                            {" "}
                            journey
                        </span>
                    </h2>
                    <p className="section-subtext explorations-header__subtext mx-auto">
                        Where I&apos;ve been and what I&apos;ve built along the
                        way.
                    </p>
                </div>
            </div>

            <div className="container explorations-stack">
                {EXPERIENCES.map((item, position) => (
                    <article
                        key={item.company}
                        className={`explore-card js-explore-card explore-card--${item.accent} explore-card--pos-${position}${item.isCurrent ? " explore-card--featured" : ""}`}
                    >
                        <div className="explore-card__glow" aria-hidden="true" />
                        <div className="explore-card__surface">
                            <div className="explore-card__visual">
                                <div
                                    className="explore-card__noise"
                                    aria-hidden="true"
                                />
                                <span className="explore-card__index">
                                    {item.index}
                                </span>
                                <p className="explore-card__years font-display fst-italic">
                                    {item.years}
                                </p>
                                <p className="explore-card__period">
                                    {item.period}
                                </p>
                            </div>
                            <div className="explore-card__body">
                                <div className="explore-card__meta">
                                    <p className="explore-card__company">
                                        {item.company}
                                    </p>
                                    {item.isCurrent ? (
                                        <span className="explore-card__badge">
                                            Now
                                        </span>
                                    ) : null}
                                </div>
                                <h3 className="explore-card__role">
                                    {item.role}
                                </h3>
                                <ul className="explore-card__details">
                                    {item.details.map((detail) => (
                                        <li key={detail}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
