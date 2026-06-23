"use client"

import { useRef } from "react"
import { HERO_ROLES, MUX_STREAM_URL } from "@/constants/landing"
import { useHlsVideo } from "@/hooks/landing/useHlsVideo"
import { useRoleCycle } from "@/hooks/landing/useRoleCycle"

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const roleRef = useRef<HTMLSpanElement>(null)

    useHlsVideo(videoRef, MUX_STREAM_URL)
    useRoleCycle(roleRef, HERO_ROLES)

    return (
        <section className="hero-section" id="hero">
            <video
                ref={videoRef}
                id="heroVideo"
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            />
            <div className="hero-overlay" />
            <div className="hero-bottom-fade" />
            <div className="container hero-content d-flex flex-column justify-content-center">
                <div className="row">
                    <div className="col-12 col-lg-10 mx-auto text-center">
                        <p className="hero-eyebrow blur-in text-uppercase mb-4">
                            PORTFOLIO
                        </p>
                        <h1 className="hero-title name-reveal mb-3">
                            Nguyen Thach Minh
                        </h1>
                        <p className="hero-role blur-in mb-3">
                            A{" "}
                            <span
                                ref={roleRef}
                                id="heroRole"
                                className="hero-role__value"
                            >
                                Frontend Developer
                            </span>{" "}
                            based in Ho Chi Minh City.
                        </p>
                        <p className="hero-subtitle blur-in mb-5 mx-auto">
                            Crafting responsive, performant web experiences with
                            clean UI and modern tooling — from Bootstrap to
                            React, powered by AI-driven workflows.
                        </p>
                        <div className="hero-actions blur-in d-inline-flex flex-wrap gap-3">
                            <a
                                className="hero-btn hero-btn--solid btn rounded-pill"
                                href="#works"
                            >
                                See Works
                            </a>
                            <a
                                className="hero-btn hero-btn--outline btn rounded-pill"
                                href="#contact"
                            >
                                Reach out...
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <p>SCROLL</p>
                <span className="scroll-indicator__line">
                    <span className="scroll-indicator__dot" />
                </span>
            </div>
        </section>
    )
}
