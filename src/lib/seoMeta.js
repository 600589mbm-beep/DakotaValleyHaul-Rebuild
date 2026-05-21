// Per-page SEO meta updater for the SPA.
// Subpage useEffects call setPageMeta({ title, description, canonical, ogImage })
// on mount; the returned cleanup function restores the previous values on unmount.
// Covers: document.title, meta[name="description"], link[rel="canonical"],
// og:title, og:description, og:url, og:image, twitter:title, twitter:description,
// twitter:image, twitter:url.

const SITE_DEFAULT_OG_IMAGE = 'https://dakotavalleyjunkremoval.com/attached_assets/IMG_7020_1750653174383.jpeg';

function getAttr(selector, attr = 'content') {
  return document.querySelector(selector)?.getAttribute(attr) || null;
}
function setAttr(selector, value, attr = 'content') {
  const el = document.querySelector(selector);
  if (el && value != null) el.setAttribute(attr, value);
}

export function setPageMeta({ title, description, canonical, ogImage }) {
  const prev = {
    title: document.title,
    description: getAttr('meta[name="description"]'),
    canonical: getAttr('link[rel="canonical"]', 'href'),
    ogTitle: getAttr('meta[property="og:title"]'),
    ogDescription: getAttr('meta[property="og:description"]'),
    ogUrl: getAttr('meta[property="og:url"]'),
    ogImage: getAttr('meta[property="og:image"]'),
    twitterTitle: getAttr('meta[name="twitter:title"]'),
    twitterDescription: getAttr('meta[name="twitter:description"]'),
    twitterImage: getAttr('meta[name="twitter:image"]'),
    twitterUrl: getAttr('meta[name="twitter:url"]'),
  };

  if (title) {
    document.title = title;
    setAttr('meta[property="og:title"]', title);
    setAttr('meta[name="twitter:title"]', title);
  }
  if (description) {
    setAttr('meta[name="description"]', description);
    setAttr('meta[property="og:description"]', description);
    setAttr('meta[name="twitter:description"]', description);
  }
  if (canonical) {
    setAttr('link[rel="canonical"]', canonical, 'href');
    setAttr('meta[property="og:url"]', canonical);
    setAttr('meta[name="twitter:url"]', canonical);
  }
  const finalImage = ogImage || SITE_DEFAULT_OG_IMAGE;
  setAttr('meta[property="og:image"]', finalImage);
  setAttr('meta[name="twitter:image"]', finalImage);

  return function restore() {
    if (prev.title) document.title = prev.title;
    if (prev.description) setAttr('meta[name="description"]', prev.description);
    if (prev.canonical) setAttr('link[rel="canonical"]', prev.canonical, 'href');
    if (prev.ogTitle) setAttr('meta[property="og:title"]', prev.ogTitle);
    if (prev.ogDescription) setAttr('meta[property="og:description"]', prev.ogDescription);
    if (prev.ogUrl) setAttr('meta[property="og:url"]', prev.ogUrl);
    if (prev.ogImage) setAttr('meta[property="og:image"]', prev.ogImage);
    if (prev.twitterTitle) setAttr('meta[name="twitter:title"]', prev.twitterTitle);
    if (prev.twitterDescription) setAttr('meta[name="twitter:description"]', prev.twitterDescription);
    if (prev.twitterImage) setAttr('meta[name="twitter:image"]', prev.twitterImage);
    if (prev.twitterUrl) setAttr('meta[name="twitter:url"]', prev.twitterUrl);
  };
}
