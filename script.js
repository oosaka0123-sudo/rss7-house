// RSS7 HOUSE — Interactive Behavior & Progressive Enhancement

const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const progress = document.querySelector('.progress');
const demoForm = document.querySelector('#demo-form');

// Header Scroll state & Progress bar updates
const updateScrollState = () => {
  const scrollY = window.scrollY;
  if (header) {
    header.classList.toggle('scrolled', scrollY > 40);
  }

  if (progress) {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = scrollMax > 0 ? Math.min(Math.max(scrollY / scrollMax, 0), 1) : 0;
    progress.style.transform = `scaleX(${scrollRatio})`;
  }
};

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

// Mobile Navigation Drawer Management
const setMobileMenuOpen = (open) => {
  if (!mobileMenu || !menuButton) return;

  mobileMenu.classList.toggle('open', open);
  mobileMenu.toggleAttribute('inert', !open);
  mobileMenu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  document.body.classList.toggle('menu-open', open);

  if (open) {
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }
};

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu ? mobileMenu.classList.contains('open') : false;
    setMobileMenuOpen(!isOpen);
  });
}

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuOpen(false));
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
    setMobileMenuOpen(false);
    if (menuButton) menuButton.focus();
  }
});

// Scroll Reveal Observer (Progressive Enhancement)
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}

// Form Submission Handling (Demo feedback)
if (demoForm) {
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = demoForm.querySelector('.form-status');
    if (status) {
      status.textContent = '【デモ確認完了】送信手続きは行われません（入力データは非保持です）。';
    }
  });
}
