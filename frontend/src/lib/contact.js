import { site } from "@/content/site";

export const telLink = () => `tel:${site.phone.tel}`;

export const waLink = (message = site.whatsapp.defaultMessage) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const directionsLink = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`;

export const mapEmbedUrl = () =>
  `https://maps.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
