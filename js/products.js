/**
 * products.js — Indo Thai Global
 * Product data · card rendering · hover overlay · modal · scroll reveal
 */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════
     PRODUCT DATA — fill in your image paths below
  ══════════════════════════════════════════════════ */
  const PRODUCTS = [
    {
      id: 1,
      name: 'Solar Dryer',
      tagline: 'High-capacity continuous drying with solar energy',
      description:
        'Our flagship Solar Tunnel Dryer uses a transparent UV-stabilised polycarbonate cover and an efficient airflow system to deliver uniform, hygienic drying for large-scale food and agricultural produce. Ideal for spices, fruits, vegetables and grains.',
      specs: [
        { key: 'Capacity',     val: '100–2000 kg/batch' },
        { key: 'Temperature',  val: '40°C – 75°C' },
        { key: 'Material',     val: 'GI / SS 304 frame' },
        { key: 'Energy',       val: '100% solar powered' },
        { key: 'Footprint',    val: '10m × 2m (modular)' },
      ],
      image: 'assets/products/solar-tunnel-dryer.jpg', // ← your image path
    },
    {
      id: 2,
      name: 'Honey',
      tagline: 'tbd',
      description:
        'tbd',
      specs: [
        { key: 'Trays',       val: '12 / 24 / 48 trays' },
        { key: 'Temperature', val: '35°C – 90°C (±2°C)' },
        { key: 'Material',    val: 'SS 316 trays, MS body' },
        { key: 'Energy',      val: 'Solar + electric (auto)' },
        { key: 'Insulation',  val: '50mm rockwool' },
      ],
      image: 'assets/products/hybrid-tray-dryer.jpg',
    },
    {
      id: 3,
      name: 'Plastic Crates',
      tagline: 'tbd',
      description:
        'tbd',
      specs: [
        { key: 'Area',        val: '20–100 sqm' },
        { key: 'Structure',   val: 'GI frame + UV polycarbonate' },
        { key: 'Ventilation', val: 'Natural + motorised option' },
        { key: 'Energy',      val: 'Zero operating cost' },
        { key: 'Lifespan',    val: '10+ years' },
      ],
      image: 'assets/products/greenhouse-dryer.jpg',
    },
    {
      id: 4,
      name: 'Kitchen Equipments',
      tagline: 'tbd',
      description:
        'tbd',
      specs: [
        { key: 'Throughput',   val: '500 kg/hr – 5 T/hr' },
        { key: 'Drum size',    val: 'Ø600mm – Ø1800mm' },
        { key: 'Temperature',  val: 'Up to 200°C' },
        { key: 'Drive',        val: 'Motorised gearbox' },
        { key: 'Fuel',         val: 'Biomass / LPG / solar-assist' },
      ],
      image: 'assets/products/rotary-drum-dryer.jpg',
    },
    {
      id: 5,
      name: 'Vegetable Slicer Machine',
      tagline: 'tbd',
      description:
        'tbd',
      specs: [
        { key: 'Capacity',    val: '10 – 100 kg/batch' },
        { key: 'Temperature', val: '30°C – 120°C (±1°C)' },
        { key: 'Control',     val: 'Digital PID + timer' },
        { key: 'Material',    val: 'SS 304 interior' },
        { key: 'Trays',       val: '4 / 8 / 12 trays' },
      ],
      image: 'assets/products/cabinet-dryer.jpg',
    },
    {
      id: 6,
      name: 'Pulverizer',
      category: 'Hybrid',
      tagline: 'tbd',
      description:
        'tbd',
      specs: [
        { key: 'Batch size',  val: '5 – 150 kg' },
        { key: 'Airflow',     val: 'Variable 500–3000 m³/hr' },
        { key: 'Temperature', val: '40°C – 90°C' },
        { key: 'Filter',      val: 'Bag filter + HEPA option' },
        { key: 'Material',    val: 'SS 316 contact parts' },
      ],
      image: 'assets/products/fluidised-bed-dryer.jpg',
    },
    {
      id: 7,
      name: 'Knapsack Sprayer',
      tagline: 'tbd',
      description:
        'tbd',
      specs: [
        { key: 'Aperture',    val: '2m × 4m (scalable)' },
        { key: 'Temperature', val: 'Up to 150°C' },
        { key: 'Tracking',    val: 'Manual / auto-tracking' },
        { key: 'Energy',      val: '100% solar' },
        { key: 'Frame',       val: 'Hot-dip galvanised steel' },
      ],
      image: 'assets/products/parabolic-solar-dryer.jpg',
    },
  ];

  /* ══════════════════════════════════════════════════
     RENDER PRODUCT CARDS
  ══════════════════════════════════════════════════ */
  function buildCard(p) {
    const card = document.createElement('article');
    card.className = 'prod-card';
    card.setAttribute('data-id', p.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View details for ${p.name}`);

    card.innerHTML = `
      <div class="prod-img-wrap">
        ${renderCardImg(p)}
        <span class="prod-badge">${p.category}</span>

        <!-- hover overlay -->
        <div class="prod-overlay" aria-hidden="true">
          <div class="ov-title">${p.name}</div>
          <div class="ov-desc">${p.description}</div>
          <div class="ov-row">
            <span class="ov-price"><sup>from</sup>${p.price}</span>
            <button class="ov-btn" data-id="${p.id}">Details ›</button>
          </div>
        </div>
      </div>

      <div class="prod-body">
        <div class="prod-name">${p.name}</div>
        <div class="prod-tagline">${p.tagline}</div>
        <div class="prod-footer">
          <div class="prod-price">
            ${p.price}
            <span class="prod-price-note">${p.priceNote}</span>
          </div>
          <span class="prod-more">Details <span aria-hidden="true">→</span></span>
        </div>
      </div>
    `;

    return card;
  }

  function renderCardImg(p) {
    if (p.image) {
      return `<img
        src="${p.image}"
        alt="${p.name}"
        class="prod-img"
        loading="lazy"
        onerror="this.parentElement.innerHTML = buildPlaceholder('${p.icon}', '${p.category}')"
      />`;
    }
    return `
      <div class="prod-img-placeholder">
        <span class="ph-icon">${p.icon}</span>
        <span class="ph-label">${p.category}</span>
      </div>`;
  }

  // exposed globally for onerror callback
  window.buildPlaceholder = function (icon, cat) {
    return `<div class="prod-img-placeholder">
      <span class="ph-icon">${icon}</span>
      <span class="ph-label">${cat}</span>
    </div>`;
  };

  /* ══════════════════════════════════════════════════
     INJECT CARDS INTO ALL GRIDS ON PAGE
  ══════════════════════════════════════════════════ */
  function injectCards() {
    document.querySelectorAll('.products-grid').forEach(function (grid) {
      PRODUCTS.forEach(function (p) {
        grid.appendChild(buildCard(p));
      });
    });
  }

  /* ══════════════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════════════ */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      // fallback — just show everything
      document.querySelectorAll('.prod-card').forEach(function (c) {
        c.classList.add('is-visible');
      });
      return;
    }

    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.prod-card').forEach(function (c) {
      obs.observe(c);
    });
  }

  /* ══════════════════════════════════════════════════
     MODAL
  ══════════════════════════════════════════════════ */
  // Build modal DOM once
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.setAttribute('aria-label', 'Product details');
  backdrop.innerHTML = `
    <div class="modal-box" id="modalBox">
      <div class="modal-img-pane" id="modalImgPane"></div>
      <div class="modal-info">
        <div class="modal-cat"  id="modalCat"></div>
        <div class="modal-name" id="modalName"></div>
        <div class="modal-tagline-text" id="modalTagline"></div>
        <div class="modal-rule"></div>
        <div class="modal-desc" id="modalDesc"></div>
        <ul  class="modal-specs" id="modalSpecs"></ul>
        <div class="modal-price-row">
          <div class="modal-price-fig" id="modalPrice"></div>
        </div>
        <div class="modal-actions">
          <a href="quote.html" class="btn btn-dark" style="font-size:0.8rem;padding:.5rem 1.2rem">
            Request Quote →
          </a>
          <a href="contact.html" class="btn btn-ghost" style="font-size:0.8rem;padding:.48rem 1.1rem">
            Contact Us
          </a>
        </div>
      </div>
      <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
    </div>
  `;
  document.body.appendChild(backdrop);

  function openModal(id) {
    const p = PRODUCTS.find(function (x) { return x.id === id; });
    if (!p) return;

    // image pane
    const imgPane = document.getElementById('modalImgPane');
    imgPane.innerHTML = p.image
      ? `<img src="${p.image}" alt="${p.name}" onerror="this.parentElement.innerHTML='<div class=modal-ph>${p.icon}</div>'">`
      : `<div class="modal-ph">${p.icon}</div>`;

    // text
    document.getElementById('modalCat').textContent     = p.category;
    document.getElementById('modalName').textContent    = p.name;
    document.getElementById('modalTagline').textContent = p.tagline;
    document.getElementById('modalDesc').textContent    = p.description;
    document.getElementById('modalPrice').textContent   = p.price;

    // specs
    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = p.specs.map(function (s) {
      return `<li class="modal-spec"><span class="spec-k">${s.key}:</span> ${s.val}</li>`;
    }).join('');

    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // focus trap — close button
    setTimeout(function () {
      document.getElementById('modalClose').focus();
    }, 50);
  }

  function closeModal() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // close button
  document.getElementById('modalClose').addEventListener('click', closeModal);

  // backdrop click closes
  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ══════════════════════════════════════════════════
     EVENT DELEGATION — open modal on card click
  ══════════════════════════════════════════════════ */
  document.addEventListener('click', function (e) {
    // clicked on a card or the "Details" overlay button
    const card = e.target.closest('.prod-card');
    const btn  = e.target.closest('.ov-btn');

    if (btn) {
      e.stopPropagation();
      openModal(Number(btn.dataset.id));
      return;
    }
    if (card) {
      openModal(Number(card.dataset.id));
    }
  });

  // keyboard: Enter/Space on card
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.prod-card');
      if (card) {
        e.preventDefault();
        openModal(Number(card.dataset.id));
      }
    }
  });

  /* ══════════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════════ */
  injectCards();
  initReveal();

})();