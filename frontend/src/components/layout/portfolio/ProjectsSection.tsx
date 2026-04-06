import React from 'react';

export default function ProjectsSection() {
    return (
        <section className="pf-projects container py-5" id="projects">
            <header className="pf-projects__header mb-5 pb-3 max-w-3xl">
                <h2 className="pf-projects__headline fw-bold mb-3 display-4">Selected Works & Experiments</h2>
                <p className="pf-projects__lead text-secondary fs-5 lh-lg max-w-2xl">
                    A collection of projects showcasing advanced UI development, API integrations, and seamless user experiences.
                </p>
            </header>

            <div className="row g-4 pf-projects__grid">
                <div className="col-md-6">
                    <article className="pf-project-card position-relative overflow-hidden rounded-pill-custom bg-dark border border-secondary border-opacity-25 h-100">
                        <div className="pf-project-card__bg position-absolute top-0 start-0 w-100 h-100">
                            <img src="/images/portfolio/project-1.jpg" alt="E-commerce Engine" className="w-100 h-100 object-fit-cover pf-project-card__img" />
                            <div className="position-absolute bottom-0 start-0 w-100 h-100 bg-gradient-dark-up opacity-75"></div>
                        </div>
                        <div className="pf-project-card__overlay position-absolute bottom-0 start-0 p-5 d-flex flex-column justify-content-end w-100 h-100 pf-glass-blur opacity-0" style={{ transform: 'translateY(20px)', transition: 'all 0.4s ease' }}>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-primary rounded-circle" style={{ width: '6px', height: '6px' }}></span> Next.js
                                </span>
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-primary rounded-circle" style={{ width: '6px', height: '6px' }}></span> REST APIs
                                </span>
                            </div>
                            <h3 className="pf-project-card__title fw-bold text-white fs-2 mb-3">E-commerce Engine</h3>
                            <p className="pf-project-card__desc text-light opacity-75 mb-4 max-w-md lh-base">
                                A high-performance retail infrastructure featuring real-time inventory management and dynamic pricing algorithms.
                            </p>
                            <button className="pf-btn pf-btn--primary px-4 py-2 rounded-3 text-uppercase fw-bold mt-auto align-self-start d-flex align-items-center gap-2 border-0">
                                View Case Study
                                <span className="material-symbols-outlined fs-5">arrow_forward</span>
                            </button>
                        </div>
                    </article>
                </div>

                <div className="col-md-6 mt-md-5">
                    <article className="pf-project-card position-relative overflow-hidden rounded-pill-custom bg-dark border border-secondary border-opacity-25 h-100">
                        <div className="pf-project-card__bg position-absolute top-0 start-0 w-100 h-100">
                            <img src="/images/portfolio/project-2.jpg" alt="Data Visualization Dashboard" className="w-100 h-100 object-fit-cover pf-project-card__img" />
                            <div className="position-absolute bottom-0 start-0 w-100 h-100 bg-gradient-dark-up opacity-75"></div>
                        </div>
                        <div className="pf-project-card__overlay position-absolute bottom-0 start-0 p-5 d-flex flex-column justify-content-end w-100 h-100 pf-glass-blur opacity-0" style={{ transform: 'translateY(20px)', transition: 'all 0.4s ease' }}>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-info rounded-circle" style={{ width: '6px', height: '6px' }}></span> D3.js
                                </span>
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-info rounded-circle" style={{ width: '6px', height: '6px' }}></span> SCSS Modules
                                </span>
                            </div>
                            <h3 className="pf-project-card__title fw-bold text-white fs-2 mb-3">Data Vis Dashboard</h3>
                            <p className="pf-project-card__desc text-light opacity-75 mb-4 max-w-md lh-base">
                                Complex data orchestration translated into interactive vector-based narratives for enterprise analytics.
                            </p>
                            <button className="pf-btn pf-btn--primary px-4 py-2 rounded-3 text-uppercase fw-bold mt-auto align-self-start d-flex align-items-center gap-2 border-0">
                                View Case Study
                                <span className="material-symbols-outlined fs-5">arrow_forward</span>
                            </button>
                        </div>
                    </article>
                </div>

                <div className="col-md-6 mt-4">
                    <article className="pf-project-card position-relative overflow-hidden rounded-pill-custom bg-dark border border-secondary border-opacity-25 h-100">
                        <div className="pf-project-card__bg position-absolute top-0 start-0 w-100 h-100">
                            <img src="/images/portfolio/project-3.jpg" alt="SaaS Interface Framework" className="w-100 h-100 object-fit-cover pf-project-card__img" />
                            <div className="position-absolute bottom-0 start-0 w-100 h-100 bg-gradient-dark-up opacity-75"></div>
                        </div>
                        <div className="pf-project-card__overlay position-absolute bottom-0 start-0 p-5 d-flex flex-column justify-content-end w-100 h-100 pf-glass-blur opacity-0" style={{ transform: 'translateY(20px)', transition: 'all 0.4s ease' }}>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-warning rounded-circle" style={{ width: '6px', height: '6px' }}></span> Framer Motion
                                </span>
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-warning rounded-circle" style={{ width: '6px', height: '6px' }}></span> React
                                </span>
                            </div>
                            <h3 className="pf-project-card__title fw-bold text-white fs-2 mb-3">SaaS Framework</h3>
                            <p className="pf-project-card__desc text-light opacity-75 mb-4 max-w-md lh-base">
                                An extensible library of atomic components designed for rapid scaling of complex cloud-based platforms.
                            </p>
                            <button className="pf-btn pf-btn--primary px-4 py-2 rounded-3 text-uppercase fw-bold mt-auto align-self-start d-flex align-items-center gap-2 border-0">
                                View Case Study
                                <span className="material-symbols-outlined fs-5">arrow_forward</span>
                            </button>
                        </div>
                    </article>
                </div>

                <div className="col-md-6 mt-md-5 mt-4">
                    <article className="pf-project-card position-relative overflow-hidden rounded-pill-custom bg-dark border border-secondary border-opacity-25 h-100">
                        <div className="pf-project-card__bg position-absolute top-0 start-0 w-100 h-100">
                            <img src="/images/portfolio/project-4.jpg" alt="Generative Art Pipeline" className="w-100 h-100 object-fit-cover pf-project-card__img" />
                            <div className="position-absolute bottom-0 start-0 w-100 h-100 bg-gradient-dark-up opacity-75"></div>
                        </div>
                        <div className="pf-project-card__overlay position-absolute bottom-0 start-0 p-5 d-flex flex-column justify-content-end w-100 h-100 pf-glass-blur opacity-0" style={{ transform: 'translateY(20px)', transition: 'all 0.4s ease' }}>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-danger rounded-circle" style={{ width: '6px', height: '6px' }}></span> WebGPU
                                </span>
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-danger rounded-circle" style={{ width: '6px', height: '6px' }}></span> TypeScript
                                </span>
                            </div>
                            <h3 className="pf-project-card__title fw-bold text-white fs-2 mb-3">Generative Art Pipeline</h3>
                            <p className="pf-project-card__desc text-light opacity-75 mb-4 max-w-md lh-base">
                                Experimenting with browser-based rendering performance to create real-time evolving digital environments.
                            </p>
                            <button className="pf-btn pf-btn--primary px-4 py-2 rounded-3 text-uppercase fw-bold mt-auto align-self-start d-flex align-items-center gap-2 border-0">
                                View Case Study
                                <span className="material-symbols-outlined fs-5">arrow_forward</span>
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
