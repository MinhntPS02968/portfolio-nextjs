"use client";

import { useEffect, useState, useRef } from "react";

const menuItems = [
  { href: "hero", text: "Home" },
  { href: "skills", text: "Skills" },
  { href: "projects", text: "Projects" },
  { href: "contact", text: "Contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const bsOffcanvas = useRef<any>(null);

  // Keep a single close handler for both desktop and offcanvas actions.
  const closeOffcanvas = () => {
    if (bsOffcanvas.current) {
        bsOffcanvas.current.hide();
    }
  };

  useEffect(() => {
    // Track the currently visible section to keep navigation state in sync.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    });

    // Observe every section referenced by the menu map.
    menuItems.forEach((item) => {
      const section = document.getElementById(item.href);
      if (section) observer.observe(section);
    });

    // Create one offcanvas instance and reuse it across interactions.
    if (typeof window !== "undefined" && offcanvasRef.current) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap && bootstrap.Offcanvas) {
          if (!bsOffcanvas.current) {
              bsOffcanvas.current = new bootstrap.Offcanvas(offcanvasRef.current);
          }
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="pf-header fixed-top pf-glass-blur">
      <div className="container px-4 py-3 d-flex align-items-center justify-content-between">
        {/* Logo */}
        <a href="#hero" className="text-decoration-none">
          <div className="pf-header__logo pf-neon-soft fs-4 fw-bold">The Digital Architect</div>
        </a>

        {/* Desktop Navigation */}
        <nav className="pf-header__nav d-none d-md-flex align-items-center gap-4 text-uppercase fw-semibold tracking-tight nav">
          {menuItems.map((item) => (
            <a 
              key={item.href} 
              href={`#${item.href}`}
              className={`nav-link pf-header__link pf-neon-soft ${activeSection === item.href ? 'active pf-neon-active' : ''}`}
            >
              {item.text}
            </a>
          ))}
        </nav>

        {/* Actions & Mobile Toggle */}
        <div className="d-flex align-items-center gap-3">
          <button className="pf-btn pf-btn--primary px-4 py-2 rounded-3 text-uppercase fw-bold text-dark border-0 fs-6 d-none d-sm-block">
            Resume
          </button>
          
          <button
            className="btn btn-dark d-md-none border border-secondary border-opacity-25 rounded-3 d-flex align-items-center justify-content-center p-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#pfOffcanvas"
            aria-controls="pfOffcanvas"
          >
            <span className="material-symbols-outlined text-white">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Offcanvas */}
      <div 
        className="offcanvas offcanvas-end bg-dark border-start border-secondary border-opacity-25" 
        tabIndex={-1} 
        id="pfOffcanvas" 
        aria-labelledby="pfOffcanvasLabel"
        ref={offcanvasRef}
      >
        <div className="offcanvas-header border-bottom border-secondary border-opacity-25">
          <h5 className="offcanvas-title pf-header__logo pf-neon-soft fs-5" id="pfOffcanvasLabel">The Digital Architect</h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={closeOffcanvas}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled pf-header__nav text-uppercase d-flex flex-column gap-3 fs-5 mt-4 nav">
            {menuItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={`#${item.href}`}
                  className={`nav-link pf-header__link pf-neon-soft d-block w-100 py-2 border-bottom border-secondary border-opacity-10 ${activeSection === item.href ? 'active pf-neon-active' : ''}`}
                  onClick={closeOffcanvas}
                >
                  {item.text}
                </a>
              </li>
            ))}
            <li className="mt-4">
                <button className="pf-btn pf-btn--primary px-4 py-3 rounded-3 text-uppercase fw-bold text-dark border-0 w-100 d-flex align-items-center justify-content-center gap-2">
                    <span className="material-symbols-outlined">download</span> Resume
                </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
