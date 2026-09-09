document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const heroBrand = document.querySelector('[data-hero-brand]');
const menuButtons = [...document.querySelectorAll('[data-menu-button]')];
const mobileMenu = document.querySelector('[data-mobile-menu]');
const menuLinks = mobileMenu ? [...mobileMenu.querySelectorAll('a')] : [];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const syncHeader = () => {
  const scrolled = window.scrollY >= 90;
  header?.classList.toggle('is-visible', scrolled);
  document.body.classList.toggle('has-scrolled', scrolled);
};
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

const setMenuState = (open) => {
  menuButtons.forEach((button) => {
    button.setAttribute('aria-expanded', String(open));
    const label = button.querySelector('.sr-only');
    if (label) label.textContent = open ? 'メニューを閉じる' : 'メニューを開く';
  });
  mobileMenu?.setAttribute('aria-hidden', String(!open));
  mobileMenu?.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
};
menuButtons.forEach((button) => button.addEventListener('click', () => {
  const opening = button.getAttribute('aria-expanded') !== 'true';
  setMenuState(opening);
  if (opening) menuLinks[0]?.focus();
}));
menuLinks.forEach((link) => link.addEventListener('click', () => setMenuState(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
    setMenuState(false);
    (window.scrollY >= 90 ? menuButtons.at(-1) : menuButtons[0])?.focus();
  }
});

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-video]').forEach((video) => videoObserver.observe(video));
}

const heroVideo = document.querySelector('.hero-video');
const videoToggle = document.querySelector('[data-video-toggle]');
videoToggle?.addEventListener('click', () => {
  if (heroVideo.paused) {
    heroVideo.play().catch(() => {});
    videoToggle.textContent = 'PAUSE';
    videoToggle.setAttribute('aria-label', '背景動画を一時停止');
  } else {
    heroVideo.pause();
    videoToggle.textContent = 'PLAY';
    videoToggle.setAttribute('aria-label', '背景動画を再生');
  }
});
document.querySelectorAll('video').forEach((video) => video.addEventListener('error', () => video.classList.add('video-failed')));

const dialog = document.querySelector('[data-dialog]');
const bookingForm = document.querySelector('[data-booking-form]');
if (dialog && bookingForm) {
  const bookingSteps = [...document.querySelectorAll('[data-booking-step]')];
  const bookingComplete = document.querySelector('[data-booking-complete]');
  const stepNumber = document.querySelector('[data-step-number]');
  const progress = document.querySelector('[data-progress]');
  let currentBookingStep = 1;
  const showBookingStep = (nextStep) => {
    currentBookingStep = nextStep;
    bookingComplete.hidden = true;
    bookingSteps.forEach((step) => step.hidden = Number(step.dataset.bookingStep) !== nextStep);
    stepNumber.textContent = String(nextStep);
    progress.style.width = `${nextStep * 33.333}%`;
    document.querySelector(`#booking-step-${nextStep}`)?.focus({ preventScroll: true });
  };
  const updateSummary = () => {
    const data = new FormData(bookingForm);
    document.querySelector('[data-summary-plan]').textContent = data.get('plan');
    document.querySelector('[data-summary-people]').textContent = data.get('people');
    document.querySelector('[data-summary-experience]').textContent = data.get('experience');
  };
  document.querySelector('[data-open-dialog]')?.addEventListener('click', () => { bookingForm.reset(); showBookingStep(1); dialog.showModal(); });
  document.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => { const next = Math.min(currentBookingStep + 1, 3); if (next === 3) updateSummary(); showBookingStep(next); }));
  document.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => showBookingStep(Math.max(currentBookingStep - 1, 1))));
  document.querySelector('[data-preview-complete]')?.addEventListener('click', () => { bookingSteps.forEach((step) => step.hidden = true); bookingComplete.hidden = false; progress.style.width = '100%'; bookingComplete.querySelector('h3')?.focus({ preventScroll: true }); });
  document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}
