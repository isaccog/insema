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
          <div class="form-row">
            <input type="text" name="nome" placeholder="${F.nome}" required>
            <input type="email" name="email" placeholder="${F.email}" required>
          </div>
          <div class="form-row">
            <input type="tel" name="telefono" placeholder="${F.telefono}" required>
            <input type="text" name="quartiere" placeholder="${F.quartiere}">
          </div>
          <fieldset><legend>${F.gruppi}</legend>
            <div class="chips">${A.gruppi.lista.map((g) => `<label class="chip"><input type="checkbox" name="gruppi" value="${g.nome}"><span>${g.nome}</span></label>`).join("")}</div>
          </fieldset>
          <textarea name="messaggio" rows="4" placeholder="${F.messaggio}"></textarea>
          <label class="check"><input type="checkbox" name="muro" value="sì"> <span>${F.muro}</span></label>
          <label class="check"><input type="checkbox" name="privacy" required> <span>${F.privacy}</span></label>
          <button type="submit" class="btn">${F.bottone}</button>
          <p class="form-msg" role="status" hidden></p>
          <div class="after" hidden>${share()}</div>
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
      const gruppi = d.getAll("gruppi").join(", ");
      if (S.moduloEndpoint) {
        try {
          const r = await fetch(S.moduloEndpoint, { method: "POST", body: d, headers: { Accept: "application/json" } });
          if (!r.ok) throw new Error();
          form.reset(); sync(); show(F.grazie);
        } catch (_) { show(`${F.errore} <a href="mailto:${S.email}">${S.email}</a>`, false); }
      } else {
        const lines = [
          `Nome: ${d.get("nome")}`, `Email: ${d.get("email")}`, `Telefono: ${d.get("telefono")}`,
          d.get("quartiere") ? `Quartiere: ${d.get("quartiere")}` : null,
          gruppi ? `Gruppi: ${gruppi}` : null,
          `Ponte dei 100: ${d.get("muro") ? "sì" : "no"}`,
          d.get("messaggio") ? `\n${d.get("messaggio")}` : null,
        ].filter((x) => x !== null).join("\n");
        location.href = `mailto:${S.email}?subject=${encodeURIComponent("Voglio essere uno dei 100 fondatori di Inséma")}&body=${encodeURIComponent(lines)}`;
        show(F.grazieMail);
      }
    });
  }

  /* ancore (#modulo ecc.) dopo il montaggio */
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) setTimeout(() => el.scrollIntoView(), 50);
  }
})();
