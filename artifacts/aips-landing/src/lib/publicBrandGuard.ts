const PUBLIC_NAME = "AI Premium Shop";
const PUBLIC_ACRONYM = /\bAIPS\b/g;
const SKIP_TEXT_TAGS = new Set(["STYLE", "NOSCRIPT", "PRE", "CODE"]);
const TEXT_ATTRIBUTES = ["aria-label", "title", "alt", "placeholder"] as const;

function expandPublicName(value: string) {
  return value.replace(PUBLIC_ACRONYM, PUBLIC_NAME);
}

function sanitizeElement(element: Element) {
  for (const attribute of TEXT_ATTRIBUTES) {
    const current = element.getAttribute(attribute);
    if (!current || !PUBLIC_ACRONYM.test(current)) {
      PUBLIC_ACRONYM.lastIndex = 0;
      continue;
    }
    PUBLIC_ACRONYM.lastIndex = 0;
    const next = expandPublicName(current);
    if (next !== current) element.setAttribute(attribute, next);
  }

  if (element.tagName === "META") {
    const current = element.getAttribute("content");
    if (current) {
      const next = expandPublicName(current);
      if (next !== current) element.setAttribute("content", next);
    }
  }

  if (element.tagName === "SCRIPT" && element.getAttribute("type") === "application/ld+json") {
    const current = element.textContent ?? "";
    const next = expandPublicName(current);
    if (next !== current) element.textContent = next;
  }
}

function sanitizeNode(node: Node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const parent = node.parentElement;
    if (!parent || parent.tagName === "SCRIPT" || SKIP_TEXT_TAGS.has(parent.tagName)) return;
    const current = node.nodeValue ?? "";
    const next = expandPublicName(current);
    if (next !== current) node.nodeValue = next;
    return;
  }

  if (!(node instanceof Element)) return;
  sanitizeElement(node);
  for (const child of node.childNodes) sanitizeNode(child);
}

/**
 * Runtime safety net for the approved public-brand rule.
 *
 * Historical components and catalog copy can still contain the internal acronym
 * while that debt is being removed at source. This guard prevents those legacy
 * strings from reaching a browser user, including late React renders, dialog
 * labels, document titles/meta and JSON-LD inserted by client-side navigation.
 * It deliberately does not touch URLs, test IDs, storage keys or code/data
 * attributes, so internal identifiers remain stable.
 */
export function installPublicBrandGuard() {
  if (typeof document === "undefined" || !document.documentElement) return () => {};

  const root = document.documentElement;
  sanitizeNode(root);

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === "characterData") {
        sanitizeNode(record.target);
        continue;
      }
      if (record.type === "attributes" && record.target instanceof Element) {
        sanitizeElement(record.target);
        continue;
      }
      for (const added of record.addedNodes) sanitizeNode(added);
    }
  });

  observer.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...TEXT_ATTRIBUTES, "content"],
  });

  return () => observer.disconnect();
}
