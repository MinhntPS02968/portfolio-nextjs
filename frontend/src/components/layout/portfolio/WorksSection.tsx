const WORKS = [
    {
        title: "Automotive Motion",
        mediaClass: "work-card__media--one",
        colClass: "col-12 col-md-7",
    },
    {
        title: "Urban Architecture",
        mediaClass: "work-card__media--two",
        colClass: "col-12 col-md-5",
    },
    {
        title: "Human Perspective",
        mediaClass: "work-card__media--three",
        colClass: "col-12 col-md-5",
    },
    {
        title: "Brand Identity",
        mediaClass: "work-card__media--four",
        colClass: "col-12 col-md-7",
    },
]

export default function WorksSection() {
    return (
        <section className="section-spacing" id="works">
            <div className="container works-container">
                <div className="section-head section-head--split js-inview d-flex flex-wrap align-items-end justify-content-between gap-3">
                    <div className="section-head__left d-flex align-items-center">
                        <span className="section-line" />
                        <p className="section-meta">Selected Work</p>
                    </div>
                    <div className="section-head__body">
                        <h2 className="section-title">
                            Featured
                            <span className="font-display fst-italic">
                                {" "}
                                projects
                            </span>
                        </h2>
                        <p className="section-subtext">
                            A selection of projects I&apos;ve worked on, from
                            concept to launch.
                        </p>
                    </div>
                    <a
                        className="section-btn btn rounded-pill d-none d-md-inline-flex align-items-center"
                        href="#"
                    >
                        View all work
                        <span className="ms-1">↗</span>
                    </a>
                </div>
                <div className="row g-4">
                    {WORKS.map((work) => (
                        <div key={work.title} className={work.colClass}>
                            <article className="work-card">
                                <div
                                    className={`work-card__media ${work.mediaClass}`}
                                >
                                    <div className="work-card__half-tone" />
                                </div>
                                <div className="work-card__hover">
                                    <a className="work-card__pill" href="#">
                                        View — <em>{work.title}</em>
                                    </a>
                                </div>
                                <h3 className="work-card__title">
                                    {work.title}
                                </h3>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
