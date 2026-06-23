"use client"

import { useEffect, useRef, useState } from "react"
import {
    LOADER_DURATION_MS,
    LOADING_WORDS,
} from "@/constants/landing"

type LoadingScreenProps = {
    onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [visible, setVisible] = useState(true)
    const [count, setCount] = useState("000")
    const [word, setWord] = useState("Frontend")
    const barRef = useRef<HTMLSpanElement>(null)
    const wordRef = useRef<HTMLParagraphElement>(null)
    const completedRef = useRef(false)

    useEffect(() => {
        const start = performance.now()
        let wordIndex = 0
        let lastWordTick = 0
        let frameId = 0

        const update = (time: number) => {
            const progress = Math.min((time - start) / LOADER_DURATION_MS, 1)
            const current = Math.round(progress * 100)

            setCount(String(current).padStart(3, "0"))

            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${current / 100})`
            }

            if (time - lastWordTick > 900) {
                wordIndex = (wordIndex + 1) % LOADING_WORDS.length
                setWord(LOADING_WORDS[wordIndex])
                if (wordRef.current) {
                    wordRef.current.style.animation = "none"
                    wordRef.current.offsetHeight
                    wordRef.current.style.animation = ""
                }
                lastWordTick = time
            }

            if (progress < 1) {
                frameId = requestAnimationFrame(update)
                return
            }

            if (!completedRef.current) {
                completedRef.current = true
                setVisible(false)
                window.setTimeout(() => {
                    onComplete()
                }, 400)
            }
        }

        frameId = requestAnimationFrame(update)
        return () => cancelAnimationFrame(frameId)
    }, [onComplete])

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
            <p className="loading-screen__label">Thach Minh</p>
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
