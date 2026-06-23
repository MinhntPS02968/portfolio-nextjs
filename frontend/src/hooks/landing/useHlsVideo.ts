"use client"

import { useEffect, type RefObject } from "react"

export function useHlsVideo(
    videoRef: RefObject<HTMLVideoElement | null>,
    src: string,
) {
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        let hls: import("hls.js").default | null = null
        let cancelled = false

        const init = async () => {
            const { default: Hls } = await import("hls.js")
            if (cancelled) return

            if (Hls.isSupported()) {
                hls = new Hls()
                hls.loadSource(src)
                hls.attachMedia(video)
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch(() => {})
                })
                return
            }

            if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = src
                video.addEventListener(
                    "loadedmetadata",
                    () => {
                        video.play().catch(() => {})
                    },
                    { once: true },
                )
            }
        }

        init()

        return () => {
            cancelled = true
            hls?.destroy()
        }
    }, [src, videoRef])
}
