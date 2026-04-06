import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Debug: Kiểm tra sự tồn tại
        const contactItems = gsap.utils.toArray('.pf-contact-info');
        console.log('GSAP Contact Init - Info Items found:', contactItems.length);

        // Đảm bảo ban đầu các phần tử hiện ra để tránh lỗi mất hoàn toàn
        gsap.set(['.pf-contact__header', '.pf-contact-info', '.pf-availability', '.pf-contact-form'], { autoAlpha: 1 });

        // Header
        gsap.fromTo('.pf-contact__header', 
            { y: 30, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: '.pf-contact__header',
                    start: 'top 85%',
                },
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out',
            }
        );

        // Contact Info Items Stagger
        gsap.fromTo('.pf-contact-info', 
            { x: -30, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: '.pf-contact-info',
                    start: 'top 90%',
                },
                x: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.7)',
            }
        );

        // Availability Card
        gsap.fromTo('.pf-availability', 
            { scale: 0.9, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: '.pf-availability',
                    start: 'top 95%',
                },
                scale: 1,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out',
            }
        );

        // Contact Form
        gsap.fromTo('.pf-contact-form', 
            { y: 50, autoAlpha: 0 },
            {
                scrollTrigger: {
                    trigger: '.pf-contact-form',
                    start: 'top 80%',
                },
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power3.out',
            }
        );

        // Sync tọa độ ScrollTrigger
        ScrollTrigger.refresh();

    }, { scope: container });

    return (
        <section className="pf-contact container py-5 min-vh-100" id="contact" ref={container}>
            <header className="pf-contact__header mb-5 pb-3 max-w-3xl">
                <h2 className="pf-contact__headline fw-bold mb-3 display-4">
                    Let's Build Something <span className="text-primary pf-text-glow">Exceptional</span> Together
                </h2>
                <p className="pf-contact__lead text-secondary fs-5 lh-lg max-w-2xl">
                    Currently available for high-impact projects or leadership roles.
                </p>
            </header>

            <div className="row g-5">
                <aside className="col-lg-5 d-flex flex-column gap-5">
                    <div className="d-flex flex-column gap-4">
                        <div className="pf-contact-info d-flex align-items-center gap-4 p-3 rounded-4 transition-all">
                            <div className="pf-contact-info__icon text-primary bg-dark border border-secondary border-opacity-25 rounded-3 d-flex align-items-center justify-content-center">
                                <span className="material-symbols-outlined fs-3">mail</span>
                            </div>
                            <div>
                                <p className="pf-contact-info__label text-uppercase text-secondary fw-bold mb-1 tracking-widest pf-fs-xs">Email</p>
                                <a href="mailto:hello@digitalarchitect.dev" className="pf-contact-info__value fs-5 fw-bold text-white text-decoration-none">hello@digitalarchitect.dev</a>
                            </div>
                        </div>

                        <div className="pf-contact-info d-flex align-items-center gap-4 p-3 rounded-4 transition-all">
                            <div className="pf-contact-info__icon text-info bg-dark border border-secondary border-opacity-25 rounded-3 d-flex align-items-center justify-content-center">
                                <span className="material-symbols-outlined fs-3">link</span>
                            </div>
                            <div>
                                <p className="pf-contact-info__label text-uppercase text-secondary fw-bold mb-1 tracking-widest pf-fs-xs">LinkedIn</p>
                                <a href="#" className="pf-contact-info__value fs-5 fw-bold text-white text-decoration-none">linkedin.com/in/architect</a>
                            </div>
                        </div>

                        <div className="pf-contact-info d-flex align-items-center gap-4 p-3 rounded-4 transition-all">
                            <div className="pf-contact-info__icon text-warning bg-dark border border-secondary border-opacity-25 rounded-3 d-flex align-items-center justify-content-center">
                                <span className="material-symbols-outlined fs-3">code</span>
                            </div>
                            <div>
                                <p className="pf-contact-info__label text-uppercase text-secondary fw-bold mb-1 tracking-widest pf-fs-xs">GitHub</p>
                                <a href="#" className="pf-contact-info__value fs-5 fw-bold text-white text-decoration-none">github.com/digital-arch</a>
                            </div>
                        </div>

                        <div className="pf-contact-info d-flex align-items-center gap-4 p-3 rounded-4 transition-all">
                            <div className="pf-contact-info__icon text-danger bg-dark border border-secondary border-opacity-25 rounded-3 d-flex align-items-center justify-content-center">
                                <span className="material-symbols-outlined fs-3">flutter_dash</span>
                            </div>
                            <div>
                                <p className="pf-contact-info__label text-uppercase text-secondary fw-bold mb-1 tracking-widest pf-fs-xs">Twitter</p>
                                <a href="#" className="pf-contact-info__value fs-5 fw-bold text-white text-decoration-none">@architect_dev</a>
                            </div>
                        </div>
                    </div>

                    <div className="pf-availability p-4 p-md-5 rounded-4 bg-dark border border-secondary border-opacity-10 position-relative overflow-hidden">
                        <div className="pf-availability__glow position-absolute top-0 end-0 bg-primary opacity-10 rounded-circle blur-3xl me-n5 mt-n5"></div>
                        <h3 className="fw-bold fs-4 mb-3 text-white">Project Availability</h3>
                        <p className="text-secondary lh-lg mb-4">
                            I am currently considering new opportunities for Q3 2024. If you have a project that requires technical precision and creative execution, let's chat.
                        </p>
                        <div className="d-flex align-items-center gap-3">
                            <span className="pf-status-dot bg-info rounded-circle shadow-sm"></span>
                            <span className="text-uppercase fw-bold text-secondary tracking-widest pf-fs-sm">System Status: Active</span>
                        </div>
                    </div>
                </aside>

                <section className="col-lg-7">
                    <div className="pf-contact-form pf-glass-card p-4 p-md-5 rounded-5 border border-secondary border-opacity-25 shadow-lg position-relative bg-dark bg-opacity-50">
                        <form className="d-flex flex-column gap-4" onSubmit={(e) => e.preventDefault()}>
                             <div className="row g-4">
                                <div className="col-md-6 d-flex flex-column gap-2">
                                    <label htmlFor="name" className="text-uppercase text-secondary fw-bold ms-1 tracking-widest pf-fs-sm">Name</label>
                                    <input type="text" id="name" className="pf-input form-control bg-dark text-white border-secondary border-opacity-25 rounded-3 px-4 py-3" placeholder="John Doe" />
                                </div>
                                <div className="col-md-6 d-flex flex-column gap-2">
                                    <label htmlFor="email" className="text-uppercase text-secondary fw-bold ms-1 tracking-widest pf-fs-sm">Email</label>
                                    <input type="email" id="email" className="pf-input form-control bg-dark text-white border-secondary border-opacity-25 rounded-3 px-4 py-3" placeholder="john@example.com" />
                                </div>
                            </div>
                            
                            <div className="d-flex flex-column gap-2">
                                <label htmlFor="scope" className="text-uppercase text-secondary fw-bold ms-1 tracking-widest pf-fs-sm">Project Scope</label>
                                <select id="scope" className="pf-input form-select bg-dark text-white border-secondary border-opacity-25 rounded-3 px-4 py-3">
                                    <option value="frontend">Frontend Architecture</option>
                                    <option value="uiux">UI/UX Design Systems</option>
                                    <option value="leadership">Technical Leadership</option>
                                    <option value="consultancy">Consultancy & Audit</option>
                                </select>
                            </div>

                            <div className="d-flex flex-column gap-2 mb-2">
                                <label htmlFor="message" className="text-uppercase text-secondary fw-bold ms-1 tracking-widest pf-fs-sm">Message</label>
                                <textarea id="message" rows={5} className="pf-input form-control bg-dark text-white border-secondary border-opacity-25 rounded-3 px-4 py-3" placeholder="Tell me about your exceptional project..."></textarea>
                            </div>

                            <button type="submit" className="pf-btn pf-btn--primary w-100 py-3 rounded-3 text-uppercase fw-bold d-flex align-items-center justify-content-center gap-3 border-0 mt-3">
                                <span>Send Message</span>
                                <span className="material-symbols-outlined pf-btn__icon">send</span>
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </section>
    );
}
