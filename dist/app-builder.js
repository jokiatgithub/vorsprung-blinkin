const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));
}

const tabs = [...document.querySelectorAll('[data-filter]')];
const templateCards = [...document.querySelectorAll('[data-category]')];

tabs.forEach((tab) => tab.addEventListener('click', () => {
  const filter = tab.dataset.filter;
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
  });
  templateCards.forEach((card) => {
    const visible = filter === 'all' || card.dataset.category.split(' ').includes(filter);
    card.classList.toggle('is-hidden', !visible);
  });
}));

const scenarios = [...document.querySelectorAll('.scenario')];
const scenarioDetail = document.querySelector('.scenario-detail');
const scenarioContent = document.documentElement.lang === 'de'
  ? [
    ['ARBEIT ANLEITEN', 'Der richtige nächste Schritt, genau dort, wo er gebraucht wird.', 'Gib Techniker:innen, Operator:innen und Service-Teams visuelle Unterstützung, geerdet in dem Wissen, das bereits in deinem Unternehmen steckt.', './assets/visual-inspection.png', 'Arbeitsanleitung bauen'],
    ['WISSEN SICHERN', 'Halte das gute Wissen fest, bevor es verloren geht.', 'Mache Sprachnotizen, Beobachtungen aus dem Feld und Expertenmomente zu einer lebendigen Wissensbasis für dein gesamtes Team.', './assets/sources-upload.png', 'Workflow erfassen'],
    ['KUNDEN VERBINDEN', 'Mache jede Interaktion nützlicher.', 'Entwirf eine markengerechte Self-Service-Erfahrung, die Fragen beantwortet, die richtigen Informationen sammelt und weiß, wann ein Mensch übernehmen sollte.', './assets/mobile-field-flow.png', 'Kunden-App bauen'],
    ['EXPERTISE SKALIEREN', 'Gib dem Wissen einzelner Expert:innen eine größere Reichweite.', 'Verpacke Urteilskraft, Sprache und Methode deines Teams in einen Companion, der genau dann bereitsteht, wenn Menschen ihn brauchen.', './assets/studio-canvas.png', 'Expertise skalieren']
  ]
  : [
    ['GUIDE THE WORK', 'Put the right next step in the right hands.', 'Give technicians, operators, and service teams the visual support they need, grounded in the knowledge you already own.', './assets/visual-inspection.png', 'Build a frontline guide'],
    ['CAPTURE THE KNOWLEDGE', 'Keep the good stuff from walking away.', 'Turn voice notes, field observations, and expert moments into a living knowledge base your whole team can use.', './assets/sources-upload.png', 'Capture a workflow'],
    ['CONNECT THE CUSTOMER', 'Make every interaction more useful.', 'Design a branded self-service experience that answers questions, collects the right input, and knows when to hand over.', './assets/mobile-field-flow.png', 'Build a customer app'],
    ['SCALE THE EXPERT', 'Give one expert a bigger reach.', 'Package the judgment, language, and method that make your team great into a companion that is ready whenever people need it.', './assets/studio-canvas.png', 'Scale your expertise']
  ];

scenarios.forEach((scenario, index) => scenario.addEventListener('click', () => {
  scenarios.forEach((item) => item.classList.toggle('is-active', item === scenario));
  const [kicker, title, copy, image, link] = scenarioContent[index];
  scenarioDetail.querySelector('.detail-kicker').textContent = kicker;
  scenarioDetail.querySelector('h3').textContent = title;
  scenarioDetail.querySelector('p').textContent = copy;
  scenarioDetail.querySelector('img').src = image;
  scenarioDetail.querySelector('img').alt = `${title} built with Blinkin`;
  scenarioDetail.querySelector('.inline-arrow').innerHTML = `${link} <span>↗</span>`;
}));

document.querySelectorAll('[data-template]').forEach((button) => button.addEventListener('click', () => {
  const template = button.dataset.template;
  const subject = encodeURIComponent(`Build my Blinkin: ${template}`);
  window.location.href = `mailto:hello@blinkin.io?subject=${subject}`;
}));
