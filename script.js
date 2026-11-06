const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  });
});

const screenData = {
  onair: { image: 'assets/app-main.png', alt: 'The voxTetra on-air radio screen', number: '01' },
  groups: { image: 'assets/app-talkgroups.png', alt: 'The voxTetra talkgroup selection screen', number: '02' },
  profiles: { image: 'assets/app-profiles.png', alt: 'The voxTetra profile management screen', number: '03' },
  controls: { image: 'assets/app-controls.png', alt: 'The voxTetra PTT keys and alerts settings screen', number: '04' },
};
const tabs = [...document.querySelectorAll('[role="tab"][data-screen]')];
const previewImage = document.querySelector('#preview-image');
const screenNumber = document.querySelector('#screen-number');

function activateTab(tab, focus = false) {
  const data = screenData[tab.dataset.screen];
  if (!data) return;
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  previewImage.src = data.image;
  previewImage.alt = data.alt;
  screenNumber.textContent = `SCREEN ${data.number} / 04`;
  if (focus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
    else nextIndex = (index - 1 + tabs.length) % tabs.length;
    activateTab(tabs[nextIndex], true);
  });
});
