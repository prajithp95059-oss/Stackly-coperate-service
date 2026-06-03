// ===== Scroll Progress Bar =====
const scrollBar = document.getElementById('scroll-bar');
if (scrollBar) {
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    scrollBar.style.width = pct + '%';
  });
}

// ===== Sticky Navbar =====
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.fade-up, .fade-in');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Counter Animation =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 22);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const h2s = e.target.querySelectorAll('.stat-num');
      h2s.forEach(h2 => {
        const val  = parseInt(h2.dataset.val);
        const suf  = h2.dataset.suffix || '';
        animateCounter(h2, val, suf);
      });
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) counterObs.observe(statsSection);

// ===== Ticker Duplicate =====
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.innerHTML += ticker.innerHTML;
}
