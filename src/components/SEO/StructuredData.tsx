export const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SWT Labs",
    "url": "https://swtlabs.pl",
    "logo": "https://swtlabs.pl/webfavicon.png",
    "description": "Agencja technologiczna specjalizująca się w AI oraz rozwoju aplikacji mobilnych i webowych. Tworzymy innowacyjne rozwiązania dla firm, obniżając koszty dzięki AI.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rybnik",
      "addressCountry": "Poland"
    },
    "sameAs": [
      "https://www.linkedin.com/company/swtlabs",
      "https://github.com/swtlabs"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "kontakt@swtlabs.pl",
      "availableLanguage": ["Polish", "English"]
    },
    "offers": {
      "@type": "Offer",
      "itemOffered": [
        {
          "@type": "Service",
          "name": "AI Agents Development",
          "description": "Implementation of AI agents with RAG systems for business automation"
        },
        {
          "@type": "Service",
          "name": "Web & Mobile Development",
          "description": "Custom web and mobile application development at reduced costs"
        },
        {
          "@type": "Service",
          "name": "AI-Powered Marketing",
          "description": "Marketing automation and lead generation with AI technology"
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://swtlabs.pl",
    "name": "SWT Labs",
    "description": "Tworzymy nowoczesne i przystępne cenowo aplikacje webowe oraz mobilne dla firm. 🚀",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://swtlabs.pl/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Breadcrumb schema for main navigation paths
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Strona główna",
        "item": "https://swtlabs.pl/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Technologie",
        "item": "https://swtlabs.pl/tech"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://swtlabs.pl/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Wycena projektu",
        "item": "https://swtlabs.pl/estimate"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI",
        "item": "https://swtlabs.pl/ai"
      }
    ]
  };

  // Local Business schema for improved local search visibility
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SWT Labs",
    "image": "https://swtlabs.pl/webfavicon.png",
    "url": "https://swtlabs.pl",
    "telephone": "+48 575 970 131",
    "email": "kontakt@swtlabs.pl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ul. Wiejska 1C",
      "addressLocality": "Rybnik",
      "postalCode": "44-200",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.0925,
      "longitude": 18.5411
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "PLN, EUR, USD",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer"
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </>
  );
}; 