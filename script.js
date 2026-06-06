const hamburger = document.querySelector('.header__hambuger');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
});

overlay.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
});

const horizontalScrollEls = document.querySelectorAll(
  '.services__list, .blogs__cards, .blog-list__nav-list'  // ← 加這個
);

horizontalScrollEls.forEach((el) => {
  el.addEventListener('wheel', (e) => {
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, { passive: false });
});