/* =====================================================================
   inséma · GUIDA PER CHI FA inséma — TUTTI I DATI E I TESTI
   =====================================================================

   Questo è l'unico file da toccare per aggiornare la guida.
   La guida ha tre pagine, che leggono tutte da qui:
     benvenuto.html  → prima accoglienza (a casa, con calma)
     strada.html     → guida di strada (dal telefono, fuori)
     dati.html       → dati e approfondimento (al computer)
   Ogni blocco qui sotto dice in quale pagina compare.

   Le regole sono le stesse di testi.js:
     **grassetto**   *corsivo*   ==rosa==   [testo](link)
     riga vuota nei testi `...` → nuovo paragrafo
   Dentro "..." non usare le virgolette dritte ": usa « ».

   ⚠️  QUESTA GUIDA NON È ANCORA PROTETTA DA PASSWORD.
   Il repository è pubblico: qui dentro solo dati pubblici.
   NIENTE numeri di telefono o indirizzi personali. Per i referenti
   scrivete il nome solo con il loro consenso e, al posto del numero,
   il link al gruppo WhatsApp di zona.

   COME AGGIUNGERE UN REFERENTE
   (compare in tutte e tre le pagine: elenco zone in Benvenuto,
   scheda di zona in Strada e in Dati)
   Cercate la zona (es. id: "III"), poi il quartiere, e dentro
   referenti: [ ] aggiungete una riga così:
     { nome: "Giulia R.", whatsapp: "https://chat.whatsapp.com/…", nota: "Sente bene la sera" },
   Si possono mettere più referenti nello stesso quartiere.

   COME AGGIUNGERE UN LUOGO UTILE
   (compare nella scheda di zona in Strada e in Dati; se ha lat e lon,
   anche come punto sulla mappa di Dati)
   Dentro luoghi: [ ] della zona:
     { tipo: "Mercato", nome: "Mercato di Rebbio", indirizzo: "Piazza …", nota: "Martedì mattina", lat: 45.79, lon: 9.07 },
   lat e lon sono facoltativi: su Google Maps tenete premuto sul punto
   e copiate i due numeri.
   ===================================================================== */

