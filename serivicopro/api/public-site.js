const SUPABASE_URL = 'https://dwuhhdxhxveucajhejrk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3dWhoZHhoeHZldWNhamhlanJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MjU1NzgsImV4cCI6MjA4OTUwMTU3OH0.aCa2l7V9ScB5LuqGD1B3za0WIKqj7PmtJtIWk7AcyYQ';

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[ch]));
}

function initials(name) {
  return String(name || 'AP')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase() || 'AP';
}

function whatsappUrl(number, name) {
  const digits = String(number || '').replace(/\D/g, '');
  if (digits.length < 10) return '#contato';
  const normalized = digits.startsWith('55') ? digits : `55${digits}`;
  const message = encodeURIComponent(`Olá, ${name || ''}! Vi sua página no AutônomoPro e gostaria de solicitar um orçamento.`);
  return `https://wa.me/${normalized}?text=${message}`;
}

function servicePhotos(services) {
  const photos = [];
  for (const service of services || []) {
    for (const photo of service.fotos || []) {
      const url = typeof photo === 'string' ? photo : photo.url || photo.publicUrl || '';
      if (url) photos.push({ url, label: photo.tipo || service.tipo || 'Serviço realizado' });
    }
  }
  return photos.slice(0, 9);
}

async function fetchSite(slug) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_site`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ p_slug: slug })
  });
  if (!response.ok) return null;
  return response.json();
}

function renderNotFound() {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <title>Página não publicada | AutônomoPro</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fff8f3;color:#17110f;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif}
    main{width:min(560px,calc(100% - 32px));background:#fff;border:1px solid #eadfd8;border-radius:20px;padding:28px;box-shadow:0 20px 60px rgba(46,31,24,.12)}
    h1{font-family:Georgia,serif;font-size:2.2rem;line-height:1;margin:0 0 10px}
    p{color:#706864;font-size:1rem;margin:0 0 18px}
    a{display:inline-flex;background:#f4510b;color:#fff;border-radius:999px;padding:13px 18px;text-decoration:none;font-weight:800}
  </style>
</head>
<body>
  <main>
    <h1>Página ainda não publicada</h1>
    <p>O profissional ainda não publicou esta página ou o link foi digitado incorretamente.</p>
    <a href="/">Voltar ao AutônomoPro</a>
  </main>
</body>
</html>`;
}

