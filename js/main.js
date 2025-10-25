(function () {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme && !prefersDark) root.classList.add('light');
  if (savedTheme === 'light') root.classList.add('light');
  if (savedTheme === 'dark') root.classList.remove('light');

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
      themeBtn.innerHTML = root.classList.contains('light')
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
    themeBtn.innerHTML = root.classList.contains('light') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('menu');
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
    navList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (backToTop) backToTop.classList.toggle('show', y > 400);
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const copyBtn = document.getElementById('copy-email');
  const mailLink = document.getElementById('mailto');
  copyBtn?.addEventListener('click', async () => {
    try {
      const email = mailLink?.textContent?.trim() || '';
      await navigator.clipboard.writeText(email);
      const old = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => (copyBtn.innerHTML = old), 1200);
    } catch (e) {
      alert('Impossible de copier l’email.');
    }
  });

  // Accessible smooth scroll focus management
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      setTimeout(() => target.removeAttribute('tabindex'), 1000);
    });
  });
})();
