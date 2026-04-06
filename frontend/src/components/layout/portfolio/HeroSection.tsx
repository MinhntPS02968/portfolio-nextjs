import React from 'react';

export default function HeroSection() {
    return (
        <section className="pf-hero" id="hero">
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
