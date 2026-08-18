(() => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const set = (el, value) => { if (el) el.textContent = value; };

  function replaceText(from, to) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement?.closest('script,style')) return;
      if (node.nodeValue.includes(from)) node.nodeValue = node.nodeValue.split(from).join(to);
    });
  }

  function cleanNav() {
    qa('nav a').forEach(link => {
      const label = link.textContent.trim().toLowerCase();
      if (/plattform|platform|angebote|app builder/.test(label)) link.remove();
      if (/workflow sprint/.test(label)) link.textContent = link.textContent.replace(/Workflow Sprint/gi, 'Build Sprint');
    });
    qa('.nav-action').forEach(link => {
      link.textContent = 'SOLUTION LOOP ↗';
      link.href = '#top';
    });
  }

  function compactOffers() {
    const stack = q('#top .hero-offer-stack');
    if (!stack || q('.closure-offer-actions')) return;
    const actions = document.createElement('div');
    actions.className = 'closure-offer-actions';
    actions.innerHTML = '<a class="button button-yellow" href="#top">SOLUTION LOOP STARTEN ↗</a><a class="button button-text" href="build.html">BUILD SPRINT ANSEHEN ↗</a>';
    stack.insertAdjacentElement('afterend', actions);
  }

  function updateHero() {
    const top = q('#top');
    if (!top) return;
    set(q('.eyebrow', top), 'MASSGESCHNEIDERTE KI-BERATUNG FÜR KOMPLEXE PRODUKTE');
    set(q('#hero-title', top), 'Baut mit uns KI-Vorsprung auf.');
    const ledes = qa('.hero-lede', top);
    const lede = ledes.find(el => /KI-Unternehmen|laufende Zusammenarbeit|Möglichkeiten/.test(el.textContent)) || ledes[0];
    set(lede, 'Blinkin ist ein KI-Unternehmen, das seit 2019 KI-Projekte berät und eine eigene Plattform für KI-Apps baut. Wir helfen Unternehmen dabei, KI-Potenziale für ihre Arbeit zu verstehen und mit der passenden Technologie umzusetzen.');
    qa('.offer-panel', top).forEach(panel => {
      const build = /9[,.]900|Build Sprint|Workflow Sprint/i.test(panel.textContent);
      if (build) {
        const desc = q('p', panel);
        set(desc, 'Ein konkreter KI-Anwendungsfall in 4 Wochen. Wir bauen mit euch einen klar abgegrenzten Prozess bis zur direkt nutzbaren Lösung.');
      } else {
        const desc = q('p', panel);
        set(desc, '2 × 75 Minuten gemeinsame Umsetzung · Vollzugang zur Blinkin KI-Plattform für eigene KI-Anwendungen · laufende Einordnung von KI-Entwicklungen, Werkzeugen und Methoden · monatlich kündbar.');
      }
    });
    compactOffers();
  }

  function addDeliverableVisuals() {
    const section = qa('section').find(s => /Klarheit, bevor ihr baut/i.test(s.textContent));
    if (!section) return;
    section.id = 'deliverables';
    const list = q('ol, ul', section);
    if (!list) return;
    const titles = ['Bestand aufnehmen', 'Potenzial bestimmen', 'Anwendung prüfen'];
    qa('li', list).slice(0, 3).forEach((li, index) => {
      const title = q('h3,h4,strong', li);
      set(title, titles[index]);
      if (q('.closure-visual', li)) return;
      const visual = document.createElement('div');
      visual.className = `closure-visual closure-visual-${index + 1}`;
      if (index === 0) visual.innerHTML = '<span>Auslöser<br>&amp; Input</span><b>→</b><span>Heutiger<br>Ablauf</span><b>→</b><span>Ergebnis</span>';
      if (index === 1) visual.innerHTML = '<i style="--w:88%">Häufigkeit <em>hoch</em></i><i style="--w:76%">Entlastung <em>hoch</em></i><i style="--w:82%">Machbarkeit <em>gut</em></i><i style="--w:32%">Risiko <em>prüfen</em></i>';
      if (index === 2) visual.innerHTML = '<span>1<br><small>Input</small></span><b>→</b><span>2<br><small>KI-Beitrag</small></span><b>→</b><span>3<br><small>Review</small></span><b>→</b><span class="is-active">4<br><small>Messen</small></span>';
      li.append(visual);
    });
  }

  function addContext() {
    if (q('.closure-context')) return;
    const anchor = q('#deliverables') || q('#self-check') || q('#arbeitsweise');
    if (!anchor) return;
    const section = document.createElement('section');
    section.className = 'closure-context';
    section.innerHTML = `<div class="page-width"><div class="closure-context-heading"><p class="eyebrow">WOMIT IHR ZU BLINKIN KOMMEN KÖNNT</p><h2>Ein wiederkehrendes Problem reicht für den Solution Loop.</h2><p>Für den Build Sprint braucht es zusätzlich einen priorisierten Anwendungsfall und geeignete Beispiele.</p></div><div class="closure-benefits"><article><b>Besser entscheiden</b><span>Signale aus Markt, Unternehmen und Interaktionen verdichten.</span></article><article><b>Zeit und Kosten senken</b><span>Wiederkehrende Recherche, Dokumentation und Abstimmung vereinfachen.</span></article><article><b>Neue Angebote schaffen</b><span>Expertise, Daten und Prozesse in nutzbare Anwendungen bringen.</span></article></div><div class="closure-context-grid"><article><small>01 · VERTRIEB</small><h3>Angebote schneller vorbereiten</h3><p>Wiederverwendbares Wissen in einen prüfbaren ersten Entwurf bringen.</p></article><article><small>02 · SERVICE</small><h3>Anfragen sinnvoll vorsortieren</h3><p>Kontext sammeln, Fälle strukturieren und Antworten vorbereiten.</p></article><article><small>03 · OPERATIONS</small><h3>Berichte aus Material bauen</h3><p>Notizen, Tabellen und Dokumente in eine gemeinsame Arbeitsfassung überführen.</p></article><article><small>04 · WISSEN</small><h3>Verlässliche Antworten ermöglichen</h3><p>Festlegen, welcher Kontext für Menschen und KI als Grundlage dienen darf.</p></article><article><small>05 · MANAGEMENT</small><h3>Entscheidungen vorbereiten</h3><p>Signale, Annahmen und Optionen verdichten, ohne das menschliche Urteil zu verstecken.</p></article><article><small>06 · PRODUKTION</small><h3>Übergaben klarer machen</h3><p>Wiederkehrende Informationen vollständig und im richtigen Format weitergeben.</p></article><article><small>07 · ONBOARDING</small><h3>Erfahrung nutzbar machen</h3><p>Praxiswissen aus Gesprächen und Dokumenten in einen hilfreichen Einstieg verwandeln.</p></article><article><small>08 · QUALITÄT</small><h3>Dokumente gezielt prüfen</h3><p>Varianten vergleichen, Lücken markieren und Review-Schritte nachvollziehbar halten.</p></article><article><small>09 · TEAMARBEIT</small><h3>KI im Ablauf verankern</h3><p>Rollen, Freigaben und Verantwortung um die eigentliche Arbeit herum gestalten.</p></article></div></div>`;
    anchor.insertAdjacentElement('afterend', section);
  }

  function wireSelfCheck() {
    const section = qa('section').find(s => /KURZER SELBSTCHECK/.test(s.textContent));
    if (!section) return;
    section.id = 'self-check';
    const result = q('#self-check-result', section);
    const boxes = qa('input[type="checkbox"]', section);
    if (!result || !boxes.length) return;
    const update = () => {
      const n = boxes.filter(box => box.checked).length;
      const mood = n === 0 ? '🙂' : n <= 2 ? '😐' : '😟';
      const label = n === 0 ? 'Guter Ausgangspunkt' : n <= 2 ? 'Ein klarer nächster Schritt hilft' : 'Der Solution Loop passt gut';
      result.className = `closure-check-result score-${n}`;
      result.innerHTML = `<span class="closure-check-emoji">${mood}</span><strong>${n} VON ${boxes.length} MARKIERT</strong><small>${label}</small>`;
    };
    boxes.forEach(box => box.addEventListener('change', update));
    update();
  }

  function updateMonth() {
    const section = q('#erster-monat');
    if (!section) return;
    set(q('h3,h2', section), 'Wir arbeiten gemeinsam am richtigen Problem.');
    const titles = ['Bestand aufnehmen', 'Potenzial bestimmen', 'Anwendung prüfen', 'Messen & verfeinern'];
    qa('li', section).slice(0, 4).forEach((li, i) => set(q('h4,h3', li), titles[i]));
    if (!q('.closure-month-followup')) {
      section.insertAdjacentHTML('beforeend', '<div class="closure-month-followup"><strong>MONAT 2+</strong><div><h3>Der nächste Schmerzpunkt startet den nächsten Loop.</h3><p>Monat für Monat bringt ihr euer wichtigstes aktuelles Problem. Wir prüfen bestehende Loops im Review und priorisieren die nächste Verbesserung.</p></div></div><div class="closure-prototype-note"><strong>Wichtig:</strong> Ein Build Sprint ist eine Entscheidungsgrundlage, kein Produktionssystem. Live-Integrationen, Security-Härtung, Datenmigration, Hosting, Betrieb und Support werden bei Bedarf separat geplant.</div>');
    }
  }

  function cleanSections() {
    qa('section').forEach(section => {
      const head = q('h1,h2,h3', section)?.textContent.trim() || '';
      if (/^UNSER AUSGANGSPUNKT$|^SICHER STARTEN$|^WAS DABEI ENTSTEHEN KANN$/.test(head)) section.remove();
    });
  }

  function updateSpecialPages() {
    if (document.body.classList.contains('about-page')) {
      set(q('.about-hero h1'), 'Vom Remote Support zur KI-Plattform.');
      const hero = q('.about-hero .page-width');
      if (hero && !q('img.closure-about-image', hero)) hero.insertAdjacentHTML('beforeend', '<img class="closure-about-image" src="be-like-tim.jpeg" alt="Blinkin Remote Support" loading="lazy">');
      qa('.logo-wall, .about-logos').forEach(el => el.classList.add('closure-white-logos'));
      const position = qa('section').find(s => /WARUM DAS FÜR EUCH ZÄHLT|UNSERE ERFAHRUNG/.test(s.textContent));
      if (position) { const h = q('h2', position); set(h, '2,5 Mio. € EIC-Förderung für Blinkin.'); const p = q('p', position); if (p) p.textContent = 'Der European Innovation Council hat Blinkin für die Entwicklung und Skalierung intelligenter Assistenz ausgezeichnet.'; }
    }
    if (location.pathname.includes('vorher-nachher')) {
      set(q('#before-after-title'), 'KI, die messbaren Nutzen schafft.');
      replaceText('Multimodale', 'Bilder, Sprache und technische');
      qa('.case-impact, .scenario-outcome').forEach(el => { if (!/^Scope:/.test(el.textContent.trim())) el.textContent = `Scope: ${el.textContent.replace(/^Wirkung:\s*/,'')}`; });
      const proof = qa('section').find(s => /NACH 4 WOCHEN/.test(s.textContent));
      if (proof && !q('.closure-prototype-note', proof)) proof.insertAdjacentHTML('beforeend', '<p class="closure-prototype-note">Der Prototyp aus dem Build Sprint ist eine Entscheidungsgrundlage, kein Produktionssystem. Live-Integrationen, Security-Härtung, Datenmigration, Hosting, Betrieb und Support werden bei Bedarf separat geplant.</p>');
    }
    if (location.pathname.includes('build')) {
      replaceText('Workflow Sprint', 'Build Sprint');
      const h = q('.build-hero h1');
      if (h) h.textContent = 'Ein klarer KI-Build in 4 Wochen.';
    }
  }

  function run() {
    replaceText('Workflow Sprint', 'Build Sprint');
    replaceText('AI Hub', 'Solution Loop');
    replaceText('KI Hub', 'Solution Loop');
    replaceText('Im Einsatz:', 'Scope:');
    cleanNav();
    updateHero();
    addDeliverableVisuals();
    wireSelfCheck();
    addContext();
    updateMonth();
    cleanSections();
    const arbeitsweise = q('#arbeitsweise');
    const self = q('#self-check');
    if (arbeitsweise && self) self.insertAdjacentElement('afterend', arbeitsweise);
    updateSpecialPages();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
