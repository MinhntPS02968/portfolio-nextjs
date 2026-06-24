"use client"

import { useTranslation } from "react-i18next"

const SKILL_ITEMS = [
    { id: "frontendCore", icon: "fa-solid fa-code" },
    { id: "frameworks", icon: "fa-solid fa-layer-group" },
    { id: "devTools", icon: "fa-brands fa-git-alt" },
    { id: "aiTooling", icon: "fa-solid fa-robot" },
] as const

export default function JournalSection() {
    const { t } = useTranslation()

    return (
        <section className="section-spacing" id="journal">
            <div className="container works-container">
                <div className="section-head section-head--split js-inview d-flex flex-wrap align-items-end justify-content-between gap-3">
                    <div className="section-head__left d-flex align-items-center">
                        <span className="section-line" />
                        <p className="section-meta">{t("journal.meta")}</p>
                    </div>
                    <div className="section-head__body">
                        <h2 className="section-title">
                            {t("journal.title")}
                            <span className="font-display fst-italic">
                                {" "}
                                {t("journal.titleAccent")}
                            </span>
                        </h2>
                        <p className="section-subtext">{t("journal.subtext")}</p>
                    </div>
                </div>
                <div className="journal-list d-grid gap-3">
                    {SKILL_ITEMS.map((skill) => (
                        <article key={skill.id} className="journal-item">
                            <div className="journal-item__icon">
                                <i className={skill.icon} />
                            </div>
                            <div className="journal-item__body">
                                <h3>{t(`journal.items.${skill.id}.title`)}</h3>
                                <p>
                                    {t(`journal.items.${skill.id}.description`)}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
