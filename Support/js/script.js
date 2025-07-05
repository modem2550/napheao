document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initGliderMenu();
  initGlassEffects();
  initTabDefault();
  initScrollSpy();
  initScrollClassChange();
  initEscOverlayToggle();

  // Smooth scroll to hash on page load (e.g. index.html#info)
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }
});

// === Smooth Scroll (only for anchors) ===
function initSmoothScroll() {
  document.querySelectorAll('a.nav-text[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      const targetId = href && href.startsWith('#') ? href.substring(1) : null;
      const target = targetId ? document.getElementById(targetId) : null;

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// === Glider Navigation ===
function initGliderMenu() {
  const navItems = document.querySelectorAll('.n-menu-ul .nav-text');
  const glider = document.querySelector('.n-menu-ul .glider');

  function moveGliderToActive(el) {
    if (!glider || !el) return;
    glider.style.width = `${el.offsetWidth}px`;
    glider.style.left = `${el.offsetLeft}px`;
  }

  navItems.forEach(item => {
    item.addEventListener('click', e => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector('.n-menu-ul .nav-text.active')?.classList.remove('active');
        item.classList.add('active');
        moveGliderToActive(item);
      }
    });
  });

  const initial = document.querySelector('.n-menu-ul .nav-text.active');
  if (initial) moveGliderToActive(initial);

  window.addEventListener('resize', () => {
    const active = document.querySelector('.n-menu-ul .nav-text.active');
    if (active) moveGliderToActive(active);
  });
}

// === Scroll Spy ===
function initScrollSpy() {
  const navItems = document.querySelectorAll('.n-menu-ul .nav-text[href^="#"]');
  const sections = Array.from(navItems)
    .map(item => document.querySelector(item.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        const targetNav = document.querySelector(`.n-menu-ul .nav-text[href="${id}"]`);
        if (targetNav) {
          document.querySelector('.n-menu-ul .nav-text.active')?.classList.remove('active');
          targetNav.classList.add('active');
          const glider = document.querySelector('.n-menu-ul .glider');
          if (glider) {
            glider.style.width = `${targetNav.offsetWidth}px`;
            glider.style.left = `${targetNav.offsetLeft}px`;
          }
        }
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));
}

// === Scroll Class Effect ===
function initScrollClassChange() {
  window.addEventListener('scroll', () => {
    const navItems = document.querySelectorAll('.nav-text');
    const isScrolled = window.scrollY > 100;
    navItems.forEach(item => {
      item.classList.toggle('scrolled', isScrolled);
    });
  });
}

// === ESC Close Overlay ===
function initEscOverlayToggle() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('fandom-extra');
      const computed = window.getComputedStyle(overlay);
      if (computed.display !== 'none') {
        toggleFandom();
      }
    }
  });
}

function toggleFandom() {
  const fandomExtra = document.getElementById('fandom-extra');
  const isVisible = window.getComputedStyle(fandomExtra).display !== 'none';
  fandomExtra.style.display = isVisible ? 'none' : 'flex';
}

// === Glass Card Effect ===
function initGlassEffects() {
  const glassElements = document.querySelectorAll('.glass-card');
  glassElements.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const specular = el.querySelector('.glass-specular');
      if (specular) {
        specular.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 60%)`;
      }

      const displacement = el.querySelector('filter feDisplacementMap');
      if (displacement) {
        const scaleX = (x / rect.width) * 100;
        const scaleY = (y / rect.height) * 100;
        displacement.setAttribute('scale', Math.min(scaleX, scaleY));
      }
    });

    el.addEventListener('mouseleave', () => {
      const specular = el.querySelector('.glass-specular');
      if (specular) specular.style.background = 'none';

      const displacement = el.querySelector('filter feDisplacementMap');
      if (displacement) displacement.setAttribute('scale', '77');
    });
  });
}

// === Tabs ===
function initTabDefault() {
  const defaultTab = document.querySelector('.tab button.tablinks');
  if (defaultTab) {
    openTab({ currentTarget: defaultTab }, 'All');
  }
}

function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  if (tabName === 'All') {
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'block';
    }
  } else {
    const selectedContent = document.getElementsByClassName(tabName);
    for (let i = 0; i < selectedContent.length; i++) {
      selectedContent[i].style.display = 'block';
    }
  }

  evt.currentTarget.className += ' active';

  const unsetElement = document.querySelector('.unset');
  if (unsetElement) {
    unsetElement.style.display = 'none';
  }
}

function initRedirectToIndex() {
  const links = document.querySelectorAll('.nav-text.internal');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetId = link.getAttribute('data-target');
      const currentPath = window.location.pathname;

      // ไม่ได้อยู่ที่ index.html หรือ root → redirect ไป index พร้อม hash
      if (!currentPath.includes('index.html') && currentPath !== '/' && currentPath !== '/index') {
        window.location.href = `/index.html#${targetId}`;
      } else {
        // อยู่ที่ index แล้ว → เลื่อน smooth
        const target = document.getElementById(targetId);
        if (target) {
          document.querySelector('.n-menu-ul .nav-text.active')?.classList.remove('active');
          link.classList.add('active');

          // move glider
          const glider = document.querySelector('.n-menu-ul .glider');
          if (glider) {
            glider.style.width = `${link.offsetWidth}px`;
            glider.style.left = `${link.offsetLeft}px`;
          }

          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}
