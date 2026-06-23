"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useLandingScrollAnimations(ready: boolean) {
    useEffect(() => {
        if (!ready) return

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches

        const ctx = gsap.context(() => {
            if (!reducedMotion) {
                gsap.timeline({
                    defaults: { ease: "power3.out" },
                    scrollTrigger: {
                        trigger: "#hero",
                        start: "top 78%",
                        once: true,
                    },
                })
                    .from(".name-reveal", {
                        opacity: 0,
                        y: 50,
                        duration: 1.2,
                        delay: 0.1,
                    })
                    .from(
                        ".blur-in",
                        {
                            opacity: 0,
                            filter: "blur(10px)",
                            y: 20,
                            duration: 1,
                            stagger: 0.1,
                            delay: 0.3,
                        },
                        "<",
                    )

                gsap.utils
                    .toArray<HTMLElement>(
                        ".js-inview, .work-card, .journal-item, .stat-card",
                    )
                    .forEach((card, index) => {
                        gsap.from(card, {
                            opacity: 0,
                            y: 30,
                            duration: 1,
                            delay: index * 0.04,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                            },
                        })
                    })

                const pinTarget = document.getElementById("explorationsPin")
                if (pinTarget) {
                    ScrollTrigger.create({
                        trigger: "#explorations",
                        start: "top top",
                        end: "bottom bottom",
                        pin: pinTarget,
                        pinSpacing: false,
                    })
                }

                gsap.utils
                    .toArray<HTMLElement>(".js-parallax-card")
                    .forEach((card) => {
                        const speed = Number(card.dataset.parallaxSpeed || 14)
                        gsap.to(card, {
                            yPercent: -speed,
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                scrub: true,
                                start: "top bottom",
                                end: "bottom top",
                            },
                        })
                    })

                const marqueeTrack = document.querySelector(".js-marquee-track")
                if (marqueeTrack) {
                    gsap.fromTo(
                        marqueeTrack,
                        { xPercent: 0 },
                        {
                            xPercent: -50,
                            repeat: -1,
                            duration: 40,
                            ease: "none",
                        },
                    )
                }
            }

            ScrollTrigger.refresh()
        })

        return () => ctx.revert()
    }, [ready])
}
