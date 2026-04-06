import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Debug: Kiểm tra sự tồn tại của các Project Cards
        const projectCards = gsap.utils.toArray('.pf-project-card');
        console.log('GSAP Projects Init - Projects found:', projectCards.length);

        // Đảm bảo ban đầu các phần tử hiện ra để tránh lỗi mất hoàn toàn
        gsap.set(['.pf-projects__header', '.pf-project-card'], { autoAlpha: 1 });

        gsap.fromTo('.pf-projects__header', 
            { y: 40, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: '.pf-projects__header',
                    start: 'top 85%',
                },
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out',
            }
        );

        gsap.fromTo('.pf-project-card', 
            { y: 60, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: '.pf-projects__grid',
                    start: 'top 80%',
                },
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                clearProps: 'all'
            }
        );

        // Sync tọa độ ScrollTrigger
        ScrollTrigger.refresh();

    }, { scope: container });

    return (
        <section className="pf-projects container py-5" id="projects" ref={container}>
            <header className="pf-projects__header mb-5 pb-3 max-w-3xl">
                <h2 className="pf-projects__headline fw-bold mb-3 display-4">Selected Works & Experiments</h2>
                <p className="pf-projects__lead text-secondary fs-5 lh-lg max-w-2xl">
                    A collection of projects showcasing advanced UI development, API integrations, and seamless user experiences.
                </p>
            </header>

            <div className="row g-5 pf-projects__grid">
                <div className="col-md-6">
                    <article className="pf-project-card position-relative overflow-hidden rounded-pill-custom bg-dark border border-secondary border-opacity-25">
                        <div className="pf-project-card__bg position-absolute top-0 start-0 w-100 h-100">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfoOKfy87OOqP8c4OuCg80NnUvQLwxLvntPX-ILJitmMqAJbqRtZxiPLhylDw0_D17fP_oDqb3r1cXrqMqFKOLT_lApFb4p6u31yOtBBu7rpaT7N77EKPj3pTiow9ALj7lG2vLr1EeOGkiUutKL2fl27mriekY2lK4gtKOffhPpXdumekuFkeupjgZ_x0XZYyq5tYjbMJH_OfMq2CAJtwQ8Ir6guW1HztFbiqefn5zTWxw-Ue5mn_Yvht5vd5UPpmwVxBlDBPclF4_" alt="E-commerce Engine" className="w-100 h-100 object-fit-cover pf-project-card__img" />
                            <div className="position-absolute bottom-0 start-0 w-100 h-100 bg-gradient-dark-up opacity-60"></div>
                        </div>
                        <div className="pf-project-card__overlay position-absolute bottom-0 start-0 p-5 d-flex flex-column justify-content-end w-100 h-100 pf-glass-blur opacity-0">
                            <div className="flex-wrap gap-2 mb-3 d-none d-md-flex">
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-primary rounded-circle"></span> Next.js
                                </span>
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-primary rounded-circle"></span> REST APIs
                                </span>
                            </div>
                            <h3 className="pf-project-card__title fw-bold text-white fs-2 mb-3">E-commerce Engine</h3>
                            <p className="pf-project-card__desc text-light opacity-75 mb-4 max-w-md lh-base fs-6">
                                A high-performance retail infrastructure featuring real-time inventory management and dynamic pricing algorithms.
                            </p>
                            <button className="pf-btn pf-btn--primary px-4 py-2 rounded-3 text-uppercase fw-bold mt-auto align-self-start d-flex align-items-center gap-2 border-0">
                                View Case Study
                                <span className="material-symbols-outlined fs-5">arrow_forward</span>
                            </button>
                        </div>
                    </article>
                </div>

                <div className="col-md-6 mt-md-5 pt-md-5">
                    <article className="pf-project-card position-relative overflow-hidden rounded-pill-custom bg-dark border border-secondary border-opacity-25">
                        <div className="pf-project-card__bg position-absolute top-0 start-0 w-100 h-100">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD-BhqKBr5mVMivIlbTF-l8rHacxKCPPY8EyyzSIlVFIQJwPsjgbEErTaBVkkeqaz194v4gA_RJGKfzS3UjdFYrKB1ClgQqGFqSGt8rPUi54k87PUEgx6KXVddNCTKFlwbJwZehL_VbQe5445b00tvJlSxJMbqPlR5lRmTq6PRCHeX7-Ix_nhJab_3g_m2yuk64oplbo8Ip5GM10HeNkMD0xlVRmeKrxW8ee_sM-6JT6pNxT0QoTyMhjlRpyKcRLHdxr43wmXLHwTP" alt="Data Visualization Dashboard" className="w-100 h-100 object-fit-cover pf-project-card__img" />
                            <div className="position-absolute bottom-0 start-0 w-100 h-100 bg-gradient-dark-up opacity-60"></div>
                        </div>
                        <div className="pf-project-card__overlay position-absolute bottom-0 start-0 p-5 d-flex flex-column justify-content-end w-100 h-100 pf-glass-blur opacity-0">
                            <div className="flex-wrap gap-2 mb-3 d-none d-md-flex">
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-info rounded-circle"></span> D3.js
                                </span>
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-info rounded-circle"></span> SCSS Modules
                                </span>
                            </div>
                            <h3 className="pf-project-card__title fw-bold text-white fs-2 mb-3">Data Vis Dashboard</h3>
                            <p className="pf-project-card__desc text-light opacity-75 mb-4 max-w-md lh-base fs-6">
                                Complex data orchestration translated into interactive vector-based narratives for enterprise analytics.
                            </p>
                            <button className="pf-btn pf-btn--primary px-4 py-2 rounded-3 text-uppercase fw-bold mt-auto align-self-start d-flex align-items-center gap-2 border-0">
                                View Case Study
                                <span className="material-symbols-outlined fs-5">arrow_forward</span>
                            </button>
                        </div>
                    </article>
                </div>

                <div className="col-md-6 mt-md-n5">
                    <article className="pf-project-card position-relative overflow-hidden rounded-pill-custom bg-dark border border-secondary border-opacity-25">
                        <div className="pf-project-card__bg position-absolute top-0 start-0 w-100 h-100">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdQqU0pVwDvJynB6vPKjHjAdcc5BzF_ZzDhUhsEiPC14ZYzUUUp3X7FcB3RQH5jz8p1La4ffeNP4P8x5IR19nqPh44Ue6hA_y3seEk3vrKdManpCICulDA3gRDLU3GCO7sZKKFrJbY1YkQ7qlMD93Xt_O0Qw7R1eCgAG81rjMgxMr6NpPbsxgQhdOl04hkOADXbClrZHRuMsSz980tr6squysTRrtNbnfvuIfQlshSMgzfbGK8Nz08CCjZXXj6hsjRr-1a5bP1ycfk" alt="SaaS Interface Framework" className="w-100 h-100 object-fit-cover pf-project-card__img" />
                            <div className="position-absolute bottom-0 start-0 w-100 h-100 bg-gradient-dark-up opacity-60"></div>
                        </div>
                        <div className="pf-project-card__overlay position-absolute bottom-0 start-0 p-5 d-flex flex-column justify-content-end w-100 h-100 pf-glass-blur opacity-0">
                            <div className="flex-wrap gap-2 mb-3 d-none d-md-flex">
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-warning rounded-circle"></span> Framer Motion
                                </span>
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-warning rounded-circle"></span> React
                                </span>
                            </div>
                            <h3 className="pf-project-card__title fw-bold text-white fs-2 mb-3">SaaS Framework</h3>
                            <p className="pf-project-card__desc text-light opacity-75 mb-4 max-w-md lh-base fs-6">
                                An extensible library of atomic components designed for rapid scaling of complex cloud-based platforms.
                            </p>
                            <button className="pf-btn pf-btn--primary px-4 py-2 rounded-3 text-uppercase fw-bold mt-auto align-self-start d-flex align-items-center gap-2 border-0">
                                View Case Study
                                <span className="material-symbols-outlined fs-5">arrow_forward</span>
                            </button>
                        </div>
                    </article>
                </div>

                <div className="col-md-6 mt-md-0 pt-md-5">
                    <article className="pf-project-card position-relative overflow-hidden rounded-pill-custom bg-dark border border-secondary border-opacity-25">
                        <div className="pf-project-card__bg position-absolute top-0 start-0 w-100 h-100">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdr4DEVD_gzk4fOHscUAz0RHpaKUhocnqy6ftXgpNjPTJRzpHe47OQRfv7SGb-1bjgrg2X2hHabZrK2oc-H3KjfJtOJYJ-Ti7k4urP5EdyMKZpg5oR8UUwKqHpz_RKYHRcaL8wGyYFlCcSprf65bsMS97HELjOZ_Gj_q_sJLVooG79VLuZTSuSYQirUCqdqWzHyEAn3zGpkTLlNXVYl9aZISdsGPX3n_mdSnDtjhoWv6EdqGSSQl1jpj-Z3tyiSF-dm-XglyaGpUoz" alt="Generative Art Pipeline" className="w-100 h-100 object-fit-cover pf-project-card__img" />
                            <div className="position-absolute bottom-0 start-0 w-100 h-100 bg-gradient-dark-up opacity-60"></div>
                        </div>
                        <div className="pf-project-card__overlay position-absolute bottom-0 start-0 p-5 d-flex flex-column justify-content-end w-100 h-100 pf-glass-blur opacity-0">
                            <div className="flex-wrap gap-2 mb-3 d-none d-md-flex">
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-danger rounded-circle"></span> WebGPU
                                </span>
                                <span className="badge bg-dark border px-3 py-2 text-uppercase d-flex align-items-center gap-2">
                                    <span className="pf-tag-dot bg-danger rounded-circle"></span> TypeScript
                                </span>
                            </div>
                            <h3 className="pf-project-card__title fw-bold text-white fs-2 mb-3">Generative Art Pipeline</h3>
                            <p className="pf-project-card__desc text-light opacity-75 mb-4 max-w-md lh-base fs-6">
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
