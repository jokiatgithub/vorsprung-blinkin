(function () {
  'use strict';

  function textNodes(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) nodes.push(node);
    return nodes;
  }

  function replaceVisibleCopy() {
    var replacements = [
      ['Workflow Sprint', 'Build Sprint'],
      ['AI Hub', 'Solution Loop'],
      ['KI Hub', 'Solution Loop'],
      ['Engpass', 'wiederkehrendes Problem'],
      ['multimodale', 'Bilder, Sprache und technische'],
      ['Im Einsatz:', 'Scope:'],
      ['Nächster Schritt', 'Messen & verfeinern']
    ];
    textNodes(document.body).forEach(function (node) {
      if (!node.nodeValue.trim()) return;
      var value = node.nodeValue;
      replacements.forEach(function (pair) {
        value = value.split(pair[0]).join(pair[1]);
      });
      node.nodeValue = value;
    });
  }

  function setText(selector, value) {
    var element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function setupNavigation() {
    var nav = document.querySelector('#site-nav');
    if (!nav) return;
    Array.prototype.forEach.call(nav.querySelectorAll('a'), function (link) {
      var label = link.textContent.trim();
      if (/^(Platform|Plattform|Angebote|App Builder)$/i.test(label)) {
        link.classList.add('fc-hide-nav');
      }
      if (/Workflow Sprint/i.test(label)) link.textContent = 'Build Sprint';
      if (/^(AI Hub|KI Hub)$/i.test(label)) {
        link.textContent = 'Solution Loop';
        link.href = '#top';
      }
    });
    var action = document.querySelector('.nav-action');
    if (action) {
      action.textContent = 'SOLUTION LOOP ↗';
      action.href = '#top';
    }
  }

  function setupHero() {
    setText('.hero-copy .eyebrow, .hero-eyebrow', 'MASSGESCHNEIDERTE KI-BERATUNG FÜR KOMPLEXE PRODUKTE');
    setText('#hero-title', 'Baut mit uns KI-Vorsprung auf.');
    var ledes = document.querySelectorAll('.hero-lede');
    if (ledes.length) {
      ledes[ledes.length - 1].textContent = 'Blinkin ist ein KI-Unternehmen, das seit 2019 KI-Projekte berät und eine eigene Plattform für KI-Apps baut. Wir helfen Unternehmen dabei, KI-Potenziale für ihre Arbeit zu verstehen und mit der passenden Technologie umzusetzen.';
    }
    var hub = document.querySelector('.offer-panel-hub');
    var sprint = document.querySelector('.offer-panel-sprint');
    if (hub) {
      hub.classList.add('fc-compact-offer');
      var hubCopy = hub.querySelector('p');
      if (hubCopy) hubCopy.textContent = '2 × 75 Minuten gemeinsame Umsetzung · Vollzugang zur Blinkin KI-Plattform für eigene KI-Anwendungen · laufende Einordnung von KI-Entwicklungen, Werkzeugen und Methoden · monatlich kündbar.';
    }
    if (sprint) {
      sprint.classList.add('fc-compact-offer');
      var sprintCopy = sprint.querySelector('p');
      if (sprintCopy) sprintCopy.textContent = 'Ein konkreter KI-Anwendungsfall in 4 Wochen. Wir bauen mit euch einen klar abgegrenzten Prozess bis zur direkt nutzbaren Lösung.';
    }
    var stack = document.querySelector('.hero-offer-stack');
    if (stack && !document.querySelector('.fc-offer-actions')) {
      var actions = document.createElement('div');
      actions.className = 'fc-offer-actions';
      actions.innerHTML = '<a class="button button-yellow" href="#top">SOLUTION LOOP STARTEN ↗</a><a class="text-link" href="build.html">BUILD SPRINT ANSEHEN ↗</a>';
      stack.after(actions);
    }
    var logoWall = document.querySelector('.logo-wall');
    if (logoWall && !document.querySelector('.fc-logo-strip')) {
      var strip = document.createElement('div');
      strip.className = 'fc-logo-strip';
      Array.prototype.forEach.call(logoWall.querySelectorAll('img'), function (img) {
        var copy = img.cloneNode(true);
        copy.removeAttribute('width');
        copy.removeAttribute('height');
        strip.appendChild(copy);
      });
      if (strip.children.length) document.querySelector('#top').appendChild(strip);
    }
  }

  function createDeliverables() {
    if (document.querySelector('.fc-deliverables')) return;
    var top = document.querySelector('#top');
    if (!top) return;
    var section = document.createElement('section');
    section.className = 'fc-deliverables light-section';
    section.innerHTML = '<div class="page-width"><div class="fc-section-kicker">WAS IHR BEKOMMT</div><h2>Drei konkrete Deliverables pro Arbeitszyklus.</h2><div class="fc-deliverables-grid">' +
      '<article class="fc-deliverable"><span>01</span><div><h3>Bestandsanalyse</h3><p>Ein Bestandsbild eurer heutigen Arbeit.</p><small>Auslöser · Beteiligte · Systeme · Daten · Übergaben · gewünschtes Ergebnis</small></div><div class="fc-flow"><b>Auslöser<br>&amp; Input</b><i>→</i><b>Heutiger<br>Ablauf</b><i>→</i><strong>Problem<br>&amp; Ergebnis</strong></div></article>' +
      '<article class="fc-deliverable"><span>02</span><div><h3>Potenzialanalyse</h3><p>Eine priorisierte Karte eurer KI-Potenziale.</p><small>Wir bewerten Häufigkeit, Entlastung, Machbarkeit und Risiko.</small></div><div class="fc-bars"><label>Häufigkeit <i><em style="width:82%"></em></i><b>hoch</b></label><label>Entlastung <i><em style="width:70%"></em></i><b>hoch</b></label><label>Machbarkeit <i><em style="width:76%"></em></i><b>gut</b></label><label>Risiko <i><em style="width:34%"></em></i><b>prüfen</b></label></div></article>' +
      '<article class="fc-deliverable"><span>03</span><div><h3>Lösungsraum</h3><p>Eine Lösung, die sich am gewünschten Ergebnis orientiert, nicht an einer bestimmten Technologie.</p><small>Blinkin AI Playground, Claude Code, Codex oder andere passende Werkzeuge.</small></div><div class="fc-loop"><b>Input</b><b>KI-Beitrag</b><b>Review</b><strong>Messen</strong></div></article>' +
      '</div></div>';
    top.after(section);
  }

  function createContext() {
    if (document.querySelector('.fc-context')) return;
    var anchor = document.querySelector('#arbeitsweise') || document.querySelector('#erster-monat');
    if (!anchor) return;
    var section = document.createElement('section');
    section.className = 'fc-context light-section';
    var cards = [
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
    section.innerHTML = '<div class="page-width"><div class="fc-context-head"><div class="fc-section-kicker">WOMIT IHR ZU BLINKIN KOMMEN KÖNNT</div><h2>Ein wiederkehrendes Problem reicht für den Solution Loop.</h2><p>Für den Build Sprint braucht es zusätzlich einen priorisierten Anwendungsfall und geeignete Beispiele.</p></div><div class="fc-context-grid">' + cards.map(function (card) { return '<article><small>' + card[0] + '</small><h3>' + card[1] + '</h3><p>' + card[2] + '</p></article>'; }).join('') + '</div></div>';
    anchor.before(section);
    var benefits = document.createElement('section');
    benefits.className = 'fc-benefits light-section';
    benefits.innerHTML = '<div class="page-width"><div class="fc-benefits-grid"><article><h3>Besser entscheiden</h3><p>Signale aus Markt, Unternehmen und echten Interaktionen werden eingeordnet.</p></article><article><h3>Zeit und Kosten senken</h3><p>Wiederkehrende Recherche, Dokumentation und Abstimmung werden verlässlicher.</p></article><article><h3>Neue Angebote schaffen</h3><p>Expertise, Daten und Prozesse werden zu nutzbaren KI-Anwendungen.</p></article></div></div>';
    section.after(benefits);
  }

  function updateMonth() {
    var month = document.querySelector('#erster-monat');
    if (!month) return;
    setText('#hub-month-title', 'Wir arbeiten gemeinsam am richtigen Problem.');
    var labels = ['Bestand aufnehmen', 'Potenzial bestimmen', 'Anwendung prüfen', 'Messen & verfeinern'];
    Array.prototype.forEach.call(month.querySelectorAll('.sprint-steps li h4'), function (heading, index) {
      if (labels[index]) heading.textContent = labels[index];
    });
    if (!month.querySelector('.fc-followup')) {
      var note = document.createElement('div');
      note.className = 'fc-followup';
      note.innerHTML = '<strong>Monat 2+</strong><h3>Der nächste Schmerzpunkt startet den nächsten Loop.</h3><p>Monat für Monat bringt ihr das größte aktuelle Problem. Wir beraten am echten Ablauf, begleiten bestehende Loops im Review und priorisieren die nächste Verbesserung.</p><p><strong>Wichtig:</strong> Der Prototyp ist eine Entscheidungsgrundlage, kein Produktionssystem. Live-Integrationen, Security-Härtung, Datenmigration, Hosting, Betrieb und Support werden bei Bedarf separat geplant.</p>';
      month.appendChild(note);
    }
  }

  function hideRedundantSections() {
    Array.prototype.forEach.call(document.querySelectorAll('section'), function (section) {
      var text = section.textContent || '';
      if (text.includes('UNSER AUSGANGSPUNKT') || text.includes('SICHER STARTEN')) section.classList.add('fc-hide-redundant');
    });
    var useCases = document.querySelector('.use-cases-section');
    if (useCases) useCases.classList.add('fc-hide-redundant');
  }

  function init() {
    document.body.classList.add('fc-completed-20260815');
    setupNavigation();
    setupHero();
    createDeliverables();
    createContext();
    updateMonth();
    hideRedundantSections();
    replaceVisibleCopy();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
