"use client";

import { useEffect, useRef } from "react";

export default function StreakCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w: number, h: number;
        let animationFrameId: number;

        function resize() {
            if (!canvas) return;
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        }

        window.addEventListener("resize", resize);
        resize();

        /* ===== LIGHT STREAK ===== */
        class Streak {
            x: number = 0;
            y: number = 0;
            len: number = 0;
            speed: number = 0;
            width: number = 0;
            alpha: number = 0;

            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * w;
                this.y = h + Math.random() * h;
                this.len = Math.random() * 200 + 120;
                this.speed = Math.random() * 2 + 1.5;
                this.width = Math.random() * 2 + 0.5;
                this.alpha = Math.random() * 0.4 + 0.2;
            }

            update() {
                this.y -= this.speed;
                if (this.y + this.len < 0) {
                    this.reset();
                }
            }

            draw() {
                if (!ctx) return;
                const grad = ctx.createLinearGradient(
                    this.x,
                    this.y,
                    this.x,
                    this.y + this.len
                );
                grad.addColorStop(0, "rgba(255,215,120,0)");
                grad.addColorStop(0.4, `rgba(255,215,120,${this.alpha})`);
                grad.addColorStop(1, "rgba(255,215,120,0)");

                ctx.strokeStyle = grad;
                ctx.lineWidth = this.width;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.len);
                ctx.stroke();
            }
        }

        const streaks: Streak[] = [];
        const COUNT = typeof window !== "undefined" && window.innerWidth < 768 ? 25 : 50;
        for (let i = 0; i < COUNT; i++) streaks.push(new Streak());

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, w, h);
            ctx.globalCompositeOperation = "lighter";

            streaks.forEach((s) => {
                s.update();
                s.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="streak-canvas" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}
