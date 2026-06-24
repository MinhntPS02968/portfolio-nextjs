"use client"

import { useEffect, useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { MUX_STREAM_URL } from "@/constants/landing"
import { useHlsVideo } from "@/hooks/landing/useHlsVideo"
import { useRoleCycle } from "@/hooks/landing/useRoleCycle"

export default function HeroSection() {
    const { t } = useTranslation()
    const videoRef = useRef<HTMLVideoElement>(null)
    const roleRef = useRef<HTMLSpanElement>(null)
    const heroRoles = useMemo(
        () => t("hero.roles", { returnObjects: true }) as string[],
        [t],
    )

    useHlsVideo(videoRef, MUX_STREAM_URL)
    useRoleCycle(roleRef, heroRoles)

    useEffect(() => {
        if (roleRef.current) {
            roleRef.current.textContent = t("hero.roleDefault")
        }
    }, [t])

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
                            {t("hero.eyebrow")}
                        </p>
                        <h1 className="hero-title name-reveal mb-3">
                            {t("hero.name")}
                        </h1>
                        <p className="hero-role blur-in mb-3">
                            {t("hero.rolePrefix")}{" "}
                            <span
                                ref={roleRef}
                                id="heroRole"
                                className="hero-role__value"
                            >
                                {t("hero.roleDefault")}
                            </span>{" "}
                            {t("hero.roleSuffix")}
                        </p>
                        <p className="hero-subtitle blur-in mb-5 mx-auto">
                            {t("hero.subtitle")}
                        </p>
                        <div className="hero-actions blur-in d-inline-flex flex-wrap gap-3">
                            <a
                                className="hero-btn hero-btn--solid btn rounded-pill"
                                href="#works"
                            >
                                {t("hero.ctaWorks")}
                            </a>
                            <a
                                className="hero-btn hero-btn--outline btn rounded-pill"
                                href="#contact"
                            >
                                {t("hero.ctaContact")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-indicator">
                <p>{t("hero.scroll")}</p>
                <span className="scroll-indicator__line">
                    <span className="scroll-indicator__dot" />
                </span>
            </div>
        </section>
    )
}
