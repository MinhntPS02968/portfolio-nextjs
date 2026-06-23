"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
    {
        role: "Inter PHP & Front-end",
        company: "BE Solution",
        period: "02/2017 — 09/2018",
        details: [
            "Design website interface using PHP, Yii Framework and Laravel",
            "Maintain and update websites periodically",
            "Survey, setup and standardize databases per client requirements",
        ],
        parallaxSpeed: 12,
    },
    {
        role: "Fresher Front-end",
        company: "Freelancer",
        period: "12/2018 — 07/2019",
        details: [
            "Design website interfaces based on client requirements",
            "Develop and maintain responsive web apps with HTML, CSS, JavaScript",
        ],
        parallaxSpeed: 16,
    },
    {
        role: "Frontend Developer",
        company: "G.I.C",
        period: "02/2020 — Present",
        details: [
            "Build interactive web interfaces with vanilla JS, Bootstrap and Tailwind CSS",
            "Leverage AI tools to debug and generate boilerplate, cutting dev time by 20%",
            "Collaborate with Product Owner and UI/UX Designer for intuitive user experience",
        ],
        parallaxSpeed: 18,
    },
]

type ExplorationsSectionProps = {
    ready: boolean
}

export default function ExplorationsSection({ ready }: ExplorationsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const pinRef = useRef<HTMLDivElement>(null)

    useGSAP(
        () => {
            if (!ready) return

            const section = sectionRef.current
            const pinTarget = pinRef.current
            if (!section || !pinTarget) return

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches

            if (reducedMotion) return

            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                pin: pinTarget,
                pinSpacing: false,
                invalidateOnRefresh: true,
                onEnter: () => {
                    gsap.set(pinTarget, { zIndex: 10 })
                },
                onEnterBack: () => {
                    gsap.set(pinTarget, { zIndex: 10 })
                },
                onRefresh: () => {
                    gsap.set(pinTarget, { zIndex: 10 })
                },
            })

            const cards = gsap.utils.toArray<HTMLElement>(
                section.querySelectorAll(".js-parallax-card"),
            )

            cards.forEach((card, index) => {
                const speed = Number(card.dataset.parallaxSpeed || 14)
                const rotation = index % 2 === 0 ? -2 : 2

                gsap.set(card, { rotation, force3D: true })

                gsap.to(card, {
                    yPercent: -speed,
                    rotation,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        scrub: true,
                        start: "top bottom",
                        end: "bottom top",
                        invalidateOnRefresh: true,
                    },
                })
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
        >
            <div className="explorations-pin" id="explorationsPin" ref={pinRef}>
                <div className="container text-center">
                    <p className="section-meta">Experience</p>
                    <h2 className="section-title">
                        Career
                        <span className="font-display fst-italic">
                            {" "}
                            journey
                        </span>
                    </h2>
                    <p className="section-subtext text-center mx-auto">
                        Where I&apos;ve been and what I&apos;ve built along the
                        way.
                    </p>
                </div>
            </div>
            <div className="explorations-layer">
                <div className="container">
                    <div className="explore-stack">
                        {EXPERIENCES.map((item) => (
                            <article
                                key={item.company}
                                className="explore-card js-parallax-card"
                                data-parallax-speed={item.parallaxSpeed}
                            >
                                <div className="explore-card__content">
                                    <h4 className="explore-card__role">
                                        {item.role}
                                    </h4>
                                    <p className="explore-card__company">
                                        {item.company}
                                    </p>
                                    <p className="explore-card__period">
                                        {item.period}
                                    </p>
                                    <ul className="explore-card__details">
                                        {item.details.map((detail) => (
                                            <li key={detail}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
