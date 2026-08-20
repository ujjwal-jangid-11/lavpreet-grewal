import { Helmet } from "react-helmet-async";

const SITE_URL = "https://lavpreetlc2.com";

function SEO({
  title,
  description,
  path = "/",
  image = "/og-image.webp",
}) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Language */}
      <html lang="en" />

      {/* Primary SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="robots"
        content="index, follow, max-image-preview:large"
      />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={url} />

      <meta property="og:image" content={imageUrl} />

      <meta
        property="og:site_name"
        content="Lavpreet Grewal"
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      {/* Twitter / X */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />
    </Helmet>
  );
}

export default SEO;