import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import keywords from './src/data/keywords.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const websiteUrl = 'https://interentspeedtest.com';

const escapeXml = (string) => {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

const pages = [
  { loc: `${websiteUrl}/`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1.0 },
  { loc: `${websiteUrl}/about.html`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
  { loc: `${websiteUrl}/contact.html`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
  { loc: `${websiteUrl}/privacy-policy.html`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
  { loc: `${websiteUrl}/terms.html`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
  { loc: `${websiteUrl}/index.html`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1.0 },
];

const keywordPages = keywords.map(keyword => {
  const formattedKeyword = escapeXml(keyword.toLowerCase().replace(/ /g, '-'));
  return {
    loc: `${websiteUrl}/${formattedKeyword}.html`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  };
});

const generateSitemap = () => {
  const allPages = [...pages, ...keywordPages];

  const urlEntries = allPages.map(url => `
    <url>
      <loc>${url.loc}</loc>
      <lastmod>${url.lastmod}</lastmod>
      <changefreq>${url.changefreq}</changefreq>
      <priority>${url.priority}</priority>
    </url>
  `).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlEntries}
    </urlset>`;

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap.trim());
  console.log('Sitemap generated successfully!');
};

generateSitemap();
