export const StructuredData = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SWT Labs",
    "url": "https://swtlabs.pl",
    "logo": "https://swtlabs.pl/logo.png",
    "description": "Agencja technologiczna specjalizująca się w AI i rozwoju aplikacji",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Warsaw",
      "addressCountry": "Poland"
    },
    "sameAs": [
      "https://www.linkedin.com/company/swtlabs",
      "https://github.com/swtlabs"
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}; 