"use client"

import { useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import { MUX_STREAM_URL } from "@/constants/landing"
import { useHlsVideo } from "@/hooks/landing/useHlsVideo"

export default function ContactSection() {
    const { t } = useTranslation()
    const videoRef = useRef<HTMLVideoElement>(null)
    const marqueeItems = useMemo(
        () => t("contact.marquee", { returnObjects: true }) as string[],
        [t],
    )

    useHlsVideo(videoRef, MUX_STREAM_URL)

    return (
        <section className="contact-section" id="contact">
            <video
                ref={videoRef}
                id="footerVideo"
                className="contact-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
            />
            <div className="contact-overlay" />
            <div className="marquee-wrap">
                <div className="marquee-track js-marquee-track">
                    {[...marqueeItems, ...marqueeItems].map((item, index) => (
                        <span key={`${item}-${index}`}>{item}</span>
                    ))}
                </div>
            </div>
            <div className="container contact-inner text-center">
                <a
                    className="contact-cta btn rounded-pill"
                    href="mailto:minhnguyen942611@gmail.com"
                >
                    minhnguyen942611@gmail.com
                </a>
                <div className="footer-bar d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div className="footer-links d-inline-flex flex-wrap gap-3">
                        <a
                            href="https://github.com/minhntps02968"
                            target="_blank"
                        >
                            <i className="fa-brands fa-github" />
                            <span className="ms-2">{t("contact.github")}</span>
                        </a>
                    </div>
                    <div className="footer-status d-inline-flex align-items-center">
                        <span className="footer-status__dot" />
                        <span>{t("contact.available")}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
