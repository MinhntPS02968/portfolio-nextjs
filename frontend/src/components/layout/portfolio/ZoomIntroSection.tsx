"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { assetPath } from "@/utils/assetPath"

gsap.registerPlugin(ScrollTrigger)

type ZoomIntroSectionProps = {
    ready: boolean
    onZoomActiveChange: (active: boolean) => void
}

export default function ZoomIntroSection({
    ready,
    onZoomActiveChange,
}: ZoomIntroSectionProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const mediaRef = useRef<HTMLImageElement>(null)

    useGSAP(
        () => {
            if (!ready) return

            const section = sectionRef.current
            const viewport = section?.querySelector("#zoomIntroViewport")
            const media = mediaRef.current
            const shade = section?.querySelector(".zoom-intro__shade")
            const glow = section?.querySelector(".zoom-intro__glow")
            const welcome = section?.querySelector(".zoom-intro__welcome")
            const eyebrow = section?.querySelector(".zoom-intro__eyebrow")
            const titleMain = section?.querySelector(".zoom-intro__title-main")
            const titleAccent = section?.querySelector(".zoom-intro__title-accent")
            const hint = section?.querySelector(".zoom-intro__hint")
            const hintDot = section?.querySelector(".zoom-intro__hint-dot")

            if (!section || !viewport || !media) return

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches

            if (reducedMotion) {
                section.classList.add("is-complete")
                onZoomActiveChange(false)
                return
            }

            onZoomActiveChange(true)

            const zoomOrigin = "50% 44%"
            const zoomScaleEnd = 14
            const introLines = [eyebrow, titleMain, titleAccent].filter(Boolean)
            const idleTweens: gsap.core.Tween[] = []
            let idleStopped = false

            const stopIdleMotion = () => {
                if (idleStopped) return
                idleStopped = true
                idleTweens.forEach((tween) => tween.kill())
            }

            gsap.set(media, {
                scale: 1.06,
                yPercent: 0,
                transformOrigin: zoomOrigin,
                force3D: true,
            })
            if (shade) gsap.set(shade, { opacity: 0 })
            if (introLines.length) {
                gsap.set(introLines, { opacity: 0, y: 28, filter: "blur(10px)" })
            }
            if (hint) gsap.set(hint, { opacity: 0, y: 16 })
            if (glow) gsap.set(glow, { opacity: 0 })

            const refreshZoom = () => ScrollTrigger.refresh()
            if (media.complete) {
                refreshZoom()
            } else {
                media.addEventListener("load", refreshZoom, { once: true })
            }

            const enterTl = gsap.timeline({ delay: 0.15 })
            if (glow) {
                enterTl.to(
                    glow,
                    { opacity: 0.4, duration: 1.4, ease: "power2.out" },
                    0,
                )
            }
            enterTl.to(media, { scale: 1, duration: 2, ease: "power2.out" }, 0)
            if (eyebrow) {
                enterTl.to(
                    eyebrow,
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.85,
                        ease: "power3.out",
                    },
                    0.2,
                )
            }
            if (titleMain) {
                enterTl.to(
                    titleMain,
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.55",
                )
            }
            if (titleAccent) {
                enterTl.to(
                    titleAccent,
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1.05,
                        ease: "power3.out",
                    },
                    "-=0.72",
                )
            }
            if (hint) {
                enterTl.to(
                    hint,
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.5",
                )
            }

            enterTl.call(() => {
                if (titleMain) {
                    idleTweens.push(
                        gsap.fromTo(
                            titleMain,
                            {
                                color: "#b8e4ff",
                                textShadow:
                                    "0 0 2px #fff, 0 0 6px #93c5fd, 0 0 14px #3b82f6, 0 0 28px #2563eb, 0 0 42px rgba(37, 99, 235, 0.65)",
                            },
                            {
                                color: "#ffd6f0",
                                textShadow:
                                    "0 0 2px #fff, 0 0 6px #f9a8d4, 0 0 14px #f472b6, 0 0 28px #ec4899, 0 0 42px rgba(219, 39, 119, 0.65)",
                                duration: 2.4,
                                yoyo: true,
                                repeat: -1,
                                ease: "sine.inOut",
                            },
                        ),
                    )
                }
                if (titleAccent) {
                    idleTweens.push(
                        gsap.fromTo(
                            titleAccent,
                            { scale: 1 },
                            {
                                scale: 1.03,
                                duration: 2.2,
                                yoyo: true,
                                repeat: -1,
                                ease: "sine.inOut",
                            },
                        ),
                    )
                }
                if (welcome) {
                    idleTweens.push(
                        gsap.to(welcome, {
                            y: 8,
                            duration: 2.6,
                            yoyo: true,
                            repeat: -1,
                            ease: "sine.inOut",
                        }),
                    )
                }
                if (glow) {
                    idleTweens.push(
                        gsap.to(glow, {
                            opacity: 0.58,
                            duration: 2.8,
                            yoyo: true,
                            repeat: -1,
                            ease: "sine.inOut",
                        }),
                    )
                }
                if (hintDot) {
                    idleTweens.push(
                        gsap.fromTo(
                            hintDot,
                            { yPercent: -100 },
                            {
                                yPercent: 200,
                                duration: 1.5,
                                repeat: -1,
                                ease: "none",
                            },
                        ),
                    )
                }
                if (eyebrow) {
                    idleTweens.push(
                        gsap.fromTo(
                            eyebrow,
                            { letterSpacing: "0.3em" },
                            {
                                letterSpacing: "0.38em",
                                duration: 2.4,
                                yoyo: true,
                                repeat: -1,
                                ease: "sine.inOut",
                            },
                        ),
                    )
                }
            })

            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    pin: viewport,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (self.progress > 0.02) stopIdleMotion()
                    },
                },
            })

            scrollTl
                .to(
                    media,
                    { scale: zoomScaleEnd, ease: "none", duration: 1 },
                    0,
                )
                .to(media, { yPercent: -8, ease: "none", duration: 1 }, 0)

            if (shade) {
                scrollTl.to(shade, { opacity: 1, ease: "none", duration: 0.35 }, 0.65)
            }

            if (glow) {
                scrollTl.to(
                    glow,
                    { opacity: 0, ease: "none", duration: 0.25 },
                    0.12,
                )
            }
            if (welcome) {
                scrollTl.to(
                    welcome,
                    {
                        opacity: 0,
                        y: -48,
                        scale: 0.94,
                        filter: "blur(8px)",
                        ease: "none",
                        duration: 0.42,
                    },
                    0.28,
                )
            }
            if (hint) {
                scrollTl.to(
                    hint,
                    { opacity: 0, y: 24, ease: "none", duration: 0.3 },
                    0.4,
                )
            }

            ScrollTrigger.create({
                trigger: section,
                start: "bottom top+=1",
                onEnter: () => {
                    stopIdleMotion()
                    onZoomActiveChange(false)
                    section.classList.add("is-complete")
                },
                onLeaveBack: () => {
                    onZoomActiveChange(true)
                    section.classList.remove("is-complete")
                },
            })
        },
        { scope: sectionRef, dependencies: [ready, onZoomActiveChange] },
    )

    useEffect(() => {
        return () => onZoomActiveChange(false)
    }, [onZoomActiveChange])

    return (
        <section
            className="zoom-intro"
            id="zoomIntro"
            aria-label="Intro zoom"
            ref={sectionRef}
        >
            <div className="zoom-intro__viewport" id="zoomIntroViewport">
                <img
                    ref={mediaRef}
                    className="zoom-intro__media"
                    src={assetPath("/images/landing/bg-img.png")}
                    alt=""
                    decoding="async"
                    fetchPriority="high"
                />
                <div className="zoom-intro__glow" aria-hidden="true" />
                <div className="zoom-intro__shade" aria-hidden="true" />
                <header className="zoom-intro__welcome">
                    <p className="zoom-intro__eyebrow">Portfolio</p>
                    <h1 className="zoom-intro__title">
                        <span className="zoom-intro__title-main">
                            Welcome to{" "}
                        </span>
                        <span className="zoom-intro__title-accent">
                            my portfolio
                        </span>
                    </h1>
                </header>
                <div className="zoom-intro__hint">
                    <p className="zoom-intro__hint-label">SCROLL</p>
                    <span className="zoom-intro__hint-track">
                        <span className="zoom-intro__hint-dot" />
                    </span>
                </div>
            </div>
        </section>
    )
}
