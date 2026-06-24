"use client"

import { useRef } from "react"
import { MUX_STREAM_URL } from "@/constants/landing"
import { useHlsVideo } from "@/hooks/landing/useHlsVideo"

const MARQUEE_ITEMS = [
    "FRONTEND DEVELOPER •",
    "REACT & NEXT.JS •",
    "RESPONSIVE WEB •",
    "CLEAN UI •",
    "AI-NATIVE WORKFLOW •",
    "BOOTSTRAP & TAILWIND •",
]

export default function ContactSection() {
    const videoRef = useRef<HTMLVideoElement>(null)

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
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
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
                        {/* <a href="#">LinkedIn</a> */}
                        <a
                            href="https://github.com/minhntps02968"
                            target="_blank"
                        >
                            <i className="fa-brands fa-github" />
                            <span className="ms-2">GitHub</span>
                        </a>
                    </div>
                    <div className="footer-status d-inline-flex align-items-center">
                        <span className="footer-status__dot" />
                        <span>Available for projects</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
