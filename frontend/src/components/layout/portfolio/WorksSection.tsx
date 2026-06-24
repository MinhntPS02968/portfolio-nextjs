"use client"

import { useTranslation } from "react-i18next"
import { assetPath } from "@/utils/assetPath"

const WORK_ITEMS = [
    {
        id: "ecommerce",
        image: "/images/works/ecommerce-engine.jpg",
        mediaClass: "work-card__media--one",
        colClass: "col-12 col-md-7",
        link: "https://anninhtanthoidai.com/",
    },
    {
        id: "nftGame",
        image: "/images/works/nft-game.jpg",
        mediaClass: "work-card__media--two",
        colClass: "col-12 col-md-5",
        link: "https://pokepop.biz/",
    },
    {
        id: "cryptoExchange",
        image: "/images/works/crypto-exchange.jpg",
        mediaClass: "work-card__media--three",
        colClass: "col-12 col-md-5",
        link: "https://crxex.com",
    },
    {
        id: "defiPlatform",
        image: "/images/works/defi-platform.svg",
        mediaClass: "work-card__media--four",
        colClass: "col-12 col-md-7",
        link: "https://corex.is",
    },
] as const

export default function WorksSection() {
    const { t } = useTranslation()

    return (
        <section className="section-spacing" id="works">
            <div className="container works-container">
                <div className="section-head section-head--split js-inview d-flex flex-wrap align-items-end justify-content-between gap-3">
                    <div className="section-head__left d-flex align-items-center">
                        <span className="section-line" />
                        <p className="section-meta">{t("works.meta")}</p>
                    </div>
                    <div className="section-head__body">
                        <h2 className="section-title">
                            {t("works.title")}
                            <span className="font-display fst-italic">
                                {" "}
                                {t("works.titleAccent")}
                            </span>
                        </h2>
                        <p className="section-subtext">{t("works.subtext")}</p>
                    </div>
                </div>
                <div className="row g-4">
                    {WORK_ITEMS.map((work) => {
                        const title = t(`works.items.${work.id}.title`)
                        return (
                            <div key={work.id} className={work.colClass}>
                                <article className="work-card">
                                    <div
                                        className={`work-card__media ${work.mediaClass}`}
                                    >
                                        <img
                                            className="work-card__image"
                                            src={assetPath(work.image)}
                                            alt={t(
                                                `works.items.${work.id}.imageAlt`,
                                            )}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="work-card__half-tone" />
                                    </div>
                                    <div className="work-card__hover">
                                        <a
                                            className="work-card__pill"
                                            target="_blank"
                                            href={work.link}
                                        >
                                            {t("works.view")} — <em>{title}</em>
                                        </a>
                                    </div>
                                    <h3 className="work-card__title">{title}</h3>
                                </article>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
