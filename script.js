// Header: solid background past the hero.
const header = document.querySelector('.header');
const setHeader = () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
};
if (header) {
  addEventListener('scroll', setHeader, { passive: true });
  setHeader();
}

// Full-screen hamburger menu: focus + inert management + Escape + Focus Return.
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.mobile-menu');

const setMenu = (open) => {
  if (!menu || !menuButton) return;
  menu.classList.toggle('open', open);
  menu.toggleAttribute('inert', !open);
  menu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  document.body.classList.toggle('menu-open', open);

  if (open) {
    const activeLink = menu.querySelector('a[aria-current="page"]') || menu.querySelector('a');
    if (activeLink) {
      activeLink.focus();
    }
  } else {
    menuButton.focus();
  }
};

if (menuButton && menu) {
  menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      setMenu(false);
    }
  });
}

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
const demoForm = document.querySelector('#demo-form');
if (demoForm) {
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = demoForm.querySelector('.form-status');
    if (status) {
      status.textContent = 'デモ確認完了：入力内容は送信・保存されていません。';
    }
  });
}

// Scroll progress bar. Always kept in sync.
const progress = document.querySelector('.progress');
if (progress) {
  let ticking = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();
}
