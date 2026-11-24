/* =====================================================================
   inséma · GUIDA PER CHI FA inséma — costruisce le pagine
   index.html (ingresso) · benvenuto.html · strada.html · dati.html
   La pagina si sceglie con <body data-guida="…">.
   (per cambiare dati e testi NON serve toccare questo file: vedi dati.js)
   ===================================================================== */
(function () {
  const G = window.GUIDA, T = window.TESTI || null, GEO = window.GUIDA_CONFINI || null;
  const PAGE = document.body.dataset.guida;
  const HASH0 = location.hash; // l'ancora con cui è stata aperta la pagina
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- helpers (come in app.js) ---------- */
  const md = (s) => !s ? "" : String(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*(?!\s)([^*]+?)\*(?!\w)/g, "$1<em>$2</em>")
    .replace(/==(.+?)==/g, '<span class="pink">$1</span>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (m, t, l) => `<a href="${l}"${/^https?:/.test(l) ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`);
  const num = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const pct = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + String(Math.abs(v)).replace(".", ",") + "%";
  const parsePct = (s) => parseFloat(String(s).replace("−", "-").replace(",", ".").replace("%", ""));
  const src = (s) => s ? `<small class="src">Fonte: ${md(s)}</small>` : "";
  const todo = (t) => `<p class="todo">${t}</p>`;
  const zona = (id) => G.zone.find((z) => z.id === id);
  const area = (z) => G.aree.lista.find((a) => a.id === z.area);
  const imm = (nome) => G.immobiliare.zone.find((x) => x.nome === nome);
  const zname = (z) => z.quartieri.map((q) => q.nome).join(", ");
  const P = G.pagine;

  /* il nome si scrive sempre «inséma», tutto minuscolo, anche nei titoli in maiuscolo */
  const brand = (root) => {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), hits = [];
    while (w.nextNode()) {
      const n = w.currentNode;
      if (/inséma/i.test(n.nodeValue) && !n.parentNode.closest("option, textarea, script, style, .nome")) hits.push(n);
    }
    hits.forEach((n) => {
      const t = document.createElement("span");
      t.innerHTML = n.nodeValue.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/inséma/gi, '<span class="nome">inséma</span>');
      n.replaceWith(...t.childNodes);
    });
  };

  /* ---------- zona scelta: resta la stessa passando da una pagina all'altra ---------- */
  const KEY = "insema-guida-zona";
  const fromHash = () => { const m = location.hash.match(/^#zona-([IVX]+)$/); return m && zona(m[1]) ? m[1] : null; };
  let current = fromHash() || (() => { try { const z = localStorage.getItem(KEY); return zona(z) ? z : null; } catch (_) { return null; } })();
  const remember = (id) => { try { localStorage.setItem(KEY, id); } catch (_) {} };

  /* =================================================================
     PEZZI COMUNI
     ================================================================= */
  function header() {
    const tabs = ["benvenuto", "strada", "dati"].map((k) => {
      const hash = current && k !== "benvenuto" ? `#zona-${current}` : "";
      return `<a href="${k}.html${hash}" data-tab="${k}"${k === PAGE ? ' class="on" aria-current="page"' : ""}>${P[k].nome}</a>`;
    }).join("");
    return `<header class="g-top">
      <a href="index.html" class="g-logo"><img src="../img/logo/logo-magenta.svg" alt="inséma: ingresso della guida"></a>
      <span class="g-tag">Guida riservata</span>
    </header>
    <nav class="g-nav g-tabs" aria-label="Pagine della guida">${tabs}</nav>`;
  }
  const footer = () => `<footer class="g-foot"><p>Guida riservata a chi fa inséma · non girarla fuori dal gruppo · aggiornata il ${G.aggiornata}</p></footer>`;
  const intro = (titolo, k) => `<h1 class="h2">${titolo}</h1><p class="g-why">${P[k].aCosaServe}</p>`;
  const jump = (list) => `<nav class="g-jump" aria-label="In questa pagina">${list.map(([id, t]) => `<a href="#${id}">${t}</a>`).join("")}</nav>`;

  function referenti(z, compact) {
    return z.quartieri.map((q) => {
      const ask = `<a class="btn btn-small" href="mailto:${G.email}?subject=${encodeURIComponent("Voglio essere referente per " + q.nome)}">Vuoi farlo tu?</a>`;
      const list = q.referenti.length
        ? q.referenti.map((r) => `<div class="ref-p"><strong>${r.nome}</strong>${r.nota && !compact ? ` <span>${md(r.nota)}</span>` : ""}${r.whatsapp ? ` <a class="btn btn-small btn-wa" href="${r.whatsapp}" target="_blank" rel="noopener">Gruppo WhatsApp</a>` : ""}</div>`).join("")
        : `<span class="ref-none">Referente: da trovare</span>`;
      return `<li class="ref"><h4>${q.nome}</h4>${list}${q.referenti.length ? "" : ask}</li>`;
    }).join("");
  }
  const luoghi = (z) => z.luoghi.length
    ? `<ul class="g-places">${z.luoghi.map((l) => `<li><strong>${l.tipo ? l.tipo + ": " : ""}${l.nome}</strong>${l.indirizzo ? `<br>${l.indirizzo}` : ""}${l.nota ? `<br><span>${md(l.nota)}</span>` : ""}</li>`).join("")}</ul>`
    : todo("Da completare (gruppo Territorio): mercati, piazze per banchetti, associazioni, scuole, bar dove lasciare volantini.");
  const temi = (z) => `${z.temi.length ? `<ul class="g-list">${z.temi.map((t) => `<li>${md(t)}</li>`).join("")}</ul>` : todo("Da completare (gruppo Programma).")}
    <p class="g-sub2">Per tutte le zone:</p>
    <ul class="g-list">${G.temiTutte.map((t) => `<li>${md(t)}</li>`).join("")}</ul>`;
  const zpick = () => `<div class="g-zpick noprint" role="tablist" aria-label="Scegli la zona">${G.zone.map((z) => `<button type="button" role="tab" data-z="${z.id}" aria-selected="false" title="${zname(z)}">${z.id}</button>`).join("")}</div>
    <p class="g-zhint noprint" id="zhint">Scegli una zona qui sopra${PAGE === "dati" ? " o sulla mappa" : ""}.</p>`;

  /* ---------- scheda di zona COMPLETA (pagina Dati) ---------- */
  function zcardFull(z) {
    const a = area(z);
    const k = (v, l, f) => `<div class="kpi"><strong>${v}</strong><span>${l}</span>${src(f)}</div>`;
    const immo = z.immobiliare.map(imm).map((x) => `<li><strong>${x.nome}</strong>: vendita ${x.vendita} €/m² (${x.varVendita} in 12 mesi), affitto ${x.affitto} €/m² al mese (${x.varAffitto})</li>`).join("");
    return `<article class="zcard" id="zona-${z.id}" data-z="${z.id}" hidden>
      <header class="zhead">
        <p class="kicker">Zona ${z.id} · ex circoscrizione</p>
        <h3 class="h2">${zname(z)}</h3>
        <p class="src">Elenco dei quartieri da verificare con chi abita lì.</p>
        <p class="noprint"><a class="g-switch" href="strada.html#zona-${z.id}">Versione per la strada →</a></p>
      </header>
      <div class="zblock"><h4>Referenti</h4><ul class="refs">${referenti(z)}</ul><p class="note">${G.cosaFaReferente}</p></div>
      <div class="zblock"><h4>Numeri chiave</h4>
        <div class="kpis">
          ${k(num(z.residenti), `residenti, il ${z.quota} della città`, G.fonti.residenti)}
          ${k(z.var2019, "residenti dal 2019", G.fonti.residenti)}
          ${k(z.densita, "abitanti per km² (2021)", G.fonti.densita)}
          ${k(z.prezzo, "€/m² per comprare casa", G.fonti.prezzo)}
        </div>
        <ul class="g-immo">${immo}</ul>${src(G.immobiliare.fonte)}
      </div>
      <div class="zblock"><h4>Cosa dicono i dati</h4><p class="g-lead">${md(z.testo)}</p>${(z.extra || []).map((e) => `<p>${md(e)}</p>`).join("")}</div>
      <div class="zblock"><h4>Chi ci abita <span class="badge">dati 2011</span></h4>
        <p>Area di censimento <strong>${a.nome}</strong>${a.zone.length > 1 ? ` (comprende le zone ${a.zone.join(", ")})` : ""}: ${a.residenti} residenti oggi.</p>
        <dl class="g-dl">${[["Over 65", a.over65], ["Over 75", a.over75], ["Stranieri", a.stranieri], ["Laureati*", a.laureati], ["Famiglie in affitto", a.affitto], ["Famiglie di 1 persona", a.soli], ["Disoccupazione", a.disoccupazione]]
          .map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join("")}</dl>
        <small class="src">*Sulla popolazione di 6 anni e più. ${G.aree.nota} Fonte: ${G.aree.fonte}.</small>
      </div>
      <div class="zblock"><h4>Voto: ballottaggio 2022</h4><p>${md(z.voto.testo)}</p><p class="note">${G.voto2022nota}</p>${src(IND.voto.fonte)}</div>
      <div class="zblock"><h4>Temi del programma per questa zona</h4>${temi(z)}</div>
      <div class="zblock"><h4>Luoghi utili</h4>${luoghi(z)}</div>
      <div class="zactions noprint"><button type="button" class="btn btn-navy" data-print="${z.id}">🖨 Stampa la scheda</button></div>
    </article>`;
  }

  /* ---------- scheda di zona RIDOTTA (pagina Strada) ---------- */
  function zcardShort(z) {
    const x = imm(z.immobiliare[0]);
    const say = [
      [`${z.prezzo} €`, "al metro quadro per comprare casa qui"],
      [x.varVendita, `il prezzo richiesto in un anno (zona «${x.nome}»)`],
      [z.var2019, "residenti dal 2019"],
    ];
    return `<article class="zcard zcard-s" id="zona-${z.id}" data-z="${z.id}" hidden>
      <header class="zhead">
        <p class="kicker">Zona ${z.id}</p>
        <h3 class="h2">${zname(z)}</h3>
      </header>
      <div class="zblock"><h4>Referente</h4><ul class="refs">${referenti(z, true)}</ul></div>
      <div class="zblock"><h4>Numeri da dire</h4>
        <ul class="g-say">${say.map(([v, t]) => `<li><strong>${v}</strong><span>${t}</span></li>`).join("")}</ul>
        <small class="src">Fonti: mercato-immobiliare.info (nov. 2026), immobiliare.it (ott. 2026), anagrafe (ago. 2026).</small>
      </div>
      <div class="zblock"><h4>Cosa dicono i dati</h4><p class="g-lead">${md(z.testo)}</p></div>
      <div class="zblock"><h4>Temi da portare</h4>${temi(z)}</div>
      <div class="zblock"><h4>Luoghi utili</h4>${luoghi(z)}</div>
      <p class="zmore"><a class="btn btn-ghost" href="dati.html#zona-${z.id}">Approfondisci: scheda completa →</a></p>
    </article>`;
  }

  /* ---------- scelta della zona (Strada e Dati) ---------- */
  let onSelect = () => {};
  function select(id, scroll, keepUrl) {
    if (!zona(id)) return;
    current = id; remember(id);
    $$(".zcard").forEach((c) => { c.hidden = c.dataset.z !== id; });
    $$(".g-zpick button").forEach((b) => b.setAttribute("aria-selected", b.dataset.z === id));
    $$(".g-zlist button").forEach((b) => b.classList.toggle("on", b.dataset.z === id));
    const h = $("#zhint"); if (h) h.hidden = true;
    $$(".g-tabs a").forEach((a) => { if (a.dataset.tab !== "benvenuto") a.setAttribute("href", `${a.dataset.tab}.html#zona-${id}`); });
    if (!keepUrl) history.replaceState(null, "", "#zona-" + id);
    onSelect(id);
    if (scroll) document.getElementById("zona-" + id).scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const bindPick = () => $$(".g-zpick button").forEach((b) => b.addEventListener("click", () => select(b.dataset.z, false)));

  /* ---------- geometria: in quale zona sono? ---------- */
  const inside = ([x, y], ring) => {
    let c = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [x1, y1] = ring[i], [x2, y2] = ring[j];
      if ((y1 > y) !== (y2 > y) && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) c = !c;
    }
    return c;
  };
  const rings = (f) => f.geometry.type === "Polygon" ? [f.geometry.coordinates[0]] : f.geometry.coordinates.map((p) => p[0]);
  const zoneAt = (lon, lat) => (GEO.features.find((f) => rings(f).some((r) => inside([lon, lat], r))) || {}).properties;

  // «Dove sono?» — la posizione non viene salvata da nessuna parte
  function bindWhere(onPos) {
    const b = $("#dove"); if (!b) return;
    b.addEventListener("click", () => {
      const msg = $("#geo-msg");
      const say = (t) => { msg.textContent = t; msg.hidden = false; };
      if (!navigator.geolocation) return say("Il tuo telefono non permette di trovare la posizione.");
      say("Cerco dove sei…");
      navigator.geolocation.getCurrentPosition((p) => {
        const { latitude: lat, longitude: lon } = p.coords;
        const z = zoneAt(lon, lat);
        onPos(lat, lon);
        if (!z) return say("Sembra che tu non sia dentro il Comune di Como.");
        const zz = zona(z.zona);
        say(`Sei nella zona ${zz.id}: ${zname(zz)}.`);
        select(zz.id, true);
      }, () => say("Non riesco a trovare la posizione: controlla di aver dato il permesso al browser."), { enableHighAccuracy: true, timeout: 10000 });
    });
  }

  /* =================================================================
     INGRESSO (index.html)
     ================================================================= */
  function pageIngresso() {
    // i vecchi link alla guida a pagina unica portano alla pagina giusta
    const old = { benvenuto: "benvenuto", parlare: "benvenuto", missione: "benvenuto", gruppi: "benvenuto", materiali: "benvenuto",
      kit: "strada", mappa: "dati", zone: "dati", numeri: "dati", mancanti: "dati" };
    const h = location.hash.slice(1);
    if (fromHash()) { location.replace("strada.html" + location.hash); return ""; }
    if (old[h]) { location.replace(`${old[h]}.html${old[h] === "benvenuto" ? "" : "#" + h}`); return ""; }
    const card = (k, icon) => `<a class="g-door" href="${k}.html"><span class="g-door-i" aria-hidden="true">${icon}</span>
      <strong>${P[k].nome}</strong><span>${P[k].quando}</span><em>${P[k].aCosaServe}</em><b aria-hidden="true">→</b></a>`;
    return `<section class="g-sec s-cream"><div class="wrap">
      <h1 class="h2">${P.ingresso.titolo}</h1>
      <p class="g-lead">${P.ingresso.testo}</p>
      <div class="g-doors">${card("benvenuto", "👋")}${card("strada", "📍")}${card("dati", "📊")}</div>
    </div></section>`;
  }

  /* =================================================================
     BENVENUTO
     ================================================================= */
  function pageBenvenuto() {
    const B = G.benvenuto, CP = G.comeParliamo, M = G.missione, FO = T.fondatori, A = T.aiutaci, MT = G.materiali;
    const p = Math.min(100, FO.attuali / FO.obiettivo * 100);
    const tile = (x) => `<a class="g-tile${x.scuro ? " dark" : ""}" href="${x.file}" download><img src="${x.file}" alt="" loading="lazy"><span>${x.nome} ↓</span></a>`;
    return `
    <section class="g-sec s-cream" id="benvenuto"><div class="wrap">
      ${intro(B.titolo, "benvenuto")}
      ${jump([["cose", "Cos'è inséma"], ["missione", "Missione"], ["gruppi", "Gruppi"], ["parlare", "Come parliamo"], ["zone", "Le zone"], ["materiali", "Materiali"]])}
      ${B.righe.map((r) => `<p class="g-lead">${md(r)}</p>`).join("")}
    </div></section>

    <section class="g-sec s-paper" id="cose"><div class="wrap">
      <h2 class="h2 h-navy">Cos'è inséma</h2>
      <p class="g-lead">${md(T.sito.descrizione)}</p>
      <p class="g-lead">${md(T.home.hero.testo)}</p>
      <p class="g-lead"><em>${T.sito.footer.motto}</em></p>
      <div class="g-links"><a class="btn btn-navy" href="../manifesto.html">Il manifesto</a><a class="btn btn-navy" href="../programma.html">Il programma</a><a class="btn btn-ghost" href="../chi-siamo.html">Chi siamo</a></div>
    </div></section>

    <section class="g-sec s-yellow" id="missione"><div class="wrap">
      <h2 class="h2">${M.titolo}</h2>
      <ol class="g-tappe">${M.tappe.map(([n, l, q]) => `<li><strong>${n}</strong><span>${l}</span><small>${q}</small></li>`).join("")}</ol>
      <p class="g-lead">${md(M.testo)}</p>
      <div class="counter g-counter">
        <div class="counter-n"><strong>${FO.attuali}</strong><span>${FO.contatore} ${FO.obiettivo}</span></div>
        <div class="counter-bar"><div style="width:${p}%"></div></div>
      </div>
      <div class="g-links">${M.link.map((l) => `<a class="btn" href="${l.link}">${l.testo}</a>`).join("")}</div>
    </div></section>

    <section class="g-sec s-paper" id="gruppi"><div class="wrap">
      <h2 class="h2 h-navy">${A.gruppi.titolo}</h2>
      <ul class="g-groups">${A.gruppi.lista.map((g) => `<li><strong>${g.nome}</strong> ${md(g.testo)}</li>`).join("")}</ul>
      <p><a class="btn" href="../aiutaci.html#modulo">Scegli il tuo gruppo nel modulo</a></p>
      <h3 class="g-sub">${A.appuntamenti.titolo}</h3>
      <ol class="timeline">${A.appuntamenti.lista.map((x) => `<li><h3>${x.quando}</h3><p>${md(x.cosa)}</p></li>`).join("")}</ol>
    </div></section>

    <section class="g-sec s-cream" id="parlare"><div class="wrap">
      <h2 class="h2">${CP.titolo}</h2>
      <div class="g-cards">${T.manifesto.stile.punti.map((x) => `<div class="g-card"><h3>${x.titolo}</h3><p>${md(x.testo)}</p></div>`).join("")}</div>
      <h3 class="h3 g-h3">Cosa evitiamo <span class="badge">spiegazioni in bozza</span></h3>
      <ul class="g-avoid">${T.manifesto.no.lista.map((x) => `<li><strong>${x}</strong>${CP.evitare[x] ? ` <span>${md(CP.evitare[x])}</span>` : ""}</li>`).join("")}</ul>
      <p class="g-rule">${md(CP.regolaNumeri)}</p>
      <p class="g-lead">Cosa rispondere a chi ti fa domande lo trovi nella <a href="strada.html#faq">guida di strada</a>.</p>
      ${PERS.length ? `<a class="g-card cv-promo" href="strada.html#convincere">
        <span class="cv-mini">${PERS.slice(0, 3).map((p) => face(p)).join("")}</span>
        <span><h3>${CV.titolo}${bozza(CV.introBozza)}</h3><p>${md(CV.promo)}</p></span><b aria-hidden="true">→</b></a>` : ""}
    </div></section>

    <section class="g-sec s-paper" id="zone"><div class="wrap">
      <h2 class="h2 h-navy">Le 9 zone e chi le segue</h2>
      <p class="g-lead">${G.cosaFaReferente}</p>
      <div class="g-zones">${G.zone.map((z) => `<div class="g-zone">
        <p class="kicker">Zona ${z.id}</p>
        <ul class="refs">${referenti(z, true)}</ul>
        <a class="g-switch" href="strada.html#zona-${z.id}">Scheda di strada →</a>
      </div>`).join("")}</div>
    </div></section>

    <section class="g-sec s-cream" id="materiali"><div class="wrap">
      <h2 class="h2">Materiali</h2>
      <h3 class="g-sub">Loghi</h3><div class="g-tiles">${MT.loghi.map(tile).join("")}</div>
      <h3 class="g-sub">Illustrazioni</h3><div class="g-tiles">${MT.illustrazioni.map(tile).join("")}</div>
      <h3 class="g-sub">Palette <small>(tocca per copiare il codice)</small></h3>
      <div class="g-palette">${MT.palette.map(([n, h]) => `<button type="button" data-hex="${h}"><i style="background:${h}"></i><span>${n}<br><code>${h}</code></span></button>`).join("")}</div>
      <p class="g-lead"><a href="${T.sito.instagram}" target="_blank" rel="noopener">Instagram ${T.sito.instagramNome}</a></p>
    </div></section>`;
  }

  /* =================================================================
     STRADA
     ================================================================= */
  // mappa semplice disegnata con i confini: niente sfondo da scaricare
  function miniMap() {
    const all = GEO.features.flatMap((f) => rings(f).flat());
    const lat0 = 45.81, kx = Math.cos(lat0 * Math.PI / 180);
    const xs = all.map((p) => p[0] * kx), ys = all.map((p) => -p[1]);
    const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0;
    const S = 1000 / w, H = Math.round(h * S);
    const pt = ([lon, lat]) => [((lon * kx - x0) * S).toFixed(1), ((-lat - y0) * S).toFixed(1)];
    const paths = GEO.features.map((f) => {
      const d = rings(f).map((r) => "M" + r.map((p) => pt(p).join(" ")).join("L") + "Z").join("");
      const c = rings(f)[0].reduce((a, p) => [a[0] + p[0] / rings(f)[0].length, a[1] + p[1] / rings(f)[0].length], [0, 0]);
      const [cx, cy] = pt(c);
      return `<g class="mm-z" data-z="${f.properties.zona}" tabindex="-1"><path d="${d}"/><text x="${cx}" y="${cy}">${f.properties.zona}</text></g>`;
    }).join("");
    window.__mmPt = pt;
    return `<svg class="minimap" viewBox="-10 -10 1020 ${H + 20}" role="img" aria-label="Mappa semplice delle 9 zone">${paths}<circle id="mm-me" r="14" style="display:none"/></svg>`;
  }

  /* ---------- come convincere… (Strada; card in Benvenuto) ---------- */
  const CV = G.convincere || { personaggi: [], gruppi: {} };
  const PERS = CV.personaggi.filter((p) => p.attivo !== false);
  const pers = (id) => PERS.find((p) => p.id === id);
  const cvFromHash = (h) => { const m = (h || "").match(/^#convincere-([\w-]+)$/); return m && pers(m[1]) ? m[1] : null; };
  const bozza = (on) => on ? ' <span class="badge">bozza</span>' : "";
  const scrivi = (cosa, k) => todo(`Da scrivere: ${cosa}${CV.gruppi[k] ? ` (gruppo ${CV.gruppi[k]})` : ""}`);
  // avatar provvisorio disegnato; l'immagine vera, se c'è, gli sta sopra
  const face = (p, cls = "") => `<span class="cv-face ${cls}" style="--c:${p.colore}" aria-hidden="true">
    <svg viewBox="0 0 100 100"><circle cx="50" cy="55" r="29" fill="#fff" stroke="#274798" stroke-width="3.5"/><circle cx="40" cy="51" r="3.6" fill="#274798"/><circle cx="60" cy="51" r="3.6" fill="#274798"/></svg>
    ${p.img ? `<img src="${p.img}" alt="" loading="lazy" onerror="this.remove()">` : ""}</span>`;

  function cvScheda(p) {
    const c = p.chiE || {}, dati = c.dati || [];
    const list = (a, cosa, k) => a && a.length ? `<ul class="g-list">${a.map((x) => `<li>${md(x)}</li>`).join("")}</ul>` : scrivi(cosa, k);
    const b = (titolo, html) => `<div class="cv-b"><h4>${titolo}</h4>${html}</div>`;
    const altro = p.nome;
    return `
      <button type="button" class="btn btn-ghost btn-small cv-close" data-cv-close>← tutti</button>
      <header class="cv-head">
        ${face(p, "cv-face-lg")}
        <div><h3 class="h2" id="cv-nome">${p.nome}</h3>
        ${p.frase ? `<p class="cv-frase">«${md(p.frase)}»${bozza(p.bozza)}</p>` : scrivi("la frase tipica", "chiE")}</div>
      </header>
      ${b("Chi è", `${c.testo ? `<p>${md(c.testo)}</p>` : scrivi("due righe su chi è", "chiE")}
        ${dati.map((d) => `<p class="cv-dato"><strong>${md(d.dato)}</strong>${src(d.fonte)}</p>`).join("")}`)}
      ${b("Cosa gli sta a cuore", list(p.aCuore, "cosa gli sta a cuore", "aCuore"))}
      ${b("Da dove partire", p.apertura ? `<p class="cv-apri">${md(p.apertura)}</p>` : scrivi("la domanda con cui aprire", "apertura"))}
      ${b("Domande e risposte", p.domande && p.domande.length ? `<div class="g-faq">${p.domande.map((q) => `<details><summary>${q.d}${bozza(q.bozza)}</summary>
        ${q.r ? `<p>${md(q.r)}</p>` : `<div class="cv-pad">${scrivi("la risposta", "risposte")}</div>`}</details>`).join("")}</div>` : scrivi("le domande che ti farà", "risposte"))}
      ${b("Come va una conversazione", p.dialogo && p.dialogo.length ? `<ol class="cv-chat">${p.dialogo.map((m) => {
        const tu = m.chi === "tu";
        return `<li class="cv-msg ${tu ? "tu" : "lei"}" style="--c:${p.colore}"><small>${tu ? "Tu" : altro}</small>${m.testo ? `<p>${md(m.testo)}</p>` : `<p class="cv-vuoto">Da scrivere: battuta (gruppo ${CV.gruppi.dialogo})</p>`}</li>`;
      }).join("")}</ol>` : scrivi("un piccolo dialogo", "dialogo"))}
      ${b("Cosa evitare", p.evitare && p.evitare.length ? `<ul class="g-avoid">${p.evitare.map((x) => `<li>${md(x)}</li>`).join("")}</ul>` : scrivi("cosa evitare", "evitare"))}
      ${b("Il capitolo del programma da far vedere", p.programma && p.programma.length ? `<div class="g-links">${p.programma.map((l) => `<a class="btn btn-navy" href="${l.link}">${l.testo} →</a>`).join("")}</div>` : scrivi("quale capitolo", "programma"))}
      <p class="cv-foot"><button type="button" class="btn btn-ghost btn-small" data-cv-close>← tutti</button></p>`;
  }

  const sezConvincere = () => !PERS.length ? "" : `
    <section class="g-sec s-cream" id="convincere"><div class="wrap">
      <h2 class="h2">${CV.titolo}</h2>
      <p class="g-lead">${md(CV.intro)}${bozza(CV.introBozza)}</p>
      <ul class="cv-grid">${PERS.map((p) => `<li><button type="button" class="cv-av" data-cv="${p.id}" aria-controls="cv-scheda" aria-expanded="false">
        ${face(p)}<span class="cv-nome">${p.nome}</span></button></li>`).join("")}</ul>
      <div class="cv-veil" data-cv-close hidden></div>
      <article class="cv-scheda" id="cv-scheda" tabindex="-1" aria-labelledby="cv-nome" hidden></article>
    </div></section>`;

  function pageStrada() {
    const CP = G.comeParliamo, K = G.kit;
    const cl = (items, name) => `<ul class="g-checklist">${items.map((x, i) => `<li><label><input type="checkbox" name="${name}-${i}"> <span>${md(x)}</span></label></li>`).join("")}</ul>`;
    return `
    <section class="g-sec s-cream" id="dove-sei"><div class="wrap">
      ${intro(P.strada.titolo, "strada")}
      ${jump([["zone", "La tua zona"], ["faq", "Cosa rispondo"], ...(PERS.length ? [["convincere", CV.titolo]] : []), ["kit", "Kit di strada"]])}
      <button type="button" class="btn btn-navy g-where" id="dove">📍 Dove sono?</button>
      <p class="g-geo" id="geo-msg" role="status" hidden></p>
      <div class="g-strada-pick" id="zone">
        ${zpick()}
        ${GEO ? miniMap() : ""}
      </div>
      <div id="zcards">${G.zone.map(zcardShort).join("")}</div>
    </div></section>

    <section class="g-sec s-paper" id="faq"><div class="wrap">
      <h2 class="h2 h-navy">Cosa rispondo se mi chiedono…</h2>
      <p class="g-rule">${md(CP.regolaNumeri)}</p>
      <div class="g-faq">${CP.faq.map((f) => `<details><summary>${f.domanda}${f.bozza ? ' <span class="badge">bozza</span>' : ""}</summary>
        <p>${md(f.risposta)}</p><small class="src">Dai testi del sito: ${f.fonte}</small></details>`).join("")}</div>
    </div></section>
    ${sezConvincere()}

    <section class="g-sec s-blush" id="kit"><div class="wrap">
      <h2 class="h2">${K.titolo}</h2>
      <p class="badge badge-lg">${K.bozza}</p>
      <p class="g-warn">⚠️ ${md(K.avviso)}</p>
      <div class="g-kits">${K.liste.map((l, k) => `<details class="g-card g-kit"${k === 0 ? " open" : ""}><summary><h3>${l.titolo}</h3></summary>
        <h4>Cosa portare</h4>${cl(l.portare, `k${k}p`)}<h4>Come fare</h4>${cl(l.fare, `k${k}f`)}</details>`).join("")}</div>
      <div class="g-kits g-kits-2">
        <div class="g-card"><h3>${K.contatto.titolo}</h3><p>${md(K.contatto.testo)}</p></div>
        <div class="g-card"><h3>${K.dopo.titolo}</h3><p>${md(K.dopo.testo)}</p></div>
      </div>
    </div></section>`;
  }

  /* =================================================================
     DATI
     ================================================================= */
  const IND = Object.fromEntries(G.indicatori.map((i) => [i.id, i]));
  const value = (ind, z) => {
    switch (ind) {
      case "residenti": return { v: z.residenti, l: num(z.residenti) };
      case "var2019": return { v: z.var2019pct, l: pct(z.var2019pct) };
      case "prezzo": return { v: z.prezzoNum, l: z.prezzo.split(" (")[0].split(";")[0] };
      case "varPrezzo": { const x = imm(z.immobiliare[0]); return { v: x.varNum, l: x.varVendita }; }
      case "over65": case "affitto": case "laureati": { const s = area(z)[ind]; return { v: parsePct(s), l: s }; }
      case "voto": return { v: z.voto.esito || "nd", l: G.votoCategorie[z.voto.esito || "nd"].split(",")[0] };
    }
  };
  const SEQ = ["#fef0e7", "#f8c8d7", "#f6b8ca", "#e6007e", "#6f0f38"];
  const DIV = ["#274798", "#7ea3d6", "#a9cbdb", "#fef0e7", "#f6b8ca", "#e6007e", "#6f0f38"];
  const CAT = { rapinese: "#274798", minghetti: "#4bbecf", nd: "#ffffff" };
  function scale(ind) {
    const kind = IND[ind].scala;
    const vals = G.zone.map((z) => value(ind, z).v);
    if (kind === "cat") return { color: (v) => CAT[v], legend: Object.entries(G.votoCategorie).map(([k, t]) => [CAT[k], t]) };
    if (kind === "div") {
      const m = Math.max(...vals.map(Math.abs)) || 1;
      const step = (v) => v === 0 ? 3 : v < 0 ? (v <= -2 * m / 3 ? 0 : v <= -m / 3 ? 1 : 2) : (v >= 2 * m / 3 ? 6 : v >= m / 3 ? 5 : 4);
      const r = (x) => String(Math.round(x * 10) / 10).replace(".", ",");
      return {
        color: (v) => DIV[step(v)],
        legend: [[DIV[0], `calo oltre ${r(2 * m / 3)}%`], [DIV[1], `calo ${r(m / 3)}-${r(2 * m / 3)}%`], [DIV[2], `calo fino a ${r(m / 3)}%`],
          [DIV[4], `crescita fino a ${r(m / 3)}%`], [DIV[5], `crescita ${r(m / 3)}-${r(2 * m / 3)}%`], [DIV[6], `crescita oltre ${r(2 * m / 3)}%`]],
      };
    }
    const lo = Math.min(...vals), hi = Math.max(...vals), w = (hi - lo) / 5 || 1;
    const k = (v) => Math.min(4, Math.floor((v - lo) / w));
    const f = (x) => ind === "residenti" || ind === "prezzo" ? num(Math.round(x)) : String(Math.round(x * 10) / 10).replace(".", ",") + "%";
    return { color: (v) => SEQ[k(v)], legend: SEQ.map((c, i) => [c, `${f(lo + i * w)} – ${f(lo + (i + 1) * w)}`]) };
  }

  function pageDati() {
    const M = G.mappa;
    return `
    <section class="g-sec s-cream" id="mappa"><div class="wrap">
      ${intro(P.dati.titolo, "dati")}
      ${jump([["mappa-box", "Mappa"], ["zone", "Schede zona"], ["numeri", "Como in numeri"], ["mancanti", "Dati mancanti"], ["metodo", "Fonti e metodo"]])}
      <h2 class="h2" id="mappa-box">${M.titolo}</h2>
      <p class="g-lead">${M.testo}</p>
      <div class="g-maptools">
        <label for="ind">Colora per</label>
        <select id="ind">${G.indicatori.map((i) => `<option value="${i.id}">${i.nome}</option>`).join("")}</select>
        <button type="button" class="btn btn-navy" id="dove">📍 Dove sono?</button>
      </div>
      <p class="g-geo" id="geo-msg" role="status" hidden></p>
      <div id="map" class="g-map" role="region" aria-label="Mappa delle 9 zone di Como"></div>
      <div class="g-legend" id="legend"></div>
      <h3 class="g-sub">Le zone, anche senza mappa</h3>
      <div class="g-zlist" id="zlist"></div>
      <p class="g-total">Tutta la città: <strong>${G.totale.residenti}</strong> residenti · <strong>${G.totale.var2019}</strong> dal 2019 · prezzo della casa <strong>${G.totale.prezzo}</strong> €/m²</p>
      <small class="src">${M.fonteConfini}</small>
    </div></section>

    <section class="g-sec s-paper" id="zone"><div class="wrap">
      <h2 class="h2 h-navy">Schede zona</h2>
      ${zpick()}
      <div id="zcards">${G.zone.map(zcardFull).join("")}</div>
      <div class="g-box noprint">
        <h4>Da collocare</h4>
        <p>Temi del programma che non sappiamo ancora in quale zona mettere: ${G.temiDaCollocare.join(", ")}. Chiedete al gruppo Programma.</p>
      </div>
      <p class="noprint"><button type="button" class="btn btn-ghost" data-print="all">🖨 Stampa tutte le schede</button></p>
    </div></section>

    <section class="g-sec s-cream" id="numeri"><div class="wrap">
      <h2 class="h2">Como in numeri</h2>
      ${G.comoInNumeri.map((g) => `<h3 class="g-sub">${g.tema}</h3>
        <div class="g-stats">${g.numeri.map((n) => `<div class="g-stat"><strong>${n.valore}</strong><p>${md(n.testo)}</p>${src(n.fonte)}</div>`).join("")}</div>`).join("")}
      <h3 class="g-sub">Prezzi e affitti per zona di immobiliare.it</h3>
      <div class="g-table-wrap"><table class="g-table">
        <thead><tr><th>Zona</th><th>Vendita €/m²</th><th>12 mesi</th><th>Affitto €/m²/mese</th><th>12 mesi</th></tr></thead>
        <tbody>${G.immobiliare.zone.map((x) => `<tr><th>${x.nome}</th><td>${x.vendita}</td><td>${x.varVendita}</td><td>${x.affitto}</td><td>${x.varAffitto}</td></tr>`).join("")}
        <tr class="tot"><th>Media città</th><td>${G.immobiliare.media.vendita}</td><td>${G.immobiliare.media.varVendita}</td><td>${G.immobiliare.media.affitto}</td><td>${G.immobiliare.media.varAffitto}</td></tr></tbody>
      </table></div>${src(G.immobiliare.fonte)}
    </div></section>

    <section class="g-sec s-paper" id="mancanti"><div class="wrap">
      <h2 class="h2 h-navy">Dati che ci mancano</h2>
      <p class="g-lead">Per il gruppo Territorio: cosa chiedere e a chi.</p>
      <div class="g-missing">${G.datiMancanti.map((d) => `<div class="g-card"><h3>${d.dato}</h3><p><strong>Dove:</strong> ${md(d.dove)}</p><p><strong>Serve a:</strong> ${md(d.perche)}</p></div>`).join("")}</div>
      <p class="g-lead">Sezioni elettorali caricate: <strong>${G.sezioni.length} su 74</strong>.${G.sezioni.length ? "" : " La struttura è pronta in dati.js (blocco «sezioni»)."}</p>
    </div></section>

    <section class="g-sec s-cream" id="metodo"><div class="wrap">
      <h2 class="h2">Fonti e metodo</h2>
      <div class="g-missing">${G.metodo.map((m) => `<div class="g-card"><h3>${m.titolo}</h3><p>${md(m.testo)}</p></div>`).join("")}</div>
      <p class="src">${M.fonteConfini} Indicatori della mappa: ${G.indicatori.map((i) => `${i.nome}: ${i.fonte}`).join(" · ")}.</p>
    </div></section>`;
  }

  /* =================================================================
     MONTAGGIO
     ================================================================= */
  const body = { ingresso: pageIngresso, benvenuto: pageBenvenuto, strada: pageStrada, dati: pageDati }[PAGE]();
  if (body === "") return; // reindirizzamento in corso
  document.getElementById("app").innerHTML = header() + "<main>" + body + "</main>" + footer();
  brand(document.getElementById("app"));

  // palette: copia
  $$(".g-palette button").forEach((b) => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.hex); } catch (_) {}
    const s = b.querySelector("code"); const old = s.textContent; s.textContent = "copiato!";
    setTimeout(() => { s.textContent = old; }, 1200);
  }));

  /* ---------- Strada: mappa semplice + dove sono ---------- */
  if (PAGE === "strada") {
    bindPick();
    $$(".mm-z").forEach((g) => g.addEventListener("click", () => select(g.dataset.z, true)));
    onSelect = (id) => $$(".mm-z").forEach((g) => g.classList.toggle("on", g.dataset.z === id));
    bindWhere((lat, lon) => {
      const c = $("#mm-me"); if (!c || !window.__mmPt) return;
      const [x, y] = window.__mmPt([lon, lat]); c.setAttribute("cx", x); c.setAttribute("cy", y); c.style.display = "";
    });
    // se il link punta a un personaggio, la zona ricordata non deve cambiare l'URL
    if (current) select(current, false, !!cvFromHash(HASH0));
    bindConvincere();
  }

  /* ---------- Strada: come convincere… ---------- */
  function bindConvincere() {
    const box = $("#cv-scheda"); if (!box) return;
    const veil = $(".cv-veil"), wide = matchMedia("(min-width: 700px)"), still = matchMedia("(prefers-reduced-motion: reduce)");
    let open = null, pushed = false;
    const btn = (id) => $(`.cv-av[data-cv="${id}"]`);

    function show(id, push) {
      const p = pers(id); if (!p) return;
      const was = open;
      box.innerHTML = cvScheda(p); brand(box);
      box.style.setProperty("--c", p.colore);
      box.hidden = false; veil.hidden = false;
      document.body.classList.add("cv-open");
      $$(".cv-av").forEach((b) => { const on = b.dataset.cv === id; b.classList.toggle("on", on); b.setAttribute("aria-expanded", on); });
      $$("[data-cv-close]", box).forEach((b) => b.addEventListener("click", () => hide()));
      open = id;
      if (push) {
        // da una scheda all'altra non si allunga la cronologia: «indietro» torna sempre a tutti
        if (was && pushed) history.replaceState({ cv: id }, "", "#convincere-" + id);
        else { history.pushState({ cv: id }, "", "#convincere-" + id); pushed = true; }
      }
      box.focus({ preventScroll: true });
      if (wide.matches) box.scrollIntoView({ behavior: still.matches ? "auto" : "smooth", block: "start" });
      else box.scrollTop = 0;
    }

    function hide(fromHistory) {
      if (!open) return;
      const id = open; open = null;
      box.hidden = true; veil.hidden = true; box.innerHTML = "";
      document.body.classList.remove("cv-open");
      $$(".cv-av").forEach((b) => { b.classList.remove("on"); b.setAttribute("aria-expanded", "false"); });
      const b = btn(id); if (b) b.focus({ preventScroll: !wide.matches });
      if (fromHistory) { pushed = false; return; }
      if (pushed) { pushed = false; history.back(); }
      else history.replaceState(null, "", "#convincere");
    }

    $$(".cv-av").forEach((b) => b.addEventListener("click", () => {
      if (!still.matches) { b.classList.remove("cv-bounce"); void b.offsetWidth; b.classList.add("cv-bounce"); }
      if (open === b.dataset.cv) hide(); else show(b.dataset.cv, true);
    }));
    $$(".cv-av").forEach((b) => b.addEventListener("animationend", () => b.classList.remove("cv-bounce")));
    veil.addEventListener("click", () => hide());
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && open) hide(); });
    window.addEventListener("popstate", () => {
      const id = cvFromHash(location.hash);
      if (id) show(id, false); else hide(true);
    });

    // link diretto: strada.html#convincere-nonna
    const id0 = cvFromHash(HASH0);
    if (id0) { $("#convincere").scrollIntoView(); show(id0, false); }
  }

  /* ---------- Dati: mappa Leaflet, indicatori, stampa ---------- */
  if (PAGE === "dati") {
    bindPick();
    $$("[data-print]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.print;
      document.body.classList.add("printing");
      if (id === "all") document.body.classList.add("print-all");
      else $$(".zcard").forEach((c) => c.classList.toggle("print-target", c.dataset.z === id));
      window.print();
    }));
    window.addEventListener("afterprint", () => {
      document.body.classList.remove("printing", "print-all");
      $$(".zcard").forEach((c) => c.classList.remove("print-target"));
    });

    const zlist = $("#zlist");
    let layer = null, map = null, ind = "residenti", me = null;
    const drawList = () => {
      zlist.innerHTML = G.zone.map((z) => `<button type="button" data-z="${z.id}" class="${z.id === current ? "on" : ""}"><b>${z.id}</b><span>${zname(z)}</span><em>${value(ind, z).l}</em></button>`).join("");
      $$("button", zlist).forEach((b) => b.addEventListener("click", () => select(b.dataset.z, true)));
    };
    const highlight = () => {
      if (!layer) return;
      layer.eachLayer((l) => {
        const on = l.feature.properties.zona === current;
        l.setStyle({ weight: on ? 5 : 1.5, color: on ? "#e6007e" : "#6f0f38" });
        if (on) l.bringToFront();
      });
    };
    const paint = () => {
      const sc = scale(ind);
      if (layer) layer.eachLayer((l) => {
        const z = zona(l.feature.properties.zona), v = value(ind, z);
        l.setStyle({ fillColor: sc.color(v.v), fillOpacity: .78 });
        l.setTooltipContent(`<b>${z.id}</b><br>${v.l}`);
      });
      highlight();
      $("#legend").innerHTML = `<p class="g-legend-t">${IND[ind].nome}</p><ul>${sc.legend.map(([c, t]) => `<li><i style="background:${c}"></i>${t}</li>`).join("")}</ul>${src(IND[ind].fonte)}`;
      drawList();
    };
    onSelect = highlight;
    $("#ind").addEventListener("change", (e) => { ind = e.target.value; paint(); });

    if (window.L && GEO) {
      map = L.map("map", { scrollWheelZoom: false, zoomSnap: .25 });
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 16, attribution: "Base © Esri, HERE, Garmin, © OpenStreetMap · confini ISTAT",
      }).addTo(map);
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}", { maxZoom: 16, pane: "shadowPane" }).addTo(map);
      layer = L.geoJSON(GEO, {
        style: { weight: 1.5, color: "#6f0f38", fillOpacity: .78 },
        onEachFeature: (f, l) => {
          l.bindTooltip("", { permanent: true, direction: "center", className: "zlabel" });
          l.on("click", () => select(f.properties.zona, true));
        },
      }).addTo(map);
      map.fitBounds(layer.getBounds(), { padding: [8, 8] });
      G.zone.forEach((z) => z.luoghi.filter((p) => p.lat && p.lon).forEach((p) =>
        L.circleMarker([p.lat, p.lon], { radius: 7, color: "#fff", weight: 2, fillColor: "#274798", fillOpacity: 1 })
          .bindPopup(`<b>${p.nome}</b>${p.indirizzo ? "<br>" + p.indirizzo : ""}`).addTo(map)));
    } else {
      $("#map").innerHTML = '<p class="todo">La mappa non si è caricata (serve la connessione). Usa l\'elenco qui sotto.</p>';
    }
    paint();
    bindWhere((lat, lon) => {
      if (!map) return;
      if (me) me.remove();
      me = L.circleMarker([lat, lon], { radius: 9, color: "#fff", weight: 3, fillColor: "#e6007e", fillOpacity: 1 }).addTo(map);
      map.setView([lat, lon], 15);
    });
    if (current) select(current, false);
  }

  // salto a un'ancora dopo il montaggio
  if (HASH0 && /^#[\w-]+$/.test(HASH0)) { const el = document.querySelector(HASH0); if (el) setTimeout(() => el.scrollIntoView(), 80); }
})();
