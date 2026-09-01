// Header: solid background past the hero.
const header = document.querySelector('.header');
const setHeader = () => header.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', setHeader, { passive: true });
setHeader();

// Mobile menu: full-screen panel with focus + inert management.
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.mobile-menu');
const setMenu = (open) => {
  menu.classList.toggle('open', open);
  menu.toggleAttribute('inert', !open);
  menu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  document.body.classList.toggle('menu-open', open);
  if (open) menu.querySelector('a').focus();
};
menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) {
    setMenu(false);
    menuButton.focus();
  }
});

// Datum Reveal: one IntersectionObserver drives every reveal variant.
// CSS already renders everything visible by default, so this only ever
// adds the animated-in state — nothing depends on JS to be readable.
const revealTargets = document.querySelectorAll('.reveal-fade, .reveal-mask, .reveal-image');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.14 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('visible'));
}

// Demo form: confirm-only, nothing is sent or stored.
document.querySelector('#demo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.currentTarget.querySelector('.form-status').textContent =
    'デモ確認完了：入力内容は送信・保存されていません。';
});

// Scroll progress bar.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector('.progress');
let ticking = false;
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  ticking = false;
};
addEventListener('scroll', () => {
  if (reduceMotion) {
    updateProgress();
  } else if (!ticking) {
    requestAnimationFrame(updateProgress);
    ticking = true;
  }
}, { passive: true });
updateProgress();
