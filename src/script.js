const tabs = [...document.querySelectorAll('.nav-tab')];
const indicator = document.querySelector('.tab-indicator');
const sections = tabs.map(tab => document.getElementById(tab.dataset.section));
function setActive(index) {
  tabs.forEach((tab,i) => {
    tab.classList.toggle('active', i === index);
    if(i === index) tab.setAttribute('aria-current','location');
    else tab.removeAttribute('aria-current');
  });
  indicator.style.transform = `translateX(${index * 100}%)`;
}
function updateSection() {
  let index = 0;
  sections.forEach((section,i) => { if(section.getBoundingClientRect().top <= 150) index = i; });
  if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) index = sections.length - 1;
  setActive(index);
}
let settleTimer;
let scrollLocked = false;
window.addEventListener('scroll', () => {
  clearTimeout(settleTimer);
  settleTimer = setTimeout(() => { scrollLocked = false; }, 150);
  if (!scrollLocked) updateSection();
}, {passive:true});
tabs.forEach((tab,i) => tab.addEventListener('click', () => {
  // Ignore the intermediate sections the smooth-scroll animation passes
  // through on its way to the clicked one, until scrolling settles.
  scrollLocked = true;
  setActive(i);
}));
updateSection();
document.querySelectorAll('.swipe-row:not(.no-actions)').forEach(row => {
  const card = row.querySelector('.swipe-card');
  card.setAttribute('role','button');
  card.setAttribute('aria-label',row.querySelector('.card-title').textContent + ' — show actions');
  card.setAttribute('aria-expanded','false');
  function toggle() {
    const open = !row.classList.contains('revealed');
    row.classList.toggle('revealed',open);
    card.setAttribute('aria-expanded', String(open));
  }
  card.addEventListener('click',toggle);
  card.addEventListener('keydown',event => {
    if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); }
    if(event.key === 'Escape') { row.classList.remove('revealed'); card.blur(); }
  });
  // Pointer exit closes click-revealed cards on desktop.
  row.addEventListener('pointerleave', event => {
    if(event.pointerType === 'mouse') { row.classList.remove('revealed'); card.setAttribute('aria-expanded','false'); if(document.activeElement === card) card.blur(); }
  });
});
document.addEventListener('click',event => {
  document.querySelectorAll('.swipe-row.revealed').forEach(row => {
    if(!row.contains(event.target)) { row.classList.remove('revealed'); row.querySelector('.swipe-card').setAttribute('aria-expanded','false'); }
  });
});
document.querySelectorAll('.action-plus').forEach((button,i) => {
  const item = button.closest('.expandable-item');
  const content = item.querySelector('.expanded-copy');
  content.id = 'details-' + i;
  button.setAttribute('aria-controls',content.id);
  button.addEventListener('click',() => {
    const expanded = item.dataset.expanded !== 'true';
    item.dataset.expanded = String(expanded);
    button.setAttribute('aria-expanded',String(expanded));
  });
});
