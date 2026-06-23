const SKILLS = [
    {
        icon: "fa-solid fa-code",
        title: "Frontend Core",
        description: "HTML / CSS / JavaScript",
    },
    {
        icon: "fa-solid fa-layer-group",
        title: "Frameworks",
        description: "React / Next.js / Bootstrap / Tailwind",
    },
    {
        icon: "fa-brands fa-git-alt",
        title: "Dev Tools",
        description: "Git / GitHub / Figma",
    },
    {
        icon: "fa-solid fa-robot",
        title: "AI-Native Tooling",
        description: "Cursor / Claude",
    },
]

export default function JournalSection() {
    return (
        <section className="section-spacing" id="journal">
            <div className="container works-container">
                <div className="section-head section-head--split js-inview d-flex flex-wrap align-items-end justify-content-between gap-3">
                    <div className="section-head__left d-flex align-items-center">
                        <span className="section-line" />
                        <p className="section-meta">Skills</p>
                    </div>
                    <div className="section-head__body">
                        <h2 className="section-title">
                            Tech
                            <span className="font-display fst-italic">
                                {" "}
                                stack
                            </span>
                        </h2>
                        <p className="section-subtext">
                            Tools and technologies I use to build modern web
                            experiences.
                        </p>
                    </div>
                </div>
                <div className="journal-list d-grid gap-3">
                    {SKILLS.map((skill) => (
                        <article key={skill.title} className="journal-item">
                            <div className="journal-item__icon">
                                <i className={skill.icon} />
                            </div>
                            <div className="journal-item__body">
                                <h3>{skill.title}</h3>
                                <p>{skill.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
