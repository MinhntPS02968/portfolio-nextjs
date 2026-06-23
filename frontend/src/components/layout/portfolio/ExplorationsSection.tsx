const EXPERIENCES = [
    {
        role: "Inter PHP & Front-end",
        company: "BE Solution",
        period: "02/2017 — 09/2018",
        details: [
            "Design website interface using PHP, Yii Framework and Laravel",
            "Maintain and update websites periodically",
            "Survey, setup and standardize databases per client requirements",
        ],
        parallaxSpeed: 12,
    },
    {
        role: "Fresher Front-end",
        company: "Freelancer",
        period: "12/2018 — 07/2019",
        details: [
            "Design website interfaces based on client requirements",
            "Develop and maintain responsive web apps with HTML, CSS, JavaScript",
        ],
        parallaxSpeed: 16,
    },
    {
        role: "Frontend Developer",
        company: "G.I.C",
        period: "02/2020 — Present",
        details: [
            "Build interactive web interfaces with vanilla JS, Bootstrap and Tailwind CSS",
            "Leverage AI tools to debug and generate boilerplate, cutting dev time by 20%",
            "Collaborate with Product Owner and UI/UX Designer for intuitive user experience",
        ],
        parallaxSpeed: 18,
    },
]

export default function ExplorationsSection() {
    return (
        <section className="explorations-section" id="explorations">
            <div className="explorations-pin" id="explorationsPin">
                <div className="container text-center">
                    <p className="section-meta">Experience</p>
                    <h2 className="section-title">
                        Career
                        <span className="font-display fst-italic">
                            {" "}
                            journey
                        </span>
                    </h2>
                    <p className="section-subtext text-center mx-auto">
                        Where I&apos;ve been and what I&apos;ve built along the
                        way.
                    </p>
                </div>
            </div>
            <div className="explorations-layer">
                <div className="container">
                    <div className="explore-stack">
                        {EXPERIENCES.map((item) => (
                            <article
                                key={item.company}
                                className="explore-card js-parallax-card"
                                data-parallax-speed={item.parallaxSpeed}
                            >
                                <div className="explore-card__content">
                                    <h4 className="explore-card__role">
                                        {item.role}
                                    </h4>
                                    <p className="explore-card__company">
                                        {item.company}
                                    </p>
                                    <p className="explore-card__period">
                                        {item.period}
                                    </p>
                                    <ul className="explore-card__details">
                                        {item.details.map((detail) => (
                                            <li key={detail}>{detail}</li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
