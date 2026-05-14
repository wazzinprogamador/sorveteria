/* ===========================
   FLOR DE CREME – main.js
   Botões de filtro + hero + animações
=========================== */
 
document.addEventListener('DOMContentLoaded', () => {
 
  const navBtns    = document.querySelectorAll('.nav-btn');
  const categories = document.querySelectorAll('.category');
  const navbarEl   = document.getElementById('navbar');
 
  /* ──────────────────────────────
     1. FILTRO DE CATEGORIAS
  ────────────────────────────── */
  function filterCategory(target) {
    categories.forEach(sec => {
      if (target === 'todos' || sec.id === target) {
        sec.classList.remove('hidden');
        sec.classList.remove('fade-in');
        void sec.offsetWidth;
        sec.classList.add('fade-in');
      } else {
        sec.classList.add('hidden');
      }
    });
  }
 
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
 
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
 
      filterCategory(target);
 
      if (target !== 'todos') {
        const section = document.getElementById(target);
        if (section) {
          const navH = navbarEl.offsetHeight;
          const top  = section.getBoundingClientRect().top + window.scrollY - navH - 20;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        const main = document.querySelector('.main');
        if (main) {
          const navH = navbarEl.offsetHeight;
          const top  = main.getBoundingClientRect().top + window.scrollY - navH - 20;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
 
  /* ──────────────────────────────
     2. HERO – botão scroll suave
  ────────────────────────────── */
  const heroBtn = document.querySelector('.hero-btn.primary');
  if (heroBtn) {
    heroBtn.addEventListener('click', e => {
      e.preventDefault();
      const main = document.querySelector('.main');
      if (main) {
        const navH = navbarEl.offsetHeight;
        const top  = main.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }
 
  /* ──────────────────────────────
     3. SCROLL SPY
  ────────────────────────────── */
  const spyObserver = new IntersectionObserver(
    entries => {
      const activeTodos = document.querySelector('.nav-btn.active[data-target="todos"]');
      if (!activeTodos) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.target === id);
          });
        }
      });
    },
    {
      root: null,
      rootMargin: `-${(navbarEl.offsetHeight || 60) + 20}px 0px -55% 0px`,
      threshold: 0
    }
  );
 
  categories.forEach(sec => spyObserver.observe(sec));
 
  /* ──────────────────────────────
     4. ANIMAÇÃO DE ENTRADA dos cards
  ────────────────────────────── */
  const cards = document.querySelectorAll('.card');
 
  const cardObserver = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 60);
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
 
  cards.forEach(card => {
    card.style.opacity    = '0';
    card.style.transform  = 'translateY(28px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });
 
  /* ──────────────────────────────
     5. NAVBAR shadow ao rolar
  ────────────────────────────── */
  window.addEventListener('scroll', () => {
    navbarEl.style.boxShadow = window.scrollY > 10
      ? '0 6px 32px rgba(244,143,177,0.28)'
      : '0 4px 24px rgba(244,143,177,0.15)';
  }, { passive: true });
 
  /* ──────────────────────────────
     6. PARALLAX leve no hero
  ────────────────────────────── */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      heroImg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
  }
 
  /* ──────────────────────────────
     7. Easter egg – 5 cliques no logo
  ────────────────────────────── */
  const logoIcon = document.querySelector('.logo-icon');
  let clicks = 0;
  if (logoIcon) {
    logoIcon.style.cursor = 'pointer';
    logoIcon.addEventListener('click', () => {
      clicks++;
      if (clicks >= 5) {
        clicks = 0;
        showToast('🍦 Você ganhou um sorvete grátis! (Brincadeira... ou não? 😄)');
      }
    });
  }
 
  /* ──────────────────────────────
     8. Toast helper
  ────────────────────────────── */
  function showToast(msg) {
    const old = document.querySelector('.flor-toast');
    if (old) old.remove();
 
    const toast = document.createElement('div');
    toast.className = 'flor-toast';
    toast.textContent = msg;
    Object.assign(toast.style, {
      position:     'fixed',
      bottom:       '2rem',
      left:         '50%',
      transform:    'translateX(-50%) translateY(80px)',
      background:   'linear-gradient(135deg, #e91e8c, #42a5f5)',
      color:        '#fff',
      padding:      '0.85rem 1.75rem',
      borderRadius: '50px',
      fontFamily:   "'Nunito', sans-serif",
      fontWeight:   '700',
      fontSize:     '0.95rem',
      boxShadow:    '0 8px 32px rgba(0,0,0,0.2)',
      zIndex:       '9999',
      transition:   'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s',
      opacity:      '0',
      whiteSpace:   'nowrap'
    });
    document.body.appendChild(toast);
 
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity   = '1';
    });
 
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(80px)';
      toast.style.opacity   = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
 
});