import { readFileSync, existsSync } from 'node:fs';

const pages = ['index.html', 'concept.html', 'works.html', 'quality.html', 'contact.html'];
const expectedLinks = ['./', 'concept.html', 'works.html', 'quality.html', 'contact.html'];
const errors = [];

for (const page of pages) {
  if (!existsSync(page)) {
    errors.push(`${page}: file is missing`);
    continue;
  }

  const html = readFileSync(page, 'utf8');
  const titleCount = (html.match(/<title>[^<]+<\/title>/gi) || []).length;
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/gi) || []).length;

  if (titleCount !== 1) errors.push(`${page}: expected one non-empty title, found ${titleCount}`);
  if (h1Count !== 1) errors.push(`${page}: expected one h1, found ${h1Count}`);
  if (!/name=["']description["'][^>]+content=["'][^"']+/i.test(html)) {
    errors.push(`${page}: meta description is missing or empty`);
  }
  if (/\b(?:href|src)=["']\/(?!\/)/i.test(html)) {
    errors.push(`${page}: root-relative href/src is not GitHub Pages subpath safe`);
  }
  if (!/class=["'][^"']*menu-button[^"']*["'][^>]+aria-expanded=/i.test(html)) {
    errors.push(`${page}: accessible menu button with aria-expanded is missing`);
  }
  if (!/<noscript>[\s\S]*?<nav[\s>]/i.test(html)) {
    errors.push(`${page}: no-JS navigation fallback is missing`);
  }

  for (const href of expectedLinks) {
    if (!html.includes(`href="${href}"`) && !html.includes(`href='${href}'`)) {
      errors.push(`${page}: global navigation link missing: ${href}`);
    }
  }

  const localLinks = [...html.matchAll(/href=["']([^"'#?]+)(?:[?#][^"']*)?["']/gi)]
    .map((match) => match[1])
    .filter((href) => !/^(?:https?:|mailto:|tel:)/i.test(href));

  for (const href of localLinks) {
    const target = href === './' ? 'index.html' : href;
    if (target.endsWith('.html') && !existsSync(target)) {
      errors.push(`${page}: broken local link: ${href}`);
    }
  }
}

if (errors.length) {
  console.error(`Five-page QA failed with ${errors.length} issue(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('Five-page QA passed: structure, navigation, metadata, and local links are valid.');
