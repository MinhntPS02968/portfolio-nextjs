import type { Metadata } from 'next'
import { Suspense } from 'react'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'

import { I18nProvider } from '@/providers/I18nProvider'
import { assetPath } from '@/utils/assetPath'

import '../../style/scss/style.scss'

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Frontend Deverlop',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    metadataBase: new URL(
        `https://minhntps02968.github.io${siteBasePath}`,
    ),
    icons: {
        icon: assetPath('/images/favicon.png'),
        shortcut: assetPath('/images/favicon.png'),
        apple: assetPath('/images/favicon.png'),
    },
    openGraph: {
        title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Frontend Deverlop',
        description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
        images: [assetPath('/images/favicon.png')],
    },
    twitter: {
        card: 'summary',
        title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Frontend Deverlop',
        description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
        images: [assetPath('/images/favicon.png')],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Frontend Deverlop'
    const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION

    return (
        <html className="mdl-js">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no"
                />
                <meta name="keywords" content="" />
                <meta name="description" content={siteDescription || ''} />

                {/* Google Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
                />
                {/* Stitch Fonts & Material Symbols */}
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

                {/* Template CSS */}
                <link rel="stylesheet" href={assetPath('/client/css/bootstrap.min.css')} />
                <link rel="stylesheet" href={assetPath('/client/css/all.min.css')} />
                <link rel="stylesheet" href={assetPath('/client/css/flag-icons.min.css')} />



                {/* Open Graph cho Web3 wallets */}
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={assetPath('/images/favicon.png')} />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="512" />
                <meta property="og:image:height" content="512" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={siteTitle} />
                <meta name="twitter:description" content={siteDescription} />
                <meta name="twitter:image" content={assetPath('/images/favicon.png')} />

                {/* Additional meta for Web3 wallets */}
                <meta name="application-name" content="Tradelis Exchange" />
                <meta name="apple-mobile-web-app-title" content="Tradelis" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
            </head>
            <body
                data-bs-spy="scroll"
                data-bs-target="#corexScrollNav"
                data-bs-offset="90"
                data-bs-smooth-scroll="true"
                tabIndex={0}
            >
                {/* Global Providers - Wrap toàn bộ ứng dụng */}
                <I18nProvider>
                    <Suspense>
                        {children}
                        <ToastContainer />
                    </Suspense>
                </I18nProvider>

                <Script
                    src={assetPath('/client/js/all.min.js')}
                    strategy="afterInteractive"
                />
                <Script
                    src={assetPath('/client/js/bootstrap.bundle.min.js')}
                    strategy="afterInteractive"
                />
            </body>
        </html>
    )
}
