export default function handler(req, res) {
  res.statusCode = 410;
  res.setHeader('cache-control', 'no-store');
  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.setHeader('x-robots-tag', 'noindex, nofollow, noarchive');
  res.end('Sitemap removido.');
}
