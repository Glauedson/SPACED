export function changePageName(name: string) {
  document.title = name;
}

export function changePageDescription(description: string) {
  let meta = document.querySelector('meta[name="description"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", description);
}

export function changeOpenGraph({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
}) {
  const metaTags = {
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "og:url": url,
    "og:type": "website",
    "og:site_name": "SPACED",
    "og:locale": "pt_BR",
    "twitter:card": "summary_large_image",
  };

  Object.entries(metaTags).forEach(([property, content]) => {
    const attribute = property.startsWith("twitter:")
      ? "name"
      : "property";

    let meta = document.querySelector(
      `meta[${attribute}="${property}"]`
    );

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(attribute, property);
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
  });
}