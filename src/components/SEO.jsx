import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, canonical, schema }) => (
    <>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <link rel="canonical" href={canonical} />

            {/* If schema data is provided, render it */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    </>
);

export default SEO;
