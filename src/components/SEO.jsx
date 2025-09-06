import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    image,
    url,
    canonical,
    schema,
    keywords,
    author = "WeddingSoulMates",
    type = "website",
    locale = "en_US",
    siteName = "WeddingSoulMates - Trusted Matrimony Platform",
    twitterCard = "summary_large_image",
    twitterSite = "@WeddingSoulMates",
    noIndex = false,
    noFollow = false
}) => {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://weddingsoulmates.com' : 'http://localhost:3000';
    const defaultImage = `${baseUrl}/matrimo/images/og-image.png`;
    const defaultDescription = "Find your perfect life partner with WeddingSoulMates - India's most trusted matrimony platform. Join thousands of verified profiles and discover meaningful connections.";

    return (
        <>
            <Helmet>
                {/* Basic Meta Tags */}
                <title>{title}</title>
                <meta name="description" content={description || defaultDescription} />
                <meta name="keywords" content={keywords || "matrimony, marriage, wedding, bride, groom, matrimonial, matchmaking, life partner, marriage bureau, wedding planning, matrimonial site, marriage website, find partner, marriage service, shaadi, muslim matrimony, hindu matrimony, christian matrimony, sikh matrimony, gounder matrimony, chettiar matrimony, brahmin matrimony, vellalar matrimony, naidu matrimony, reddy matrimony, patel matrimony, gujarati matrimony, marathi matrimony, bengali matrimony, punjabi matrimony, tamil matrimony, telugu matrimony, malayalam matrimony, kannada matrimony, hindi matrimony, inter caste marriage, inter religion marriage, all community matrimony, india matrimony, south indian matrimony, north indian matrimony, east indian matrimony, west indian matrimony, verified profiles, trusted matrimony, free matrimony registration"} />
                <meta name="author" content={author} />
                <meta name="robots" content={`${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                {/* Canonical URL */}
                <link rel="canonical" href={canonical || url} />

                {/* Open Graph Meta Tags */}
                <meta property="og:type" content={type} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description || defaultDescription} />
                <meta property="og:image" content={image || defaultImage} />
                <meta property="og:url" content={url} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:locale" content={locale} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={title} />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content={twitterCard} />
                <meta name="twitter:site" content={twitterSite} />
                <meta name="twitter:creator" content={twitterSite} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description || defaultDescription} />
                <meta name="twitter:image" content={image || defaultImage} />
                <meta name="twitter:image:alt" content={title} />

                {/* Additional SEO Meta Tags */}
                <meta name="theme-color" content="#8B4513" />
                <meta name="msapplication-TileColor" content="#8B4513" />
                <meta name="application-name" content="WeddingSoulMates" />
                <meta name="apple-mobile-web-app-title" content="WeddingSoulMates" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />

                {/* Geo Tags for Local SEO */}
                <meta name="geo.region" content="IN-TN" />
                <meta name="geo.placename" content="Coimbatore" />
                <meta name="geo.position" content="11.0168;76.9558" />
                <meta name="ICBM" content="11.0168, 76.9558" />

                {/* Language and Region */}
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="distribution" content="global" />
                <meta name="rating" content="general" />

                {/* Mobile Optimization */}
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="HandheldFriendly" content="true" />
                <meta name="MobileOptimized" content="320" />

                {/* Structured Data */}
                {schema && (
                    <script type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                )}
            </Helmet>
        </>
    );
};

export default SEO;