function renderSite(data, slug, origin) {
  const perfil = data.perfil || {};
  const stats = data.stats || {};
  const services = data.servicos || [];
  const reviews = data.avaliacoes || [];
  const photos = servicePhotos(services);
  const catalog = Array.isArray(perfil.servicos_catalogo) ? perfil.servicos_catalogo : [];
  const offered = (catalog.length ? catalog : [...new Set(services.map(item => item.tipo).filter(Boolean))]).slice(0, 9);
  const name = perfil.nome || 'Profissional AutônomoPro';
  const type = perfil.tipo || 'Serviços profissionais';
  const area = perfil.area || 'Atendimento local';
  const description = perfil.descricao || `${name} atua com ${type.toLowerCase()} em ${area}. Veja serviços, fotos, avaliações e chame pelo WhatsApp.`;
  const title = `${name} | ${type}${perfil.area ? ` em ${perfil.area}` : ''}`;
  const canonical = `${origin}/p/${encodeURIComponent(slug)}`;
  const cta = perfil.cta || 'Solicitar orçamento';
  const wa = whatsappUrl(perfil.wpp, name);
  const logo = perfil.logo_url || '';
  const cover = photos[0]?.url || logo || '';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    telephone: perfil.wpp || undefined,
    address: perfil.endereco || perfil.area || undefined,
    areaServed: perfil.area || undefined,
    image: cover || undefined,
    url: canonical,
    aggregateRating: stats.total_avaliacoes ? {
      '@type': 'AggregateRating',
      ratingValue: stats.media_avaliacoes,
      reviewCount: stats.total_avaliacoes
    } : undefined
  };

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${esc(canonical)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(canonical)}">
  ${cover ? `<meta property="og:image" content="${esc(cover)}">` : ''}
  <meta name="theme-color" content="#f4510b">
  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
  <style>
    :root{--brand:#f4510b;--ink:#17110f;--muted:#6f6661;--line:#eadfd8;--paper:#fff8f3;--soft:#f7efe8}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:linear-gradient(180deg,#fff8f3,#fff);color:var(--ink);font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.5}
    a{text-decoration:none;color:inherit}.shell{width:min(1080px,calc(100% - 32px));margin:0 auto}.top{position:sticky;top:0;z-index:10;background:rgba(255,248,243,.9);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}
    .top-in{height:68px;display:flex;align-items:center;justify-content:space-between;gap:12px}.brand{display:flex;align-items:center;gap:10px;font-weight:900}.bolt{width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,var(--brand),#ffb000);display:grid;place-items:center;color:#fff;box-shadow:0 14px 30px rgba(244,81,11,.26)}
    .btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;background:var(--brand);color:#fff;padding:13px 19px;font-weight:900;box-shadow:0 16px 34px rgba(244,81,11,.24)}.btn.alt{background:#fff;color:var(--ink);border:1px solid var(--line);box-shadow:none}
    .hero{padding:42px 0 32px}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:30px;align-items:center}.tag{display:inline-flex;border:1px solid var(--line);border-radius:999px;background:#fff;padding:8px 12px;font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.06em;color:#5d5450}
    h1{font-family:Georgia,serif;font-size:clamp(2.3rem,6vw,4.7rem);line-height:.96;letter-spacing:-.05em;margin:16px 0 14px}.lead{font-size:clamp(1.02rem,2vw,1.2rem);color:#514844;max-width:660px;margin:0 0 22px}.actions{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
    .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.stat{background:#fff;border:1px solid var(--line);border-radius:16px;padding:14px}.stat strong{display:block;font-size:1.45rem}.stat span{color:var(--muted);font-size:.82rem;font-weight:800}
    .card{background:#fff;border:1px solid var(--line);border-radius:26px;box-shadow:0 22px 70px rgba(46,31,24,.14);overflow:hidden}.cover{min-height:380px;position:relative;background:linear-gradient(135deg,#2a150e,#f4510b);display:flex;align-items:flex-end;padding:22px;color:#fff}.cover>img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.cover:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.74))}.cover-in{position:relative;z-index:1}.logo{width:78px;height:78px;border-radius:18px;background:#fff;color:var(--brand);display:grid;place-items:center;overflow:hidden;font-weight:950;font-size:1.35rem;margin-bottom:14px}.logo img{width:100%;height:100%;object-fit:contain}
    section{padding:30px 0}h2{font-family:Georgia,serif;font-size:clamp(1.75rem,4vw,2.45rem);line-height:1;margin:0 0 8px}.sub{color:var(--muted);font-weight:600;margin:0 0 18px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.item,.review,.empty{background:#fff;border:1px solid var(--line);border-radius:18px;padding:17px;box-shadow:0 10px 32px rgba(46,31,24,.07)}.item strong{display:block;margin-bottom:6px}.item span,.review small{color:var(--muted)}
    .gallery{display:grid;grid-template-columns:1.1fr .9fr .9fr;grid-auto-rows:210px;gap:12px}.photo{position:relative;overflow:hidden;border-radius:20px;background:var(--soft);border:1px solid var(--line)}.photo:first-child{grid-row:span 2}.photo img{width:100%;height:100%;object-fit:cover}.photo span{position:absolute;left:12px;bottom:12px;background:rgba(23,17,15,.72);color:#fff;border-radius:999px;padding:7px 10px;font-size:.76rem;font-weight:900}
    .reviews{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.rating{font-weight:950;color:var(--brand);margin-bottom:8px}.contact-box{background:linear-gradient(135deg,#1d1410,#3b2117);color:#fff;border-radius:22px;padding:24px;display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center}.contact-box .sub{color:rgba(255,255,255,.72);margin:0}.footer{border-top:1px solid var(--line);padding:24px 0;color:var(--muted);font-size:.88rem}
    @media(max-width:840px){.hero-grid,.grid,.reviews,.contact-box{grid-template-columns:1fr}.stats{grid-template-columns:1fr}.gallery{grid-template-columns:1fr;grid-auto-rows:230px}.photo:first-child{grid-row:auto}.cover{min-height:300px}.actions .btn{width:100%}}
  </style>
</head>
<body>
  <header class="top"><div class="shell top-in"><a class="brand" href="/"><span class="bolt">AP</span><span>AutônomoPro</span></a><a class="btn" href="${esc(wa)}" target="_blank" rel="noopener">Contato</a></div></header>
  <main>
    <section class="hero"><div class="shell hero-grid"><div><span class="tag">${esc(area)}</span><h1>${esc(name)}</h1><p class="lead">${esc(description)}</p><div class="actions"><a class="btn" href="${esc(wa)}" target="_blank" rel="noopener">${esc(cta)}</a><a class="btn alt" href="#trabalhos">Ver trabalhos</a></div><div class="stats"><div class="stat"><strong>${stats.total_avaliacoes ? Number(stats.media_avaliacoes || 0).toFixed(1) : '-'}</strong><span>Média nas avaliações</span></div><div class="stat"><strong>${stats.total_avaliacoes || 0}</strong><span>Avaliações recebidas</span></div><div class="stat"><strong>${stats.servicos_realizados || 0}</strong><span>Serviços realizados</span></div></div></div><aside class="card"><div class="cover">${cover ? `<img class="bg" src="${esc(cover)}" alt="">` : ''}<div class="cover-in"><div class="logo">${logo ? `<img src="${esc(logo)}" alt="Logo de ${esc(name)}">` : esc(initials(name))}</div><h2>${esc(name)}</h2><p class="sub" style="color:rgba(255,255,255,.82);margin:0">${esc(type)}</p></div></div></aside></div></section>
    <section><div class="shell"><h2>Serviços oferecidos</h2><p class="sub">Uma visão rápida do que este profissional atende.</p><div class="grid">${offered.length ? offered.map(item => `<article class="item"><strong>${esc(item)}</strong><span>Atendimento organizado com registro pelo AutônomoPro.</span></article>`).join('') : '<div class="empty">Os serviços oferecidos ainda não foram preenchidos.</div>'}</div></div></section>
    <section id="trabalhos"><div class="shell"><h2>Trabalhos recentes</h2><p class="sub">Fotos registradas em serviços concluídos.</p><div class="gallery">${photos.length ? photos.map(photo => `<figure class="photo"><img src="${esc(photo.url)}" alt="${esc(photo.label)}" loading="lazy"><span>${esc(photo.label)}</span></figure>`).join('') : '<div class="empty">Este profissional ainda não publicou fotos de serviços.</div>'}</div></div></section>
    <section><div class="shell"><h2>Avaliações</h2><p class="sub">Opiniões enviadas por clientes após o atendimento.</p><div class="reviews">${reviews.length ? reviews.slice(0, 6).map(review => `<article class="review"><div class="rating">${Number(review.estrelas || 0).toFixed(1)} de 5</div><p>${esc(review.comentario || 'Cliente satisfeito com o atendimento.')}</p><small>${esc(review.cliente || 'Cliente')}</small></article>`).join('') : '<div class="empty">Ainda não há avaliações publicadas.</div>'}</div></div></section>
    <section id="contato"><div class="shell"><div class="contact-box"><div><h2>Fale com ${esc(name)}</h2><p class="sub">${esc(perfil.area ? `Atendimento em ${perfil.area}. Envie sua solicitação pelo WhatsApp.` : 'Envie sua solicitação pelo WhatsApp.')}</p></div><a class="btn" href="${esc(wa)}" target="_blank" rel="noopener">Abrir WhatsApp</a></div></div></section>
  </main>
  <footer class="footer"><div class="shell">Página criada com AutônomoPro.</div></footer>
</body>
</html>`;
}

export default async function handler(req, res) {
  const rawSlug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;
  const slug = String(rawSlug || '').trim().toLowerCase();
  const origin = `https://${req.headers.host || 'autonomopro.vercel.app'}`;

  if (!slug) {
    res.statusCode = 404;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end(renderNotFound());
    return;
  }

  try {
    const data = await fetchSite(slug);
    if (!data) {
      res.statusCode = 404;
      res.setHeader('cache-control', 's-maxage=60, stale-while-revalidate=300');
      res.setHeader('content-type', 'text/html; charset=utf-8');
      res.end(renderNotFound());
      return;
    }

    res.statusCode = 200;
    res.setHeader('cache-control', 's-maxage=300, stale-while-revalidate=3600');
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end(renderSite(data, slug, origin));
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader('content-type', 'text/html; charset=utf-8');
    res.end(renderNotFound());
  }
}
