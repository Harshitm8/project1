/**
 * welcome.js — Professional splash interactions
 * Click / tap / keyboard → ripple → navigate to index.html
 */

/* Pill stagger (product grid items) */
document.querySelectorAll('.pg-item').forEach((el, i) => {
  el.style.animationDelay = `${1.15 + i * 0.06}s`;
});

/* Navigation */
(function () {
  const page = document.getElementById('wp');
  if (!page) return;
  let going = false;

  function go(x, y) {
    if (going) return;
    going = true;

    const r = document.createElement('div');
    r.className = 'ripple';
    const s = 80;
    r.style.cssText = `width:${s}px;height:${s}px;left:${x-s/2}px;top:${y-s/2}px;`;
    document.body.appendChild(r);

    setTimeout(() => page.classList.add('exiting'), 120);
    setTimeout(() => { window.location.href = 'home.html'; }, 800);
  }

  page.addEventListener('click', e => go(e.clientX, e.clientY));
  page.addEventListener('touchend', e => {
    const t = e.changedTouches[0];
    go(t.clientX, t.clientY);
  }, { passive: true });
  window.addEventListener('keydown', () =>
    go(window.innerWidth / 2, window.innerHeight / 2));
})();