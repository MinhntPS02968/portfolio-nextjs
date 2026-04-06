import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Debug: Kiểm tra xem các phần tử có tồn tại không
        const techCards = gsap.utils.toArray('.pf-tech-card');
        console.log('GSAP Hero Init - Tech Cards found:', techCards.length);

        // Thiết lập trạng thái ẩn ban đầu một cách tường minh
        gsap.set(['.pf-hero__availability', '.pf-hero__headline', '.pf-hero__lead', '.pf-btn', '.pf-tech-card', '.pf-hero__circle'], { 
            autoAlpha: 0, 
            y: 30 
        });
        gsap.set('.pf-hero__circle', { scale: 0, y: 0 });

        const tl = gsap.timeline({ 
            delay: 0.8, // Chờ lâu hơn một chút để chắc chắn mọi thứ đã render
            onStart: () => console.log('Hero animation timeline started'),
            onComplete: () => {
                console.log('Hero animation completed');
                // Force hiển thị lại nếu có lỗi
                gsap.set('.pf-tech-card', { autoAlpha: 1, visibility: 'visible' });
            }
        });

        tl.to('.pf-hero__availability', {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
        .to('.pf-hero__headline', {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.pf-hero__lead', {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.7')
        .to('.pf-btn', {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.5')
        .add(() => {
            // Force hiện tech-cards ngay lập tức để debug
            console.log('GSAP Debug: Forcing tech cards visibility');
            gsap.set('.pf-tech-card', { autoAlpha: 1, y: 0, visibility: 'visible' });
        }, '-=0.4')
        .to('.pf-hero__circle', {
            autoAlpha: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.75)'
        }, '-=1');

    }, { scope: container });

    return (
        <section className="pf-hero" id="hero" ref={container}>
            <div className="pf-hero__bg">
                <div className="pf-hero__glow position-absolute top-50 start-50 translate-middle"></div>
                <div className="pf-hero__circles position-absolute w-100 h-100 d-flex align-items-center justify-content-center top-0 start-0">
                    <div className="pf-hero__circle pf-hero__circle--1 rounded-circle d-flex align-items-center justify-content-center">
                        <div className="pf-hero__circle pf-hero__circle--2 rounded-circle d-flex align-items-center justify-content-center">
                            <div className="pf-hero__circle pf-hero__circle--3 rounded-circle"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pf-hero__decoration position-absolute top-0 end-0 w-100 h-100 pe-none opacity-50">
                <img className="w-100 h-100 object-fit-cover" 
                     style={{ mixBlendMode: 'screen', objectPosition: 'right center' }} 
                     src="/images/portfolio/hero-bg.jpg" 
                     alt="Decoration" />
            </div>
            
            <div className="container pf-hero__container position-relative z-1 pt-5 pb-5 mt-5">
                <div className="row align-items-center gy-5">
                    <div className="col-lg-7 d-flex flex-column gap-4">
                        <div className="pf-hero__availability d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1">
                            <span className="pf-hero__dot rounded-circle"></span>
                            <span className="pf-hero__availability-text text-uppercase">Available for High-Impact Projects</span>
                        </div>
                        <h1 className="pf-hero__headline fw-bold">
                            Senior Frontend Expert. <br/>
                            <span className="pf-hero__highlight">5 Years of Crafting Impeccable User Interfaces.</span>
                        </h1>
                        <p className="pf-hero__lead">
                            Specializing in sophisticated HTML/SCSS architectures, high-performance JavaScript, and modern Next.js applications. Precision engineered code for digital excellence.
                        </p>
                        <div className="d-flex flex-wrap gap-3 mt-2">
                            <button className="pf-btn pf-btn--primary d-flex align-items-center gap-2 px-4 py-3 rounded-3 text-uppercase fw-bold">
                                Explore Projects
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <button className="pf-btn pf-btn--glass d-flex align-items-center gap-2 px-4 py-3 rounded-3 text-uppercase fw-bold">
                                Download Resume
                                <span className="material-symbols-outlined">download</span>
                            </button>
                        </div>
                    </div>
                    
                    <div className="col-lg-5">
                        <div className="row g-3">
                            <div className="col-6">
                                <div className="pf-tech-card rounded-3 p-4">
                                    <div className="pf-tech-card__icon text-primary mb-3">
                                        <span className="material-symbols-outlined fs-2">html</span>
                                    </div>
                                    <h3 className="pf-tech-card__title fw-bold m-0 pb-1">HTML5</h3>
                                    <p className="pf-tech-card__subtitle text-uppercase m-0">Semantic Architecture</p>
                                </div>
                            </div>
                            <div className="col-6 mt-5">
                                <div className="pf-tech-card rounded-3 p-4">
                                    <div className="pf-tech-card__icon text-secondary mb-3">
                                        <span className="material-symbols-outlined fs-2">grid_view</span>
                                    </div>
                                    <h3 className="pf-tech-card__title fw-bold m-0 pb-1">Next.js</h3>
                                    <p className="pf-tech-card__subtitle text-uppercase m-0">SSR & Scalability</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="pf-tech-card rounded-3 p-4">
                                    <div className="pf-tech-card__icon text-primary mb-3">
                                        <span className="material-symbols-outlined fs-2">palette</span>
                                    </div>
                                    <h3 className="pf-tech-card__title fw-bold m-0 pb-1">SCSS</h3>
                                    <p className="pf-tech-card__subtitle text-uppercase m-0">Design Systems</p>
                                </div>
                            </div>
                            <div className="col-6 mt-5">
                                <div className="pf-tech-card rounded-3 p-4">
                                    <div className="pf-tech-card__icon text-info mb-3">
                                        <span className="material-symbols-outlined fs-2">javascript</span>
                                    </div>
                                    <h3 className="pf-tech-card__title fw-bold m-0 pb-1">JavaScript</h3>
                                    <p className="pf-tech-card__subtitle text-uppercase m-0">Logic & Performance</p>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div className="pf-tech-card pf-tech-card--wide rounded-3 p-4 d-flex align-items-center justify-content-between">
                                    <div>
                                        <h3 className="pf-tech-card__title fw-bold m-0 pb-1">Headless APIs</h3>
                                        <p className="pf-tech-card__subtitle text-uppercase m-0">Data Orchestration</p>
                                    </div>
                                    <div className="d-flex pf-tech-card__avatars">
                                        <div className="pf-tech-card__avatar d-flex align-items-center justify-content-center rounded-circle border border-2 border-dark">
                                            <span className="material-symbols-outlined text-primary fs-6">api</span>
                                        </div>
                                        <div className="pf-tech-card__avatar d-flex align-items-center justify-content-center rounded-circle border border-2 border-dark ms-n2 position-relative">
                                            <span className="material-symbols-outlined text-secondary fs-6">cloud</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
