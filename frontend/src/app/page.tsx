"use client"

import { useCallback, useState } from "react"
import Header from "@/components/layout/Header"
import LoadingScreen from "@/components/layout/portfolio/LoadingScreen"
import ZoomIntroSection from "@/components/layout/portfolio/ZoomIntroSection"
import HeroSection from "@/components/layout/portfolio/HeroSection"
import WorksSection from "@/components/layout/portfolio/WorksSection"
import JournalSection from "@/components/layout/portfolio/JournalSection"
import ExplorationsSection from "@/components/layout/portfolio/ExplorationsSection"
import StatsSection from "@/components/layout/portfolio/StatsSection"
import ContactSection from "@/components/layout/portfolio/ContactSection"
import { useLandingScrollAnimations } from "@/hooks/landing/useLandingScrollAnimations"

type LandingPhase = "loading" | "zoom" | "main"

export default function HomePage() {
    const [landingPhase, setLandingPhase] = useState<LandingPhase>("loading")

    const handleLoaderComplete = useCallback(() => {
        setLandingPhase("zoom")
    }, [])

    const handleZoomActiveChange = useCallback((active: boolean) => {
        setLandingPhase(active ? "zoom" : "main")
    }, [])

    useLandingScrollAnimations(landingPhase !== "loading")

    return (
        <div
            className={`portfolio-landing ${landingPhase === "zoom" ? "is-zoom-active" : ""}`}
        >
            <LoadingScreen onComplete={handleLoaderComplete} />
            <ZoomIntroSection
                ready={landingPhase !== "loading"}
                onZoomActiveChange={handleZoomActiveChange}
            />
            <Header />
            <HeroSection />
            <WorksSection />
            <JournalSection />
            <ExplorationsSection ready={landingPhase !== "loading"} />
            <StatsSection />
            <ContactSection />
        </div>
    )
}
