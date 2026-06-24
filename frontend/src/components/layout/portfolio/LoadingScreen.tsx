"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
    LOADER_DURATION_MS,
    ZOOM_INTRO_BG_IMAGE,
} from "@/constants/landing"
import { usePreloadImage } from "@/hooks/landing/usePreloadImage"
import { assetPath } from "@/utils/assetPath"

type LoadingScreenProps = {
    onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const { t } = useTranslation()
    const loadingWords = t("loading.words", { returnObjects: true }) as string[]
    const loadingWordsRef = useRef(loadingWords)
    const [visible, setVisible] = useState(true)
    const [count, setCount] = useState("000")
    const [word, setWord] = useState(loadingWords[0] ?? "")
    const [timerDone, setTimerDone] = useState(false)
    const barRef = useRef<HTMLSpanElement>(null)
    const wordRef = useRef<HTMLParagraphElement>(null)
    const completedRef = useRef(false)
    const zoomBgReadyRef = useRef(false)
    const zoomBgReady = usePreloadImage(assetPath(ZOOM_INTRO_BG_IMAGE))

    useEffect(() => {
        zoomBgReadyRef.current = zoomBgReady
    }, [zoomBgReady])

    useEffect(() => {
        loadingWordsRef.current = loadingWords
        setWord(loadingWords[0] ?? "")
    }, [loadingWords])

    useEffect(() => {
        const start = performance.now()
        let wordIndex = 0
        let lastWordTick = 0
        let frameId = 0

        const update = (time: number) => {
            const timerProgress = Math.min((time - start) / LOADER_DURATION_MS, 1)
            const rawPercent = Math.round(timerProgress * 100)
            const current = zoomBgReadyRef.current
                ? rawPercent
                : Math.min(rawPercent, 99)

            setCount(String(current).padStart(3, "0"))

            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${current / 100})`
            }

            if (time - lastWordTick > 900) {
                const words = loadingWordsRef.current
                if (words.length > 0) {
                    wordIndex = (wordIndex + 1) % words.length
                    setWord(words[wordIndex])
                }
                if (wordRef.current) {
                    wordRef.current.style.animation = "none"
                    wordRef.current.offsetHeight
                    wordRef.current.style.animation = ""
                }
                lastWordTick = time
            }

            if (timerProgress < 1) {
                frameId = requestAnimationFrame(update)
                return
            }

            setTimerDone(true)
        }

        frameId = requestAnimationFrame(update)
        return () => cancelAnimationFrame(frameId)
    }, [])

    useEffect(() => {
        if (!zoomBgReady || !timerDone) return

        setCount("100")
        if (barRef.current) {
            barRef.current.style.transform = "scaleX(1)"
        }
    }, [zoomBgReady, timerDone])

    useEffect(() => {
        if (!timerDone || !zoomBgReady || completedRef.current) return

        completedRef.current = true
        setVisible(false)
        const timeoutId = window.setTimeout(() => {
            onComplete()
        }, 400)

        return () => window.clearTimeout(timeoutId)
    }, [timerDone, zoomBgReady, onComplete])

    if (!visible) {
        return null
    }

    return (
        <div
            className="loading-screen"
            id="loadingScreen"
            style={{
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "auto" : "none",
                transition: "opacity 0.4s ease",
            }}
        >
            <p className="loading-screen__label">{t("loading.name")}</p>
            <div className="loading-screen__word-wrap">
                <p
                    className="loading-screen__word"
                    id="loadingWord"
                    ref={wordRef}
                >
                    {word}
                </p>
            </div>
            <p className="loading-screen__count" id="loadingCount">
                {count}
            </p>
            <div className="loading-screen__track">
                <span className="loading-screen__bar" id="loadingBar" ref={barRef} />
            </div>
        </div>
    )
}
