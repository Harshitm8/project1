/**
 * index.js — Indo Thai Global
 * Home page scripts: intersection observer for scroll animations
 */

(function () {
  'use strict';

  /* ── Intersection Observer: fade-up on scroll ── */
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe any elements with data-reveal attribute
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    observer.observe(el);
  });

})();