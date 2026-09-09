document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const menuLinks = [...mobileMenu.querySelectorAll('a')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const syncHeader = () => header.classList.toggle('is-visible', window.scrollY >= 90);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.sr-only').textContent = 'メニューを開く';
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.querySelector('.sr-only').textContent = opening ? 'メニューを閉じる' : 'メニューを開く';
  mobileMenu.setAttribute('aria-hidden', String(!opening));
  mobileMenu.classList.toggle('is-open', opening);
  document.body.classList.toggle('menu-open', opening);
  if (opening) menuLinks[0].focus();
});
menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
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
      else if (!video.closest('.hero')) video.pause();
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-video]').forEach((video) => videoObserver.observe(video));
}

const heroVideo = document.querySelector('.hero-video');
const videoToggle = document.querySelector('[data-video-toggle]');
videoToggle.addEventListener('click', () => {
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
document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('error', () => video.style.display = 'none');
});

const dialog = document.querySelector('[data-dialog]');
const bookingForm = document.querySelector('[data-booking-form]');
const bookingSteps = [...document.querySelectorAll('[data-booking-step]')];
const bookingComplete = document.querySelector('[data-booking-complete]');
const stepNumber = document.querySelector('[data-step-number]');
const progress = document.querySelector('[data-progress]');
let currentBookingStep = 1;

const showBookingStep = (nextStep) => {
  currentBookingStep = nextStep;
  bookingComplete.hidden = true;
  bookingSteps.forEach((step) => {
    const active = Number(step.dataset.bookingStep) === nextStep;
    step.hidden = !active;
    step.classList.toggle('is-active', active);
  });
  stepNumber.textContent = String(nextStep);
  progress.style.width = `${nextStep * 33.333}%`;
  document.querySelector(`#booking-step-${nextStep}`)?.focus({ preventScroll: true });
};

const updateBookingSummary = () => {
  const data = new FormData(bookingForm);
  document.querySelector('[data-summary-plan]').textContent = data.get('plan');
  document.querySelector('[data-summary-people]').textContent = data.get('people');
  document.querySelector('[data-summary-experience]').textContent = data.get('experience');
};

document.querySelector('[data-open-dialog]').addEventListener('click', () => {
  bookingForm.reset();
  showBookingStep(1);
  dialog.showModal();
});
document.querySelectorAll('[data-next]').forEach((button) => button.addEventListener('click', () => {
  const next = Math.min(currentBookingStep + 1, 3);
  if (next === 3) updateBookingSummary();
  showBookingStep(next);
}));
document.querySelectorAll('[data-back]').forEach((button) => button.addEventListener('click', () => showBookingStep(Math.max(currentBookingStep - 1, 1))));
document.querySelector('[data-preview-complete]').addEventListener('click', () => {
  bookingSteps.forEach((step) => step.hidden = true);
  bookingComplete.hidden = false;
  stepNumber.textContent = '3';
  progress.style.width = '100%';
  bookingComplete.querySelector('h3').focus({ preventScroll: true });
});
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
