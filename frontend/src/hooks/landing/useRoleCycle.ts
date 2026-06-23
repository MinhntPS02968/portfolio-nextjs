"use client"

import { useEffect, useRef, type RefObject } from "react"

export function useRoleCycle(
    elementRef: RefObject<HTMLElement | null>,
    roles: string[],
    intervalMs = 2000,
) {
    const indexRef = useRef(0)

    useEffect(() => {
        const element = elementRef.current
        if (!element || roles.length === 0) return

        const tick = () => {
            indexRef.current = (indexRef.current + 1) % roles.length
            element.textContent = roles[indexRef.current]
            element.style.animation = "none"
            element.offsetHeight
            element.style.animation = ""
        }

        const timer = window.setInterval(tick, intervalMs)
        return () => window.clearInterval(timer)
    }, [elementRef, roles, intervalMs])
}
