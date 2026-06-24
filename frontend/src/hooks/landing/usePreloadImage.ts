"use client"

import { useEffect, useState } from "react"

export function usePreloadImage(src: string) {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if (!src) return

        const img = new Image()
        img.decoding = "async"

        const markReady = () => setReady(true)

        img.addEventListener("load", markReady, { once: true })
        img.addEventListener("error", markReady, { once: true })
        img.src = src

        if (img.complete) {
            markReady()
        }

        return () => {
            img.removeEventListener("load", markReady)
            img.removeEventListener("error", markReady)
        }
    }, [src])

    return ready
}