window.GUIDA = {
  aggiornata: "23 novembre 2026",
  email: "insema.como@gmail.com",

  /* ------------------------------------------------------------------ */
  /* LE TRE PAGINE (barra in alto e pagina d'ingresso index.html)       */
  /* ------------------------------------------------------------------ */
  pagine: {
    ingresso: {
      titolo: "Guida per chi fa inséma",
      testo: "Tre pagine per tre momenti diversi. Scegli quella che ti serve adesso.",
    },
    benvenuto: {
      nome: "Benvenuto",
      aCosaServe: "Da leggere una volta, con calma, a casa: cos'è inséma e come puoi dare una mano.",
      quando: "Sei appena entrata o entrato? Parti da qui.",
    },
    strada: {
      nome: "Strada",
      titolo: "Guida di strada",
      aCosaServe: "Per quando sei fuori: dove sei, cosa dire, cosa fare.",
      quando: "Volantinaggio, banchetto o incontro: aprila dal telefono.",
    },
    dati: {
      nome: "Dati",
      titolo: "Dati e approfondimento",
      aCosaServe: "Per preparare un incontro o lavorare nei gruppi Territorio, Strategia e Programma: com'è fatta ogni zona e cosa non sappiamo ancora.",
      quando: "Al computer, con calma: mappa, schede complete, numeri della città.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* PAGINA BENVENUTO · accoglienza                                                       */
  /* ------------------------------------------------------------------ */
  benvenuto: {
    titolo: "Ciao, sei dei nostri.",
    righe: [
      "Questa guida serve a chi va per strada con inséma: volantinaggi, banchetti, incontri nei quartieri. Dove sei, chi ci abita, cosa dire, a chi rivolgerti.",
      "È **riservata**: non girarla fuori dal gruppo delle attiviste e degli attivisti.",
      "Manca qualcosa o hai trovato un errore? Scrivi a [insema.como@gmail.com](mailto:insema.como@gmail.com) o nel gruppo WhatsApp.",
    ],
  },

  /* ------------------------------------------------------------------ */
  /* PAGINA BENVENUTO · come parliamo (le FAQ e la regola dei numeri compaiono in STRADA)                                                   */
  /* Le 4 parole dello stile vengono da testi.js → manifesto.stile      */
  /* ------------------------------------------------------------------ */
  comeParliamo: {
    titolo: "Come parliamo",
    // spiegazione delle 5 cose da evitare (i nomi vengono da testi.js → manifesto.no)
    // BOZZA: frasi scritte per la guida, da far rivedere
    evitare: {
      "Comunicazione aggressiva": "Non alziamo la voce e non attacchiamo nessuno, nemmeno quando ci provocano.",
      "Rabbia": "La rabbia allontana chi non è già d'accordo. Partiamo dal bisogno di stare meglio.",
      "Indignazione": "Non basta dire che qualcosa è uno scandalo: diciamo cosa faremmo.",
      "Populismo": "Niente promesse facili né nemici da additare. Proposte di buon senso, con i conti fatti.",
      "Perdere il focus": "Parliamo di Como: casa, servizi, lavoro, sviluppo, conti. Il resto non è il nostro campo.",
    },
    regolaNumeri: "In pubblico diamo **numeri sui problemi, non sulle soluzioni**. «Como è seconda in Lombardia per prezzo delle case» sì; «faremo 500 case» no.",

    /* Dal documento di strategia di comunicazione (24/11/2026).
       bozza: true finché il gruppo Strategia non li rivede.
       Nella guida NON vanno nomi di avversari o di persone. */

    // BENVENUTO · Come parliamo: dopo le 4 parole dello stile
    regole: {
      titolo: "Le nostre regole",
      bozza: true,
      fonte: "Strategia di comunicazione, 24/11/2026",
      lista: [
        "**Critichiamo le scelte, mai le persone.** Anche quando ci provocano.",
        "**Ogni critica finisce con «cosa faremmo noi»:** una proposta, una domanda aperta, un invito a partecipare.",
        "**Diciamo cosa è dato, cosa è stima e cosa è ancora da verificare.** «Su questo stiamo verificando con chi se ne intende» è una buona risposta, e vale più di una risposta inventata.",
        "**Citiamo sempre la fonte** quando diamo un numero (Comune, ISTAT, bilancio, atti).",
        "**Parliamo semplice:** niente burocratese. Norme e bilanci si traducono in cosa cambia nella vita delle persone.",
        "**Parliamo al plurale e a tutte e tutti:** «noi», «la squadra», «le persone», «chi vive a Como». Ironia sì, con misura e soprattutto su noi stessi («siamo folli, non stupidi»), mai per prendere in giro qualcuno.",
      ],
    },

    // BENVENUTO · Cosa evitiamo: voci in più, sotto le cinque di testi.js → manifesto.no
    evitareAncora: [
      { voce: "Dare per certo quello che è una stima", testo: "Cifre, tempi e fattibilità del programma sono in parte ancora da verificare: diciamolo.", bozza: true, fonte: "Strategia di comunicazione, 24/11/2026" },
      { voce: "Il gergo", testo: "Se una frase si capisce solo in Comune, va riscritta.", bozza: true, fonte: "Strategia di comunicazione, 24/11/2026" },
    ],

    // BENVENUTO · Come parliamo (box) e STRADA · fondo del Kit di strada («breve»)
    dueRegole: {
      titolo: "Due regole che non si discutono",
      bozza: true,
      fonte: "Strategia di comunicazione, 24/11/2026",
      lista: [
        "**Stampa e pubblicazioni:** prima di parlare con un giornalista o pubblicare qualcosa a nome di inséma, passate dal gruppo Strategia.",
        "**Bozze interne:** non girate file provvisori, come la bozza del programma, come se fossero definitivi.",
      ],
      breve: "**Due regole:** giornalisti e pubblicazioni a nome di inséma passano dal gruppo Strategia; le bozze interne non si girano come se fossero definitive.",
    },

    // STRADA · Cosa rispondo: riquadro prima delle FAQ
    critiche: {
      titolo: "Quando ti criticano: 4 passi",
      bozza: true,
      fonte: "Strategia di comunicazione, 24/11/2026",
      passi: [
        "**Riconosci la preoccupazione:** spesso è legittima. Non metterti sulla difensiva.",
        "**Non giocare sul terreno dell'altro:** non serve dimostrare di essere «come chi c'è da anni». Sposta il discorso sul metodo e sulle regole che ci siamo dati.",
        "**Ammetti quello che non sai:** «stiamo verificando» è serio, non debole.",
        "**Chiudi con «cosa faremmo noi»** e con un modo per partecipare.",
      ],
    },

    // STRADA · riquadro dentro la FAQ con garanzie: true; link diretto strada.html#garanzie
    garanzie: {
      titolo: "Le 4 garanzie",
      bozza: true,
      fonte: "Strategia di comunicazione, 24/11/2026; programma → Conti chiari. «Ogni tre mesi», «col semaforo», «errori ammessi», «entro 30 giorni» e «per tre anni dopo»: dal piano interno, da confermare",
      link: { testo: "Il capitolo Conti chiari", link: "../programma-conti.html" },
      lista: [
        { titolo: "Riunioni pubbliche nei quartieri ogni tre mesi", testo: "Partendo da quelli dove si vota meno: stato dei progetti col semaforo, soldi spesi, errori ammessi, risposta scritta entro 30 giorni." },
        { titolo: "Taglio delle indennità della Giunta", testo: "A scaglioni: chi prende di più dà di più. I risparmi vanno al welfare di quartiere." },
        { titolo: "Patto di integrità", testo: "Niente donazioni da grandi gruppi, alberghi, immobiliari, costruttori o da chi lavora con il Comune; donazioni pubblicate online; nessun incarico nelle società del Comune durante il mandato e per tre anni dopo." },
        { titolo: "Un metodo collettivo", testo: "Programma scritto con la città, gruppi di lavoro aperti, nessun vincolo di partito." },
      ],
    },

    /* FAQ (pagina Strada → Cosa rispondo)
       bozza: true = risposta scritta per la guida, da verificare
       id         = per il link diretto: strada.html#faq-ID (si apre da sola)
       varianti   = facoltativo: più versioni della stessa risposta, mostrate
                    come schede dentro la domanda. tipo: "breve" (battuta
                    veloce), "sostanza" (incontro, dibattito), "ironia" (solo
                    se l'aria è giusta). Con le varianti, «risposta» non serve.
       consiglio  = facoltativo: un suggerimento sotto le risposte
       garanzie: true = mostra qui dentro il riquadro «Le 4 garanzie» */
    faq: [
      {
        id: "destra-sinistra",
        domanda: "Siete di destra o di sinistra?",
        risposta: "Siamo un progetto di cittadinanza attiva, non un partito: alle comunali ci presentiamo con una lista civica. Siamo un movimento civico. Parliamo a tutte e a tutti, non solo a chi la pensa già come noi. Le città non si governano contro qualcuno, ma per qualcuno.",
        fonte: "testi del sito: manifesto (Trasversale, chiusura); prima frase: Strategia di comunicazione, 24/11/2026",
        bozza: true,
      },
      {
        id: "chi-paga",
        domanda: "Chi vi paga?",
        risposta: "Non abbiamo grandi finanziamenti, ogni euro conta. Abbiamo un patto di integrità: niente donazioni da grandi gruppi, alberghi, immobiliari, costruttori o da chi lavora con il Comune. Ogni donazione sarà pubblicata online.",
        fonte: "testi del sito: aiutaci (Sostienici), programma → Conti chiari (Patto di integrità)",
      },
      {
        id: "casa",
        domanda: "Cosa fate per la casa?",
        risposta: "Oggi chi fa un lavoro normale non riesce più a comprare casa in città: Como è seconda in Lombardia per prezzo, dopo Milano. Vogliamo rimettere in uso le case comunali vuote, nuove case a prezzi accessibili, un fondo per le giovani famiglie, il Comune che fa da garante sugli affitti e tasse più giuste: chi tiene le case vuote paga di più, chi affitta a canone concordato paga di meno. Tutto il capitolo è su [programma-casa.html](../programma-casa.html).",
        fonte: "testi del sito: programma → Casa",
      },
      {
        id: "fidarmi",
        domanda: "Perché dovrei fidarmi di voi?",
        risposta: "Perché ogni euro pubblico deve essere chiaro a tutti, e vale anche per noi: ogni donazione sarà pubblica. Faremo riunioni pubbliche nei quartieri, partendo da quelli dove si vota meno, con risposta scritta a ogni domanda. E le nostre proposte non sono radicali: sono di buon senso.\n\nTutti i dettagli: [Le 4 garanzie](#garanzie).",
        fonte: "testi del sito: manifesto (Trasparenza), programma → Conti chiari, home (Perché possiamo farcela)",
        bozza: true,
      },
      {
        id: "esperienza",
        domanda: "Non avete esperienza.",
        varianti: [
          { tipo: "breve", testo: "Non abbiamo tessere di partito né anni di poltrone alle spalle, è vero. Abbiamo però occhi nuovi, voglia di studiare i dossier sul serio e la libertà di dire come stanno le cose. A Como non serve solo chi c'è sempre stato: serve chi ha voglia di cambiare passo." },
          { tipo: "sostanza", testo: "L'esperienza amministrativa è importante, ma conta come viene usata. Noi partiamo da una bozza di programma con numeri, fonti e verifiche già avviate, dall'avanzo di bilancio ai temi di casa, lavoro, servizi e quartieri. E stiamo costruendo una squadra che unisce cittadini, quartieri e competenze tecniche su bilanci, diritto, urbanistica e mobilità. Preferiamo una squadra nuova che studia e chiede aiuto dove serve." },
          { tipo: "ironia", testo: "Se per esperienza si intende litigare sui social, sì, ci manca un po' di pratica. Se parliamo di ascoltare le persone, leggere le carte e mettere insieme idee concrete, ci stiamo già lavorando. E non siamo qui per improvvisare." },
        ],
        consiglio: "Racconta cosa stiamo già facendo: richieste di accesso agli atti, lettura del bilancio, incontri nei quartieri, confronto con professioniste e professionisti.",
        fonte: "Strategia di comunicazione, 24/11/2026",
        bozza: true,
      },
      {
        id: "testa",
        domanda: "E se poi, una volta eletti, vi monta la testa? Un altro uomo solo al comando?",
        varianti: [
          { tipo: "breve", testo: "Hai ragione a non fidarti sulla parola. Per questo inséma non è il progetto di una persona sola, ma una squadra che si dà regole precise prima del voto: riunioni pubbliche nei quartieri ogni tre mesi, con i conti aperti, e un patto di integrità firmato da tutte e tutti. Non chiediamo fiducia cieca: chiediamo di controllarci passo dopo passo." },
          { tipo: "sostanza", testo: "È una preoccupazione legittima: quando il potere si concentra su una persona sola, senza contrappesi, il rischio di chiudersi nel palazzo c'è sempre. La nostra risposta non è «fidatevi di noi», ma paletti concreti fin dall'inizio. Ogni tre mesi la Giunta va nei quartieri a dire cosa è stato fatto, quanto è stato speso e cosa non ha funzionato, e risponde per iscritto alle domande entro 30 giorni. In più: taglio delle indennità della Giunta, patto di integrità, nessun incarico nelle società del Comune durante il mandato e per tre anni dopo. Il sindaco non deve essere un capo intoccabile, ma il portavoce di una comunità che resta vigile." },
          { tipo: "ironia", testo: "Il vantaggio di costruire un movimento con decine di persone dei quartieri è che, se a qualcuno venisse la tentazione di fare il fenomeno, lo riportiamo subito coi piedi per terra. E abbiamo messo nero su bianco le riunioni pubbliche ogni tre mesi, così può farlo tutta la città." },
        ],
        garanzie: true,
        fonte: "Strategia di comunicazione, 24/11/2026; «ogni tre mesi», «entro 30 giorni» e «per tre anni dopo»: dal piano interno, da confermare",
        bozza: true,
      },
      {
        id: "aiutare",
        domanda: "Come posso aiutare?",
        risposta: "Diventa uno dei 100 fondatori entro il 31 dicembre: due minuti sul [modulo](../aiutaci.html#modulo). Poi scegli uno dei sette gruppi di lavoro, oppure accetta la [missione delle 15 persone](../piano.html#missione).",
        fonte: "testi del sito: fondatori, aiutaci, piano",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* PAGINA STRADA · come convincere… (sezione #convincere)             */
  /* e una card che la presenta in Benvenuto → Come parliamo            */
  /* ------------------------------------------------------------------ */
  /*
     Ogni personaggio è un avatar tondo; toccandolo si apre la sua scheda.
     Il link diretto a una scheda è strada.html#convincere-ID
     (es. strada.html#convincere-nonni): si può mandare nel gruppo WhatsApp.

     Un campo lasciato vuoto ("" oppure [ ]) compare nella guida come
     riquadro tratteggiato «Da scrivere: …» con il gruppo indicato
     qui sotto in «gruppi». Quando lo scrivete, il riquadro sparisce.

     COME AGGIUNGERE UN PERSONAGGIO
     Copiate un personaggio intero, da { a }, e cambiate:
       id      → corto, minuscolo, senza spazi né accenti (va nel link)
       nome    → come compare sotto l'avatar
       img     → "avatar/ID.webp" (vedi avatar/LEGGIMI.txt). Finché
                 il file non c'è, si vede un avatar disegnato provvisorio.
       colore  → sfondo dell'avatar, un colore della palette
       attivo  → false per nasconderlo senza cancellarlo
       bozza   → true finché la frase tipica è da rivedere

     COME AGGIUNGERE UNA DOMANDA
     Dentro domande: [ ] del personaggio:
       { d: "La domanda che ti fanno", r: "La risposta", bozza: true },
     Se la stessa domanda ha già una risposta nelle FAQ di «Cosa rispondo»,
     aggiungete vedi: "ID della FAQ" (es. vedi: "esperienza"): sotto la
     risposta compare il link alla FAQ, senza copiarne il testo.

     COME AGGIUNGERE UN PEZZO DI DIALOGO
     Dentro dialogo: [ ], una riga per battuta, nell'ordine:
       { chi: "tu", testo: "Cosa dici tu" },
       { chi: "loro", testo: "Cosa risponde" },
     chi: "tu" va a destra; qualsiasi altro valore (di solito «loro»)
     va a sinistra, con il nome del personaggio.

     Dati e fonti di «chi è»: copiate il numero in «dato» e la fonte,
     così com'è, in «fonte». Un personaggio può avere più dati.
  */
  convincere: {
    titolo: "Come convincere…",
    intro: "Non si tratta di vincere una discussione. Ascolta, fai domande, parti da un problema concreto della sua vita. Mai prendere in giro, mai alzare la voce. Chiudi sempre con una cosa concreta: una proposta, un incontro, il modulo.",
    // ultima frase dell'intro: Strategia di comunicazione, 24/11/2026
    introBozza: true,
    // testo della card in Benvenuto → Come parliamo
    promo: "Tu* nonn*, i tuoi genitori, l'amic* di destra: per ognuno, da dove partire, cosa ti chiederà e cosa rispondere.",
    // chi scrive ogni parte della scheda (compare nei riquadri «Da scrivere»)
    gruppi: {
      chiE: "Strategia", aCuore: "Strategia", apertura: "Strategia",
      risposte: "Programma", dialogo: "Strategia", evitare: "Strategia", programma: "Programma",
    },
    personaggi: [
      {
        id: "nonni", nome: "Tu* nonn*", img: "avatar/nonni.webp", colore: "#f6b8ca", attivo: true,
        frase: "Ai miei tempi Como era un'altra cosa.", bozza: true,
        chiE: { testo: "", dati: [
          { dato: "Gli elettori over 75 a Como sono 11.963, il 62% donne.", fonte: "ISTAT via tuttitalia, 1/1/2025" },
          { dato: "Il tg informa il 67,4% degli over 65.", fonte: "Censis 2026, dato nazionale" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "E chi mi aiuta se sto male?", r: "", bozza: true }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Servizi", link: "../programma-servizi.html" }],
      },
      {
        id: "genitori", nome: "I tuoi genitori", img: "avatar/genitori.webp", colore: "#a9cbdb", attivo: true,
        frase: "La politica? Lasciala stare, pensa al lavoro.", bozza: true,
        chiE: { testo: "", dati: [
          { dato: "I 55-64enni sono la fascia più numerosa dell'elettorato: 11.488.", fonte: "ISTAT via tuttitalia, 1/1/2025" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "Perché dovrei votare qualcuno che non conosco?", r: "", bozza: true, vedi: "esperienza" }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Casa", link: "../programma-casa.html" }, { testo: "Conti chiari", link: "../programma-conti.html" }],
      },
      {
        id: "genitori-bimbi", nome: "Genitori con figl* piccol*", img: "avatar/genitori-bimbi.webp", colore: "#fcdf6c", attivo: true,
        frase: "Non abbiamo tempo nemmeno per dormire.", bozza: true,
        chiE: { testo: "", dati: [
          { dato: "A Como nascono 6,5 bambini ogni 1.000 abitanti e muoiono 11,1 persone.", fonte: "ISTAT, 2024" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "Il nido gratis? E chi lo paga?", r: "", bozza: true }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Servizi", link: "../programma-servizi.html" }],
      },
      {
        id: "destra", nome: "L'amic* di destra", img: "avatar/destra.webp", colore: "#fef0e7", attivo: true,
        frase: "Voto chi fa le cose, non chi le promette.", bozza: true,
        chiE: { testo: "", dati: [
          { dato: "Alle comunali 2022 le liste civiche, senza simbolo di partito, hanno preso il 47,6%.", fonte: "risultati ufficiali" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "Siete i soliti di sinistra con un altro nome?", r: "", bozza: true, vedi: "destra-sinistra" }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Conti chiari", link: "../programma-conti.html" }, { testo: "Sviluppo", link: "../programma-sviluppo.html" }],
      },
      {
        id: "sinistra", nome: "L'amic* di sinistra", img: "avatar/sinistra.webp", colore: "#4bbecf", attivo: true,
        frase: "Un'altra lista? Così dividete e basta.", bozza: true,
        chiE: { testo: "", dati: [
          // fonte: la stessa usata per questo numero in «Como in numeri» (pagina Dati)
          { dato: "Al ballottaggio 2022 ha votato il 35,75% degli aventi diritto, il minimo di sempre per un sindaco di Como.", fonte: "Comunali 2022" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "Perché non vi alleate con chi c'è già?", r: "", bozza: true }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Casa", link: "../programma-casa.html" }, { testo: "Lavoro", link: "../programma-lavoro.html" }],
      },

      // ↓ proposte: da confermare (attivo: false per nasconderle)
      {
        id: "non-vota", nome: "Chi non vota mai", img: "avatar/non-vota.webp", colore: "#7ea3d6", attivo: true,
        frase: "Tanto sono tutti uguali.", bozza: true,
        chiE: { testo: "", dati: [
          // fonte: la stessa usata per questo numero in «Como in numeri» (pagina Dati)
          { dato: "Al ballottaggio 2022 ha votato il 35,75% degli aventi diritto: il sindaco l'ha scelto poco più di un elettore su tre.", fonte: "Comunali 2022" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "Cosa cambia se voto?", r: "", bozza: true }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Conti chiari", link: "../programma-conti.html" }],
      },
      {
        id: "frontaliere", nome: "Chi lavora in Svizzera", img: "avatar/frontaliere.webp", colore: "#f8c8d7", attivo: true,
        frase: "Como la vedo solo la sera, in coda.", bozza: true,
        chiE: { testo: "", dati: [
          { dato: "In provincia di Como i frontalieri sono 32.176, +23,6% in dieci anni.", fonte: "Il Giorno, aprile 2026" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "A me cosa interessa del Comune?", r: "", bozza: true }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Servizi", link: "../programma-servizi.html" }, { testo: "Sviluppo", link: "../programma-sviluppo.html" }],
      },
      {
        id: "turismo", nome: "Chi lavora nel turismo", img: "avatar/turismo.webp", colore: "#fcdf6c", attivo: true,
        frase: "D'estate 12 ore al giorno, d'inverno niente.", bozza: true,
        chiE: { testo: "", dati: [
          { dato: "Nel turismo il reddito è più basso del 35% e la produttività del 30% rispetto alla media.", fonte: "Istat" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "Il salario minimo non fa chiudere i ristoranti?", r: "", bozza: true }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Lavoro", link: "../programma-lavoro.html" }],
      },
      {
        id: "cerca-casa", nome: "Chi cerca casa", img: "avatar/cerca-casa.webp", colore: "#f6b8ca", attivo: true,
        frase: "Con quello che pago d'affitto…", bozza: true,
        chiE: { testo: "", dati: [
          { dato: "A Como un trilocale in affitto assorbe il 46% del reddito di una famiglia media.", fonte: "idealista, 2025" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "Ma il Comune cosa può fare sugli affitti?", r: "", bozza: true }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Casa", link: "../programma-casa.html" }],
      },
      {
        id: "negozio", nome: "Chi ha un negozio", img: "avatar/negozio.webp", colore: "#a9cbdb", attivo: true,
        frase: "Senza turisti chiudiamo.", bozza: true,
        chiE: { testo: "", dati: [
          { dato: "Il centro ha perso il 6,5% dei residenti dal 2019.", fonte: "anagrafe comunale, via La Provincia di Como, agosto 2026" },
        ] },
        aCuore: [],
        apertura: "",
        domande: [{ d: "Volete mandare via i turisti?", r: "", bozza: true }],
        dialogo: [{ chi: "tu", testo: "" }, { chi: "loro", testo: "" }],
        evitare: [],
        programma: [{ testo: "Lavoro", link: "../programma-lavoro.html" }, { testo: "Sviluppo", link: "../programma-sviluppo.html" }],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* PAGINA BENVENUTO · la missione (contatore da testi.js → fondatori)        */
  /* ------------------------------------------------------------------ */
  missione: {
    titolo: "La missione",
    tappe: [
      ["100", "pionieri", "entro il 31 dicembre 2026"],
      ["1.000", "esploratori", "entro marzo 2027"],
      ["15.000", "voti", "maggio 2027"],
    ],
    testo: "Ogni pioniere porta 10 esploratori. Ogni esploratore convince **15 persone attorno a sé che oggi non voterebbero inséma**.",
    link: [
      { testo: "La missione delle 15 persone", link: "../piano.html#missione" },
      { testo: "Il modulo per entrare", link: "../aiutaci.html#modulo" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* PAGINA DATI · mappa e indicatori                                                           */
  /* ------------------------------------------------------------------ */
  mappa: {
    titolo: "Mappa dei quartieri",
    testo: "Le 9 ex circoscrizioni. Scegli cosa colorare, tocca una zona per aprire la sua scheda.",
    fonteConfini: "Confini: ISTAT, Basi territoriali 2021, aree subcomunali (CC BY 4.0). Base cartografica © Esri, HERE, Garmin, © OpenStreetMap.",
  },

  // Indicatori del selettore. «da» dice dove prendere il valore in ogni zona.
  indicatori: [
    { id: "residenti", nome: "Residenti", scala: "seq", fonte: "Anagrafe comunale, via La Provincia di Como, 3 agosto 2026" },
    { id: "var2019", nome: "Variazione residenti dal 2019", scala: "div", fonte: "Anagrafe comunale, via La Provincia di Como, 3 agosto 2026" },
    { id: "prezzo", nome: "Prezzo della casa (€/m²)", scala: "seq", fonte: "mercato-immobiliare.info, novembre 2026" },
    { id: "varPrezzo", nome: "Prezzo, variazione in 12 mesi", scala: "div", fonte: "immobiliare.it, prezzi richiesti, ottobre 2026. Indicativo: le zone di immobiliare.it non coincidono con le circoscrizioni" },
    { id: "over65", nome: "Over 65 (dato 2011)", scala: "seq", fonte: "ISTAT, censimento 2011, per area di censimento" },
    { id: "affitto", nome: "Famiglie in affitto (dato 2011)", scala: "seq", fonte: "ISTAT, censimento 2011, per area di censimento" },
    { id: "laureati", nome: "Laureati (dato 2011)", scala: "seq", fonte: "ISTAT, censimento 2011, per area di censimento. Sulla popolazione di 6 anni e più" },
    { id: "voto", nome: "Ballottaggio 2022", scala: "cat", fonte: "money.it su dati del Comune (74 sezioni su 74); Etv" },
  ],

  /* ------------------------------------------------------------------ */
  /* LE 9 ZONE · in tutte e tre le pagine (scheda ridotta in STRADA, completa in DATI)                                   */
  /* ------------------------------------------------------------------ */
  fonti: {
    residenti: "Anagrafe comunale, via La Provincia di Como, 3 agosto 2026",
    densita: "Comune di Como, DUP 2023-2025 (dato 2021)",
    prezzo: "mercato-immobiliare.info, novembre 2026",
  },

  cosaFaReferente: "La/il referente conosce la zona, tiene il gruppo WhatsApp, organizza 1-2 uscite al mese, raccoglie i problemi del quartiere e li passa al gruppo Territorio.",

  // Temi validi per tutte le zone
  temiTutte: [
    "Riunioni pubbliche nei quartieri, partendo da quelli dove si vota meno ([Conti chiari](../programma-conti.html)).",
    "Como Energia di Quartiere: una comunità energetica con sezioni nei quartieri ([Sviluppo](../programma-sviluppo.html)).",
  ],

  zone: [
    {
      id: "I",
      quartieri: [
        { nome: "Albate", referenti: [] },
        { nome: "Muggiò", referenti: [] },
      ],
      residenti: 8474, quota: "10,1%", var2019: "−210 (−2,4%)", var2019pct: -2.4,
      densita: "1.681", prezzo: "2.100-2.200", prezzoNum: 2150,
      immobiliare: ["Albate, Trecallo"],
      area: "sud",
      testo: "Albate, Muggiò, Lora, Camnago, Garzola, Civiglio: quartieri a bassa densità, ex comuni con identità propria, residenti in calo lieve.",
      voto: { esito: "centrosinistra", testo: "Albate (sezioni 41-43): centrosinistra, di misura (sezione 42: 198 a 197)." },
      temi: [
        "Piscina di Muggiò ([Servizi](../programma-servizi.html)).",
        "Parco della Valle Cosia, che unisce Camerlata, Albate e Muggiò ([Sviluppo](../programma-sviluppo.html)).",
      ],
      luoghi: [],
    },
    {
      id: "II",
      quartieri: [
        { nome: "Lora", referenti: [] },
      ],
      residenti: 2701, quota: "3,2%", var2019: "−92 (−3,3%)", var2019pct: -3.3,
      densita: "1.936", prezzo: "2.650", prezzoNum: 2650,
      immobiliare: ["Lora, Como Sole"],
      area: "sud",
      testo: "Albate, Muggiò, Lora, Camnago, Garzola, Civiglio: quartieri a bassa densità, ex comuni con identità propria, residenti in calo lieve.",
      voto: { esito: null, testo: "Dato per sezione da recuperare." },
      temi: [],
      luoghi: [],
    },
    {
      id: "III",
      quartieri: [
        { nome: "Camerlata", referenti: [] },
        { nome: "Rebbio", referenti: [] },
        { nome: "Breccia", referenti: [] },
        { nome: "Prestino", referenti: [] },
      ],
      residenti: 18960, quota: "22,5%", var2019: "+256 (+1,4%)", var2019pct: 1.4,
      densita: "2.185", prezzo: "2.100-2.300", prezzoNum: 2200,
      immobiliare: ["Breccia, Camerlata, Rebbio, Prestino"],
      area: "camerlata",
      testo: "La zona più popolosa, economica e in crescita; alta presenza straniera nelle scuole. Un residente su cinque della città vive qui.",
      extra: [
        "Stranieri a Camerlata: 19,8% (2008, studio del Comune nel PGT, via La Provincia).",
        "Istituto comprensivo di Rebbio: 43% di alunni stranieri (La Provincia).",
      ],
      voto: { esito: "centrosinistra", testo: "Camerlata (sezioni 51-53): centrosinistra, di misura (sezione 51: 167 a 166)." },
      temi: [
        "Parco della Valle Cosia, che unisce Camerlata, Albate e Muggiò ([Sviluppo](../programma-sviluppo.html)).",
      ],
      luoghi: [],
    },
    {
      id: "IV",
      quartieri: [
        { nome: "Camnago Volta", referenti: [] },
      ],
      residenti: 1475, quota: "1,7%", var2019: "−36 (−2,4%)", var2019pct: -2.4,
      densita: "1.075", prezzo: "2.650", prezzoNum: 2650,
      immobiliare: ["Civiglio, Camnago Volta, Garzola"],
      area: "nord",
      testo: "Albate, Muggiò, Lora, Camnago, Garzola, Civiglio: quartieri a bassa densità, ex comuni con identità propria, residenti in calo lieve.",
      voto: { esito: null, testo: "Dato per sezione da recuperare." },
      temi: [],
      luoghi: [],
    },
    {
      id: "V",
      quartieri: [
        { nome: "Como Nord", referenti: [] },
        { nome: "Como Est", referenti: [] },
      ],
      residenti: 11924, quota: "14,1%", var2019: "−445 (−3,6%)", var2019pct: -3.6,
      densita: "4.638", prezzo: "3.900-4.300 (Valduce, via Milano)", prezzoNum: 4100,
      immobiliare: ["Prudenziana, Torno"],
      area: "nord",
      testo: "Nord ed Est (Valduce, via Milano): zona ricca e densa, in calo del 3,6%.",
      voto: { esito: "eletto", testo: "Convalle, Como Est e Ovest: il sindaco eletto quasi ovunque; centrosinistra solo nella sezione 15; sezione 18 (via Fiume) pari, 195 a 195." },
      temi: [],
      luoghi: [],
    },
    {
      id: "VI",
      quartieri: [
        { nome: "Como Borghi", referenti: [] },
      ],
      residenti: 13590, quota: "16,1%", var2019: "−182 (−1,3%)", var2019pct: -1.3,
      densita: "6.743", prezzo: "3.250", prezzoNum: 3250,
      immobiliare: ["Borghi, San Martino"],
      area: "borghi",
      testo: "La zona più densa (6.743 ab/km²), prezzi medi, storicamente la più multietnica.",
      extra: [
        "Stranieri a Como Borghi: 16,5% (2008); Borghi ospitava da solo il 23,4% degli stranieri della città (studio del Comune nel PGT, via La Provincia).",
      ],
      voto: { esito: "eletto", testo: "Il sindaco eletto, netto; centrosinistra solo nella sezione 32." },
      temi: [],
      luoghi: [],
    },
    {
      id: "VII",
      quartieri: [
        { nome: "Como Centro", referenti: [] },
        { nome: "Como Ovest", referenti: [] },
      ],
      residenti: 10881, quota: "12,9%", var2019: "−755 (−6,5%)", var2019pct: -6.5,
      densita: "3.512", prezzo: "4.400-5.100", prezzoNum: 4750,
      immobiliare: ["Centro", "Bignanico, Villa Olmo, Villa Aprica"],
      area: "centro",
      testo: "Centro e Ovest (città murata, lungolago, Villa Olmo): case più care, residenti in calo più rapido. La Provincia lega il calo a turismo e affitti brevi.",
      voto: { esito: "eletto", testo: "Convalle, Como Est e Ovest: il sindaco eletto quasi ovunque; centrosinistra solo nella sezione 15; sezione 18 (via Fiume) pari, 195 a 195." },
      temi: [
        "Politeama ([Sviluppo](../programma-sviluppo.html)).",
        "Residenti in calo legato a turismo e affitti brevi ([Casa](../programma-casa.html)).",
      ],
      luoghi: [],
    },
    {
      id: "VIII",
      quartieri: [
        { nome: "Monte Olimpino", referenti: [] },
        { nome: "Ponte Chiasso", referenti: [] },
        { nome: "Sagnino", referenti: [] },
        { nome: "Tavernola", referenti: [] },
      ],
      residenti: 14804, quota: "17,6%", var2019: "−153 (−1,0%)", var2019pct: -1.0,
      densita: "2.204", prezzo: "2.150-2.400; Tavernola 3.550", prezzoNum: 2275,
      immobiliare: ["Sagnino, Monte Olimpino, Tavernola"],
      area: "ovest",
      testo: "Zona di confine, case economiche tranne Tavernola, probabile bacino di frontalieri (32.176 in provincia, il dato per il solo comune non è pubblicato).",
      extra: [
        "Stranieri a Ponte Chiasso: 18,6% (2008, studio del Comune nel PGT, via La Provincia).",
      ],
      voto: { esito: "eletto", testo: "Monte Olimpino, Tavernola, Sagnino, Ponte Chiasso: il sindaco eletto, con distacchi netti." },
      temi: [
        "Frontalieri: traffico verso il confine, valichi.",
      ],
      luoghi: [],
    },
    {
      id: "IX",
      quartieri: [
        { nome: "Garzola", referenti: [] },
        { nome: "Civiglio", referenti: [] },
      ],
      residenti: 1478, quota: "1,8%", var2019: "−11 (−0,7%)", var2019pct: -0.7,
      densita: "388", prezzo: "3.650", prezzoNum: 3650,
      immobiliare: ["Civiglio, Camnago Volta, Garzola"],
      area: "nord",
      testo: "Albate, Muggiò, Lora, Camnago, Garzola, Civiglio: quartieri a bassa densità, ex comuni con identità propria, residenti in calo lieve.",
      voto: { esito: null, testo: "Dato per sezione da recuperare." },
      temi: [],
      luoghi: [],
    },
  ],

  totale: { residenti: "84.287", var2019: "−1.628 (−1,9%)", prezzo: "media 3.475" },

  voto2022nota: "Il centrosinistra ha vinto solo 10 sezioni su 74, il sindaco eletto il resto.",
  votoCategorie: {
    eletto: "Sindaco eletto (lista civica)",
    centrosinistra: "Centrosinistra, di misura (in parte della zona)",
    nd: "Dato da recuperare",
  },

  // Temi che non sappiamo ancora in quale zona collocare: chiedete al gruppo Programma
  temiDaCollocare: ["Ticosa", "Via del Dos", "Ex bocciofila"],

  /* Prezzi e affitti per zona di immobiliare.it (ott. 2026) */
  immobiliare: {
    fonte: "immobiliare.it, prezzi richiesti negli annunci (non prezzi di compravendita), ottobre 2026",
    media: { vendita: "3.328", varVendita: "+7,2%", affitto: "14,96", varAffitto: "+1,8%" },
    zone: [
      { nome: "Bignanico, Villa Olmo, Villa Aprica", vendita: "5.873", varVendita: "+28,6%", affitto: "16,49", varAffitto: "+4,2%", varNum: 28.6 },
      { nome: "Centro", vendita: "5.072", varVendita: "+6,2%", affitto: "17,31", varAffitto: "+2,1%", varNum: 6.2 },
      { nome: "Prudenziana, Torno", vendita: "4.299", varVendita: "+4,2%", affitto: "16,12", varAffitto: "+4,7%", varNum: 4.2 },
      { nome: "Borghi, San Martino", vendita: "3.323", varVendita: "−4,2%", affitto: "14,16", varAffitto: "+6,1%", varNum: -4.2 },
      { nome: "Civiglio, Camnago Volta, Garzola", vendita: "3.086", varVendita: "+26,5%", affitto: "12,33", varAffitto: "+7,2%", varNum: 26.5 },
      { nome: "Lora, Como Sole", vendita: "2.520", varVendita: "+8,6%", affitto: "13,62", varAffitto: "−0,5%", varNum: 8.6 },
      { nome: "Breccia, Camerlata, Rebbio, Prestino", vendita: "2.275", varVendita: "+16,7%", affitto: "13,43", varAffitto: "−4,5%", varNum: 16.7 },
      { nome: "Sagnino, Monte Olimpino, Tavernola", vendita: "2.188", varVendita: "−5,2%", affitto: "13,72", varAffitto: "+2,3%", varNum: -5.2 },
      { nome: "Albate, Trecallo", vendita: "1.919", varVendita: "−6,8%", affitto: "12,81", varAffitto: "+6,8%", varNum: -6.8 },
    ],
  },

  /* Chi ci abita, per area di censimento (ISTAT 2011) */
  aree: {
    fonte: "ISTAT, variabili censuarie 2011 (l'ultimo dato con questo dettaglio), per area di censimento; residenti oggi dall'anagrafe (agosto 2026)",
    nota: "I dati sociali sono del 2011. Le aree di censimento sono 6 e accorpano alcune zone.",
    lista: [
      { id: "centro", nome: "Centro e Ovest", zone: ["VII"], residenti: "10.881", over65: "26,8%", over75: "14,3%", stranieri: "12,1%", laureati: "25,7%", affitto: "29,0%", soli: "44,5%", disoccupazione: "4,6%" },
      { id: "nord", nome: "Nord, Est, Camnago, Garzola, Civiglio", zone: ["V", "IV", "IX"], residenti: "14.877", over65: "27,3%", over75: "15,8%", stranieri: "8,9%", laureati: "23,2%", affitto: "28,0%", soli: "40,0%", disoccupazione: "4,8%" },
      { id: "borghi", nome: "Borghi", zone: ["VI"], residenti: "13.590", over65: "25,7%", over75: "14,0%", stranieri: "15,7%", laureati: "19,3%", affitto: "32,9%", soli: "41,4%", disoccupazione: "5,9%" },
      { id: "camerlata", nome: "Camerlata, Rebbio, Breccia, Prestino", zone: ["III"], residenti: "18.960", over65: "24,3%", over75: "11,8%", stranieri: "13,0%", laureati: "10,4%", affitto: "28,8%", soli: "32,9%", disoccupazione: "6,8%" },
      { id: "ovest", nome: "Monte Olimpino, Ponte Chiasso, Sagnino, Tavernola", zone: ["VIII"], residenti: "14.804", over65: "23,2%", over75: "11,6%", stranieri: "10,8%", laureati: "12,2%", affitto: "18,3%", soli: "33,6%", disoccupazione: "6,0%" },
      { id: "sud", nome: "Albate, Muggiò, Lora", zone: ["I", "II"], residenti: "11.175", over65: "25,2%", over75: "12,5%", stranieri: "6,6%", laureati: "11,7%", affitto: "17,7%", soli: "31,3%", disoccupazione: "5,7%" },
    ],
  },

  /* Sezioni elettorali: struttura pronta, da riempire.
     Esempio di riga:
       { n: 42, zona: "I", vie: ["Via …", "Via …"], ballottaggio2022: { centrosinistra: 198, eletto: 197 } },
  */
  sezioni: [],

  /* ------------------------------------------------------------------ */
  /* PAGINA DATI · Como in numeri                                                  */
  /* ------------------------------------------------------------------ */
  comoInNumeri: [
    {
      tema: "Chi vota",
      numeri: [
        { valore: "61.494", testo: "cittadini italiani maggiorenni residenti.", fonte: "ISTAT via tuttitalia" },
        { valore: "72.132", testo: "aventi diritto alle comunali: includono circa 10 mila iscritti AIRE, all'estero.", fonte: "Il Giorno" },
      ],
    },
    {
      tema: "Età degli elettori residenti",
      numeri: [
        { valore: "19,1%", testo: "under 35. 18-24 anni: 4.597 (7,5%); 25-34: 7.143 (11,6%).", fonte: "ISTAT via tuttitalia, 1/1/2025" },
        { valore: "47,2%", testo: "tra 35 e 64 anni. 35-44: 7.609 (12,4%); 45-64: 21.440 (34,9%).", fonte: "ISTAT via tuttitalia, 1/1/2025" },
        { valore: "33,7%", testo: "over 65. 65-74: 8.742 (14,2%); 75+: 11.963 (19,5%, il 62% donne).", fonte: "ISTAT via tuttitalia, 1/1/2025" },
      ],
    },
    {
      tema: "Popolazione",
      numeri: [
        { valore: "84.287", testo: "residenti in anagrafe, −1,9% dal 2019.", fonte: "Anagrafe comunale, agosto 2026" },
        { valore: "47,6 anni", testo: "l'età media; 234,8 over 65 ogni 100 under 15.", fonte: "ISTAT via tuttitalia" },
        { valore: "14,8%", testo: "stranieri: 12.323 (in provincia l'8,4%). Alle comunali votano solo i circa 1.830 cittadini UE iscritti. Prime comunità: Filippine, Romania, Sri Lanka, El Salvador, Ucraina.", fonte: "ISTAT via tuttitalia" },
      ],
    },
    {
      tema: "Reddito",
      numeri: [
        { valore: "30.274 €", testo: "reddito medio dichiarato, come la Lombardia.", fonte: "MEF, redditi IRPEF per comune, anno d'imposta 2024" },
        { valore: "22,1%", testo: "dei contribuenti sotto i 10 mila € (Lombardia 17,7%); il 5,6% sopra i 75 mila (Lombardia 4,3%).", fonte: "MEF, anno d'imposta 2024" },
        { valore: "51,8%", testo: "dei contribuenti ha redditi da lavoro dipendente, il 35,3% da pensione.", fonte: "MEF, anno d'imposta 2024" },
      ],
    },
    {
      tema: "Casa",
      numeri: [
        { valore: "26,1%", testo: "delle famiglie in affitto (Lombardia 18,7%).", fonte: "ISTAT, censimento 2011" },
        { valore: "37,1%", testo: "famiglie di una sola persona.", fonte: "ISTAT, censimento 2011" },
        { valore: "46%", testo: "del reddito di una famiglia media se ne va per un trilocale in affitto; solo il 12% degli annunci è sostenibile per i redditi locali.", fonte: "idealista, 2025" },
        { valore: "3.328 €", testo: "al metro quadro, il prezzo della casa: +7,2% in un anno.", fonte: "immobiliare.it, ottobre 2026" },
      ],
    },
    {
      tema: "Voto",
      numeri: [
        { valore: "44,33%", testo: "affluenza al primo turno 2022. Centrosinistra 39,40%, lista civica del sindaco poi eletto 27,32%, centrodestra 26,99%, fuori dal ballottaggio per circa 100 voti.", fonte: "Comunali 2022" },
        { valore: "35,75%", testo: "affluenza al ballottaggio, la più bassa mai registrata per un sindaco di Como. Il sindaco eletto ha preso il 55,4%. Liste civiche al 47,6%.", fonte: "Comunali 2022" },
        { valore: "61,30%", testo: "affluenza al referendum sulla giustizia (marzo 2026): circa 5.500 votanti in più rispetto al primo turno delle comunali 2022.", fonte: "Referendum, marzo 2026" },
      ],
    },
    {
      tema: "Come si informano (dati nazionali)",
      numeri: [
        { valore: "67,4%", testo: "degli over 65 si informa con il tg; tra gli under 30 solo il 26,1%.", fonte: "Censis 2026" },
        { valore: "29,9%", testo: "degli under 30 si informa su Instagram, il 23,9% su TikTok.", fonte: "Censis 2026" },
        { valore: "29%", testo: "degli italiani si informa su WhatsApp, +8 punti in un anno.", fonte: "Reuters Institute, Digital News Report 2026" },
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  /* PAGINA STRADA · kit di strada (BOZZA da far rivedere al gruppo Strada)          */
  /* ------------------------------------------------------------------ */
  kit: {
    titolo: "Kit di strada",
    bozza: "Bozza: da rivedere con il gruppo Strada.",
    avviso: "Banchetti e affissioni richiedono permessi e spazi autorizzati del Comune. Verificate con il gruppo Strada **prima** di uscire.",
    liste: [
      {
        titolo: "Volantinaggio",
        portare: ["Volantini (e un elastico per tenerli)", "Telefono carico con il [modulo](../aiutaci.html#modulo) aperto", "Questa guida, sulla scheda della zona", "Acqua"],
        fare: ["Andate almeno in due", "Sorridete e presentatevi: «Ciao, siamo di inséma, un movimento civico di Como»", "Non insistete con chi non vuole fermarsi", "Niente volantini sotto i tergicristalli"],
      },
      {
        titolo: "Banchetto",
        ghiaccio: true,
        portare: ["Permesso del Comune (stampato o sul telefono)", "Tavolino, tovaglia, materiali", "Un cartello grande con il logo", "Penne e fogli per i contatti", "Cartello «Diventa uno dei 100»"],
        fare: ["Almeno due persone sempre al banchetto", "Una sta davanti al tavolo, non dietro", "Fate una domanda: «Cosa non va a Como, per te?»", "Segnate i problemi raccolti: vanno al gruppo Territorio"],
      },
      {
        titolo: "Incontro di quartiere",
        ghiaccio: true,
        portare: ["Due o tre numeri della zona (dalla scheda)", "Il capitolo del programma che c'entra", "Modo per raccogliere i contatti"],
        fare: ["Prima ascoltate, poi parlate", "Partite da un problema concreto del quartiere", "Chiudete con una proposta: un nuovo incontro, un gruppo WhatsApp, il modulo"],
      },
    ],
    contatto: {
      titolo: "Come chiedere un contatto",
      testo: "Chiedete **nome e telefono**, e dite sempre a cosa servono: «Ti scriviamo su WhatsApp per i prossimi incontri, ti va?». Solo con il suo sì. Mai foto di fogli con i dati di altre persone nei gruppi.",
    },
    // nelle liste con ghiaccio: true (Banchetto, Incontro di quartiere)
    ghiaccio: {
      titolo: "Domande per rompere il ghiaccio",
      frasi: ["Torno a Como se…", "Di Como mi manca…", "A Como vorrei…"],
      nota: "Fate completare la frase. Le risposte raccolte vanno al gruppo Territorio, come i problemi.",
      bozza: true,
      fonte: "Strategia di comunicazione, 24/11/2026",
    },
    dopo: {
      titolo: "Dopo",
      testo: "Entro la sera inserite ogni contatto nel [modulo](../aiutaci.html#modulo) (uno per persona) e scrivete nel gruppo cosa avete sentito. Poi buttate o consegnate i fogli: i dati non restano nelle tasche di nessuno.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* PAGINA BENVENUTO · materiali                                                       */
  /* ------------------------------------------------------------------ */
  materiali: {
    loghi: [
      { nome: "Logo magenta", file: "../img/logo/logo-magenta.svg" },
      { nome: "Logo vino", file: "../img/logo/logo-vino.svg" },
      { nome: "Logo blu", file: "../img/logo/logo-blu.svg" },
      { nome: "Logo perla (per fondi scuri)", file: "../img/logo/logo-perla.svg", scuro: true },
      { nome: "Logo esteso magenta", file: "../img/logo/logo-esteso-magenta.svg" },
      { nome: "Logo esteso perla", file: "../img/logo/logo-esteso-perla.svg", scuro: true },
      { nome: "Pittogramma", file: "../img/logo/pittogramma-blu.svg" },
    ],
    illustrazioni: [
      { nome: "Città", file: "../img/ill/citta-vino.webp" },
      { nome: "Città quadrata", file: "../img/ill/cittaq-vino.webp" },
      { nome: "Luna e funicolare", file: "../img/ill/luna-vino.webp" },
      { nome: "Mani", file: "../img/ill/mani-blu.webp" },
      { nome: "Persone con la mappa", file: "../img/ill/persone-blu.webp" },
      { nome: "Mercà", file: "../img/ill/merca-blu.webp" },
      { nome: "Microfono e telefono", file: "../img/ill/media-perla.webp", scuro: true },
    ],
    palette: [
      ["Magenta Power", "#e6007e"], ["Rosa Pesca", "#fef0e7"], ["Bianco Perla", "#fffdfb"],
      ["Rosso Vino", "#6f0f38"], ["Rosso Ciliegia", "#d4004f"], ["Blu Reale", "#274798"],
      ["Blu Cielo", "#7ea3d6"], ["Azzurro Polvere", "#a9cbdb"], ["Rosa Confetto", "#f6b8ca"],
      ["Rosa Cipria", "#f8c8d7"], ["Giallo Acido", "#fcdf6c"], ["Blu Oceano", "#0b6780"], ["Turchese", "#4bbecf"],
    ],
  },

  /* ------------------------------------------------------------------ */
  /* PAGINA DATI · dati che ci mancano                                            */
  /* ------------------------------------------------------------------ */
  // PAGINA DATI · fonti e metodo
  metodo: [
    { titolo: "I confini delle zone", testo: "Sono le 9 ex circoscrizioni del Comune, prese da ISTAT, Basi territoriali 2021, aree subcomunali (licenza CC BY 4.0). Le abbiamo semplificate di pochi metri per farle caricare in fretta. L'elenco dei quartieri dentro ogni zona va verificato con chi ci abita." },
    { titolo: "Perché i dati sociali sono del 2011", testo: "Età, stranieri, laureati, famiglie in affitto e disoccupazione per zona vengono dal censimento ISTAT 2011: è l'ultimo dato pubblicato con questo dettaglio. ISTAT li dà per 6 aree di censimento, che accorpano alcune zone: per questo zone diverse possono avere gli stessi valori. I residenti, invece, sono di agosto 2026." },
    { titolo: "Cosa vuol dire «indicativo»", testo: "I prezzi di immobiliare.it sono i prezzi richiesti negli annunci, non quelli delle compravendite, e le sue zone non coincidono con le circoscrizioni: a ogni circoscrizione abbiamo collegato la zona di immobiliare.it più simile. Usateli per capire l'ordine di grandezza, non come dato preciso." },
    { titolo: "Il voto del 2022", testo: "Abbiamo i risultati del ballottaggio solo per alcuni gruppi di sezioni, non per ogni zona. Quando avremo i dati delle 74 sezioni con le loro vie, la mappa del voto diventerà via per via." },
  ],

  datiMancanti: [
    { dato: "Risultati per sezione: comunali 2017 e 2022, politiche 2022, europee 2024", dove: "Sito elettorale del Comune (halley.comune.como.it), Eligendo", perche: "Mappa del voto via per via, 74 sezioni" },
    { dato: "Iscritti per sezione con età e sesso, e vie di ogni sezione", dove: "Ufficio elettorale del Comune", perche: "Capire dove si vota meno" },
    { dato: "Residenti per quartiere con età e cittadinanza", dove: "Ufficio statistica del Comune (statistica@comune.como.it)", perche: "Aggiornare i dati del 2008 sugli stranieri" },
    { dato: "Istruzione e lavoro per sezione di censimento", dove: "ISTAT, basi territoriali", perche: "Dati per isolato" },
    { dato: "Mercati, piazze, associazioni, spazi per ogni quartiere", dove: "Gruppo Territorio, chi abita lì", perche: "Riempire i «luoghi utili»" },
  ],
};
