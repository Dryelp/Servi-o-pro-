const SUPABASE_URL = 'https://dwuhhdxhxveucajhejrk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3dWhoZHhoeHZldWNhamhlanJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MjU1NzgsImV4cCI6MjA4OTUwMTU3OH0.aCa2l7V9ScB5LuqGD1B3za0WIKqj7PmtJtIWk7AcyYQ';

function xmlEsc(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  }[ch]));
}

async function fetchSlugs() {
  const url = `${SUPABASE_URL}/rest/v1/profiles?select=site_slug&site_publicado=eq.true&site_slug=not.is.null`;
  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      authorization: `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  if (!response.ok) return [];
  const rows = await response.json();
  return rows.map(row => row.site_slug).filter(Boolean);
}

export default async function handler(req, res) {
  const origin = `https://${req.headers.host || 'autonomopro.vercel.app'}`;
  const slugs = await fetchSlugs();
  const urls = [
    `<url><loc>${xmlEsc(origin)}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ...slugs.map(slug => `<url><loc>${xmlEsc(origin)}/p/${xmlEsc(slug)}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`)
  ].join('');

  res.statusCode = 200;
  res.setHeader('content-type', 'application/xml; charset=utf-8');
  res.setHeader('cache-control', 's-maxage=300, stale-while-revalidate=3600');
  res.end(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
}
