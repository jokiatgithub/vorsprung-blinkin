(function () {
  const text = (el, value) => { if (el) el.textContent = value; };
  const all = (selector) => Array.from(document.querySelectorAll(selector));
  const norm = (value) => (value || '').replace(/\s+/g, ' ').trim();

  function setHeroCopy() {
    text(document.querySelector('.hero-copy .eyebrow'), 'MASSGESCHNEIDERTE KI-BERATUNG FÜR KOMPLEXE PRODUKTE');
    const heroTitle = document.querySelector('#hero-title');
    if (heroTitle) heroTitle.innerHTML = '<span>Baut mit uns</span><br><span>KI-Vorsprung auf.</span>';
    const ledes = all('.hero-copy .hero-lede');
    if (ledes[0]) text(ledes[0], 'Blinkin ist ein KI-Unternehmen, das seit 2019 KI-Projekte berät und eine eigene Plattform für KI-Apps baut. Wir helfen Unternehmen dabei, KI-Potenziale für ihre Arbeit zu verstehen und mit der passenden Technologie umzusetzen.');
    if (ledes[1]) ledes[1].remove();

    const panels = all('.hero-offer-stack .offer-panel, .hero-offer-stack article');
    if (panels[0]) {
      const p = panels[0];
      const label = p.querySelector('.offer-panel-label, .offer-label, .eyebrow');
      text(label, 'SOLUTION LOOP · MONATLICH');
      const copy = p.querySelector('.offer-panel-copy, .offer-copy, p');
      text(copy, '2 × 75 Minuten gemeinsame Umsetzung · Vollzugang zur Blinkin KI-Plattform für eigene KI-Anwendungen · laufende Einordnung von KI-Entwicklungen, Werkzeugen und Methoden.');
      const note = p.querySelector('.offer-panel-note, .offer-note, small');
      text(note, 'Monatlich kündbar.');
    }
    if (panels[1]) {
      const p = panels[1];
      const label = p.querySelector('.offer-panel-label, .offer-label, .eyebrow');
      text(label, 'BUILD SPRINT · EINMALIG');
      const copy = p.querySelector('.offer-panel-copy, .offer-copy, p');
      text(copy, 'Ein konkreter KI-Anwendungsfall in 4 Wochen. Wir bauen mit euch einen klar abgegrenzten Prozess bis zur direkt nutzbaren Lösung.');
    }
  }

  function normalizeNav() {
    all('nav a, header a').forEach((link) => {
      const label = norm(link.textContent);
      if (/Platform|Plattform|Angebote|App Builder/i.test(label) && !link.classList.contains('nav-action')) link.remove();
      if (/ANGEBOTE ANSEHEN|KI HUB STARTEN/i.test(label) && link.classList.contains('nav-action')) {
        link.textContent = 'SOLUTION LOOP ↗';
        link.setAttribute('href', '#top');
      }
      if (/Workflow Sprint/i.test(label)) link.textContent = label.replace(/Workflow Sprint/g, 'Build Sprint');
    });
  }

  function removeRedundancy() {
    all('section').forEach((section) => {
      const label = norm(section.textContent).slice(0, 180);
      if (/^UNSER AUSGANGSPUNKT|^SICHER STARTEN/i.test(label)) section.remove();
      if (/WAS DABEI ENTSTEHEN KANN/i.test(label) && !section.classList.contains('compact-benefit-strip')) section.remove();
    });
    all('section').forEach((section) => {
      if (/AI-RESSOURCEN/i.test(norm(section.textContent))) section.remove();
    });
  }

  function compactOfferActions() {
    const stack = document.querySelector('.hero-offer-stack');
    if (!stack || document.querySelector('.completion-offer-actions')) return;
    const actions = document.createElement('div');
    actions.className = 'completion-offer-actions';
    actions.innerHTML = '<a class="button button-yellow" href="#top">SOLUTION LOOP STARTEN ↗</a><a class="button button-text" href="build.html">BUILD SPRINT ANSEHEN ↗</a>';
    stack.after(actions);
  }

  function ensureFirstMonth() {
    const section = document.querySelector('#erster-monat');
    if (!section) return;
    text(section.querySelector('#hub-month-title'), 'Wir arbeiten gemeinsam am richtigen Problem.');
    const steps = all('#erster-monat .sprint-steps li');
    const values = [
      ['Bestand aufnehmen', 'Heute sichtbar machen.'],
      ['Potential bestimmen', 'Hebel priorisieren.'],
      ['Anwendung prüfen', 'Werkzeuge passend wählen.'],
      ['Messen & verfeinern', 'Umsetzung entscheiden.']
    ];
    steps.slice(0, 4).forEach((step, index) => {
      const [title, desc] = values[index];
      text(step.querySelector('h4'), title);
      text(step.querySelector('p'), desc);
    });
    if (!section.querySelector('.completion-month-plus')) {
      const plus = document.createElement('div');
      plus.className = 'completion-month-plus';
      plus.innerHTML = '<strong>Monat 2+</strong><div><b>Der nächste Schmerzpunkt startet den nächsten Loop.</b><span>Monat für Monat bringt ihr euer größtes aktuelles Problem. Wir beraten am echten Ablauf, begleiten bestehende Loops im Review und priorisieren die nächste Verbesserung.</span></div>';
      section.append(plus);
    }
  }

  function ensureSelfCheckSignal() {
    const result = document.querySelector('#self-check-result');
    if (!result || result.querySelector('.completion-traffic-light')) return;
    const light = document.createElement('div');
    light.className = 'completion-traffic-light';
    light.setAttribute('aria-label', 'Selbstcheck-Auswertung');
    light.innerHTML = '<i data-level="low"></i><i data-level="mid"></i><i data-level="high"></i>';
    result.prepend(light);
    const update = () => {
      const count = all('.self-check-section input[type="checkbox"]:checked').length;
      result.dataset.level = count >= 4 ? 'high' : count >= 2 ? 'mid' : 'low';
      text(result.querySelector('.self-check-count'), `${count} VON 5 MARKIERT`);
    };
    document.addEventListener('change', (event) => { if (event.target.matches('.self-check-section input')) update(); });
    update();
  }

  function addContextCards() {
    if (document.querySelector('.completion-context')) return;
    const anchor = document.querySelector('#arbeitsweise') || document.querySelector('#erster-monat') || document.querySelector('main > section:nth-of-type(2)');
    if (!anchor) return;
    const section = document.createElement('section');
    section.className = 'completion-context light-section';
    section.innerHTML = '<div class="page-width"><div class="completion-context-heading"><p class="eyebrow">WOMIT IHR ZU BLINKIN KOMMEN KÖNNT</p><h2>Ein wiederkehrender Engpass reicht für den Solution Loop.</h2><p>Für den Build Sprint braucht es zusätzlich einen priorisierten Anwendungsfall und passende Beispiele.</p></div><div class="completion-context-grid"></div></div>';
    const items = [
      ['01 · VERTRIEB', 'Angebote schneller vorbereiten', 'Wiederverwendbares Wissen in einen prüfbaren ersten Entwurf bringen.'],
      ['02 · SERVICE', 'Anfragen sinnvoll vorsortieren', 'Kontext sammeln, Fälle strukturieren und Antworten vorbereiten.'],
      ['03 · OPERATIONS', 'Berichte aus Material bauen', 'Notizen, Tabellen und Dokumente in eine gemeinsame Arbeitsfassung überführen.'],
      ['04 · WISSEN', 'Verlässliche Antworten ermöglichen', 'Festlegen, welcher Kontext für Menschen und KI als Grundlage dienen darf.'],
      ['05 · MANAGEMENT', 'Entscheidungen vorbereiten', 'Signale, Annahmen und Optionen verdichten, ohne das menschliche Urteil zu verstecken.'],
      ['06 · PRODUKTION', 'Übergaben klarer machen', 'Wiederkehrende Informationen vollständig und im richtigen Format weitergeben.'],
      ['07 · ONBOARDING', 'Erfahrung nutzbar machen', 'Praxiswissen aus Gesprächen und Dokumenten in einen hilfreichen Einstieg verwandeln.'],
      ['08 · QUALITÄT', 'Dokumente gezielt prüfen', 'Varianten vergleichen, Lücken markieren und Review-Schritte nachvollziehbar halten.'],
      ['09 · TEAMARBEIT', 'KI im Ablauf verankern', 'Rollen, Freigaben und Verantwortung um die eigentliche Arbeit herum gestalten.']
    ];
    const grid = section.querySelector('.completion-context-grid');
    items.forEach(([eyebrow, title, copy]) => {
      const card = document.createElement('article');
      card.innerHTML = `<small>${eyebrow}</small><h3>${title}</h3><p>${copy}</p>`;
      grid.append(card);
    });
    anchor.before(section);
  }

  function addPrototypeBoundary() {
    const proof = document.querySelector('.before-after-proof');
    if (!proof || proof.querySelector('.completion-prototype-note')) return;
    const note = document.createElement('div');
    note.className = 'completion-prototype-note';
    note.innerHTML = '<strong>Wichtig für die Einordnung:</strong> Der Prototyp, den wir im Build Sprint erstellen, ist eine Entscheidungsgrundlage, kein Produktionssystem. Live-Integrationen, Security-Härtung, Datenmigration, Hosting, Betrieb und Support werden bei Bedarf separat geplant.';
    proof.querySelector('.page-width')?.append(note);
  }

  function aboutImage() {
    if (!document.body.classList.contains('about-page')) return;
    const hero = document.querySelector('.about-hero .page-width');
    if (!hero || hero.querySelector('.completion-about-photo')) return;
    const image = document.createElement('img');
    image.className = 'completion-about-photo';
    image.src = 'be-like-tim.jpeg';
    image.alt = 'Blinkin Team';
    hero.append(image);
  }

  setHeroCopy();
  normalizeNav();
  removeRedundancy();
  compactOfferActions();
  ensureFirstMonth();
  ensureSelfCheckSignal();
  addContextCards();
  addPrototypeBoundary();
  aboutImage();
})();
