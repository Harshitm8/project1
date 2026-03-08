/**
 * navbar.js — Indo Thai Global
 * Handles: scroll effects, progress bar, hamburger toggle, active links
 */

(function () {
  'use strict';

  /* ── Elements ── */
  const nav      = document.getElementById('nav');
  const progress = document.getElementById('navProgress');
  const burger   = document.getElementById('burger');
  const drawer   = document.getElementById('drawer');

  if (!nav) return; // guard if navbar not present

  /* ────────────────────────────────────────────
     SCROLL: shadow depth + progress bar
  ──────────────────────────────────────────── */
  function onScroll() {
    const scrolled = window.scrollY > 12;
    nav.classList.toggle('is-scrolled', scrolled);

    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      progress.style.width = pct.toFixed(2) + '%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ────────────────────────────────────────────
     HAMBURGER / DRAWER
  ──────────────────────────────────────────── */
  if (!burger || !drawer) return;

  let isOpen = false;

  function toggleDrawer(force) {
    isOpen = typeof force === 'boolean' ? force : !isOpen;
    burger.classList.toggle('is-open', isOpen);
    drawer.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    // lock body scroll when drawer open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  // toggle on burger click
  burger.addEventListener('click', function () {
    toggleDrawer();
  });

  // close when a drawer link/CTA is clicked
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      toggleDrawer(false);
    });
  });

  // close on outside click
  document.addEventListener('click', function (e) {
    if (isOpen && !nav.contains(e.target) && !drawer.contains(e.target)) {
      toggleDrawer(false);
    }
  });

  // close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) toggleDrawer(false);
  });

  // close drawer if window resizes past mobile breakpoint
  window.addEventListener('resize', function () {
    if (isOpen && window.innerWidth > 900) toggleDrawer(false);
  }, { passive: true });

  /* ────────────────────────────────────────────
     ACTIVE LINK — highlight based on current URL
  ──────────────────────────────────────────── */
  const current = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link, .drawer-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

})();