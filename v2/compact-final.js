(()=>{
  const q=(s,c=document)=>c.querySelector(s), all=(s,c=document)=>[...c.querySelectorAll(s)];
  const contextCards=[
    ['01 · VERTRIEB','Angebote schneller vorbereiten','Wiederverwendbares Wissen in einen prüfbaren ersten Entwurf bringen.'],
    ['02 · SERVICE','Anfragen sinnvoll vorsortieren','Kontext sammeln, Fälle strukturieren und Antworten vorbereiten.'],
    ['03 · OPERATIONS','Berichte aus Material bauen','Notizen, Tabellen und Dokumente in eine gemeinsame Arbeitsfassung überführen.'],
    ['04 · WISSEN','Verlässliche Antworten ermöglichen','Festlegen, welcher Kontext für Menschen und KI als Grundlage dienen darf.'],
    ['05 · MANAGEMENT','Entscheidungen vorbereiten','Signale, Annahmen und Optionen verdichten, ohne das menschliche Urteil zu verstecken.'],
    ['06 · PRODUKTION','Übergaben klarer machen','Wiederkehrende Informationen vollständig und im richtigen Format weitergeben.'],
    ['07 · ONBOARDING','Erfahrung nutzbar machen','Praxiswissen aus Gesprächen und Dokumenten in einen hilfreichen Einstieg verwandeln.'],
    ['08 · QUALITÄT','Dokumente gezielt prüfen','Varianten vergleichen, Lücken markieren und Review-Schritte nachvollziehbar halten.'],
    ['09 · TEAMARBEIT','KI im Ablauf verankern','Rollen, Freigaben und Verantwortung um die eigentliche Arbeit herum gestalten.']
  ];
  function addContext(){
    if(!q('#top')||q('.compact-context-section')) return;
    const section=document.createElement('section'); section.className='compact-context-section';
    section.innerHTML='<div class="page-width compact-context-head"><h2>Womit ihr zu Blinkin kommen könnt.</h2><p>Ein wiederkehrender Schmerzpunkt reicht für den Solution Loop. Für den Build Sprint braucht es zusätzlich einen priorisierten Anwendungsfall und passende Beispiele.</p></div><div class="page-width compact-context-grid"></div><div class="page-width compact-benefits"><article class="compact-benefit"><h3>Besser entscheiden</h3><p>Signale aus Markt, Unternehmen und echten Interaktionen werden zu klaren nächsten Schritten.</p></article><article class="compact-benefit"><h3>Zeit und Kosten senken</h3><p>Wiederkehrende Recherche, Dokumentation und Abstimmung werden zu verlässlichen Abläufen.</p></article><article class="compact-benefit"><h3>Neue Angebote schaffen</h3><p>Expertise, Daten und Prozesse werden zu KI-Anwendungen, die Teams und Kunden nutzen.</p></article></div>';
    section.querySelector('.compact-context-grid').innerHTML=contextCards.map(c=>`<article class="compact-context-card"><small>${c[0]}</small><h3>${c[1]}</h3><p>${c[2]}</p></article>`).join('');
    const main=q('#main')||document.body; const faq=q('.faq-section',main); faq?main.insertBefore(section,faq):main.append(section);
  }
  function normalize(){
    all('#site-nav a').forEach(a=>{if(/plattform|angebote|platform|offers/i.test(a.textContent)) a.remove();});
    all('section').forEach(s=>{const t=s.textContent||''; if((/UNSER AUSGANGSPUNKT/.test(t)||/SICHER STARTEN/.test(t))&&!s.id.includes('top')) s.remove();});
    all('.nav-action').forEach(a=>{a.textContent='SOLUTION LOOP ↗';a.href='index.html#top';});
    const hero=q('#top .hero-offer-stack');
    if(hero&&!q('.compact-offer-actions')){const a=document.createElement('div');a.className='compact-offer-actions';a.innerHTML='<a class="button button-primary" href="#top">SOLUTION LOOP STARTEN ↗</a><a class="button button-text" href="build.html">BUILD SPRINT ANSEHEN ↗</a>';hero.after(a);}
    const month=q('#hub-month-title'); if(month) month.textContent='Wir arbeiten gemeinsam am richtigen Problem.';
    const steps=[['Bestand aufnehmen','Heute sichtbar machen.'],['Potential bestimmen','Hebel priorisieren.'],['Anwendung prüfen','Werkzeuge passend wählen.'],['Messen & verfeinern','Umsetzung entscheiden.']];
    all('#erster-monat .sprint-steps > li').forEach((li,i)=>{if(!steps[i])return;const h=q('h4',li),p=q('p',li);if(h)h.textContent=steps[i][0];if(p)p.textContent=steps[i][1];});
    const proof=q('.before-after-proof');if(proof&&!q('.compact-boundary-note',proof)){const n=document.createElement('p');n.className='compact-boundary-note';n.innerHTML='<strong>Der Prototyp ist eine Entscheidungsgrundlage, kein Produktionssystem.</strong> Live-Integrationen, Security-Härtung, Datenmigration, Hosting, Betrieb und Support werden bei Bedarf separat geplant.';proof.append(n)}
  }
  document.addEventListener('DOMContentLoaded',()=>{addContext();normalize()});
})();
