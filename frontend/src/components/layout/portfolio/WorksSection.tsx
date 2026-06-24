import { assetPath } from "@/utils/assetPath"

const WORKS = [
    {
        title: 'E-commerce Engine',
        image: '/images/works/ecommerce-engine.jpg',
        imageAlt: 'Thanh toán trực tuyến và giao dịch thương mại điện tử',
        mediaClass: 'work-card__media--one',
        colClass: 'col-12 col-md-7',
        link: 'https://anninhtanthoidai.com/',
    },
    {
        title: 'NFT Game',
        image: '/images/works/nft-game.jpg',
        imageAlt: 'Game NFT với nhân vật 3D và token số hóa',
        mediaClass: 'work-card__media--two',
        colClass: 'col-12 col-md-5',
        link: 'https://pokepop.biz/',
    },
    {
        title: 'Crypto currency exchange',
        image: '/images/works/crypto-exchange.jpg',
        imageAlt: 'Biểu đồ giá và giao dịch tiền mã hóa',
        mediaClass: 'work-card__media--three',
        colClass: 'col-12 col-md-5',
        link: 'https://crxex.com',
    },
    {
        title: 'Defi platform',
        image: '/images/works/defi-platform.svg',
        imageAlt: 'Giao diện DeFi: swap (Uniswap), yield (Aave), lending (Compound)',
        mediaClass: 'work-card__media--four',
        colClass: 'col-12 col-md-7',
        link: 'https://corex.is',
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
                                projects
                            </span>
                        </h2>
                        <p className="section-subtext">
                            A selection of projects I&apos;ve worked on, from
                            concept to launch.
                        </p>
                    </div>
                    {/* <a
                        className="section-btn btn rounded-pill d-none d-md-inline-flex align-items-center"
                        href="#"
                    >
                        View all work
                        <span className="ms-1">↗</span>
                    </a> */}
                </div>
                <div className="row g-4">
                    {WORKS.map((work) => (
                        <div key={work.title} className={work.colClass}>
                            <article className="work-card">
                                <div
                                    className={`work-card__media ${work.mediaClass}`}
                                >
                                    <img
                                        className="work-card__image"
                                        src={assetPath(work.image)}
                                        alt={work.imageAlt}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="work-card__half-tone" />
                                </div>
                                <div className="work-card__hover">
                                    <a className="work-card__pill" target="_blank" href={work.link as string}>
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
