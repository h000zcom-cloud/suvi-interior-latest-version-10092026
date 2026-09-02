import { useEffect } from "react";
import { site } from "@/content/site";

const DEFAULT_TITLE = "Suvi Interior | Interior Design & Custom Furniture Studio in Nashik";
const DEFAULT_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/f269e9d1-749a-45df-9bb4-b97d233efcd1/images/cbd42da2d5aeab75d8c03160dffa60bc7caccaef27cadd63015168b228dfde6a.jpeg";

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const localBusiness = (origin) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${origin}/#business`,
  name: site.name,
  description: site.description,
  url: origin,
  telephone: site.phone.tel,
  image: DEFAULT_IMAGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.streetAddress,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postalCode,
    addressCountry: site.country,
  },
  areaServed: { "@type": "City", name: "Nashik" },
  knowsAbout: ["Interior Design", "Custom Furniture", "Modular Kitchens", "TV Units", "Furniture Manufacturing"],
  ...(site.hours.length
    ? { openingHours: site.hours.map((h) => `${h.days} ${h.time}`) }
    : {}),
  ...(Object.values(site.social).some(Boolean)
    ? { sameAs: Object.values(site.social).filter(Boolean) }
    : {}),
});

export const breadcrumbs = (origin, items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${origin}${it.path}`,
  })),
});

const EMPTY = [];

export const Seo = ({ title, description = site.description, path = "/", image = DEFAULT_IMAGE, type = "website", crumbs, jsonLd = EMPTY }) => {
  useEffect(() => {
    const origin = window.location.origin;
    const fullTitle = title ? `${title} | Suvi Interior` : DEFAULT_TITLE;
    const url = `${origin}${path}`;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    const graph = [localBusiness(origin), ...(crumbs ? [breadcrumbs(origin, crumbs)] : []), ...jsonLd];
    let script = document.getElementById("seo-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }, [title, description, path, image, type, crumbs, jsonLd]);

  return null;
};
