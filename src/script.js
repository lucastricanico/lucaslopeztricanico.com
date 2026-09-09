const nav = document.querySelector('.tab-bar');
const tabs = [...document.querySelectorAll('.nav-tab')];
const indicator = document.querySelector('.tab-indicator');
const sections = tabs.map((tab) => document.getElementById(tab.dataset.section));
let activeIndex = 0;
let lastScrollY = window.scrollY;

function setActive(index) {
  activeIndex = index;
  tabs.forEach((tab, tabIndex) => {
    const isActive = tabIndex === index;
    tab.classList.toggle('active', isActive);
    if (isActive) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });
  indicator.style.transform = `translateX(${index * 100}%)`;
}

setActive(0);
tabs.forEach((tab, index) => tab.addEventListener('click', () => setActive(index)));
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActive(sections.indexOf(visible.target));
}, { rootMargin: '-30% 0px -55% 0px', threshold: [0, .2, .5] });
sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  const movingDown = currentY > lastScrollY;
  nav.classList.toggle('compact', currentY > 90 && movingDown);
  if (!movingDown || currentY < 90) nav.classList.remove('compact');
  lastScrollY = currentY;
}, { passive: true });

document.querySelectorAll('.glass').forEach((surface) => {
  surface.addEventListener('pointermove', (event) => {
    const rect = surface.getBoundingClientRect();
    surface.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    surface.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });
});

document.querySelectorAll('.swipe-row').forEach((row) => {
  const card = row.querySelector('.swipe-card');
  card.addEventListener('click', (event) => {
    if (window.matchMedia('(hover: none)').matches) {
      document.querySelectorAll('.swipe-row.revealed').forEach((openRow) => { if (openRow !== row) openRow.classList.remove('revealed'); });
      row.classList.toggle('revealed');
      event.stopPropagation();
    }
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.swipe-row')) document.querySelectorAll('.swipe-row.revealed').forEach((row) => row.classList.remove('revealed'));
});

document.querySelectorAll('.action-plus').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.expandable-item');
    const expanded = item.dataset.expanded === 'true';
    item.dataset.expanded = String(!expanded);
    button.setAttribute('aria-expanded', String(!expanded));
    button.setAttribute('aria-label', `${expanded ? 'Show' : 'Hide'} ${button.closest('.swipe-row').querySelector('.card-title').textContent} details`);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
