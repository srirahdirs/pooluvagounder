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
    author = "PooluvaGounder Matrimony",
    type = "website",
    locale = "en_US",
    siteName = "PooluvaGounder Matrimony - Gounder Community Matrimony",
    twitterCard = "summary_large_image",
    twitterSite = "@PooluvaGounder Matrimony",
    noIndex = false,
    noFollow = false
}) => {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://pooluvagounder.com' : 'http://localhost:3000';
    const defaultImage = `${baseUrl}/matrimo/images/og-image.png`;
    const defaultDescription = "Find your perfect Gounder life partner with PooluvaGounder Matrimony - Tamil Nadu's trusted Gounder community matrimony platform. Connect with verified Gounder, Pooluva Gounder, VettuvaGounder, Vettuvar, and Pooluvar brides and grooms from Coimbatore, Chennai, and across Tamil Nadu.";

    return (
        <>
            <Helmet>
                {/* Basic Meta Tags */}
                <title>{title}</title>
                <meta name="description" content={description || defaultDescription} />
                <meta name="keywords" content={keywords || "gounder matrimony, gounder marriage, gounder wedding, gounder bride, gounder groom, gounder community matrimony, tamil gounder matrimony, coimbatore gounder matrimony, chennai gounder matrimony, tamil nadu gounder matrimony, gounder matrimonial site, gounder marriage bureau, gounder matchmaking, gounder life partner, gounder community, gounder caste matrimony, gounder family matrimony, gounder traditional marriage, gounder cultural wedding, gounder community website, gounder matrimonial service, gounder brides, gounder grooms, gounder profiles, gounder matrimony coimbatore, gounder matrimony chennai, gounder matrimony madurai, gounder matrimony trichy, gounder matrimony salem, gounder matrimony erode, gounder matrimony tamilnadu, verified gounder profiles, trusted gounder matrimony, free gounder matrimony registration, pooluva gounder, pooluva gounder matrimony, vettuvagounder matrimony, vettuvar, pooluvar, pooluva gounder marriage, pooluva gounder wedding, vettuvagounder marriage, vettuvagounder wedding, vettuvar matrimony, vettuvar marriage, pooluvar matrimony, pooluvar marriage, pooluva gounder community, vettuvagounder community, vettuvar community, pooluvar community, pooluva gounder brides, pooluva gounder grooms, vettuvagounder brides, vettuvagounder grooms, vettuvar brides, vettuvar grooms, pooluvar brides, pooluvar grooms"} />
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
                <meta name="application-name" content="PooluvaGounder Matrimony" />
                <meta name="apple-mobile-web-app-title" content="PooluvaGounder Matrimony" />
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
