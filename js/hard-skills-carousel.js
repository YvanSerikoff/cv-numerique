document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('#hard-skills .carousel');
  if (!carousel) return;

  const track = carousel.querySelector('#hard-skills-track');
  const slides = Array.from(track?.children || []);
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const status = document.getElementById('hard-skills-status');

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let index = 0;
  const total = slides.length;

  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} sur ${total}`);
  });

  function labelFor(i) {
    return slides[i].querySelector('span')?.textContent?.trim() || `Skill ${i + 1}`;
  }

  function update() {
    // Utilise translate3d pour limiter les artefacts sub-pixel
    track.style.transform = `translate3d(${-index * 100}%, 0, 0)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
    slides.forEach((s, i) => s.setAttribute('aria-hidden', i === index ? 'false' : 'true'));
    if (status) status.textContent = `${labelFor(index)} — ${index + 1} sur ${total}`;
  }

  function go(delta) {
    const next = Math.max(0, Math.min(total - 1, index + delta));
    if (next !== index) {
      index = next;
      update();
    }
  }

  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  });

  update();
});
