import { readFileSync, existsSync } from 'node:fs';

const pages = ['index.html', 'concept.html', 'works.html', 'quality.html', 'contact.html'];
const navTargets = ['index.html', 'concept.html', 'works.html', 'quality.html', 'contact.html'];
const errors = [];

for (const page of pages) {
  if (!existsSync(page)) {
    errors.push(`${page}: missing`);
    continue;
  }
  const html = readFileSync(page, 'utf8');
  const titleCount = (html.match(/<title>[^<]+<\/title>/gi) || []).length;
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/gi) || []).length;
  if (titleCount !== 1) errors.push(`${page}: expected one title, found ${titleCount}`);
  if (h1Count !== 1) errors.push(`${page}: expected one H1, found ${h1Count}`);
  if (!/name=["']description["'][^>]+content=["'][^"']+/i.test(html)) errors.push(`${page}: missing meta description`);
  if (/\b(?:href|src)=["']\/(?!\/)/i.test(html)) errors.push(`${page}: root-relative internal asset/link`);
  if (!/class=["'][^"']*menu-button[^"']*["'][^>]+aria-expanded=/i.test(html)) errors.push(`${page}: missing accessible menu button`);
  if (!/<noscript>[\s\S]*?<nav[\s>]/i.test(html)) errors.push(`${page}: missing no-JS navigation`);
  if ((html.match(/aria-current=["']page["']/gi) || []).length < 1) errors.push(`${page}: missing current-page state`);
  for (const target of navTargets) {
    if (!html.includes(`href="${target}"`) && !html.includes(`href='${target}'`)) errors.push(`${page}: global link missing: ${target}`);
  }
  for (const match of html.matchAll(/(?:href|src)=["']([^"'#?]+)(?:[?#][^"']*)?["']/gi)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:)/i.test(target)) continue;
    if ((target.endsWith('.html') || target.startsWith('assets/')) && !existsSync(target)) errors.push(`${page}: broken local target: ${target}`);
  }
}
if (errors.length) {
  console.error(`Five-page QA failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log('Five-page QA passed.');
