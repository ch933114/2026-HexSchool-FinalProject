const hamburger = document.querySelector('.header__hambuger');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
});

overlay.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
});

const horizontalScrollEls = document.querySelectorAll(
  '.services__list, .blogs__cards, .blog-list__nav-list, .projects__filter-list'
);

horizontalScrollEls.forEach((el) => {
  el.addEventListener('wheel', (e) => {
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, { passive: false });
});

const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openModal() {
  modalOverlay.classList.add('modal-overlay--open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('modal-overlay--open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.projects__card-btn').forEach((btn) => {
  btn.addEventListener('click', openModal);
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});