import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://quickcalcs.net';
const SITE_NAME = 'QuickCalc';

function Seo({ title, description, faqs }) {
  const { pathname } = useLocation();
  const fullTitle = title + ' | ' + SITE_NAME;
  const canonicalUrl = SITE_URL + pathname;

  useEffect(() => {
    document.title = fullTitle;

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:site_name', SITE_NAME, 'property');

    // Canonical link
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // JSON-LD structured data
    let script = document.getElementById('seo-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      url: canonicalUrl,
      description: description,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    });

    // FAQ JSON-LD structured data
    let faqScript = document.getElementById('seo-faq-jsonld');
    if (faqs && faqs.length > 0) {
      if (!faqScript) {
        faqScript = document.createElement('script');
        faqScript.id = 'seo-faq-jsonld';
        faqScript.type = 'application/ld+json';
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    } else if (faqScript) {
      faqScript.remove();
    }
  }, [title, description, fullTitle, canonicalUrl, faqs]);

  return null;
}

function setMeta(nameOrProp, content, attr = 'name') {
  let meta = document.querySelector(`meta[${attr}="${nameOrProp}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, nameOrProp);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export default Seo;
