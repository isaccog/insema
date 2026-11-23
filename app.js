/* =====================================================================
   INSÉMA — costruisce le pagine a partire da testi.js
   (per cambiare i testi NON serve toccare questo file)
   ===================================================================== */
(function () {
  const T = window.TESTI;
  const S = T.sito;
  const body = document.body;
  const page = body.dataset.page;

  /* ---------- helpers ---------- */
  const md = (s) => !s ? "" : String(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*(?!\s)([^*]+?)\*(?!\w)/g, "$1<em>$2</em>")
    .replace(/==(.+?)==/g, '<span class="pink">$1</span>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  const paras = (s) => String(s || "").trim().split(/\n\s*\n/).map((p) => `<p>${md(p.trim())}</p>`).join("");
  const num = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const ext = (l) => /^https?:/.test(l) ? ' target="_blank" rel="noopener"' : "";
  const btn = (b, cls = "") => b ? `<a class="btn ${cls}" href="${b.link}"${ext(b.link)}>${b.testo}</a>` : "";
  const more = (l) => l ? `<a class="more" href="${l.link}">${l.testo}</a>` : "";
  const dial = (d, cls = "") => d ? `<span class="dial ${cls}"><span class="dial-c">${d.frase}</span><span class="dial-it">${d.traduzione}</span></span>` : "";
  const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const two = (k) => String(k + 1).padStart(2, "0");

  const stat = (n) => `<div class="stat"><strong>${n.valore}</strong><p>${md(n.testo)}</p>${n.fonte ? `<small>${n.fonte}</small>` : ""}</div>`;

  /* ---------- layout comune ---------- */
  function header() {
    const here = location.pathname.split("/").pop() || "index.html";
    const isProg = here.startsWith("programma");
    const links = S.menu.map((m) => {
      const on = m.link === here || (isProg && m.link === "programma.html");
      return `<a href="${m.link}"${on ? ' class="on"' : ""}>${m.testo}</a>`;
    }).join("");
    return `<header class="nav">
      <a href="index.html" class="nav-logo"><img src="img/logo/logo-magenta.svg" alt="${S.nome}: home"></a>
      <button class="burger" aria-label="Apri il menu" aria-expanded="false">☰</button>
      <nav>${links}<a href="${S.bottoneMenu.link}" class="btn btn-small">${S.bottoneMenu.testo}</a></nav>
    </header>`;
  }

  function ticker() {
    const row = S.fascia.map((p) => `${p} ✦ `).join("");
    return `<div class="ticker" aria-hidden="true"><div class="ticker-track"><span>${row}</span><span>${row}</span></div></div>`;
  }

  function footer() {
    const F = S.footer;
    return `<footer class="footer"><div class="wrap footer-grid">
      <div>
        <img src="img/logo/logo-esteso-perla.svg" alt="${S.nome}" class="footer-logo">
        <p class="footer-motto">${F.motto}</p>
        <p class="footer-contacts"><a href="mailto:${S.email}">${S.email}</a><br><a href="${S.instagram}" target="_blank" rel="noopener">Instagram ${S.instagramNome}</a></p>
      </div>
      <nav class="footer-nav"><a href="index.html">Home</a>${S.menu.map((m) => `<a href="${m.link}">${m.testo}</a>`).join("")}<a href="${S.bottoneMenu.link}">${S.bottoneMenu.testo}</a></nav>
      <div class="dizionario">
        <h3>${F.titoloDizionario}</h3>
        <dl>${F.dizionario.map(([d, i]) => `<div><dt>${d}</dt><dd>${i}</dd></div>`).join("")}</dl>
      </div>
    </div></footer>`;
  }

  /* ---------- grafici ---------- */
  function chart(g) {
    if (g.tipo === "classifica") {
      const max = Math.max(...g.dati.map((d) => d[1]));
      const pct = (v) => (v / max * 100).toFixed(2);
      return `<figure class="chart">
        <h3 class="chart-title">${g.titolo}</h3><p class="chart-unit">${g.unita}</p>
        <div class="bars" style="--avg:${pct(g.media.valore)}">
          ${g.dati.map(([n, v]) => `<div class="bar-row${n === g.evidenzia ? " hl" : ""}"><span>${n}</span><div class="track"><div class="bar" style="--w:${pct(v)}"></div><b>${num(v)}</b></div></div>`).join("")}
          <div class="avg"><span>${g.media.etichetta}</span></div>
        </div>
        <figcaption>${g.fonte}</figcaption></figure>`;
    }
    if (g.tipo === "confronto") {
      const bar = (x, max, light) => `<div class="hbar"><div class="hb${light ? " light" : ""}" style="width:${(x[1] / max * 62).toFixed(1)}%"></div><span>${x[0]}: ${x[2]}</span></div>`;
      return `<figure class="chart chart-blue">
        <h3 class="chart-title">${g.titolo}</h3>
        ${g.gruppi.map((x) => { const m = Math.max(x.a[1], x.b[1]); return `<p class="chart-label">${x.titolo}</p>${bar(x.a, m, true)}${bar(x.b, m)}<p class="chart-note">${x.nota}</p>`; }).join("")}
        <figcaption>${g.fonte}</figcaption></figure>`;
    }
    return "";
  }

  /* ---------- schede capitoli ---------- */
  const tcard = (t) => `<a class="tcard t-${t.colore}" href="${t.pagina}">
      <span class="tnum">${t.numero}</span>
      <span class="ttag">${t.titolo}</span>
      <h3>${t.slogan}</h3>
      <p>${md(t.anteprima)}</p>
      <span class="tgo" aria-hidden="true">→</span></a>`;

  /* ---------- i 100 fondatori ---------- */
  const FO = T.fondatori;
  const daysLeft = () => Math.ceil((new Date(FO.scadenza + "T23:59:59") - new Date()) / 86400000);
  const counter = (cls = "") => {
    const d = daysLeft();
    const pct = Math.min(100, FO.attuali / FO.obiettivo * 100);
    return `<div class="counter ${cls}">
      <div class="counter-n"><strong>${FO.attuali}</strong><span>${FO.contatore} ${FO.obiettivo}</span></div>
      <div class="counter-bar"><div style="width:${pct}%"></div></div>
      ${d > 0 ? `<p class="counter-d"><strong>${d}</strong> ${FO.giorni}</p>` : ""}
    </div>`;
  };
  const wall = () => {
    const named = T.chiSiamo.persone.lista.map((p) => p.nome).concat(FO.muro.nomi);
    const n = Math.min(FO.attuali, FO.obiettivo);
    const filled = shuffle(named.slice(0, n));
    while (filled.length < n) filled.push("");
    let html = filled.map((nm, k) => `<span class="dot on c${k % 5}" title="${nm}">${nm ? initials(nm) : "✓"}</span>`).join("");
    for (let k = n; k < FO.obiettivo; k++) {
      html += k === n
        ? `<a class="dot you" href="aiutaci.html#modulo" title="${FO.postoLibero}">tu</a>`
        : `<span class="dot"></span>`;
    }
    return `<div class="wall" aria-label="${FO.attuali} ${FO.contatore} ${FO.obiettivo}">${html}</div>`;
  };
  const deal = () => `<div class="deal">
      <div><h3>${FO.chiediamo.titolo}</h3><ol>${FO.chiediamo.punti.map((p) => `<li><span>${md(p)}</span></li>`).join("")}</ol></div>
      <div><h3>${FO.ottieni.titolo}</h3><ol>${FO.ottieni.punti.map((p) => `<li><span>${md(p)}</span></li>`).join("")}</ol></div>
    </div>`;
  const shareUrl = () => location.href.split("#")[0].replace(/[^/]*$/, "");
  const share = () => `<div class="share">
      <h3>${FO.condividi.titolo}</h3><p>${md(FO.condividi.testo)}</p>
      <a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(FO.condividi.messaggio + shareUrl())}">${FO.condividi.bottone}</a>
    </div>`;
  const wallSection = (bg = "s-paper") => `
    <section class="sec ${bg}" id="muro">
      <div class="wrap">
        <div class="wall-head"><img class="wall-illo" src="img/ill/mani-blu.webp" alt=""><div><h2 class="h2 h-navy">${FO.muro.titolo}</h2><p class="note">${FO.muro.nota}</p></div><p class="wall-count"><strong>${FO.attuali}</strong>/${FO.obiettivo}</p></div>
        ${wall()}
        ${deal()}
        <div class="ctas center-row">${btn(FO.bottone)}</div>
      </div>
    </section>`;


  /* ---------- illustrazioni disegnate (pagina «Il nostro piano») ---------- */
  // Como di notte: la luna sopra Brunate, la funicolare, il faro, il lago
  const moonArt = () => {
    const stars = [[40,60],[110,140],[190,40],[260,110],[330,30],[380,170],[90,250],[300,230],[420,80],[700,40],[760,120],[730,330],[20,180],[230,300]]
      .map(([x, y], k) => k % 3 ? `<circle cx="${x}" cy="${y}" r="${k % 2 ? 2 : 3}" fill="#fef0e7"/>`
        : `<path d="M${x} ${y - 9}L${x + 2.5} ${y - 2.5}L${x + 9} ${y}L${x + 2.5} ${y + 2.5}L${x} ${y + 9}L${x - 2.5} ${y + 2.5}L${x - 9} ${y}L${x - 2.5} ${y - 2.5}Z" fill="#fcdf6c"/>`).join("");
    const cols = ["#f6b8ca", "#fcdf6c", "#7ea3d6", "#fef0e7", "#4bbecf", "#f8c8d7"];
    let x = 0, houses = "";
    [34, 52, 40, 28, 46, 36, 30, 50, 38, 44, 32].forEach((h, k) => {
      const w = [30, 36, 26, 32][k % 4];
      if (k === 5) { // il Duomo
        houses += `<rect x="${x}" y="${430 - 62}" width="50" height="62" fill="#fef0e7"/><path d="M${x + 6} ${430 - 62}a19 19 0 0 1 38 0z" fill="#4bbecf"/><rect x="${x + 22}" y="${430 - 92}" width="6" height="12" fill="#fef0e7"/><rect x="${x + 18}" y="${430 - 40}" width="14" height="22" rx="7" fill="#6f0f38"/>`;
        x += 50; return;
      }
      houses += `<rect x="${x}" y="${430 - h}" width="${w}" height="${h}" fill="${cols[k % cols.length]}"/><rect x="${x + 7}" y="${430 - h + 9}" width="6" height="8" fill="#e6007e" opacity=".75"/>${w > 28 ? `<rect x="${x + w - 13}" y="${430 - h + 9}" width="6" height="8" fill="#274798" opacity=".6"/>` : ""}`;
      x += w;
    });
    const refl = [[140, .9], [112, .8], [92, .7], [70, .55], [52, .45], [34, .35], [20, .25]]
      .map(([w, o], k) => `<rect x="${560 - w / 2 + (k % 2 ? 8 : -6)}" y="${446 + k * 20}" width="${w}" height="7" rx="3.5" fill="#fef0e7" opacity="${o}"/>`).join("");
    return `<svg class="moon-art" viewBox="0 0 800 620" role="img" aria-label="La luna piena sopra Brunate, la funicolare che sale e il lago di Como">
      ${stars}
      <circle cx="560" cy="170" r="150" fill="#fef0e7" opacity=".08"/>
      <circle cx="560" cy="170" r="118" fill="#fef0e7"/>
      <g fill="#f8c8d7"><circle cx="520" cy="140" r="22"/><circle cx="604" cy="205" r="16"/><circle cx="588" cy="118" r="10"/><circle cx="526" cy="214" r="12"/><circle cx="626" cy="158" r="8"/></g>
      <line x1="482" y1="86" x2="474" y2="26" stroke="#6f0f38" stroke-width="4" stroke-linecap="round"/>
      <path d="M474 26 Q497 22 520 32 L522 58 Q499 48 477 52 Z" fill="#e6007e"/>
      <text x="497" y="49" text-anchor="middle" font-family="Bowlby One, Impact, sans-serif" font-size="22" fill="#fff">é</text>
      <path d="M0 362 C80 330 160 318 240 348 C285 365 325 392 360 430 L0 430Z" fill="#6f0f38" opacity=".55"/>
      <path d="M300 430 C360 400 420 340 500 300 C560 270 620 250 700 246 C740 244 780 250 800 256 L800 430Z" fill="#6f0f38"/>
      <circle cx="777.5" cy="211" r="16" fill="#fcdf6c" opacity=".25"/>
      <rect x="772" y="214" width="11" height="36" fill="#fef0e7"/><rect x="772" y="226" width="11" height="6" fill="#e6007e"/><circle cx="777.5" cy="211" r="6" fill="#fcdf6c"/>
      <g fill="#fcdf6c"><circle cx="652" cy="258" r="3"/><circle cx="668" cy="254" r="3"/><circle cx="684" cy="258" r="3"/><circle cx="742" cy="256" r="3"/><circle cx="758" cy="260" r="3"/></g>
      <line x1="430" y1="432" x2="720" y2="247" stroke="#f6b8ca" stroke-width="10" stroke-dasharray="3 9"/>
      <line x1="430" y1="432" x2="720" y2="247" stroke="#fef0e7" stroke-width="3"/>
      <rect x="414" y="418" width="30" height="14" fill="#fef0e7"/><path d="M410 418h38l-6-8h-26z" fill="#e6007e"/>
      <rect x="706" y="234" width="30" height="14" fill="#fef0e7"/><path d="M702 234h38l-6-8h-26z" fill="#e6007e"/>
      <g class="cabin"><g>
        <rect x="-24" y="-22" width="48" height="20" rx="4" fill="#e6007e"/>
        <rect x="-18" y="-17" width="9" height="8" rx="2" fill="#fef0e7"/><rect x="-5" y="-17" width="9" height="8" rx="2" fill="#fef0e7"/><rect x="8" y="-17" width="9" height="8" rx="2" fill="#fef0e7"/>
        <animateMotion dur="14s" repeatCount="indefinite" rotate="auto" path="M430 432 L720 247" keyPoints="0;1;1;0;0" keyTimes="0;.42;.5;.92;1" calcMode="linear"/>
      </g></g>
      <rect x="0" y="430" width="800" height="190" fill="#0b6780"/>
      ${houses}
      ${refl}
      <g stroke="#4bbecf" stroke-width="3" stroke-linecap="round" opacity=".8"><path d="M60 480h40M150 540h30M340 470h36M420 580h44M680 500h30M720 560h40M300 600h28"/></g>
      <g transform="translate(250 512)"><path d="M-40 0 Q0 16 40 0 L34 9 Q0 22 -34 9Z" fill="#fef0e7"/><path d="M-22 0a10 12 0 0 1 20 0M0 0a10 12 0 0 1 20 0" fill="none" stroke="#fef0e7" stroke-width="2.5"/></g>
    </svg>`;
  };

  // 15 persone attorno a una
  const person = (x, y, s, cls, attrs = "") => `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})"${attrs}>
      <circle cx="0" cy="-16" r="15"/><path d="M-24 28 Q-24 2 0 2 Q24 2 24 28Z"/></g>`;
  const orbit = (state) => {
    const R = 150, out = [], lines = [];
    for (let k = 0; k < 15; k++) {
      const a = (k * 24 - 90) * Math.PI / 180;
      const x = (R * Math.cos(a)).toFixed(1), y = (R * Math.sin(a)).toFixed(1);
      lines.push(`<line x1="0" y1="0" x2="${x}" y2="${y}" class="ray${state[k] ? " on" : ""}"/>`);
      out.push(person(x, y, .78, `p15 c${k % 5}${state[k] ? " on" : ""}`, ` data-k="${k}" role="checkbox" tabindex="0" aria-checked="${!!state[k]}" aria-label="Persona ${k + 1}"`));
    }
    return `<svg class="orbit" viewBox="-200 -200 400 400" aria-label="Una persona al centro e 15 persone attorno">
      <circle r="${R}" class="ring"/>${lines.join("")}
      <circle r="44" class="halo"/>${person(0, 4, 1.25, "p-tu")}
      <text y="74" class="tu-label" text-anchor="middle">tu</text>
      ${out.join("")}</svg>`;
  };

  /* =================================================================
     PAGINE
     ================================================================= */
  const pages = {};

  /* ---------------- HOME ---------------- */
  pages.home = () => {
    const H = T.home;
    return `
    <section class="hero s-cream">
      <div class="wrap hero-grid">
        <div>
          <p class="kicker">${FO.sopratitolo}</p>
          <h1 class="h-hero">${FO.titolo}</h1>
          ${FO.domanda ? `<p class="hero-sub">${FO.domanda}</p>` : ""}
          <p class="lead">${md(FO.testo)}</p>
          <div class="ctas">${btn(FO.bottone)}${btn(FO.bottone2, "btn-ghost")}</div>
        </div>
        <div class="hero-side">
          <img class="hero-illo" src="img/ill/citta-vino.webp" alt="Persone che salgono insieme una scalinata sul lago di Como">
          ${counter()}
        </div>
      </div>
    </section>
    ${ticker()}
    ${wallSection()}

    <section class="sec s-navy piano-band">
      <div class="wrap piano-band-grid">
        <div>
          <p class="kicker">${H.piano.sopratitolo}</p>
          <h2 class="h2 h2-cream">${H.piano.titolo}</h2>
          <p class="lead">${md(H.piano.testo)}</p>
          <a class="btn" href="${H.piano.link.link}">${H.piano.link.testo}</a>
        </div>
        ${moonArt()}
      </div>
    </section>

    <section class="sec s-paper">
      <div class="wrap">
        <div class="sec-head">${dial(H.comoOggi.dialetto)}<h2 class="h2">${H.comoOggi.titolo}</h2></div>
        <div class="stats stats-4">${H.comoOggi.numeri.map(stat).join("")}</div>
        ${more(H.comoOggi.link)}
      </div>
    </section>

    <section class="sec s-cream valori-sec">
      <div class="wrap valori-grid">
        <div>
          <p class="kicker">${H.valori.sopratitolo}</p>
          <h2 class="h2">${H.valori.titolo}</h2>
          ${more(H.valori.link)}
        </div>
        <ul class="valori-panel">${T.manifesto.valori.map((v) => `<li>${v.titolo}</li>`).join("")}</ul>
      </div>
    </section>

    <section class="sec s-blush">
      <div class="wrap">
        <h2 class="h2">${H.programma.titolo}</h2>
        <p class="intro">${md(H.programma.testo)}</p>
        <div class="tcards">${T.programma.temi.map(tcard).join("")}</div>
        ${more(H.programma.link)}
      </div>
    </section>

    <section class="sec s-navy">
      <div class="wrap">
        <h2 class="h2 h2-cream">${H.perche.titolo}</h2>
        <ol class="perche">${H.perche.punti.map((p, k) => `<li><span>${k + 1}</span><p>${md(p)}</p></li>`).join("")}</ol>
      </div>
    </section>

    <section class="sec s-magenta">
      <div class="wrap">
        <h2 class="h-hero h-cream center">${H.chiusura.titolo}</h2>
        <p class="lead center">${md(H.chiusura.testo)}</p>
        <div class="azioni">${H.chiusura.azioni.map((a) => `
          <div class="azione"><h3>${a.titolo}</h3><p>${md(a.testo)}</p>
          <a class="btn btn-navy" href="${a.link}"${ext(a.link)}>${a.bottone}</a></div>`).join("")}
        </div>
      </div>
    </section>`;
  };

  /* ---------------- CHI SIAMO ---------------- */
  pages["chi-siamo"] = () => {
    const C = T.chiSiamo;
    const people = C.persone.lista.map((p) => ({ ...p })).concat([{ ...C.persone.tu, tu: true }]);
    const faces = shuffle(people).map((p, k) => {
      const shape = `b${Math.floor(Math.random() * 4)}`;
      const rot = (Math.random() * 8 - 4).toFixed(1);
      const pic = p.foto
        ? `<div class="blob ${shape}"><img src="${p.foto}" alt="${p.nome}"></div>`
        : `<div class="blob ${shape}"><span>${p.tu ? "?" : initials(p.nome)}</span></div>`;
      const inner = `${pic}<figcaption><strong>${p.nome}</strong>${p.frase ? `<span>${md(p.frase)}</span>` : ""}</figcaption>`;
      return p.tu
        ? `<a class="face face-tu" href="${p.link}" style="--r:${rot}deg">${inner}</a>`
        : `<figure class="face c${k % 5}" style="--r:${rot}deg">${inner}</figure>`;
    }).join("");

    return `
    <section class="page-hero s-cream">
      <div class="wrap">
        <div class="hero-grid">
          <div>
            <h1 class="h-hero h-navy">${C.hero.titolo}</h1>
            <p class="h-hero pink">${C.hero.titolo2}</p>
            <div class="ctas">${btn(C.hero.bottone)}</div>
          </div>
          <img class="hero-illo" src="img/ill/persone-blu.webp" alt="Persone che guardano insieme la mappa di Como">
        </div>
      </div>
    </section>

    <section class="sec s-blush">
      <div class="wrap">
        <div class="sec-head">${dial(C.persone.dialetto, "dial-lg")}${C.persone.nota ? `<p class="note">${C.persone.nota}</p>` : ""}</div>
        <div class="faces">${faces}</div>
      </div>
    </section>
    ${ticker()}
    ${wallSection()}

    <section class="sec s-paper">
      <div class="wrap two-col">
        <div class="prose"><h2 class="h2">${C.storia.titolo}</h2>${paras(C.storia.testo)}</div>
        <div class="name-box"><h2 class="h3">${C.nome.titolo}</h2><p>${md(C.nome.testo)}</p></div>
      </div>
    </section>

    <section class="sec s-navy">
      <div class="wrap">
        <h2 class="h2 h2-cream">${C.obiettivi.titolo}</h2>
        <div class="obiettivi">
          <div><h3>${C.obiettivi.breve.titolo}</h3><p>${md(C.obiettivi.breve.testo)}</p></div>
          <div><h3>${C.obiettivi.lungo.titolo}</h3><p>${md(C.obiettivi.lungo.testo)}</p></div>
        </div>
      </div>
    </section>`;
  };

  /* ---------------- MANIFESTO ---------------- */
  pages.manifesto = () => {
    const M = T.manifesto;
    return `
    <section class="page-hero s-cream">
      <div class="wrap">
        <p class="kicker">${M.hero.sopratitolo}</p>
        <h1 class="h-mega outline">${M.hero.titolo}</h1>
        <p class="lead">${md(M.hero.testo)}</p>
      </div>
    </section>

    <section class="sec s-paper">
      <div class="wrap">
        <ol class="valori-list">${M.valori.map((v, k) => `
          <li><span class="vnum">${two(k)}</span><h2>${v.titolo}</h2><p>${md(v.testo)}</p></li>`).join("")}
        </ol>
      </div>
    </section>

    <section class="sec s-navy">
      <div class="wrap">
        <div class="stile-head">
          <div><h2 class="h2 h2-cream">${M.stile.titolo}</h2><p class="intro">${md(M.stile.testo)}</p></div>
          <img src="img/ill/media-perla.webp" alt="">
        </div>
        <div class="stile">${M.stile.punti.map((p) => `<div><h3>${p.titolo}</h3><p>${md(p.testo)}</p></div>`).join("")}</div>
      </div>
    </section>

    <section class="sec s-navy no-sec">
      <div class="wrap">
        <h2 class="h2 h2-cream">${M.no.titolo}</h2>
        <ul class="no-list">${M.no.lista.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>
    </section>

    <section class="sec s-magenta">
      <div class="wrap center">
        <p class="h-hero h-cream">${M.chiusura.titolo}</p>
        <p class="h-hero h-plum">${M.chiusura.titolo2}</p>
      </div>
    </section>`;
  };

  /* ---------------- PROGRAMMA ---------------- */
  pages.programma = () => {
    const P = T.programma;
    return `
    <section class="page-hero s-blush prog-hero">
      <div class="wrap center">
        <p class="kicker kicker-navy">${P.hero.sopratitolo}</p>
        <h1 class="h-mega white-out">${P.hero.titolo}</h1>
        <p class="hero-sub h-navy">${P.hero.sottotitolo}</p>
        <p class="lead narrow">${md(P.hero.testo)}</p>
      </div>
    </section>

    <section class="sec s-cream">
      <div class="wrap two-col">
        <div class="prose">
          <div class="sec-head">${dial(P.racconto.dialetto)}<h2 class="h2">${P.racconto.titolo}</h2></div>
          ${paras(P.racconto.testo)}
        </div>
        <img class="side-illo" src="img/ill/cittaq-vino.webp" alt="Una città che cresce senza lasciare indietro nessuno">
      </div>
    </section>

    <section class="sec s-paper">
      <div class="wrap">
        <h2 class="h2 h-navy">${P.titoloCapitoli}</h2>
        <div class="tcards tcards-big">${P.temi.map(tcard).join("")}</div>
        <p class="note boxed">${md(P.nota)}</p>
      </div>
    </section>

    <section class="sec s-navy">
      <div class="wrap cta-row">
        <div><h2 class="h2 h2-cream">${P.cta.titolo}</h2><p class="lead">${md(P.cta.testo)}</p></div>
        ${btn(P.cta.bottone)}
      </div>
    </section>`;
  };

  /* ---------------- SINGOLO CAPITOLO ---------------- */
  pages.tema = () => {
    const P = T.programma, E = P.etichette;
    const i = P.temi.findIndex((t) => t.id === body.dataset.tema);
    const t = P.temi[i], next = P.temi[(i + 1) % P.temi.length];
    const probBg = t.colore === "bianco" ? "s-blush" : "s-paper";
    document.title = `${t.titolo}: ${t.slogan} · ${S.nome}`;
    return `
    <section class="page-hero t-${t.colore} thero">
      <div class="wrap">
        <a class="back" href="programma.html">${E.tornaAlProgramma}</a>
        <div class="thero-grid">
          <div>
            <p class="kicker">Capitolo ${t.numero} · ${t.titolo}</p>
            <h1 class="h-hero">${t.slogan}</h1>
            <p class="claim">${md(t.claim)}</p>
          </div>
          <div class="thero-side">
            ${t.illustrazione ? `<img class="thero-illo" src="${t.illustrazione}" alt="">` : ""}
            ${dial(t.dialetto, "dial-lg")}
          </div>
        </div>
      </div>
    </section>

    <section class="sec ${probBg}">
      <div class="wrap">
        <h2 class="h2 h-navy">${E.problema}</h2>
        <div class="prob-grid">
          <div class="prose">${paras(t.problema.testo)}</div>
          <div class="stats stats-col">${t.problema.numeri.map(stat).join("")}</div>
        </div>
        ${t.problema.grafico ? chart(t.problema.grafico) : ""}
      </div>
    </section>

    <section class="sec t-${t.colore}">
      <div class="wrap">
        <h2 class="h2">${E.proposte}</h2>
        <ol class="props">${t.proposte.map((p, k) => `<li><span class="pnum">${two(k)}</span><h3>${p.titolo}</h3><p>${md(p.testo)}</p></li>`).join("")}</ol>
      </div>
    </section>

    <section class="sec s-cream">
      <div class="wrap tema-end">
        <div class="say">
          <h2 class="h3">${E.diciLaTua}</h2>
          <p>${md(E.diciLaTuaTesto)}</p>
          <a class="btn" href="aiutaci.html#modulo">${E.diciLaTuaBottone}</a>
        </div>
        <div class="next">
          <p class="kicker">${E.prossimo}</p>
          ${tcard(next)}
        </div>
      </div>
    </section>`;
  };


  /* ---------------- IL NOSTRO PIANO ---------------- */
  pages.piano = () => {
    const P = T.piano, M = P.missione;
    const pct = Math.min(100, FO.attuali / FO.obiettivo * 100);
    return `
    <section class="page-hero s-navy piano-hero">
      <div class="wrap hero-grid">
        <div>
          <p class="kicker">${P.hero.sopratitolo}</p>
          <h1 class="h-hero h-cream">${P.hero.titolo}</h1>
          <p class="h-hero pink">${P.hero.titolo2}</p>
          <p class="lead">${md(P.hero.testo)}</p>
          <div class="ctas">${btn(P.hero.bottone)}${btn(P.hero.bottone2, "btn-ghost")}</div>
        </div>
        ${moonArt()}
      </div>
    </section>

    <section class="sec s-yellow invito-sec">
      <div class="wrap">
        <div class="invito">
          <div>
            <p class="invito-tag">${P.invito.etichetta}</p>
            <h2 class="h2">${P.invito.titolo}</h2>
            <p class="lead">${md(P.invito.testo)}</p>
          </div>
          <div class="invito-side">
            <dl>${P.invito.dettagli.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
            <a class="btn" id="accetta" href="#missione">${P.invito.bottone}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="sec s-cream" id="percorso">
      <div class="wrap">
        <div class="sec-head">${dial(P.percorso.dialetto)}<h2 class="h2">${P.percorso.titolo}</h2></div>
        <ol class="tappe">${P.percorso.tappe.map((t, k) => `
          <li class="tappa tappa-${k}">
            <div class="planet"><span>${t.numero}</span></div>
            <p class="kicker">${two(k)} · ${t.fase}</p>
            <h3>${t.numero} ${t.nome}</h3>
            <p class="tappa-when">${t.quando}</p>
            <p>${md(t.testo)}</p>
            ${k === 0 ? `<div class="here"><strong>${P.percorso.siamoQui}</strong> ${FO.attuali}/${FO.obiettivo}<div class="counter-bar"><div style="width:${pct}%"></div></div></div>` : ""}
          </li>`).join("")}
        </ol>
      </div>
    </section>

    <section class="sec s-yellow conti-sec">
      <div class="wrap">
        <h2 class="h2">${P.conti.titolo}</h2>
        <div class="conti">${P.conti.righe.map(([n, l, op]) => `<div><strong>${n}</strong><span>${l}</span></div>${op ? `<b>${op}</b>` : ""}`).join("")}</div>
      </div>
    </section>

    <section class="sec s-paper">
      <div class="wrap prob-grid">
        <div class="prose"><h2 class="h2 h-navy">${P.perche.titolo}</h2>${paras(P.perche.testo)}</div>
        <div class="stats stats-col">${P.perche.numeri.map(stat).join("")}</div>
      </div>
    </section>

    <section class="sec s-blush" id="missione">
      <div class="wrap missione">
        <div>
          <p class="kicker">${M.sopratitolo}</p>
          <h2 class="h2">${M.titolo}</h2>
          <p class="intro">${md(M.testo)}</p>
          <p class="note">${md(M.istruzioni)}</p>
          <p class="m-count"><strong id="m-n">0</strong> ${M.contatore} <button type="button" class="m-reset" id="m-reset">${M.azzera}</button></p>
          <p class="m-done" id="m-done" hidden>${M.completata}</p>
        </div>
        <div id="orbit-box"></div>
      </div>
      <div class="wrap m-cols">
        <div class="m-card">
          <h3>${M.chi.titolo}</h3>
          <ul class="m-chips">${M.chi.lista.map((x) => `<li>${md(x)}</li>`).join("")}</ul>
        </div>
        <div class="m-card">
          <h3>${M.come.titolo}</h3>
          <ol class="m-steps">${M.come.passi.map((x) => `<li><span><strong>${x.titolo}</strong>${md(x.testo)}</span></li>`).join("")}</ol>
          <p class="m-rule">${md(M.come.regola)}</p>
        </div>
      </div>
      <div class="wrap center-row ctas">
        <a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(M.condividi + shareUrl() + "piano.html")}">${M.bottoneCondividi}</a>
      </div>
    </section>

    <section class="sec s-magenta">
      <div class="wrap center">
        <h2 class="h-hero h-cream">${P.chiusura.titolo}</h2>
        <p class="lead">${md(P.chiusura.testo)}</p>
        <div class="ctas center-row">${btn(P.chiusura.bottone, "btn-navy")}</div>
      </div>
    </section>`;
  };

  /* ---------------- AIUTACI ---------------- */
  pages.aiutaci = () => {
    const A = T.aiutaci, F = A.modulo;
    return `
    <section class="page-hero s-navy">
      <div class="wrap">
        <div class="hero-grid">
          <div>
            <p class="oval">${A.hero.sopratitolo}</p>
            <h1 class="h-hero h-cream">${A.hero.titolo}</h1>
            <p class="lead">${md(A.hero.testo)}</p>
            ${counter("counter-dark")}
          </div>
          <img class="hero-illo" src="img/ill/mani-perla.webp" alt="Tante mani una sull'altra">
        </div>
      </div>
    </section>
    <section class="sec s-blush" id="modulo">
      <div class="wrap form-wrap">
        <form class="form" id="join-form" novalidate>
          <h2>${F.titolo}</h2>
          <p class="form-sub">${md(F.sottotitolo)}</p>
          <div class="form-row">
            <input type="text" name="nome" placeholder="${F.nome}" aria-label="${F.nome}" autocomplete="name" required>
            <input type="tel" name="telefono" placeholder="${F.telefono}" aria-label="${F.telefono}" autocomplete="tel" required>
          </div>
          <div class="form-row">
            <input type="email" name="email" placeholder="${F.email}" aria-label="${F.email}" autocomplete="email">
            <input type="text" name="quartiere" placeholder="${F.quartiere}" aria-label="${F.quartiere}" required>
          </div>
          <fieldset><legend>${F.esserci.domanda}</legend>
            <div class="radios">${F.esserci.opzioni.map((o, k) => `<label class="radio"><input type="radio" name="esserci" value="${o}"${k === 0 ? " checked" : ""} required><span>${o}</span></label>`).join("")}</div>
          </fieldset>
          <fieldset><legend>${F.gruppi}</legend>
            <div class="chips">${A.gruppi.lista.map((g) => `<label class="chip"><input type="checkbox" name="gruppi" value="${g.nome}"><span>${g.nome}</span></label>`).join("")}</div>
          </fieldset>
          <fieldset><legend>${F.quando.domanda}</legend>
            <div class="chips">${F.quando.opzioni.map((o) => `<label class="chip"><input type="checkbox" name="quando" value="${o}"><span>${o}</span></label>`).join("")}</div>
          </fieldset>
          <input type="text" name="fonte" placeholder="${F.fonte}" aria-label="${F.fonte}">
          <textarea name="messaggio" rows="4" placeholder="${F.messaggio}" aria-label="${F.messaggio}"></textarea>
          <fieldset><legend>${F.ponte.domanda}</legend>
            <div class="radios radios-row">${F.ponte.opzioni.map((o) => `<label class="radio"><input type="radio" name="ponte" value="${o}" required><span>${o}</span></label>`).join("")}</div>
          </fieldset>
          <label class="check"><input type="checkbox" name="privacy" required> <span>${F.privacy}</span></label>
          <button type="submit" class="btn">${F.bottone}</button>
          <p class="form-msg" role="status" hidden></p>
          <div class="after" hidden>${share()}</div>
          ${F.linkGoogle ? `<p class="form-alt">${md(F.linkGoogle).replace("<a ", '<a target="_blank" rel="noopener" ')}</p>` : ""}
        </form>
        <aside class="side-cards">
          <div class="side-card">
            <h3>${A.fondi.titolo}</h3>
            <p>${md(A.fondi.testo)}</p>
            ${S.linkDonazioni ? `<a class="btn btn-navy" href="${S.linkDonazioni}"${ext(S.linkDonazioni)}>${A.fondi.bottone}</a>` : `<p class="small">${md(A.fondi.senzaLink)}</p>`}
          </div>
          <div class="side-card">
            <h3>Contatti</h3>
            <p><a href="mailto:${S.email}">${S.email}</a><br><a href="${S.instagram}" target="_blank" rel="noopener">${S.instagramNome}</a></p>
          </div>
        </aside>
      </div>
    </section>

    <section class="sec s-cream" id="gruppi">
      <div class="wrap">
        <h2 class="h2 h-navy">${A.gruppi.titolo}</h2>
        <p class="intro">${md(A.gruppi.testo)}</p>
        <div class="gruppi">${A.gruppi.lista.map((g, k) => `
          <button type="button" class="gruppo" data-g="${g.nome}" aria-pressed="false" style="--r:${(k % 2 ? 1.5 : -1.5)}deg">
            <span class="g-check" aria-hidden="true">✓</span><h3>${g.nome}</h3><p>${md(g.testo)}</p>
          </button>`).join("")}
        </div>
      </div>
    </section>

    <section class="sec s-paper">
      <div class="wrap">
        <h2 class="h2 h-navy">${A.appuntamenti.titolo}</h2>
        <ol class="timeline">${A.appuntamenti.lista.map((x) => `<li><h3>${x.quando}</h3><p>${md(x.cosa)}</p></li>`).join("")}</ol>
      </div>
    </section>

`;
  };

  /* =================================================================
     MONTAGGIO
     ================================================================= */
  if (S.adobeFontsKit) {
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = `https://use.typekit.net/${S.adobeFontsKit}.css`;
    document.head.appendChild(l);
    document.documentElement.classList.add("poleno");
  }
  const key = page === "chi-siamo" ? "chiSiamo" : page;
  if (T[key] && T[key].titoloPagina) document.title = T[key].titoloPagina;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = S.descrizione;

  const bar = page === "aiutaci" ? "" : `<a class="mobile-bar" href="aiutaci.html#modulo"><span>${FO.attuali}/${FO.obiettivo}</span>${FO.barraMobile}</a>`;
  document.getElementById("app").innerHTML = header() + `<main>${(pages[page] || pages.home)()}</main>` + footer() + bar;
  if (bar) body.classList.add("has-bar");

  /* menu mobile */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });

  /* gruppi ↔ modulo */
  const cards = document.querySelectorAll(".gruppo");
  const boxes = document.querySelectorAll('.chips input[name="gruppi"]');
  const sync = () => boxes.forEach((b) => {
    const c = document.querySelector(`.gruppo[data-g="${b.value}"]`);
    if (c) c.setAttribute("aria-pressed", b.checked);
  });
  cards.forEach((c) => c.addEventListener("click", () => {
    const b = [...boxes].find((x) => x.value === c.dataset.g);
    if (b) { b.checked = !b.checked; sync(); }
  }));
  boxes.forEach((b) => b.addEventListener("change", sync));

  /* invio modulo */
  const form = document.getElementById("join-form");
  if (form) {
    const F = T.aiutaci.modulo;
    const msg = form.querySelector(".form-msg");
    const after = form.querySelector(".after");
    const show = (t, ok = true) => { msg.innerHTML = t; msg.hidden = false; if (ok) after.hidden = false; };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const d = new FormData(form);
      const gruppi = d.getAll("gruppi");
      const G = S.googleForm;
      const submit = form.querySelector('button[type="submit"]');
      if (G && G.id) {
        const c = G.campi, p = new URLSearchParams();
        p.append(c.nome, d.get("nome")); p.append(c.telefono, d.get("telefono"));
        p.append(c.email, d.get("email") || ""); p.append(c.quartiere, d.get("quartiere"));
        p.append(c.esserci, d.get("esserci")); p.append(c.fonte, d.get("fonte") || "");
        gruppi.forEach((g) => p.append(c.gruppi, F.gruppiForm.find((o) => o.startsWith(g + ":")) || g));
        d.getAll("quando").forEach((q) => p.append(c.quando, q));
        p.append(c.messaggio, d.get("messaggio") || ""); p.append(c.ponte, d.get("ponte"));
        p.append(c.privacy, F.privacy);
        const url = `https://docs.google.com/forms/d/e/${G.id}/formResponse`;
        // sendBeacon spedisce i dati senza aspettare la risposta di Google
        // (che non arriva mai in modo leggibile e lasciava il bottone bloccato)
        let sent = false;
        try { sent = navigator.sendBeacon && navigator.sendBeacon(url, p); } catch (_) { sent = false; }
        if (!sent) fetch(url, { method: "POST", mode: "no-cors", body: p, keepalive: true }).catch(() => {});
        form.querySelectorAll("input, textarea").forEach((el) => { el.disabled = true; });
        submit.hidden = true; show(F.grazie);
      } else if (S.moduloEndpoint) {
        try {
          const r = await fetch(S.moduloEndpoint, { method: "POST", body: d, headers: { Accept: "application/json" } });
          if (!r.ok) throw new Error();
          form.reset(); sync(); show(F.grazie);
        } catch (_) { show(`${F.errore} <a href="mailto:${S.email}">${S.email}</a>`, false); }
      } else {
        const lines = [
          `Nome: ${d.get("nome")}`, `Telefono: ${d.get("telefono")}`, d.get("email") ? `Email: ${d.get("email")}` : null,
          `Quartiere: ${d.get("quartiere")}`, `Come: ${d.get("esserci")}`,
          gruppi.length ? `Gruppi: ${gruppi.join(", ")}` : null,
          `Ponte dei 100: ${d.get("ponte")}`,
          d.get("messaggio") ? `\n${d.get("messaggio")}` : null,
        ].filter((x) => x !== null).join("\n");
        location.href = `mailto:${S.email}?subject=${encodeURIComponent("Voglio essere uno dei 100 fondatori di Inséma")}&body=${encodeURIComponent(lines)}`;
        show(F.grazieMail);
      }
    });
  }


  /* missione: 15 persone (salvate solo nel browser) */
  const ob = document.getElementById("orbit-box");
  if (ob) {
    const KEY = "insema-missione-15";
    let st; try { st = JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { st = []; }
    const draw = () => {
      ob.innerHTML = orbit(st);
      const n = st.filter(Boolean).length;
      document.getElementById("m-n").textContent = n;
      document.getElementById("m-done").hidden = n < 15;
      try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (_) {}
    };
    const toggle = (el) => { const k = +el.dataset.k; st[k] = !st[k]; draw(); const f = ob.querySelector(`[data-k="${k}"]`); if (f) f.focus(); };
    ob.addEventListener("click", (e) => { const g = e.target.closest(".p15"); if (g) toggle(g); });
    ob.addEventListener("keydown", (e) => { const g = e.target.closest(".p15"); if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(g); } });
    document.getElementById("m-reset").addEventListener("click", () => { st = []; draw(); });
    draw();
  }
  const acc = document.getElementById("accetta");
  if (acc) {
    const KA = "insema-missione-accettata";
    const done = () => { acc.textContent = T.piano.invito.accettata; acc.classList.add("btn-navy"); };
    try { if (localStorage.getItem(KA)) done(); } catch (_) {}
    acc.addEventListener("click", () => { try { localStorage.setItem(KA, "1"); } catch (_) {} done(); });
  }

  /* ancore (#modulo ecc.) dopo il montaggio */
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) setTimeout(() => el.scrollIntoView(), 50);
  }
})();
