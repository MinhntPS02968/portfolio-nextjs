"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const menuItems = [
  { href: "#hero", text: "Home" },
  { href: "#projects", text: "Projects" },
  { href: "#skills", text: "Skills" },
  { href: "#contact", text: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  useEffect(() => {
    // Close offcanvas on window resize or path change
    const offcanvasElement = document.getElementById("pfOffcanvas");
    if (offcanvasElement && typeof window !== "undefined") {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap && bootstrap.Offcanvas) {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (offcanvas) {
          offcanvas.hide();
        }
      }
    }
  }, [pathname]);

  return (
    <header className="pf-header fixed-top w-100 pf-glass-blur border-bottom border-secondary border-opacity-10">
      <div className="container-xxl px-4 py-3 d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link href="/" className="text-decoration-none">
          <div className="pf-header__logo fs-4 fw-bold">The Digital Architect</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="pf-header__nav d-none d-md-flex align-items-center gap-4 text-uppercase fw-semibold tracking-tight">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`pf-header__link ${pathname === item.href ? 'pf-header__link--active' : ''}`}
            >
              {item.text}
            </Link>
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
      >
        <div className="offcanvas-header border-bottom border-secondary border-opacity-25">
          <h5 className="offcanvas-title pf-header__logo fs-5" id="pfOffcanvasLabel">The Digital Architect</h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            data-bs-dismiss="offcanvas" 
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled pf-header__nav text-uppercase d-flex flex-column gap-3 fs-5 mt-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className="pf-header__link d-block w-100 py-2 border-bottom border-secondary border-opacity-10"
                  data-bs-dismiss="offcanvas"
                >
                  {item.text}
                </Link>
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
