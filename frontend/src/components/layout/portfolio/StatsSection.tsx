"use client"

import { useTranslation } from "react-i18next"

const STAT_ITEMS = [
    { value: "5+", labelKey: "stats.yearsExperience" },
    { value: "3", labelKey: "stats.companiesWorked" },
    { value: "7+", labelKey: "stats.techSkills" },
] as const

export default function StatsSection() {
    const { t } = useTranslation()

    return (
        <section className="section-spacing" id="stats">
            <div className="container">
                <div className="row g-4 text-center">
                    {STAT_ITEMS.map((stat) => (
                        <div key={stat.labelKey} className="col-12 col-md-4">
                            <div className="stat-card">
                                <h3>{stat.value}</h3>
                                <p>{t(stat.labelKey)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
