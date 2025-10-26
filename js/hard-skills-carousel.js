// Hard Skills — défilement continu fluide avec plusieurs cartes visibles
// - Mouvement continu via requestAnimationFrame
// - Mesure la largeur réelle d'une carte (compatible 1/n, responsive)
// - Pause au survol/focus, respects prefers-reduced-motion
// - Boucle infinie via duplication d'un set complet

(function () {
  const track = document.getElementById('hard-skills-track');
  if (!track) return;

  const viewport = track.parentElement;
  const statusEl = document.getElementById('hard-skills-status');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReduced.matches) {
    if (statusEl) statusEl.textContent = 'Défilement automatique désactivé (préférence de mouvement réduit).';
    return;
  }

  // Paramètres
  const SPEED_PX_S = 60; // vitesse du défilement (px/s) — ajustez
  let running = true;
  let lastTs = 0;
  let pos = 0;                // offset en px
  let itemWidth = 0;          // largeur d'une carte mesurée
  let originalCount = 0;      // nb de cartes "réelles"
  let originalSetWidth = 0;   // largeur totale d'un set

  // Prépare les clones une seule fois
  const setupClones = () => {
    if (!track.dataset.originalBuilt) {
      track.dataset.originalBuilt = 'true';
      originalCount = track.children.length;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < originalCount; i++) {
        frag.appendChild(track.children[i].cloneNode(true));
      }
      track.appendChild(frag);
    } else {
      originalCount = Math.floor(track.children.length / 2);
    }
  };

  const computeItemWidth = () => {
    // Mesure sur la première carte (clone ou originale: même style)
    const first = track.children[0];
    if (!first) return;
    // Pour éviter des mesures faussées, enlève la transition et applique transform courante
    const prevTransition = track.style.transition;
    track.style.transition = 'none';
    // On s'assure que le layout est à jour
    const rect = first.getBoundingClientRect();
    itemWidth = rect.width;
    track.style.transition = prevTransition || '';
    // Largeur d'un set original (nombre d'items réels x largeur d'une carte)
    originalSetWidth = originalCount * itemWidth;
  };

  const render = () => {
    track.style.transform = `translateX(${-pos}px)`;
  };

  const updateStatus = (() => {
    let lastAnnounce = 0;
    return (ts) => {
      if (!statusEl || !originalSetWidth || !itemWidth) return;
      if (ts - lastAnnounce < 250) return; // throttle ~4/s
      lastAnnounce = ts;
      const visibleIndex = Math.floor((pos % originalSetWidth) / itemWidth) + 1; // 1..originalCount
      statusEl.textContent = `Compétence ${visibleIndex} sur ${originalCount}`;
    };
  })();

  const tick = (ts) => {
    if (!running) {
      lastTs = ts;
      requestAnimationFrame(tick);
      return;
    }
    if (!lastTs) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;

    pos += SPEED_PX_S * dt;

    // Boucle sans à-coups: dès qu'on a parcouru un set, on retranche sa largeur
    if (originalSetWidth > 0 && pos >= originalSetWidth) {
      pos -= originalSetWidth;
    }

    render();
    updateStatus(ts);
    requestAnimationFrame(tick);
  };

  const pause = () => { running = false; };
  const resume = () => { running = true; };

  const recalc = () => {
    // Conserver la position relative pour éviter un saut visuel
    const ratio = originalSetWidth > 0 ? pos / originalSetWidth : 0;
    computeItemWidth();
    pos = ratio * originalSetWidth;
    render();
  };

  // [viewport, track].forEach((el) => {
  //   el.addEventListener('mouseenter', pause);
  //   el.addEventListener('mouseleave', resume);
  //   el.addEventListener('focusin', pause);
  //   el.addEventListener('focusout', resume);
  //   el.addEventListener('touchstart', pause, { passive: true });
  // });

  document.addEventListener('visibilitychange', () => {
    running = document.visibilityState === 'visible';
    lastTs = 0; // évite une grande dt à la reprise
  });

  prefersReduced.addEventListener?.('change', (e) => {
    if (e.matches) {
      running = false;
      if (statusEl) statusEl.textContent = 'Défilement automatique désactivé (préférence de mouvement réduit).';
    } else {
      running = true;
      lastTs = 0;
      requestAnimationFrame(tick);
    }
  });

  // Init
  setupClones();
  computeItemWidth();
  render();
  requestAnimationFrame(tick);

  // Recalculs sur resize/orientation/changement de police
  window.addEventListener('resize', recalc);
  window.addEventListener('orientationchange', recalc);
})();
