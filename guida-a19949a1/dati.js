/* =====================================================================
   INSÉMA · GUIDA PER CHI FA INSÉMA — TUTTI I DATI E I TESTI
   =====================================================================

   Questo è l'unico file da toccare per aggiornare la guida.
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
   Cercate la zona (es. id: "III"), poi il quartiere, e dentro
   referenti: [ ] aggiungete una riga così:
     { nome: "Giulia R.", whatsapp: "https://chat.whatsapp.com/…", nota: "Sente bene la sera" },
   Si possono mettere più referenti nello stesso quartiere.

   COME AGGIUNGERE UN LUOGO UTILE
   Dentro luoghi: [ ] della zona:
     { tipo: "Mercato", nome: "Mercato di Rebbio", indirizzo: "Piazza …", nota: "Martedì mattina", lat: 45.79, lon: 9.07 },
   lat e lon (facoltativi) mettono il punto sulla mappa: su Google Maps
   tenete premuto sul punto e copiate i due numeri.
   ===================================================================== */

window.GUIDA = {
  aggiornata: "23 novembre 2026",
  email: "insema.como@gmail.com",

  /* ------------------------------------------------------------------ */
  /* 1. BENVENUTO                                                       */
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
  /* 2. COME PARLIAMO                                                   */
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

    // FAQ. bozza: true = risposta scritta per la guida, da verificare
    faq: [
      {
        domanda: "Siete di destra o di sinistra?",
        risposta: "Siamo un movimento civico. Parliamo a tutte e a tutti, non solo a chi la pensa già come noi. Le città non si governano contro qualcuno, ma per qualcuno.",
        fonte: "manifesto (Trasversale, chiusura)",
        bozza: true,
      },
      {
        domanda: "Chi vi paga?",
        risposta: "Non abbiamo grandi finanziamenti, ogni euro conta. Abbiamo un patto di integrità: niente donazioni da grandi gruppi, alberghi, immobiliari, costruttori o da chi lavora con il Comune. Ogni donazione sarà pubblicata online.",
        fonte: "aiutaci (Sostienici), programma → Conti chiari (Patto di integrità)",
      },
      {
        domanda: "Cosa fate per la casa?",
        risposta: "Oggi chi fa un lavoro normale non riesce più a comprare casa in città: Como è seconda in Lombardia per prezzo, dopo Milano. Vogliamo rimettere in uso le case comunali vuote, nuove case a prezzi accessibili, un fondo per le giovani famiglie, il Comune che fa da garante sugli affitti e tasse più giuste: chi tiene le case vuote paga di più, chi affitta a canone concordato paga di meno. Tutto il capitolo è su [programma-casa.html](../programma-casa.html).",
        fonte: "programma → Casa",
      },
      {
        domanda: "Perché dovrei fidarmi di voi?",
        risposta: "Perché ogni euro pubblico deve essere chiaro a tutti, e vale anche per noi: ogni donazione sarà pubblica. Faremo riunioni pubbliche nei quartieri, partendo da quelli dove si vota meno, con risposta scritta a ogni domanda. E le nostre proposte non sono radicali: sono di buon senso.",
        fonte: "manifesto (Trasparenza), programma → Conti chiari, home (Perché possiamo farcela)",
        bozza: true,
      },
      {
        domanda: "Come posso aiutare?",
        risposta: "Diventa uno dei 100 fondatori entro il 31 dicembre: due minuti sul [modulo](../aiutaci.html#modulo). Poi scegli uno dei sette gruppi di lavoro, oppure accetta la [missione delle 15 persone](../piano.html#missione).",
        fonte: "fondatori, aiutaci, piano",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 3. LA MISSIONE (il contatore viene da testi.js → fondatori)        */
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
  /* 4. MAPPA                                                           */
  /* ------------------------------------------------------------------ */
  mappa: {
    titolo: "Mappa dei quartieri",
    testo: "Le 9 ex circoscrizioni. Scegli cosa colorare, tocca una zona per aprire la sua scheda.",
    fonteConfini: "Confini: ISTAT, Basi territoriali 2021, aree subcomunali (CC BY 4.0). Mappa © OpenStreetMap (ODbL).",
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
  /* 5. LE 9 ZONE (ex circoscrizioni)                                   */
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
      voto: { esito: "minghetti", testo: "Albate (sezioni 41-43): Minghetti, di misura (sezione 42: 198 a 197)." },
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
      voto: { esito: "minghetti", testo: "Camerlata (sezioni 51-53): Minghetti, di misura (sezione 51: 167 a 166)." },
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
      voto: { esito: "rapinese", testo: "Convalle, Como Est e Ovest: Rapinese quasi ovunque; Minghetti solo nella sezione 15; sezione 18 (via Fiume) pari, 195 a 195." },
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
      voto: { esito: "rapinese", testo: "Rapinese netto; Minghetti solo nella sezione 32." },
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
      voto: { esito: "rapinese", testo: "Convalle, Como Est e Ovest: Rapinese quasi ovunque; Minghetti solo nella sezione 15; sezione 18 (via Fiume) pari, 195 a 195." },
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
      voto: { esito: "rapinese", testo: "Monte Olimpino, Tavernola, Sagnino, Ponte Chiasso: Rapinese con distacchi netti." },
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

  voto2022nota: "Minghetti ha vinto solo 10 sezioni su 74, Rapinese il resto.",
  votoCategorie: {
    rapinese: "Rapinese",
    minghetti: "Minghetti, di misura (in parte della zona)",
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
       { n: 42, zona: "I", vie: ["Via …", "Via …"], ballottaggio2022: { minghetti: 198, rapinese: 197 } },
  */
  sezioni: [],

  /* ------------------------------------------------------------------ */
  /* 6. COMO IN NUMERI                                                  */
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
        { valore: "44,33%", testo: "affluenza al primo turno 2022. Minghetti (centrosinistra) 39,40%, Rapinese 27,32%, Molteni (centrodestra) 26,99%, fuori dal ballottaggio per circa 100 voti.", fonte: "Comunali 2022" },
        { valore: "35,75%", testo: "affluenza al ballottaggio, la più bassa mai registrata per un sindaco di Como. Rapinese 55,4%. Liste civiche al 47,6%.", fonte: "Comunali 2022" },
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
  /* 7. KIT DI STRADA — BOZZA da far rivedere al gruppo Strada          */
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
        portare: ["Permesso del Comune (stampato o sul telefono)", "Tavolino, tovaglia, materiali", "Un cartello grande con il logo", "Penne e fogli per i contatti", "Cartello «Diventa uno dei 100»"],
        fare: ["Almeno due persone sempre al banchetto", "Una sta davanti al tavolo, non dietro", "Fate una domanda: «Cosa non va a Como, per te?»", "Segnate i problemi raccolti: vanno al gruppo Territorio"],
      },
      {
        titolo: "Incontro di quartiere",
        portare: ["Due o tre numeri della zona (dalla scheda)", "Il capitolo del programma che c'entra", "Modo per raccogliere i contatti"],
        fare: ["Prima ascoltate, poi parlate", "Partite da un problema concreto del quartiere", "Chiudete con una proposta: un nuovo incontro, un gruppo WhatsApp, il modulo"],
      },
    ],
    contatto: {
      titolo: "Come chiedere un contatto",
      testo: "Chiedete **nome e telefono**, e dite sempre a cosa servono: «Ti scriviamo su WhatsApp per i prossimi incontri, ti va?». Solo con il suo sì. Mai foto di fogli con i dati di altre persone nei gruppi.",
    },
    dopo: {
      titolo: "Dopo",
      testo: "Entro la sera inserite ogni contatto nel [modulo](../aiutaci.html#modulo) (uno per persona) e scrivete nel gruppo cosa avete sentito. Poi buttate o consegnate i fogli: i dati non restano nelle tasche di nessuno.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 9. MATERIALI                                                       */
  /* ------------------------------------------------------------------ */
  materiali: {
    loghi: [
      { nome: "Logo magenta", file: "../img/logo/logo-magenta.svg" },
      { nome: "Logo vino", file: "../img/logo/logo-vino.svg" },
      { nome: "Logo blu", file: "../img/logo/logo-blu.svg" },
      { nome: "Logo perla (per fondi scuri)", file: "../img/logo/logo-perla.svg" },
      { nome: "Logo esteso magenta", file: "../img/logo/logo-esteso-magenta.svg" },
      { nome: "Logo esteso perla", file: "../img/logo/logo-esteso-perla.svg" },
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
  /* 10. DATI CHE CI MANCANO                                            */
  /* ------------------------------------------------------------------ */
  datiMancanti: [
    { dato: "Risultati per sezione: comunali 2017 e 2022, politiche 2022, europee 2024", dove: "Sito elettorale del Comune (halley.comune.como.it), Eligendo", perche: "Mappa del voto via per via, 74 sezioni" },
    { dato: "Iscritti per sezione con età e sesso, e vie di ogni sezione", dove: "Ufficio elettorale del Comune", perche: "Capire dove si vota meno" },
    { dato: "Residenti per quartiere con età e cittadinanza", dove: "Ufficio statistica del Comune (statistica@comune.como.it)", perche: "Aggiornare i dati del 2008 sugli stranieri" },
    { dato: "Istruzione e lavoro per sezione di censimento", dove: "ISTAT, basi territoriali", perche: "Dati per isolato" },
    { dato: "Mercati, piazze, associazioni, spazi per ogni quartiere", dove: "Gruppo Territorio, chi abita lì", perche: "Riempire i «luoghi utili»" },
  ],
};
