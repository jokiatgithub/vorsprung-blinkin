const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const steps = [...document.querySelectorAll('.step')];
const resultTitle = document.querySelector('.step-result h3');
const resultCopy = document.querySelector('.step-result p');
const resultTags = document.querySelector('.result-tags');
const stepResults = [
  ['Start with an agent that already knows the job.', 'Pick a strong starting point from the agent library or a proven app pattern. Speed comes from not starting at zero.', ['Agent library', 'Templates', 'Best practice']],
  ['Make the experience unmistakably yours.', 'Add your sources, brand language, access rules, forms, and the moments that make your process different.', ['Your knowledge', 'Your brand', 'Your rules']],
  ['Ship the link. Then keep making it better.', 'Connect the agents to the buttons, test the path, publish to a link or companion, and iterate without losing the shape.', ['Working link', 'Human control', 'Endless iteration']]
];

steps.forEach((step, index) => step.addEventListener('click', () => {
  steps.forEach((item) => item.classList.toggle('is-active', item === step));
  const [title, copy, tags] = stepResults[index];
  resultTitle.textContent = title;
  resultCopy.textContent = copy;
  resultTags.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join('');
}));
