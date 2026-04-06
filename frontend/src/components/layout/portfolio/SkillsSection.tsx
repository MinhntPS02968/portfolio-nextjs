import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Debug: Kiểm tra sự tồn tại của các Skill Cards
        const skillCards = gsap.utils.toArray('.pf-skill-card');
        console.log('GSAP Skills Init - Skill Cards found:', skillCards.length);

        // Đảm bảo ban đầu các phần tử hiện ra để tránh lỗi mất hoàn toàn
        // (Nếu GSAP không tìm thấy phần tử, ít nhất người dùng vẫn thấy giao diện rỗng thay vì bị ẩn vĩnh viễn)
        gsap.set(['.pf-skills__header', '.pf-skill-card', '.pf-timeline__item'], { autoAlpha: 1 });

        // Section Header
        gsap.fromTo('.pf-skills__header', 
            { y: 50, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: '.pf-skills__header',
                    start: 'top 85%',
                },
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out',
            }
        );

        // Skill Cards Stagger
        gsap.fromTo('.pf-skill-card', 
            { y: 60, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: '.pf-skills__matrix',
                    start: 'top 80%',
                },
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                clearProps: 'all'
            }
        );

        // Timeline Items
        gsap.utils.toArray<HTMLElement>('.pf-timeline__item').forEach((item) => {
            gsap.fromTo(item, 
                { x: item.classList.contains('flex-md-row-reverse') ? 50 : -50, autoAlpha: 0 },
                {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 90%',
                    },
                    x: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: 'power3.out',
                }
            );
        });

        // Sync tọa độ ScrollTrigger
        ScrollTrigger.refresh();

    }, { scope: container });

    return (
        <section className="pf-skills container py-5" id="skills" ref={container}>
            <header className="pf-skills__header position-relative mb-5 pt-5 text-center">
                <div className="pf-skills__header-bg position-absolute top-0 start-50 translate-middle-x pe-none mt-n5"></div>
                <div className="d-flex flex-column gap-3 align-items-center">
                    <span className="pf-skills__label text-secondary fw-bold text-uppercase tracking-widest">Professional Evolution & Expertise</span>
                    <h2 className="pf-skills__headline fw-bold mx-auto mb-0">
                        The lifecycle of a <span className="pf-text-gradient">Senior Frontend Architect.</span>
                    </h2>
                </div>
            </header>

            <div className="pf-skills__matrix mb-5 pb-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <span className="pf-horizontal-line pf-horizontal-line--sm flex-grow-0"></span>
                    <h3 className="pf-skills__sub-label fw-bold text-uppercase m-0">Section 01 // Expertise Matrix</h3>
                </div>

                <div className="row g-1 pf-skills__grid rounded-4 overflow-hidden shadow-lg border">
                    <div className="col-md-6 p-0">
                        <div className="pf-skill-card position-relative p-5 h-100 bg-dark text-white overflow-hidden">
                            <div className="pf-skill-card__bg-icon position-absolute top-0 end-0 p-3 opacity-25">
                                <span className="material-symbols-outlined fs-1 text-primary">code</span>
                            </div>
                            <div className="position-relative z-1">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold m-0 fs-3">Advanced HTML/SCSS</h4>
                                    <span className="pf-skill-card__badge badge bg-primary text-light rounded-pill px-3 py-2 text-uppercase">5 Years Experience</span>
                                </div>
                                <div className="pf-progress mb-4 bg-secondary bg-opacity-25 rounded-pill overflow-hidden pf-size-6">
                                    <div className="pf-progress__bar bg-primary h-100 pf-w-95"></div>
                                </div>
                                <div className="d-flex flex-wrap gap-2 pf-skill-card__tags">
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-dark rounded-circle"></span> Tailwind CSS
                                    </span>
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-dark rounded-circle"></span> BEM Methodology
                                    </span>
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-dark rounded-circle"></span> Responsive Design
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 p-0">
                        <div className="pf-skill-card position-relative p-5 h-100 bg-dark text-white overflow-hidden">
                            <div className="pf-skill-card__bg-icon position-absolute top-0 end-0 p-3 opacity-25">
                                <span className="material-symbols-outlined fs-1 text-info">javascript</span>
                            </div>
                            <div className="position-relative z-1">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold m-0 fs-3">Modern JavaScript</h4>
                                    <span className="pf-skill-card__badge badge bg-info text-dark rounded-pill px-3 py-2 text-uppercase">5 Years Experience</span>
                                </div>
                                <div className="pf-progress mb-4 bg-secondary bg-opacity-25 rounded-pill overflow-hidden pf-size-6">
                                    <div className="pf-progress__bar bg-info h-100 pf-w-90"></div>
                                </div>
                                <div className="d-flex flex-wrap gap-2 pf-skill-card__tags">
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-primary rounded-circle"></span> TypeScript
                                    </span>
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-primary rounded-circle"></span> React Core
                                    </span>
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-primary rounded-circle"></span> ESNext Features
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 p-0">
                        <div className="pf-skill-card position-relative p-5 h-100 bg-dark text-white overflow-hidden">
                            <div className="pf-skill-card__bg-icon position-absolute top-0 end-0 p-3 opacity-25">
                                <span className="material-symbols-outlined fs-1 text-warning">layers</span>
                            </div>
                            <div className="position-relative z-1">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold m-0 fs-3">Next.js Framework</h4>
                                    <span className="pf-skill-card__badge badge bg-warning text-dark rounded-pill px-3 py-2 text-uppercase">1 Year Intensive</span>
                                </div>
                                <div className="pf-progress mb-4 bg-secondary bg-opacity-25 rounded-pill overflow-hidden pf-size-6">
                                    <div className="pf-progress__bar bg-warning h-100 pf-w-75"></div>
                                </div>
                                <div className="d-flex flex-wrap gap-2 pf-skill-card__tags">
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-primary rounded-circle"></span> Server Components
                                    </span>
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-primary rounded-circle"></span> App Router
                                    </span>
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-primary rounded-circle"></span> SEO Optimization
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 p-0">
                        <div className="pf-skill-card position-relative p-5 h-100 bg-dark text-white overflow-hidden">
                            <div className="pf-skill-card__bg-icon position-absolute top-0 end-0 p-3 opacity-25">
                                <span className="material-symbols-outlined fs-1 text-danger">hub</span>
                            </div>
                            <div className="position-relative z-1">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold m-0 fs-3">API Orchestration</h4>
                                    <span className="pf-skill-card__badge badge bg-danger text-light rounded-pill px-3 py-2 text-uppercase">1 Year Intensive</span>
                                </div>
                                <div className="pf-progress mb-4 bg-secondary bg-opacity-25 rounded-pill overflow-hidden pf-size-6">
                                    <div className="pf-progress__bar bg-danger h-100 pf-w-80"></div>
                                </div>
                                <div className="d-flex flex-wrap gap-2 pf-skill-card__tags">
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-warning rounded-circle"></span> GraphQL/Apollo
                                    </span>
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-warning rounded-circle"></span> RESTful Integration
                                    </span>
                                    <span className="badge bg-secondary rounded-2 px-3 py-2 text-uppercase text-dark fw-bold d-flex align-items-center gap-2">
                                        <span className="pf-tag-dot bg-warning rounded-circle"></span> State Management
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pf-skills__timeline position-relative pb-5">
                <div className="d-flex align-items-center gap-3 mb-5">
                    <span className="pf-horizontal-line pf-horizontal-line--sm flex-grow-0"></span>
                    <h3 className="pf-skills__sub-label fw-bold text-uppercase m-0">Section 02 // Career Timeline</h3>
                </div>

                <div className="pf-timeline position-relative">
                    <div className="pf-timeline__line position-absolute start-50 top-0 bottom-0 translate-middle-x"></div>
                    
                    <div className="row pf-timeline__item align-items-center mb-5">
                        <div className="col-md-6 text-md-end mb-4 mb-md-0 d-md-block d-none">
                            <span className="pf-timeline__time text-uppercase fw-bold fs-1 opacity-25">Present</span>
                        </div>
                        <div className="col-md-6 position-relative">
                            <div className="pf-timeline__dot position-absolute top-50 start-0 translate-middle rounded-circle border border-4 border-dark bg-primary ms-n5 mt-n2 d-none d-md-block"></div>
                            <div className="pf-glass-card p-4 rounded-4 ms-md-4 border border-secondary border-opacity-25">
                                <span className="text-primary fw-bold text-uppercase d-block mb-2 pf-fs-sm">Current Milestone</span>
                                <h4 className="fw-bold mb-3">Senior Frontend Developer / Next.js Expert</h4>
                                <p className="text-secondary mb-4">Architecture of high-performance enterprise applications with a core focus on design-to-code precision and API-first methodologies. Engineering fluid, state-driven user experiences.</p>
                                <div className="d-flex gap-3">
                                    <div className="pf-icon-box bg-dark rounded-3 d-flex align-items-center justify-content-center p-3">
                                        <span className="material-symbols-outlined text-primary">terminal</span>
                                    </div>
                                    <div className="pf-icon-box bg-dark rounded-3 d-flex align-items-center justify-content-center p-3">
                                        <span className="material-symbols-outlined text-primary">architecture</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pf-timeline__item align-items-center flex-md-row-reverse mb-5">
                        <div className="col-md-6 text-md-start mb-4 mb-md-0 d-md-block d-none ms-md-auto ms-lg-0 px-md-4">
                            <span className="pf-timeline__time text-uppercase fw-bold fs-1 opacity-25">2 Years Ago</span>
                        </div>
                        <div className="col-md-6 position-relative">
                            <div className="pf-timeline__dot position-absolute top-50 translate-middle-y rounded-circle border border-4 border-dark bg-info me-n5 mt-n2 d-none d-md-block"></div>
                            <div className="pf-glass-card p-4 rounded-4 me-md-5 border border-secondary border-opacity-25 text-md-end">
                                <span className="text-info fw-bold text-uppercase d-block mb-2 pf-fs-sm">The Specialization Phase</span>
                                <h4 className="fw-bold mb-3">Frontend Developer / UI Specialist</h4>
                                <p className="text-secondary mb-0">Deep mastery of SCSS structures and JS core principles. Leading the visual development for immersive interfaces while establishing reusable component libraries and design tokens.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row pf-timeline__item align-items-center">
                        <div className="col-md-6 text-md-end mb-4 mb-md-0 d-md-block d-none">
                            <span className="pf-timeline__time text-uppercase fw-bold fs-1 opacity-25">5 Years Ago</span>
                        </div>
                        <div className="col-md-6 position-relative">
                            <div className="pf-timeline__dot position-absolute top-50 start-0 translate-middle rounded-circle border border-4 border-dark bg-warning ms-n5 border-opacity-50 mt-n2 d-none d-md-block"></div>
                            <div className="pf-glass-card p-4 rounded-4 ms-md-4 border border-secondary border-opacity-25">
                                <span className="text-warning fw-bold text-uppercase d-block mb-2 pf-fs-sm">Origin Story</span>
                                <h4 className="fw-bold mb-3">Junior Interface Engineer</h4>
                                <p className="text-secondary mb-4">Beginning the journey with semantic HTML and pixel-perfect CSS execution. Developing an obsession for clean code and performant web animations.</p>
                                <img src="/images/portfolio/skills-image.jpg" alt="Skills origin" className="w-100 rounded-3 object-fit-cover pf-timeline__origin-img" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
