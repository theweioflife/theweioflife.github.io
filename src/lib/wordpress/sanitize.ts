import DOMPurify from "isomorphic-dompurify";

const allowedTags = [
  "p",
  "a",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "blockquote",
  "figure",
  "figcaption",
  "img",
  "h2",
  "h3",
  "h4",
  "code",
  "pre",
  "br"
];

const allowedAttrs = [
  "href",
  "title",
  "target",
  "rel",
  "src",
  "alt",
  "width",
  "height",
  "loading",
  "decoding",
  "class"
];

export function sanitizeHtml(html: string, imageAltFallback = "") {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttrs,
    FORBID_ATTR: ["style", "srcdoc"],
    ALLOW_DATA_ATTR: false
  });

  return normalizeImages(normalizeLinks(sanitized), imageAltFallback);
}

export function stripHtml(html: string) {
  return sanitizeHtml(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeLinks(html: string) {
  return html.replace(/<a\b([^>]*)>/gi, (match, attrs: string) => {
    const href = attrs.match(/\shref=(["'])(.*?)\1/i)?.[2] ?? "";
    const target = attrs.match(/\starget=(["'])(.*?)\1/i)?.[2] ?? "";
    if (!href || href.startsWith("/") || href.startsWith("#") || target !== "_blank") {
      return match;
    }

    const hasRel = /\srel=(["'])(.*?)\1/i.test(attrs);
    if (hasRel) {
      return match.replace(/\srel=(["'])(.*?)\1/i, ' rel="noopener noreferrer"');
    }

    return `<a${attrs} rel="noopener noreferrer">`;
  });
}

function normalizeImages(html: string, fallbackAlt: string) {
  if (!fallbackAlt) {
    return html;
  }

  return html.replace(/<img\b([^>]*)>/gi, (match, attrs: string) => {
    const hasAlt = /\salt=(["'])(.*?)\1/i.test(attrs);
    if (!hasAlt) {
      return `<img${attrs} alt="${escapeAttr(fallbackAlt)}">`;
    }

    return match.replace(/\salt=(["'])(.*?)\1/i, (_altMatch, quote: string, value: string) => {
      return value.trim() ? ` alt=${quote}${value}${quote}` : ` alt=${quote}${escapeAttr(fallbackAlt)}${quote}`;
    });
  });
}

function escapeAttr(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
