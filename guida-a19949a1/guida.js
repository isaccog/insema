/* =====================================================================
   INSÉMA · GUIDA PER CHI FA INSÉMA — costruisce la pagina
   (per cambiare dati e testi NON serve toccare questo file: vedi dati.js)
   ===================================================================== */
(function () {
  const G = window.GUIDA, T = window.TESTI, GEO = window.GUIDA_CONFINI;
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
  const esc = (s) => String(s).replace(/"/g, "&quot;");
  const zona = (id) => G.zone.find((z) => z.id === id);
  const area = (z) => G.aree.lista.find((a) => a.id === z.area);
  const imm = (nome) => G.immobiliare.zone.find((x) => x.nome === nome);
  const zname = (z) => z.quartieri.map((q) => q.nome).join(", ");


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

  /* ---------- indicatori ---------- */
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

  /* ---------- sezioni ---------- */
  const NAV = [["benvenuto", "Benvenuto"], ["parlare", "Come parliamo"], ["missione", "Missione"], ["mappa", "Mappa"], ["zone", "Zone"],
    ["numeri", "Como in numeri"], ["kit", "Kit di strada"], ["gruppi", "Gruppi"], ["materiali", "Materiali"], ["mancanti", "Dati mancanti"]];

  function header() {
    return `<header class="g-top">
      <a href="../index.html" class="g-logo"><img src="../img/logo/logo-magenta.svg" alt="inséma"></a>
      <span class="g-tag">Guida riservata</span>
    </header>
    <nav class="g-nav" aria-label="Sezioni della guida">${NAV.map(([id, t]) => `<a href="#${id}">${t}</a>`).join("")}</nav>`;
  }

  function benvenuto() {
    const B = G.benvenuto;
    return `<section class="g-sec s-cream" id="benvenuto"><div class="wrap">
      <h1 class="h2">${B.titolo}</h1>
      ${B.righe.map((r) => `<p class="g-lead">${md(r)}</p>`).join("")}
      <p class="src">Aggiornata il ${G.aggiornata}.</p>
    </div></section>`;
  }

  function parlare() {
    const P = G.comeParliamo, M = T.manifesto;
    return `<section class="g-sec s-paper" id="parlare"><div class="wrap">
      <h2 class="h2 h-navy">${P.titolo}</h2>
      <div class="g-cards">${M.stile.punti.map((p) => `<div class="g-card"><h3>${p.titolo}</h3><p>${md(p.testo)}</p></div>`).join("")}</div>
      <h3 class="h3 g-h3">Cosa evitiamo <span class="badge">spiegazioni in bozza</span></h3>
      <ul class="g-avoid">${M.no.lista.map((x) => `<li><strong>${x}</strong>${P.evitare[x] ? ` <span>${md(P.evitare[x])}</span>` : ""}</li>`).join("")}</ul>
      <p class="g-rule">${md(P.regolaNumeri)}</p>
      <h3 class="h3 g-h3">Cosa rispondo se mi chiedono…</h3>
      <div class="g-faq">${P.faq.map((f) => `<details><summary>${f.domanda}${f.bozza ? ' <span class="badge">bozza</span>' : ""}</summary>
        <p>${md(f.risposta)}</p><small class="src">Dai testi del sito: ${f.fonte}</small></details>`).join("")}</div>
    </div></section>`;
  }

  function missione() {
    const M = G.missione, FO = T.fondatori;
    const p = Math.min(100, FO.attuali / FO.obiettivo * 100);
    return `<section class="g-sec s-yellow" id="missione"><div class="wrap">
      <h2 class="h2">${M.titolo}</h2>
      <ol class="g-tappe">${M.tappe.map(([n, l, q]) => `<li><strong>${n}</strong><span>${l}</span><small>${q}</small></li>`).join("")}</ol>
      <p class="g-lead">${md(M.testo)}</p>
      <div class="counter g-counter">
        <div class="counter-n"><strong>${FO.attuali}</strong><span>${FO.contatore} ${FO.obiettivo}</span></div>
        <div class="counter-bar"><div style="width:${p}%"></div></div>
      </div>
      <div class="g-links">${M.link.map((l) => `<a class="btn" href="${l.link}">${l.testo}</a>`).join("")}</div>
    </div></section>`;
  }

  function mappa() {
    const M = G.mappa;
    return `<section class="g-sec s-cream" id="mappa"><div class="wrap">
      <h2 class="h2">${M.titolo}</h2>
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
      <small class="src">${M.fonteConfini}</small>
    </div></section>`;
  }

  function referenti(z) {
    return z.quartieri.map((q) => {
      const ask = `<a class="btn btn-small" href="mailto:${G.email}?subject=${encodeURIComponent("Voglio essere referente per " + q.nome)}">Vuoi farlo tu?</a>`;
      const list = q.referenti.length
        ? q.referenti.map((r) => `<div class="ref-p"><strong>${r.nome}</strong>${r.nota ? ` <span>${md(r.nota)}</span>` : ""}${r.whatsapp ? ` <a class="btn btn-small btn-wa" href="${r.whatsapp}" target="_blank" rel="noopener">Gruppo WhatsApp</a>` : ""}</div>`).join("")
        : `<span class="ref-none">Referente: da trovare</span>`;
      return `<li class="ref"><h4>${q.nome}</h4>${list}${ask}</li>`;
    }).join("");
  }

  function zcard(z) {
    const a = area(z);
    const k = (v, l, f) => `<div class="kpi"><strong>${v}</strong><span>${l}</span>${src(f)}</div>`;
    const immo = z.immobiliare.map(imm).map((x) => `<li><strong>${x.nome}</strong>: vendita ${x.vendita} €/m² (${x.varVendita} in 12 mesi), affitto ${x.affitto} €/m² al mese (${x.varAffitto})</li>`).join("");
    const luoghi = z.luoghi.length
      ? `<ul class="g-places">${z.luoghi.map((l) => `<li><strong>${l.tipo ? l.tipo + ": " : ""}${l.nome}</strong>${l.indirizzo ? `<br>${l.indirizzo}` : ""}${l.nota ? `<br><span>${md(l.nota)}</span>` : ""}</li>`).join("")}</ul>`
      : todo("Da completare (gruppo Territorio): mercati, piazze per banchetti, associazioni, scuole, bar dove lasciare volantini.");
    return `<article class="zcard" id="zona-${z.id}" data-z="${z.id}" hidden>
      <header class="zhead">
        <p class="kicker">Zona ${z.id} · ex circoscrizione</p>
        <h3 class="h2">${zname(z)}</h3>
        <p class="src">Elenco dei quartieri da verificare con chi abita lì.</p>
      </header>

      <div class="zblock"><h4>Referenti</h4>
        <ul class="refs">${referenti(z)}</ul>
        <p class="note">${G.cosaFaReferente}</p>
      </div>

      <div class="zblock"><h4>Numeri chiave</h4>
        <div class="kpis">
          ${k(num(z.residenti), `residenti, il ${z.quota} della città`, G.fonti.residenti)}
          ${k(z.var2019, "residenti dal 2019", G.fonti.residenti)}
          ${k(z.densita, "abitanti per km² (2021)", G.fonti.densita)}
          ${k(z.prezzo, "€/m² per comprare casa", G.fonti.prezzo)}
        </div>
        <ul class="g-immo">${immo}</ul>${src(G.immobiliare.fonte)}
      </div>

      <div class="zblock"><h4>Cosa dicono i dati</h4>
        <p class="g-lead">${md(z.testo)}</p>
        ${(z.extra || []).map((e) => `<p>${md(e)}</p>`).join("")}
      </div>

      <div class="zblock"><h4>Chi ci abita <span class="badge">dati 2011</span></h4>
        <p>Area di censimento <strong>${a.nome}</strong>${a.zone.length > 1 ? ` (comprende le zone ${a.zone.join(", ")})` : ""}: ${a.residenti} residenti oggi.</p>
        <dl class="g-dl">
          ${[["Over 65", a.over65], ["Over 75", a.over75], ["Stranieri", a.stranieri], ["Laureati*", a.laureati], ["Famiglie in affitto", a.affitto], ["Famiglie di 1 persona", a.soli], ["Disoccupazione", a.disoccupazione]]
            .map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join("")}
        </dl>
        <small class="src">*Sulla popolazione di 6 anni e più. ${G.aree.nota} Fonte: ${G.aree.fonte}.</small>
      </div>

      <div class="zblock"><h4>Voto: ballottaggio 2022</h4>
        <p>${md(z.voto.testo)}</p>
        <p class="note">${G.voto2022nota}</p>${src(IND.voto.fonte)}
      </div>

      <div class="zblock"><h4>Temi del programma per questa zona</h4>
        ${z.temi.length ? `<ul class="g-list">${z.temi.map((t) => `<li>${md(t)}</li>`).join("")}</ul>` : todo("Da completare (gruppo Programma).")}
        <p class="g-sub2">Per tutte le zone:</p>
        <ul class="g-list">${G.temiTutte.map((t) => `<li>${md(t)}</li>`).join("")}</ul>
      </div>

      <div class="zblock"><h4>Luoghi utili</h4>${luoghi}</div>

      <div class="zactions noprint"><button type="button" class="btn btn-navy" data-print="${z.id}">🖨 Stampa la scheda</button></div>
    </article>`;
  }

  function zone() {
    return `<section class="g-sec s-paper" id="zone"><div class="wrap">
      <h2 class="h2 h-navy">Schede zona</h2>
      <div class="g-zpick noprint" role="tablist" aria-label="Scegli la zona">${G.zone.map((z) => `<button type="button" role="tab" data-z="${z.id}" aria-selected="false">${z.id}</button>`).join("")}</div>
      <p class="g-zhint noprint" id="zhint">Scegli una zona qui sopra o sulla mappa.</p>
      <div id="zcards">${G.zone.map(zcard).join("")}</div>
      <div class="g-box noprint">
        <h4>Da collocare</h4>
        <p>Temi del programma che non sappiamo ancora in quale zona mettere: ${G.temiDaCollocare.join(", ")}. Chiedete al gruppo Programma.</p>
      </div>
      <p class="noprint"><button type="button" class="btn btn-ghost" data-print="all">🖨 Stampa tutte le schede</button></p>
    </div></section>`;
  }

  function numeri() {
    return `<section class="g-sec s-cream" id="numeri"><div class="wrap">
      <h2 class="h2">Como in numeri</h2>
      ${G.comoInNumeri.map((g) => `<h3 class="g-sub">${g.tema}</h3>
        <div class="g-stats">${g.numeri.map((n) => `<div class="g-stat"><strong>${n.valore}</strong><p>${md(n.testo)}</p>${src(n.fonte)}</div>`).join("")}</div>`).join("")}
      <h3 class="g-sub">Prezzi e affitti per zona di immobiliare.it</h3>
      <div class="g-table-wrap"><table class="g-table">
        <thead><tr><th>Zona</th><th>Vendita €/m²</th><th>12 mesi</th><th>Affitto €/m²/mese</th><th>12 mesi</th></tr></thead>
        <tbody>${G.immobiliare.zone.map((x) => `<tr><th>${x.nome}</th><td>${x.vendita}</td><td>${x.varVendita}</td><td>${x.affitto}</td><td>${x.varAffitto}</td></tr>`).join("")}
        <tr class="tot"><th>Media città</th><td>${G.immobiliare.media.vendita}</td><td>${G.immobiliare.media.varVendita}</td><td>${G.immobiliare.media.affitto}</td><td>${G.immobiliare.media.varAffitto}</td></tr></tbody>
      </table></div>${src(G.immobiliare.fonte)}
    </div></section>`;
  }

  function kit() {
    const K = G.kit;
    const cl = (items, name) => `<ul class="g-checklist">${items.map((x, i) => `<li><label><input type="checkbox" name="${name}-${i}"> <span>${md(x)}</span></label></li>`).join("")}</ul>`;
    return `<section class="g-sec s-blush" id="kit"><div class="wrap">
      <h2 class="h2">${K.titolo}</h2>
      <p class="badge badge-lg">${K.bozza}</p>
      <p class="g-warn">⚠️ ${md(K.avviso)}</p>
      <div class="g-kits">${K.liste.map((l, k) => `<div class="g-card"><h3>${l.titolo}</h3>
        <h4>Cosa portare</h4>${cl(l.portare, `k${k}p`)}<h4>Come fare</h4>${cl(l.fare, `k${k}f`)}</div>`).join("")}</div>
      <div class="g-kits g-kits-2">
        <div class="g-card"><h3>${K.contatto.titolo}</h3><p>${md(K.contatto.testo)}</p></div>
        <div class="g-card"><h3>${K.dopo.titolo}</h3><p>${md(K.dopo.testo)}</p></div>
      </div>
    </div></section>`;
  }

  function gruppi() {
    const A = T.aiutaci;
    return `<section class="g-sec s-paper" id="gruppi"><div class="wrap">
      <h2 class="h2 h-navy">Gruppi e calendario</h2>
      <ul class="g-groups">${A.gruppi.lista.map((g) => `<li><strong>${g.nome}</strong> ${md(g.testo)}</li>`).join("")}</ul>
      <h3 class="g-sub">${A.appuntamenti.titolo}</h3>
      <ol class="timeline">${A.appuntamenti.lista.map((x) => `<li><h3>${x.quando}</h3><p>${md(x.cosa)}</p></li>`).join("")}</ol>
    </div></section>`;
  }

  function materiali() {
    const M = G.materiali;
    const tile = (x) => `<a class="g-tile${x.scuro ? " dark" : ""}" href="${x.file}" download><img src="${x.file}" alt="" loading="lazy"><span>${x.nome} ↓</span></a>`;
    return `<section class="g-sec s-cream" id="materiali"><div class="wrap">
      <h2 class="h2">Materiali</h2>
      <h3 class="g-sub">Loghi</h3><div class="g-tiles">${M.loghi.map(tile).join("")}</div>
      <h3 class="g-sub">Illustrazioni</h3><div class="g-tiles">${M.illustrazioni.map(tile).join("")}</div>
      <h3 class="g-sub">Palette <small>(tocca per copiare il codice)</small></h3>
      <div class="g-palette">${M.palette.map(([n, h]) => `<button type="button" data-hex="${h}"><i style="background:${h}"></i><span>${n}<br><code>${h}</code></span></button>`).join("")}</div>
      <p class="g-lead"><a href="${T.sito.instagram}" target="_blank" rel="noopener">Instagram ${T.sito.instagramNome}</a></p>
    </div></section>`;
  }

  function mancanti() {
    return `<section class="g-sec s-paper" id="mancanti"><div class="wrap">
      <h2 class="h2 h-navy">Dati che ci mancano</h2>
      <p class="g-lead">Per il gruppo Territorio: cosa chiedere e a chi.</p>
      <div class="g-missing">${G.datiMancanti.map((d) => `<div class="g-card"><h3>${d.dato}</h3><p><strong>Dove:</strong> ${md(d.dove)}</p><p><strong>Serve a:</strong> ${md(d.perche)}</p></div>`).join("")}</div>
    </div></section>`;
  }

  /* ---------- montaggio ---------- */
  document.getElementById("app").innerHTML = header() + "<main>" +
    benvenuto() + parlare() + missione() + mappa() + zone() + numeri() + kit() + gruppi() + materiali() + mancanti() +
    "</main>" + `<footer class="g-foot"><p>Guida riservata a chi fa inséma · non girarla fuori dal gruppo · aggiornata il ${G.aggiornata}</p></footer>`;

  brand(document.getElementById("app"));

  /* ---------- schede: scelta della zona ---------- */
  let current = null;
  function select(id, scroll) {
    current = id;
    $$(".zcard").forEach((c) => { c.hidden = c.dataset.z !== id; });
    $$(".g-zpick button").forEach((b) => b.setAttribute("aria-selected", b.dataset.z === id));
    $$(".g-zlist button").forEach((b) => b.classList.toggle("on", b.dataset.z === id));
    $("#zhint").hidden = true;
    highlight();
    history.replaceState(null, "", "#zona-" + id);
    if (scroll) document.getElementById("zona-" + id).scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $$(".g-zpick button").forEach((b) => b.addEventListener("click", () => select(b.dataset.z, false)));

  /* ---------- stampa ---------- */
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

  /* ---------- palette: copia ---------- */
  $$(".g-palette button").forEach((b) => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.hex); } catch (_) {}
    const s = b.querySelector("code"); const old = s.textContent; s.textContent = "copiato!";
    setTimeout(() => { s.textContent = old; }, 1200);
  }));

  /* ---------- indice: sezione attiva ---------- */
  const links = $$(".g-nav a");
  const obs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => {
      const on = a.getAttribute("href") === "#" + e.target.id;
      a.classList.toggle("on", on);
      // sposta solo la barra dell'indice, mai la pagina
      if (on) { const nav = a.parentNode; nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.offsetWidth / 2, behavior: "smooth" }); }
    });
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$(".g-sec").forEach((s) => obs.observe(s));

  /* ---------- mappa ---------- */
  const zlist = $("#zlist");
  let layer = null, map = null, ind = "residenti";
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

  function drawList() {
    zlist.innerHTML = G.zone.map((z) => {
      const v = value(ind, z);
      return `<button type="button" data-z="${z.id}" class="${z.id === current ? "on" : ""}"><b>${z.id}</b><span>${zname(z)}</span><em>${v.l}</em></button>`;
    }).join("");
    $$("button", zlist).forEach((b) => b.addEventListener("click", () => select(b.dataset.z, true)));
  }
  function drawLegend(sc) {
    $("#legend").innerHTML = `<p class="g-legend-t">${IND[ind].nome}</p>
      <ul>${sc.legend.map(([c, t]) => `<li><i style="background:${c}"></i>${t}</li>`).join("")}</ul>${src(IND[ind].fonte)}`;
  }
  function highlight() {
    if (!layer) return;
    layer.eachLayer((l) => {
      const on = l.feature.properties.zona === current;
      l.setStyle({ weight: on ? 5 : 1.5, color: on ? "#e6007e" : "#6f0f38" });
      if (on) l.bringToFront();
    });
  }
  function paint() {
    const sc = scale(ind);
    if (layer) {
      layer.eachLayer((l) => {
        const z = zona(l.feature.properties.zona), v = value(ind, z);
        l.setStyle({ fillColor: sc.color(v.v), fillOpacity: .78 });
        l.setTooltipContent(`<b>${z.id}</b><br>${v.l}`);
      });
      highlight();
    }
    drawLegend(sc); drawList();
  }
  $("#ind").addEventListener("change", (e) => { ind = e.target.value; paint(); });

  if (window.L && GEO) {
    map = L.map("map", { scrollWheelZoom: false, zoomSnap: .25 });
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 16,
      attribution: 'Base © Esri, HERE, Garmin, © OpenStreetMap · confini ISTAT',
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
    // luoghi utili con coordinate
    G.zone.forEach((z) => z.luoghi.filter((p) => p.lat && p.lon).forEach((p) =>
      L.circleMarker([p.lat, p.lon], { radius: 7, color: "#fff", weight: 2, fillColor: "#274798", fillOpacity: 1 })
        .bindPopup(`<b>${p.nome}</b>${p.indirizzo ? "<br>" + p.indirizzo : ""}`).addTo(map)));
  } else {
    $("#map").innerHTML = '<p class="todo">La mappa non si è caricata (serve la connessione). Usa l\'elenco qui sotto.</p>';
  }
  paint();

  /* ---------- dove sono? (la posizione non viene salvata) ---------- */
  let me = null;
  $("#dove").addEventListener("click", () => {
    const msg = $("#geo-msg");
    const say = (t) => { msg.textContent = t; msg.hidden = false; };
    if (!navigator.geolocation) return say("Il tuo telefono non permette di trovare la posizione.");
    say("Cerco dove sei…");
    navigator.geolocation.getCurrentPosition((p) => {
      const { latitude: lat, longitude: lon } = p.coords;
      const z = zoneAt(lon, lat);
      if (map) {
        if (me) me.remove();
        me = L.circleMarker([lat, lon], { radius: 9, color: "#fff", weight: 3, fillColor: "#e6007e", fillOpacity: 1 }).addTo(map);
      }
      if (!z) return say("Sembra che tu non sia dentro il Comune di Como.");
      const zz = zona(z.zona);
      say(`Sei nella zona ${zz.id}: ${zname(zz)}.`);
      select(zz.id, false);
      if (map) map.setView([lat, lon], 15);
    }, () => say("Non riesco a trovare la posizione: controlla di aver dato il permesso al browser."), { enableHighAccuracy: true, timeout: 10000 });
  });

  // link diretto a una scheda: …/#zona-III
  const hz = location.hash.match(/^#zona-([IVX]+)$/);
  if (hz && zona(hz[1])) select(hz[1], false);
  if (location.hash) { const el = document.querySelector(location.hash); if (el) setTimeout(() => el.scrollIntoView(), 80); }
})();
