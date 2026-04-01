/* =============================================
   ANKIT TIWARI PORTFOLIO — JAVASCRIPT
   ============================================= */

'use strict';

// ─── 1. NAVBAR SCROLL ──────────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Sticky nav style
  navbar.classList.toggle('scrolled', scrollY > 20);

  // Back to top visibility
  backToTop.classList.toggle('visible', scrollY > 400);

  // Active nav link
  updateActiveNav();
}, { passive: true });

// ─── 2. HAMBURGER MENU ─────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ─── 3. ACTIVE NAV LINK ────────────────────────
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}

// ─── 4. TYPEWRITER EFFECT ──────────────────────
const dynamicTerms = [
  'FinTech platforms',
  'RESTful APIs',
  'Digital Wallets',
  'scalable backends',
  'full-stack apps',
  'payment systems',
];

let termIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicEl = document.getElementById('dynamic-text');

function typeWriter() {
  const current = dynamicTerms[termIndex];

  if (isDeleting) {
    charIndex--;
    dynamicEl.textContent = current.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      termIndex = (termIndex + 1) % dynamicTerms.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, 60);
  } else {
    charIndex++;
    dynamicEl.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
    setTimeout(typeWriter, 90);
  }
}

setTimeout(typeWriter, 800);

// ─── 5. COUNTER ANIMATION ──────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// Trigger counter when hero is visible
const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

heroObserver.observe(document.getElementById('hero'));

// ─── 6. SCROLL REVEAL ──────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

// Timeline items
document.querySelectorAll('.timeline-item').forEach(el => {
  revealObserver.observe(el);
});

// Project cards (staggered)
document.querySelectorAll('.project-card').forEach(el => {
  revealObserver.observe(el);
});

// Section-level reveal
document.querySelectorAll('.section-header, .about-grid, .skills-grid, .edu-grid, .achievements-section, .contact-grid').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ─── 7. PARTICLE CANVAS ────────────────────────
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles(count = 60) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '99,102,241' : '34,211,238',
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
    ctx.fill();
  });

  // Draw connections
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / 120) * 0.15})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    });
  });

  animFrame = requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
}, { passive: true });

// ─── 8. CONTACT FORM → WHATSAPP ────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('cf-name').value.trim();
  const email   = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();
  const btn     = document.getElementById('send-msg-btn');

  if (!name || !email || !message) {
    [document.getElementById('cf-name'), document.getElementById('cf-email'), document.getElementById('cf-message')].forEach(el => {
      if (!el.value.trim()) {
        el.style.borderColor = '#f87171';
        el.style.boxShadow = '0 0 0 3px rgba(248,113,113,0.15)';
        setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; }, 2000);
      }
    });
    return;
  }

  // Show loading state
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening WhatsApp...';
  btn.disabled = true;

  // Build WhatsApp message
  const waText = [
    `👋 Hi Ankit! I'm ${name}.`,
    subject ? `📌 Subject: ${subject}` : '',
    `📧 Email: ${email}`,
    ``,
    `💬 ${message}`,
  ].filter(Boolean).join('\n');

  const waUrl = `https://wa.me/916394848987?text=${encodeURIComponent(waText)}`;

  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 900);
});

// ─── 9. BACK TO TOP ────────────────────────────
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── 10. FOOTER YEAR ───────────────────────────
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ─── 11. SMOOTH SCROLL FOR ALL ANCHOR LINKS ────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ─── 12. SKILL PILLS HOVER GLOW ────────────────
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', () => {
    pill.style.boxShadow = `0 4px 16px rgba(99,102,241,0.3)`;
  });
  pill.addEventListener('mouseleave', () => {
    pill.style.boxShadow = '';
  });
});

// ─── 13. CURSOR GLOW EFFECT ────────────────────
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
  border-radius: 50%; transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  top: 0; left: 0;
`;
document.body.appendChild(glow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, { passive: true });

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  glow.style.left = glowX + 'px';
  glow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ─── 14. ALL PROJECTS FILTER LOGIC ─────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const apCards = document.querySelectorAll('.ap-card');

if (filterBtns.length > 0 && apCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      apCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease';
        
        if (filterValue === 'all') {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          const categories = card.getAttribute('data-category').split(' ');
          if (categories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        }
      });
    });
  });
}
