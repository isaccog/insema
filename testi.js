/* =====================================================================
   INSÉMA — TUTTI I TESTI DEL SITO
   =====================================================================

   Questo è l'unico file da toccare per cambiare i testi.
   Cambia solo quello che sta tra le virgolette "..." o tra gli
   apici inversi `...` (quelli dei testi lunghi).

   FORMATTAZIONE
     **grassetto**            → grassetto
     *corsivo*                → corsivo
     ==parola==               → parola in rosa
     [testo](pagina.html)     → link
     riga vuota nei testi `...` → nuovo paragrafo

   ATTENZIONE
   - Dentro "..." non usare le virgolette dritte ": usa « » oppure ' '.
   - Non cancellare virgole, parentesi { } [ ] a fine riga.
   - Se dopo una modifica la pagina resta bianca, quasi sempre manca
     una virgola o una virgoletta di chiusura.

   FRASI IN DIALETTO: sono segnate con "dialetto". Fatele controllare
   a qualcuno che parla comasco prima di pubblicare!
   ===================================================================== */

window.TESTI = {

  /* ------------------------------------------------------------------ */
  /* DATI GENERALI (menu, contatti, footer)                              */
  /* ------------------------------------------------------------------ */
  sito: {
    nome: "Inséma",
    descrizione: "Inséma: per una Como che cresce, senza lasciare indietro nessuno. Verso le elezioni comunali di maggio 2027.",
    email: "insema.como@gmail.com",
    instagram: "https://www.instagram.com/insema_como/",
    instagramNome: "@insema_como",

    // Se create un modulo su Formspree (formspree.io) incollate qui il link,
    // es. "https://formspree.io/f/abcdefg". Se resta vuoto, il modulo
    // "Aiutaci" apre una mail già scritta verso l'indirizzo qui sopra.
    moduloEndpoint: "",

    // Link alla pagina per le donazioni. Se vuoto, il bottone non compare.
    linkDonazioni: "",

    menu: [
      { testo: "Chi siamo", link: "chi-siamo.html" },
      { testo: "Manifesto", link: "manifesto.html" },
      { testo: "Programma", link: "programma.html" },
    ],
    bottoneMenu: { testo: "Aiutaci", link: "aiutaci.html" },

    // Le parole che scorrono nella fascia colorata
    fascia: ["Inséma", "Ghe la fèm", "Una cà per tücc", "Nissün resta indree", "Andèm", "Sem chì"],

    footer: {
      motto: "Una Como che cresce senza lasciare indietro nessuno.",
      titoloDizionario: "Piccolo dizionario comasco",
      // dialetto → italiano
      dizionario: [
        ["inséma", "insieme"],
        ["alura", "allora"],
        ["ghe la fèm", "ce la facciamo"],
        ["sem chì", "siamo qui"],
        ["una cà per tücc", "una casa per tutti"],
        ["nissün resta indree", "nessuno resta indietro"],
        ["andèm", "andiamo"],
        ["tüchetin", "pezzettino"],
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* HOME                                                               */
  /* ------------------------------------------------------------------ */
  home: {
    titoloPagina: "Inséma · Per una Como che cresce",

    hero: {
      sopratitolo: "Como · elezioni comunali di maggio 2027",
      titolo: "Per una Como che cresce*",
      sottotitolo: "*senza lasciare indietro nessuno",
      testo: "Siamo comaschi che hanno smesso di aspettare. Partiamo dai dati, ascoltiamo le persone e costruiamo proposte di buon senso. ==Inséma==.",
      bottone1: { testo: "Unisciti a noi", link: "aiutaci.html" },
      bottone2: { testo: "Leggi il programma", link: "programma.html" },
    },

    comoOggi: {
      dialetto: { frase: "Alura…", traduzione: "allora…" },
      titolo: "Come sta Como?",
      numeri: [
        { valore: "3.320 €", testo: "al metro quadro per comprare casa: Como è seconda in Lombardia, dopo Milano.", fonte: "Immobiliare.it, settembre 2026" },
        { valore: "−35%", testo: "il reddito di chi lavora nel turismo rispetto alla media.", fonte: "Istat, Conto satellite del turismo 2023" },
        { valore: "39 milioni", testo: "di avanzo libero nel bilancio del Comune. Soldi che ci sono, ma restano fermi.", fonte: "Comune di Como, rendiconto 2025" },
        { valore: "44 anni", testo: "che l'area Ticosa aspetta di tornare alla città.", fonte: "" },
      ],
      link: { testo: "Da qui parte il nostro programma →", link: "programma.html" },
    },

    valori: {
      sopratitolo: "Ok, ma che cos'è Inséma?",
      titolo: "I nostri valori",
      // le parole grandi vengono dal Manifesto
      link: { testo: "Leggi il manifesto →", link: "manifesto.html" },
    },

    programma: {
      titolo: "Cosa vogliamo fare",
      testo: "Quattro aree per il futuro di Como, più una regola: ogni euro pubblico deve essere chiaro a tutti.",
      // le schede vengono dal Programma (vedi più sotto)
      link: { testo: "Tutto il programma →", link: "programma.html" },
    },

    perche: {
      titolo: "Perché possiamo farcela",
      punti: [
        "Portiamo avanti temi che poche forze politiche in città portano avanti.",
        "Le nostre proposte non sono radicali: sono di buon senso.",
        "Vinceremo solo se saremo più brave e più bravi degli altri. E possiamo esserlo.",
      ],
    },

    chiusura: {
      titolo: "Siamo folli.<br>Non stupidi.",
      testo: "Per vincere ci servi tu. Nessun obbligo: ogni aiuto conta.",
      azioni: [
        { titolo: "Dai una mano", testo: "Strada, eventi, social, programma: scegli tu dove.", link: "aiutaci.html#gruppi", bottone: "Partecipa" },
        { titolo: "Raccontaci la tua Como", testo: "Un problema nel tuo quartiere, un'idea, una storia di affitti impossibili.", link: "aiutaci.html#modulo", bottone: "Scrivici" },
        { titolo: "Passaparola", testo: "Seguici e condividi i nostri contenuti con chi conosci.", link: "https://www.instagram.com/insema_como/", bottone: "@insema_como" },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* CHI SIAMO                                                          */
  /* ------------------------------------------------------------------ */
  chiSiamo: {
    titoloPagina: "Chi siamo · Inséma",

    hero: {
      titolo: "Ci sono delle persone vere.",
      titolo2: "Ma la persona più importante sei tu.",
      bottone: { testo: "Unisciti a noi", link: "aiutaci.html" },
    },

    persone: {
      dialetto: { frase: "Sem chì", traduzione: "siamo qui" },
      nota: "In ordine sparso: ogni volta che apri la pagina, cambia.",
      // Per aggiungere una foto: mettete il file nella cartella img/persone/
      // e scrivete il percorso, es. foto: "img/persone/ilaria.jpg"
      lista: [
        { nome: "Alessandro Cecconi", foto: "", frase: "" },
        { nome: "Camilla Pizzi", foto: "", frase: "" },
        { nome: "Ilaria Grignoli", foto: "", frase: "" },
        { nome: "Michele Mandaglio", foto: "", frase: "" },
        { nome: "Stefania Macrì", foto: "", frase: "" },
      ],
      tu: { nome: "Tu?", frase: "Il posto più importante è ancora libero.", link: "aiutaci.html" },
    },

    storia: {
      titolo: "La nostra storia",
      testo: `Inséma è nata il 16 ottobre 2026, con un post su Instagram. Volevamo parlare di Como in un modo diverso: partendo dai numeri e andando per strada, al mercato e nei quartieri a chiedere alle persone come vivono la città.

Tornando a Como dopo anni passati altrove, l'abbiamo trovata cambiata. Una città dove sembrava che la politica si fosse arresa, e con lei tanti cittadini, rassegnati a un destino votato sempre più al turismo.

Noi non ci rassegniamo. Un mese dopo il primo post ci siamo trovati per la prima riunione, e da lì non ci siamo più fermati.`,
    },

    nome: {
      titolo: "Perché «Inséma»?",
      testo: "In dialetto comasco vuol dire ==insieme==. E dice molto del tono che abbiamo scelto: positivo, fresco, accogliente, perfino giocoso. Perché le città non si governano *contro* qualcuno, ma **per** qualcuno.",
    },

    obiettivi: {
      titolo: "Cosa vogliamo",
      breve: {
        titolo: "Subito",
        testo: "Vincere le elezioni comunali di maggio 2027. È il modo per poter cambiare la città. E pensiamo di poterlo fare.",
      },
      lungo: {
        titolo: "Per sempre",
        testo: "Una Como dove le persone stanno bene. Anzi, meglio. Una città in cui nessuno viene lasciato indietro.",
      },
    },
  },

  /* ------------------------------------------------------------------ */
  /* MANIFESTO                                                          */
  /* ------------------------------------------------------------------ */
  manifesto: {
    titoloPagina: "Manifesto · Inséma",

    hero: {
      sopratitolo: "Ok, ma che cos'è Inséma?",
      titolo: "Manifesto",
      testo: "Cinque parole per dire chi siamo e come vogliamo governare Como.",
    },

    valori: [
      {
        titolo: "Comunità",
        testo: "Una città non è la somma delle sue case e dei suoi alberghi: sono le persone che ci vivono. Se si tolgono le persone che ci abitano, le città smettono di esistere. Vogliamo ricucire i legami tra quartieri, generazioni e storie diverse.",
      },
      {
        titolo: "Trasparenza",
        testo: "Ogni euro pubblico deve essere chiaro a tutti: quanto costa, da dove arriva, a cosa serve. Vale per il Comune e vale per noi: ogni donazione che riceviamo sarà pubblica.",
      },
      {
        titolo: "Ascolto",
        testo: "Prima di parlare, ascoltiamo. Andiamo per strada, al mercato e nei quartieri, perché il programma lo scrivono anche le persone che incontriamo. Il fallimento sarebbe parlare da soli.",
      },
      {
        titolo: "Sostenibilità",
        testo: "Crescere sì, ma senza consumare il lago, il territorio e il futuro di chi viene dopo. Energia pulita, spazi recuperati, conti in ordine.",
      },
      {
        titolo: "Concretezza",
        testo: "Niente slogan vuoti: proposte di buon senso, con costi, tempi e coperture. Senza una base solida, proposte e critiche restano parole.",
      },
    ],

    stile: {
      titolo: "Come parliamo",
      testo: "La politica a Como ha bisogno anche di un modo diverso di comunicare.",
      punti: [
        { titolo: "Diverso", testo: "Non facciamo leva sulla rabbia o sull'indignazione, ma sul bisogno delle persone di stare meglio." },
        { titolo: "Accogliente", testo: "Vogliamo che le persone si sentano capite e libere di dire la loro." },
        { titolo: "Convincente", testo: "Vogliamo dimostrare che stare meglio a Como è possibile." },
        { titolo: "Trasversale", testo: "Parliamo a tutte e a tutti, non solo a chi la pensa già come noi." },
      ],
    },

    no: {
      titolo: "Cosa non faremo",
      lista: ["Comunicazione aggressiva", "Rabbia", "Indignazione", "Populismo", "Perdere il focus"],
    },

    chiusura: {
      titolo: "Le città non si governano contro qualcuno.",
      titolo2: "Si governano per qualcuno.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* PROGRAMMA                                                          */
  /* ------------------------------------------------------------------ */
  programma: {
    titoloPagina: "Programma · Inséma",

    hero: {
      sopratitolo: "Il programma",
      titolo: "Per una Como che cresce*",
      sottotitolo: "*senza lasciare indietro nessuno",
      testo: "Non partiamo da zero: un pezzo di programma esiste già. Sono proposte di base, da sviluppare, discutere e completare ==inséma==.",
    },

    racconto: {
      dialetto: { frase: "Alura…", traduzione: "allora…" },
      titolo: "Partiamo da qui",
      testo: `Como è una città bellissima che sta diventando difficile da vivere. Comprare o affittare casa costa come in poche altre città della Lombardia. Il turismo cresce, ma il lavoro che crea è spesso stagionale e pagato poco. Intanto ci sono aree abbandonate da decenni e soldi in bilancio che restano fermi.

Chi ha tra i 25 e i 40 anni spesso se ne va, chi resta fa fatica. Sembra quasi che Como abbia saltato una generazione.

Noi pensiamo che si possa fare diversamente. Con proposte che non sono radicali, ma di buon senso: case che le persone possano permettersi, servizi che aiutano davvero, un lavoro che permetta di vivere qui tutto l'anno, una crescita che non lasci indietro nessuno.`,
    },

    titoloCapitoli: "Cinque capitoli",

    nota: "Il programma è in costruzione. I numeri che trovi descrivono i problemi di oggi; le soluzioni le stiamo ancora scrivendo e verificando, anche con te.",

    cta: {
      titolo: "Scrivilo con noi",
      testo: "A dicembre facciamo il primo evento dal vivo: ognuno costruisce il suo programma per Como, poi ne discutiamo inséma.",
      bottone: { testo: "Voglio esserci", link: "aiutaci.html#modulo" },
    },

    // Testi fissi delle pagine dei singoli temi
    etichette: {
      problema: "Il problema",
      proposte: "Cosa vogliamo fare",
      diciLaTua: "Ti manca qualcosa? Hai un'idea migliore?",
      diciLaTuaTesto: "Il programma lo scriviamo inséma. Raccontaci cosa ne pensi.",
      diciLaTuaBottone: "Dicci la tua",
      tornaAlProgramma: "← Tutto il programma",
      prossimo: "Prossimo capitolo",
    },

    /* ---- I CAPITOLI ------------------------------------------------
       colore: crema | rosa | bianco | giallo | blu
       Regola: numeri solo per descrivere i problemi, non le soluzioni.
    ------------------------------------------------------------------ */
    temi: [

      /* ============ 01 CASA ============ */
      {
        id: "casa",
        pagina: "programma-casa.html",
        numero: "01",
        colore: "crema",
        titolo: "Casa",
        slogan: "Case che puoi permetterti",
        claim: "Restare a Como deve essere possibile.",
        dialetto: { frase: "Una cà per tücc", traduzione: "una casa per tutti" },
        anteprima: "Case pubbliche, aiuti per affitto e acquisto, regole più giuste per gli affitti brevi.",

        problema: {
          testo: `Chi fa un lavoro normale non riesce più a comprare casa in città, e trovarne una in affitto è sempre più difficile. Gli appartamenti diventano alloggi per turisti, e chi è nato qui è costretto ad andarsene.

Lo sentiamo in ogni intervista: Como costa sempre di più e spinge fuori i suoi residenti storici. Ma se si tolgono le persone che ci abitano, le città smettono di esistere.`,
          numeri: [
            { valore: "3.320 €", testo: "al metro quadro: il prezzo medio richiesto per comprare casa. Solo Milano è più cara in Lombardia.", fonte: "Immobiliare.it, settembre 2026" },
            { valore: "+26%", testo: "rispetto alla media dei capoluoghi lombardi.", fonte: "Immobiliare.it, settembre 2026" },
            { valore: "400 € → 1.000 €", testo: "lo stesso appartamento in via Garibaldi: prima 400 € al mese in affitto, oggi 1.000 € a settimana su Airbnb.", fonte: "Testimonianza raccolta da Inséma" },
          ],
          grafico: {
            tipo: "classifica",
            titolo: "Quanto costa comprare casa?",
            unita: "€/m², prezzi medi richiesti nei capoluoghi",
            evidenzia: "Como",
            media: { valore: 2627, etichetta: "media 2.627" },
            dati: [
              ["Milano", 5665], ["Como", 3320], ["Monza", 3288], ["Bergamo", 2924],
              ["Lecco", 2624], ["Pavia", 2544], ["Brescia", 2356], ["Lodi", 2168],
              ["Varese", 1947], ["Mantova", 1683], ["Cremona", 1572], ["Sondrio", 1434],
            ],
            fonte: "Fonte: Immobiliare.it, prezzi medi richiesti nei comuni capoluogo, settembre 2026.",
          },
        },

        proposte: [
          { titolo: "Rimettere in uso le case comunali vuote", testo: "Ci sono alloggi del Comune sfitti. Li sistemiamo e li riassegniamo a chi ne ha bisogno." },
          { titolo: "Nuove case a prezzi accessibili", testo: "Il Comune recupera e acquista alloggi da affittare a canoni sostenibili, un pezzo alla volta." },
          { titolo: "Un fondo per le giovani famiglie", testo: "Un aiuto concreto per chi vuole comprare o affittare casa e costruirsi una vita a Como." },
          { titolo: "Il Comune fa da garante", testo: "Garanzie sugli affitti, così chi ha una casa la affitta con più tranquillità a chi vive e lavora qui." },
          { titolo: "Tasse più giuste sulla casa", testo: "Chi tiene le case vuote paga di più, chi affitta a canone concordato paga di meno. E gli affitti brevi contribuiscono come le altre attività." },
          { titolo: "Case per chi lavora nel turismo", testo: "Foresterie per i lavoratori stagionali, dentro il piano casa." },
        ],
      },

      /* ============ 02 SERVIZI ============ */
      {
        id: "servizi",
        pagina: "programma-servizi.html",
        numero: "02",
        colore: "rosa",
        titolo: "Servizi",
        slogan: "Bus e nido gratis",
        claim: "Una città che si prende cura di te.",
        dialetto: { frase: "Nissün resta indree", traduzione: "nessuno resta indietro" },
        anteprima: "Mezzi pubblici gratis, nido gratis per tutti, aiuto vicino per chi si prende cura di qualcuno.",

        problema: {
          testo: `Muoversi in città senza auto è sempre più complicato. Avere un figlio piccolo costa tantissimo, e chi si prende cura di un genitore anziano spesso è lasciato solo, tra costi alti e lavoro in nero.

Sono i servizi a fare la differenza tra una città dove si sopravvive e una dove si vive bene.`,
          numeri: [
            { valore: "313-341 €", testo: "quanto costa oggi un abbonamento annuale ai bus urbani di Como.", fonte: "ASF, Carta della mobilità 2026" },
            { valore: "1.200 €", testo: "al mese, più i contributi: quanto può costare una badante a una famiglia.", fonte: "Il Resto del Carlino / Confabitare" },
          ],
        },

        proposte: [
          { titolo: "Mezzi pubblici gratis", testo: "Bus gratis per i giovani e per chi lavora con un reddito basso. Partiamo con una sperimentazione, come ha fatto Brescia per i ragazzi." },
          { titolo: "Nido gratis per tutte le famiglie", testo: "Nei nidi comunali, senza pesare di più sul bilancio, usando bene il bonus nido nazionale." },
          { titolo: "Più diritti per chi lavora nei nidi", testo: "Nei nidi in convenzione: contratto nazionale e una paga dignitosa." },
          { titolo: "La badante di condominio", testo: "Una persona formata e in regola segue più famiglie dello stesso palazzo: costa molto meno, e nessuno resta solo. Funziona già a Bologna e Milano." },
          { titolo: "Tate di quartiere", testo: "Baby sitter di prossimità, formate e in regola, per le sere e le emergenze." },
          { titolo: "Sport per tutti", testo: "Riaprire la piscina di Muggiò e completare il centro sportivo di via del Dos." },
          { titolo: "Un centro per tutte le età", testo: "La ex bocciofila diventa un centro interculturale e intergenerazionale. I campi da bocce restano." },
        ],
      },

      /* ============ 03 LAVORO ============ */
      {
        id: "lavoro",
        pagina: "programma-lavoro.html",
        numero: "03",
        colore: "bianco",
        titolo: "Lavoro",
        slogan: "Una paga giusta",
        claim: "Chi lavora per Como deve poterci vivere tutto l'anno.",
        dialetto: { frase: "Laurà tütt l'ann", traduzione: "lavorare tutto l'anno" },
        anteprima: "Salario minimo comunale, un tavolo per il turismo, più tutele per gli stagionali.",

        problema: {
          testo: `Como punta su un turismo extra lusso. Il turismo è importante, ma il lavoro che crea è spesso stagionale e pagato meno della media. Chi serve ai tavoli d'estate rischia di non potersi permettere di vivere nella città in cui lavora.

Una città che vive di una sola cosa è una città fragile.`,
          numeri: [
            { valore: "−35%", testo: "il reddito medio di chi lavora nel turismo rispetto alla media italiana.", fonte: "Istat, Conto satellite del turismo 2023" },
            { valore: "−30%", testo: "la produzione per addetto nel turismo rispetto alla media.", fonte: "Istat, Conto satellite del turismo 2023" },
          ],
          grafico: {
            tipo: "confronto",
            titolo: "Bene, no? Insomma.",
            gruppi: [
              { titolo: "Reddito medio annuo", a: ["turismo", 17709, "17.709 €"], b: ["media", 27200, "circa 27.200 €"], nota: "il 35% in meno" },
              { titolo: "Produzione per addetto", a: ["turismo", 99015, "99.015 €"], b: ["media", 141839, "141.839 €"], nota: "il 30% in meno" },
            ],
            fonte: "Dati Italia. Fonte: Istat, CST 2023. La media del reddito è una stima Inséma a partire dal −35% indicato da Istat.",
          },
        },

        proposte: [
          { titolo: "Salario minimo comunale", testo: "Negli appalti del Comune nessuno sotto una paga oraria minima, come già fanno Firenze, Genova e Napoli." },
          { titolo: "Un tavolo per il turismo", testo: "Sindacati, imprese, ente bilaterale e comuni del lago allo stesso tavolo, per un contratto integrativo territoriale." },
          { titolo: "Un paracadute per gli stagionali", testo: "Un fondo che allunga la disoccupazione dei lavoratori stagionali, come in Trentino, pagato da imprese e lavoratori." },
          { titolo: "Da stagionale ad annuale", testo: "Sgravi per chi trasforma i contratti stagionali in contratti tutto l'anno." },
          { titolo: "Stagioni più lunghe", testo: "Eventi d'inverno per dare lavoro anche fuori dall'estate." },
        ],
      },

      /* ============ 04 SVILUPPO ============ */
      {
        id: "sviluppo",
        pagina: "programma-sviluppo.html",
        numero: "04",
        colore: "giallo",
        titolo: "Sviluppo",
        slogan: "Energia e spazi per tutti",
        claim: "Crescere non vuol dire solo più turisti.",
        dialetto: { frase: "Andèm!", traduzione: "andiamo!" },
        anteprima: "Comunità energetiche di quartiere, aree abbandonate restituite alla città, lavoro qualificato.",

        problema: {
          testo: `Como ha spazi enormi fermi da decenni, mentre le bollette pesano sempre di più sulle famiglie. E quasi tutto il futuro della città sembra affidato al turismo.

Crescere vuol dire anche energia pulita e più economica, spazi restituiti ai quartieri, nuovo lavoro qualificato insieme a università e imprese del territorio.`,
          numeri: [
            { valore: "1.300 €", testo: "all'anno: quanto spende di gas una famiglia tipo.", fonte: "ARERA, aprile 2026" },
            { valore: "44 anni", testo: "che l'area Ticosa aspetta di essere rigenerata.", fonte: "" },
            { valore: "2 aste", testo: "andate deserte per vendere il Politeama.", fonte: "La Provincia di Como, 2026" },
          ],
        },

        proposte: [
          { titolo: "Como Energia di Quartiere", testo: "Una comunità energetica per tutta la città: pannelli su scuole, impianti sportivi, parcheggi e condomini, e bollette più leggere per chi aderisce. Una testa, un voto. Più vantaggi a chi ha di meno." },
          { titolo: "Luce e gas comprati insieme", testo: "Un gruppo d'acquisto per pagare meno l'energia." },
          { titolo: "Uno sportello per i condomini", testo: "Progetti, pratiche e incentivi per isolare le case e cambiare le caldaie, in un posto solo." },
          { titolo: "Calore di quartiere", testo: "Chiediamo di estendere il teleriscaldamento ai quartieri, con una tariffa sociale." },
          { titolo: "Ticosa", testo: "Rivedere il piano attuale: più verde e più servizi per la città." },
          { titolo: "Politeama", testo: "Fermare la vendita e farne un teatro e uno spazio culturale, con un azionariato popolare come a Prato." },
          { titolo: "Parco della Valle Cosia", testo: "Un parco che unisce Camerlata, Albate e Muggiò, progettato con università e quartieri." },
          { titolo: "Un hub per l'innovazione", testo: "Agricoltura high tech e riciclo in un'area dismessa, con università, ComoNExT e fondi europei." },
          { titolo: "Aree ferme, usi temporanei", testo: "Nelle aree private abbandonate, subito sport, spazi per i giovani e mercati." },
        ],
      },

      /* ============ 05 CONTI E TRASPARENZA ============ */
      {
        id: "conti",
        pagina: "programma-conti.html",
        numero: "05",
        colore: "blu",
        titolo: "Conti chiari",
        slogan: "Una politica che dà e che risponde",
        claim: "Chi governa la città dà per primo.",
        dialetto: { frase: "I danée de tücc", traduzione: "i soldi di tutti" },
        anteprima: "Come si paga tutto questo, chi paga, e come ve lo raccontiamo.",

        problema: {
          testo: `Como ha risorse, ma non le usa. Mancano un'idea di città e la capacità di trasformare i soldi in progetti. E la politica, spesso, parla più di quanto ascolti.

Per noi ogni proposta deve dire quanto costa, da dove arrivano i soldi e quando parte. E chi governa deve rendere conto, davvero.`,
          numeri: [
            { valore: "39,1 milioni", testo: "di avanzo libero nel bilancio del Comune: soldi disponibili che non vengono spesi.", fonte: "Comune di Como, rendiconto 2025" },
          ],
        },

        proposte: [
          { titolo: "Usare bene i soldi che ci sono", testo: "L'avanzo del Comune investito in casa, servizi ed energia, con un piano chiaro su cinque anni." },
          { titolo: "Un ufficio per i fondi europei", testo: "Per portare a Como bandi europei e regionali, insieme a Politecnico e Insubria." },
          { titolo: "I turisti contribuiscono di più", testo: "L'imposta di soggiorno finanzia turismo, cultura, pulizia e servizi." },
          { titolo: "Pagare tutti per pagare meno", testo: "Più lotta all'evasione di IMU e TARI e una revisione attenta della spesa." },
          { titolo: "Chi governa dà per primo", testo: "Un taglio progressivo alle indennità della Giunta: chi prende di più, dà di più. Quello che si risparmia va al welfare di quartiere." },
          { titolo: "Riunioni pubbliche nei quartieri", testo: "Partendo da quelli dove si vota meno: lo stato dei progetti, i soldi spesi, poi la parola a chi c'è. Risposta scritta a ogni domanda." },
          { titolo: "Un patto di integrità", testo: "Niente donazioni da grandi gruppi, alberghi, immobiliari, costruttori o da chi lavora con il Comune. Ogni donazione pubblicata online. Nessun incarico nelle società del Comune, durante e dopo il mandato." },
          { titolo: "Se i soldi sono meno", testo: "Abbiamo già deciso cosa difendiamo per primo: casa, lavoro e welfare di quartiere." },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* AIUTACI                                                            */
  /* ------------------------------------------------------------------ */
  aiutaci: {
    titoloPagina: "Aiutaci · Inséma",

    hero: {
      sopratitolo: "Siamo folli. Non stupidi.",
      titolo: "Per vincere ci servi tu.",
      testo: "Sappiamo che da soli non ce la facciamo. Nessun obbligo: partecipare è totalmente volontario e ogni aiuto conta. Anche solo venire alle riunioni è preziosissimo.",
    },

    gruppi: {
      titolo: "Scegli dove dare una mano",
      testo: "Sette gruppi, uno per ogni pezzo della campagna. Tocca quelli che ti interessano: li aggiungiamo al modulo qui sotto.",
      lista: [
        { nome: "Strada", testo: "Volantinaggio, attacchinaggio, banchetti in piazza." },
        { nome: "Eventi", testo: "Organizzare gli incontri dal vivo." },
        { nome: "Territorio", testo: "Contatti con le associazioni, mappatura di spazi e problemi nei quartieri." },
        { nome: "Social", testo: "Video e contenuti per i social." },
        { nome: "Strategia", testo: "Piano editoriale, linea comunicativa, rapporti con la stampa." },
        { nome: "Programma", testo: "Scrivere il programma e preparare le nostre iniziative." },
        { nome: "Fondi", testo: "Raccolta fondi. Perché siamo poveri. E indipendenti." },
      ],
    },

    appuntamenti: {
      titolo: "Prossimi passi",
      lista: [
        { quando: "Metà dicembre", cosa: "Primo evento dal vivo: costruisci il tuo programma per Como, poi ne discutiamo inséma." },
        { quando: "Fine dicembre", cosa: "Almeno due o tre incontri nei quartieri." },
        { quando: "Inizio 2027", cosa: "Chiudiamo la lista e il programma." },
        { quando: "Maggio 2027", cosa: "Si vota. Ghe la fèm." },
      ],
    },

    modulo: {
      titolo: "Ci sto!",
      nome: "Nome e cognome",
      email: "Email",
      telefono: "Telefono (facoltativo)",
      quartiere: "Quartiere o paese",
      gruppi: "Gruppi che ti interessano",
      messaggio: "Raccontaci qualcosa: un'idea, un problema del tuo quartiere, una storia…",
      privacy: "Acconsento al trattamento dei miei dati personali per essere ricontattato/a da Inséma.",
      bottone: "Invia",
      grazie: "Grazie! Ti ricontattiamo presto. Inséma ✦",
      grazieMail: "Si sta aprendo la tua app di posta con il messaggio già scritto: premi «Invia» e ci siamo.",
      errore: "Qualcosa non ha funzionato. Scrivici a",
    },

    fondi: {
      titolo: "Sostienici",
      testo: "Non prendiamo soldi da grandi gruppi, alberghi, immobiliari, costruttori o da chi lavora con il Comune. Ogni donazione sarà pubblicata online.",
      bottone: "Dona",
      senzaLink: "Le donazioni apriranno presto. Se vuoi contribuire già ora, scrivici.",
    },
  },
};
