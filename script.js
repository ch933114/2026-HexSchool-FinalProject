const hamburger = document.querySelector('.header__hambuger');
const overlay = document.querySelector('.overlay');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
  });
}

const horizontalScrollEls = document.querySelectorAll(
  '.services__list, .blogs__cards, .blog-list__nav-list, .projects__filter-list'
);

horizontalScrollEls.forEach((el) => {
  el.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    },
    { passive: false }
  );
});

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.add('modal-overlay--open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('modal-overlay--open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.projects__card-btn').forEach((btn) => {
  btn.addEventListener('click', openModal);
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay?.classList.contains('modal-overlay--open')) {
    closeModal();
  }
});

const revealGroups = [
  { selector: '.services__header' },
  { selector: '.services__item', stagger: true },
  { selector: '.projects__header' },
  { selector: '.projects__item', stagger: true },
  { selector: '.projects__footer, .projects_more-btn' },
  { selector: '.blogs__header' },
  { selector: '.blogs__card', stagger: true },
  { selector: '.subscription__container' },
  { selector: '.footer__info, .footer__form-wrapper', stagger: true },
  { selector: '.service-flow__heading' },
  { selector: '.service-flow__item', stagger: true },
  { selector: '.service-case__heading' },
  { selector: '.service-case__item', stagger: true },
  { selector: '.service-qa__heading' },
  { selector: '.service-qa__item', stagger: true },
  { selector: '.blog__card', stagger: true },
  { selector: '.blog-pagination' },
  { selector: '.blog-post-breadcrumb__container' },
  { selector: '.blog-post-detail__intro' },
  { selector: '.blog-post-detail__content > *', stagger: true },
  {
    selector:
      '.blog-post-detail__container > .blog-post-detail__img, ' +
      '.blog-post-detail__container > .blog-post-detail__img-caption, ' +
      '.blog-post-detail__container > .blog-post-detail__subtitle, ' +
      '.blog-post-detail__container > .blog-post-detail__heading, ' +
      '.blog-post-detail__container > p, ' +
      '.blog-post-detail__table-wrapper, ' +
      '.blog-post-detail__outro',
    stagger: true,
  },
];

function registerRevealTargets(selector, stagger = false) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element, index) => {
    if (element.dataset.revealReady === 'true') return;

    element.dataset.revealReady = 'true';
    element.classList.add('scroll-reveal');

    if (stagger) {
      element.style.setProperty('--reveal-delay', `${Math.min(index * 0.12, 0.48)}s`);
    }
  });
}

function initScrollReveal() {
  revealGroups.forEach(({ selector, stagger }) => {
    registerRevealTargets(selector, stagger);
  });

  const revealTargets = document.querySelectorAll('.scroll-reveal');

  if (!revealTargets.length) return;

  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    revealTargets.forEach((element) => {
      element.classList.add('is-visible');
    });
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
}

initScrollReveal();
