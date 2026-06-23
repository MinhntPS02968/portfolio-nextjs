const STATS = [
    { value: "5+", label: "Years Experience" },
    { value: "3", label: "Companies Worked" },
    { value: "7+", label: "Tech Skills" },
]

export default function StatsSection() {
    return (
        <section className="section-spacing" id="stats">
            <div className="container">
                <div className="row g-4 text-center">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="col-12 col-md-4">
                            <div className="stat-card">
                                <h3>{stat.value}</h3>
                                <p>{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
